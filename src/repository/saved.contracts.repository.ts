import { Injectable, UseFilters } from "@nestjs/common";
import * as moment from "moment";
import { GetSavedListDto } from "src/appDto/saved.list.dto";
import { Address } from "src/models/address.model";
import { Contract } from "src/models/contracts.model";
import { SavedContracts } from "src/models/saved.contracts.model";
import { getAsArray } from "src/utils/array";
import { SqlExceptionFilter } from "src/utils/database";
import { getBluredImage } from "src/utils/images";
import { FileRepository } from "./file.repository";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class SavedContractsRepository {

    private filesRepo = new FileRepository();

    private get model() {
        return SavedContracts.query()
    }

    public async create(user: number, saved_list: number, contract: number) {
      return this.model.insert({ user, saved_list, contract })
    }

    public async isContractSaved(user: number, saved_list: number, contract: number) {
      const data = await this.model.where({ user, saved_list, contract })
      return !!data.length
    }

    public async remove(user: number, saved_list: number, contract: number) {
      return this.model.where({ user, saved_list, contract }).delete()
    }

    public async removeAll(contract: number) {
      return this.model.where({ contract }).delete()
    }

    public async getSavedContracts(saved_list: number) {
      return this.model.where({ saved_list })
    }

    private applyRangeFilter(queryBuilder, field: string, from?: number, to?: number) {
      if (from !== undefined && to !== undefined) {
        queryBuilder.whereBetween(field, [from, to]);
      } else if (from !== undefined) {
        queryBuilder.where(field, '>=', from);
      } else if (to !== undefined) {
        queryBuilder.where(field, '<=', to);
      }
    }
  

    public async getPaginationResponse(filter: GetSavedListDto, saved_list: number, unlocked: number[]) {
      const page = +filter.page || 1;
      const limit = +filter.limit || 20;
      const offset = (page - 1) * limit;
    
      const priceFrom = Number.isNaN(+filter.priceFrom) ? undefined : +filter.priceFrom;
      const priceTo = Number.isNaN(+filter.priceTo) ? undefined : +filter.priceTo;
      const unlockedList = `ARRAY[${unlocked.join(',')}]::int[]`;

      const [countResult, list] = await Promise.all([
        this.model
          .from('saved_contracts')
          .leftJoin('contracts', 'saved_contracts.contract', 'contracts.id')
          .where({ saved_list })
          .modify((queryBuilder) => {
            if (filter.dateFrom !== undefined && filter.dateTo !== undefined) {
              const from = moment().add(filter.dateFrom, 'days');
              const to = moment().add(filter.dateTo, 'days');
              queryBuilder.whereBetween('contracts.created_at', [from.toDate(), to.toDate()]);
            }
    
            if (priceFrom !== undefined && priceTo !== undefined) {
              this.applyRangeFilter(queryBuilder, 'contracts.price', priceFrom, priceTo);
            }

            if (+filter.status === 1) {
              queryBuilder.whereIn('contract', unlocked)
            } else if (+filter.status === 2) {
              queryBuilder.whereNotIn('contract', unlocked)
            }
          })
          .count('* as count')
          .first(),
    
        this.model
          .from('saved_contracts')
          .leftJoin('contracts', 'saved_contracts.contract', 'contracts.id')
          .leftJoin('addresses', 'contracts.address', 'addresses.id')
          .leftJoin('property_conditions', 'contracts.property_condition', 'property_conditions.id')
          .leftJoin('areas', 'contracts.offer', 'areas.offer')
          .where({ saved_list })
          .modify((queryBuilder) => {
            if (filter.dateFrom !== undefined && filter.dateTo !== undefined) {
              const from = moment().add(filter.dateFrom, 'days');
              const to = moment().add(filter.dateTo, 'days');
              queryBuilder.whereBetween('contracts.created_at', [from.toDate(), to.toDate()]);
            }
    
            if (+filter.status === 1) {
              queryBuilder.whereIn('contracts.id', unlocked)
            } else if (+filter.status === 2) {
              queryBuilder.whereNotIn('contracts.id', unlocked)
            }

            if (priceFrom !== undefined && priceTo !== undefined) {
              this.applyRangeFilter(queryBuilder, 'contracts.price', priceFrom, priceTo);
            }
          })
          .select(
            'saved_contracts.*',
            'contracts.*',
            Contract.raw(`jsonb_build_object(
              'id', addresses.id,
              'lat', addresses.lat,
              'lng', addresses.lng,
              'state', addresses.state,
              'country', addresses.country,
              'city', addresses.city,
              'postal_code', addresses.postal_code,
              'formatted_address', addresses.formatted_address
            ) as address`),
            Contract.raw(`
              COALESCE(
                jsonb_agg(
                  jsonb_build_object(
                    'id', areas.id,
                    'bedrooms', areas.bedrooms,
                    'bathrooms', areas.bathrooms
                  )
                ) FILTER (WHERE areas.id IS NOT NULL), 
                '[]'::jsonb
              ) as areas
            `),
              Contract.raw(`CASE 
                WHEN contracts.id = ANY(${unlockedList}) THEN true
                ELSE false
              END as unlocked`)
          )
          .groupBy(
            'saved_contracts.id',  // Add all columns from saved_contracts
            'saved_contracts.user',
            'saved_contracts.saved_list',
            'saved_contracts.contract',
            'saved_contracts.created_at',
            'saved_contracts.updated_at',
            'contracts.id',
            'addresses.id',
            'property_conditions.id'
          )
          .orderBy('contracts.created_at', 'desc')
      ]);
    
      const totalCount = +countResult.count;
      return {
        totalCount,
        data: await this.formatData(list),
      };
    }
    
    
    public async formatData(data: Contract[] | any) {
      const list = []

      for (let i = 0; i < data.length; i++) {
        const contract = data[i];
        let formated: any = {};
        
        if (!contract.unlocked) {
          const image = !contract.images.length ? 
            null :  
            await this.filesRepo.getByName(contract.images[0]);
          
          let ref = null;
          if (image) {
            ref = await getBluredImage(image.name, image.user);
          }

          const address = this.changeLocation(contract.address);

          formated = {
            id: contract.id,
            expire_at: contract.expire_at,
            areas: getAsArray(contract.areas),
            images: getAsArray(ref),
            address,
            price: contract.price,
            estAvr: contract.estAvr,
            estNetProfit: contract.estNetProfit,
            estRentMo: contract.estRentMo,
            estRepairCost: contract.estRepairCost,
            asignmentFee: contract.asignmentFee,
            totalAmount: contract.totalAmount,
            buyersFee: contract.buyersFee,
            earnestMoneyDep: contract.earnestMoneyDep,
            asignmentContract: contract.asignmentContract,
            realEstatePurchseAgreement: contract.realEstatePurchseAgreement,
            competitiveMarketAnalisys: contract.competitiveMarketAnalisys,
            scopeOfWork: contract.scopeOfWork,
            saved: contract.saved,
            unlocked: false
          }
        } else formated = {...contract, areas: getAsArray(contract.areas), unlocked: true};
        list.push(formated);
      }
      return list;
    }
    
    public changeLocation(address: Address) {
      const { latOffset, lngOffset } = this.getRandomOffset(200);

      let formattedAddress = {
        lat: address.lat = +address.lat + latOffset,
        lng: address.lng = +address.lng + lngOffset,
        // lat: address.lat,
        // lng: address.lng,
        country: address.country,
        city: address.city,
        state: address.state,
        street: address.street
      }; 

      return formattedAddress;
    }

    public getRandomOffset = (maxMeters: number) => {
      const metersToLat = maxMeters / 111000;
      const randomLatOffset = (Math.random() * 2 - 1) * metersToLat;
    
      const metersToLng = maxMeters / (111000 * Math.cos(randomLatOffset * (Math.PI / 180)));
      const randomLngOffset = (Math.random() * 2 - 1) * metersToLng;
    
      return { latOffset: randomLatOffset, lngOffset: randomLngOffset };
    };

}

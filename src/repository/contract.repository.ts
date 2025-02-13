import { Inject, Injectable } from "@nestjs/common";
import { GetContractsDto } from "src/appDto/contracts.dto";
import { CreateOfferDto } from "src/appDto/offer.dto";
import { concatContracts } from "src/helpers/array";
import { Contract } from "src/models/contracts.model";
import { PayedContractsRepository } from "./payed_contracts.repository";
import { ContractsStatusTypeEnum } from "src/constants/enum";
import { UpdateContractByAdminDto } from "src/appDto/admin.dto";
import { getBluredImage } from "src/utils/images";
import { FileRepository } from "./file.repository";
import * as moment from "moment";
import { AddressRepository } from "./address.repository";
import { Address } from "src/models/address.model";
import { getAsArray } from "src/utils/array";

@Injectable()
export class ContractRepository {

    private payedContractsRepo = new PayedContractsRepository();

    private addressRepo = new AddressRepository()

    private filesRepo = new FileRepository();

    private get model() {
        return Contract.query();
    }

    public async create(data: Contract) {
        return this.model.insert(data);
    }

    public async getPayedContracts(user: number) {
        return this.model
        .where({ status: ContractsStatusTypeEnum.published })
        .leftJoin('addresses', 'contracts.address', 'addresses.id')
        .leftJoin('property_conditions', 'contracts.property_condition', 'property_conditions.id')
        .leftJoin('payed_contracts', function () {
          this.on('contracts.id', '=', 'payed_contracts.contract')
            .andOn('payed_contracts.user', '=', `${user}`);
        })
        .where('contracts.user', user)
        .select(
          'contracts.*',
          Contract.raw(`
            jsonb_build_object(
              'id', addresses.id,
              'lat', addresses.lat,
              'lng', addresses.lng,
              'state', addresses.state,
              'country', addresses.country,
              'city', addresses.city,
              'postal_code', addresses.postal_code
            ) as address
          `),
          Contract.raw(`
            jsonb_build_object(
              'id', property_conditions.id,
              'condition', property_conditions.condition
            ) as property_condition
          `),
          Contract.raw('CASE WHEN payed_contracts.id IS NULL THEN FALSE ELSE TRUE END as payed')
        )
        .orderBy('contracts.created_at', 'desc');
    }

    public async getContractsV2(filter: GetContractsDto, entityManager: any, saved: number[], unlocked: number[]) {
      const queryBuilder = entityManager.createQueryBuilder('contracts', 'c');
  
      // Pagination logic
      const offset = (+filter.page - 1) * +filter.limit;
      const savedList = `ARRAY[${saved.join(',')}]::int[]`;
      const unlockedList = `ARRAY[${unlocked.join(',')}]::int[]`;
  
      // Add basic filters
      if (filter.zipCode) {
          queryBuilder.andWhere('c.zipCode = :zipCode', { zipCode: filter.zipCode });
      }
  
      if (filter.propertyType) {
          queryBuilder.andWhere('c.propertyType = :propertyType', { propertyType: filter.propertyType });
      }
  
      if (filter.paid) {
          queryBuilder.andWhere('c.paid = :paid', { paid: filter.paid });
      }
  
      if (saved.length > 0) {
          queryBuilder.andWhere('c.id = ANY(:savedList)', { savedList });
      }
  
      if (unlocked.length > 0) {
          queryBuilder.andWhere('c.id = ANY(:unlockedList)', { unlockedList });
      }
  
      // Add range filters (from-to)
      if (filter.totalSalesPriceFrom || filter.totalSalesPriceTo) {
          queryBuilder.andWhere('c.totalSalesPrice BETWEEN :totalSalesPriceFrom AND :totalSalesPriceTo', {
              totalSalesPriceFrom: filter.totalSalesPriceFrom || 0,
              totalSalesPriceTo: filter.totalSalesPriceTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.estAvrFrom || filter.estAvrTo) {
          queryBuilder.andWhere('c.estAvr BETWEEN :estAvrFrom AND :estAvrTo', {
              estAvrFrom: filter.estAvrFrom || 0,
              estAvrTo: filter.estAvrTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.estRentMoFrom || filter.estRentMoTo) {
          queryBuilder.andWhere('c.estRentMo BETWEEN :estRentMoFrom AND :estRentMoTo', {
              estRentMoFrom: filter.estRentMoFrom || 0,
              estRentMoTo: filter.estRentMoTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.priceFrom || filter.priceTo) {
          queryBuilder.andWhere('c.price BETWEEN :priceFrom AND :priceTo', {
              priceFrom: filter.priceFrom || 0,
              priceTo: filter.priceTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.estNetProfitFrom || filter.estNetProfitTo) {
          queryBuilder.andWhere('c.estNetProfit BETWEEN :estNetProfitFrom AND :estNetProfitTo', {
              estNetProfitFrom: filter.estNetProfitFrom || 0,
              estNetProfitTo: filter.estNetProfitTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.estRepairCostFrom || filter.estRepairCostTo) {
          queryBuilder.andWhere('c.estRepairCost BETWEEN :estRepairCostFrom AND :estRepairCostTo', {
              estRepairCostFrom: filter.estRepairCostFrom || 0,
              estRepairCostTo: filter.estRepairCostTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.buyersFeeFrom || filter.buyersFeeTo) {
          queryBuilder.andWhere('c.buyersFee BETWEEN :buyersFeeFrom AND :buyersFeeTo', {
              buyersFeeFrom: filter.buyersFeeFrom || 0,
              buyersFeeTo: filter.buyersFeeTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.earnestMoneyDepFrom || filter.earnestMoneyDepTo) {
          queryBuilder.andWhere('c.earnestMoneyDep BETWEEN :earnestMoneyDepFrom AND :earnestMoneyDepTo', {
              earnestMoneyDepFrom: filter.earnestMoneyDepFrom || 0,
              earnestMoneyDepTo: filter.earnestMoneyDepTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.totalAmountFrom || filter.totalAmountTo) {
          queryBuilder.andWhere('c.totalAmount BETWEEN :totalAmountFrom AND :totalAmountTo', {
              totalAmountFrom: filter.totalAmountFrom || 0,
              totalAmountTo: filter.totalAmountTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      if (filter.asignmentFeeFrom || filter.asignmentFeeTo) {
          queryBuilder.andWhere('c.asignmentFee BETWEEN :asignmentFeeFrom AND :asignmentFeeTo', {
              asignmentFeeFrom: filter.asignmentFeeFrom || 0,
              asignmentFeeTo: filter.asignmentFeeTo || Number.MAX_SAFE_INTEGER,
          });
      }
  
      // Add pagination
      queryBuilder.skip(offset).take(+filter.limit);
  
      // Execute query and return results
      const contracts = await queryBuilder.getMany();
      return contracts;
   }

   public async getListedById(id: number, saved: boolean = false, unlocked: boolean = false) {
    const contract = await this.model
      .leftJoin('addresses', 'contracts.address', 'addresses.id')
      .leftJoin('property_conditions', 'contracts.property_condition', 'property_conditions.id')
      .leftJoin('areas', 'contracts.offer', 'areas.offer')
      // .where({ id })
      .findById(id)
      .andWhereNot('deleted', '=', 1)
      .select(
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
        Contract.raw(`CASE 
          WHEN areas.id IS NOT NULL THEN jsonb_build_object(
            'id', areas.id,
            'bedrooms', areas.bedrooms,
            'bathrooms', areas.bathrooms,
            'square_feet', areas.square_feet
          ) 
          ELSE '[]'::jsonb
        END as areas`)
      )
      .first();
      let data: any = { ...contract, saved, unlocked };
      const formatData = await this.formatData([data]);
      return formatData.length ? formatData[0] : null;
   }

   public async getTotalCount() {
      return this.model
        .where({ status: ContractsStatusTypeEnum.published })
        .andWhereNot('deleted', '=', 1)
        .andWhere('expire_at', '>', new Date())
        .count()
   }

   public async findByIds(idList: number[]) {

     const list = await this.model
        .leftJoin('addresses', 'contracts.address', 'addresses.id')
        .leftJoin('property_conditions', 'contracts.property_condition', 'property_conditions.id')
        .leftJoin('areas', 'contracts.offer', 'areas.offer')
        .whereIn('contracts.id', idList)
        .select(
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
                  'bathrooms', areas.bathrooms,
                  'square_feet', areas.square_feet
                )
              ) FILTER (WHERE areas.id IS NOT NULL), 
              '[]'::jsonb
            ) as areas
          `)
        )
        .groupBy(
          'contracts.id',
          'addresses.id',
          'property_conditions.id'
         )
        .orderBy('created_at', 'desc')
  
    return list;
  }

   public async getList(filter: GetContractsDto, userId: number, saved: number[] = [], unlocked: number[] = []) {
    const offset = (+filter.page - 1) * +filter.limit;
    const savedList = `ARRAY[${saved.join(',')}]::int[]`;
    const unlockedList = `ARRAY[${unlocked.join(',')}]::int[]`;
    let addresses = [];

    if (filter.radius && filter.radiusVal && filter.radiusLat && filter.radiusLng) {
      const radius = filter.radiusVal !== 'km' ? (1.609 * +filter.radius) * 1000 : +filter.radius * 1000;
      const addressesList = await this.addressRepo.getByLocationRadius(
        {},
        +filter.radiusLat,
        +filter.radiusLng,
        radius,
        1,
        1000000
      );

      addresses = addressesList.map(item => item.id);
    } else if (filter.northLat && filter.northLng && filter.southLat && filter.southLng && filter.eastLat && filter.eastLng
      && filter.westLat && filter.westLng && filter.withinMapArea && filter.withinMapArea === 'true'
    ) {
      const addressesList = await this.addressRepo.getByMapArea(
        filter.northLat, 
        filter.northLng, 
        filter.southLat, 
        filter.southLng, 
        filter.eastLat, 
        filter.eastLng,
        filter.westLat,
        filter.westLng
      );

      addresses = addressesList.map(item => item.id);
      if (addresses.length) {
        console.log('finded adddress');
        
      } else console.log('Not finded adddress');
    }

    if ((filter.radius && filter.radiusVal && filter.radiusLat && filter.radiusLng) && !addresses.length) {
      return {
        totalCount: 0,
        data: [], 
      }
    }

    if (filter.northLat && filter.northLng && filter.southLat && filter.southLng && filter.eastLat && filter.eastLng
      && filter.westLat && filter.westLng && filter.withinMapArea && filter.withinMapArea === 'true'
      && !addresses.length
    ) {
      return {
        totalCount: 0,
        data: [], 
      }
    }
  
    const [countResult, list] = await Promise.all([
      this.model
        .leftJoin('addresses', 'contracts.address', 'addresses.id')
        .where({ status: ContractsStatusTypeEnum.published })
        .andWhereNot('deleted', '=', 1)
        .andWhereRaw(`
          contracts.expire_at IS NOT NULL 
          AND contracts.expire_at > (NOW() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'
        `)
        .modify((queryBuilder) => {
          if (addresses.length) {
            queryBuilder.whereIn('addresses.id', addresses);
          }
          if (filter.propertyType) {
            queryBuilder.whereIn('propertyType', filter.propertyType.toString().split(','));
          }
          if (filter.zipCode) queryBuilder.andWhere('addresses.postal_code', filter.zipCode);
        
          if (filter.listedDurationFrom !== undefined && filter.listedDurationTo !== undefined) {
            const listedDurationFrom = moment().add(filter.listedDurationFrom, 'days');
            const listedDurationTo = moment().add(filter.listedDurationTo, 'days');
            queryBuilder.whereBetween('expire_at', [listedDurationFrom.toDate(), listedDurationTo.toDate()]);
          }

          // Add range filters for financial fields
          this.applyRangeFilter(queryBuilder, 'totalSalesPrice', filter.totalSalesPriceFrom, filter.totalSalesPriceTo);
          this.applyRangeFilter(queryBuilder, 'estAvr', filter.estAvrFrom, filter.estAvrTo);
          this.applyRangeFilter(queryBuilder, 'estRentMo', filter.estRentMoFrom, filter.estRentMoTo);
          this.applyRangeFilter(queryBuilder, 'price', filter.priceFrom, filter.priceTo);
          this.applyRangeFilter(queryBuilder, 'estNetProfit', filter.estNetProfitFrom, filter.estNetProfitTo);
          this.applyRangeFilter(queryBuilder, 'estRepairCost', filter.estRepairCostFrom, filter.estRepairCostTo);
          this.applyRangeFilter(queryBuilder, 'buyersFee', filter.buyersFeeFrom, filter.buyersFeeTo);
          this.applyRangeFilter(queryBuilder, 'earnestMoneyDep', filter.earnestMoneyDepFrom, filter.earnestMoneyDepTo);
          this.applyRangeFilter(queryBuilder, 'totalAmount', filter.totalAmountFrom, filter.totalAmountTo);
          this.applyRangeFilter(queryBuilder, 'asignmentFee', filter.asignmentFeeFrom, filter.asignmentFeeTo);

        })
        .count('*'),
  
      this.model
        .leftJoin('addresses', 'contracts.address', 'addresses.id')
        .leftJoin('property_conditions', 'contracts.property_condition', 'property_conditions.id')
        .leftJoin('areas', 'contracts.offer', 'areas.offer')
        .where({ status: ContractsStatusTypeEnum.published })
        .andWhereNot('deleted', '=', 1)
        .andWhereRaw(`
          contracts.expire_at IS NOT NULL 
          AND contracts.expire_at > (NOW() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'
        `)
        .modify((queryBuilder) => {
          if (filter.propertyType) {
            queryBuilder.whereIn('propertyType', filter.propertyType.toString().split(','));
          }

          if (addresses.length) {
            queryBuilder.whereIn('addresses.id', addresses);
          }

          if (filter.zipCode) queryBuilder.andWhere('addresses.postal_code', filter.zipCode);
  
          if (+filter.paid === 1) {
            // queryBuilder.innerJoin('payed_contracts', 'contracts.id', 'payed_contracts.contract');
            queryBuilder.whereIn('contracts.id', unlocked)
          } else if (+filter.paid === 2) {
            // queryBuilder.leftJoin('payed_contracts', 'contracts.id', 'payed_contracts.contract');
            queryBuilder.whereNotIn('contracts.id', unlocked)
          }

          // Apply range filters for financial fields
          this.applyRangeFilter(queryBuilder, 'totalSalesPrice', filter.totalSalesPriceFrom, filter.totalSalesPriceTo);
          this.applyRangeFilter(queryBuilder, 'estAvr', filter.estAvrFrom, filter.estAvrTo);
          this.applyRangeFilter(queryBuilder, 'estRentMo', filter.estRentMoFrom, filter.estRentMoTo);
          this.applyRangeFilter(queryBuilder, 'price', filter.priceFrom, filter.priceTo);
          this.applyRangeFilter(queryBuilder, 'estNetProfit', filter.estNetProfitFrom, filter.estNetProfitTo);
          this.applyRangeFilter(queryBuilder, 'estRepairCost', filter.estRepairCostFrom, filter.estRepairCostTo);
          this.applyRangeFilter(queryBuilder, 'buyersFee', filter.buyersFeeFrom, filter.buyersFeeTo);
          this.applyRangeFilter(queryBuilder, 'earnestMoneyDep', filter.earnestMoneyDepFrom, filter.earnestMoneyDepTo);
          this.applyRangeFilter(queryBuilder, 'totalAmount', filter.totalAmountFrom, filter.totalAmountTo);
          this.applyRangeFilter(queryBuilder, 'asignmentFee', filter.asignmentFeeFrom, filter.asignmentFeeTo);
        })
        .orderBy('contracts.created_at', 'desc')
        .select(
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
                  'bathrooms', areas.bathrooms,
                  'square_feet', areas.square_feet
                )
              ) FILTER (WHERE areas.id IS NOT NULL), 
              '[]'::jsonb
            ) as areas
          `),
          Contract.raw(`CASE 
            WHEN contracts.id = ANY(${savedList}) THEN true
            ELSE false
          END as saved`),
          Contract.raw(`CASE 
            WHEN contracts.id = ANY(${unlockedList}) THEN true
            ELSE false
          END as unlocked`)
        )
        .groupBy(
          'contracts.id',
          'addresses.id',
          'property_conditions.id'
         )
        .orderBy('created_at', 'desc')
        .offset(offset)
        .limit(+filter.limit)
    ]);
  
    const totalCount = +countResult[0]['count'];
    const data = await this.formatData(list);
    return {
      totalCount,
      data, 
    };
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
            images: contract.images,
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

    public async purchase(id: number, purchasement: number) {
      return this.model.where({ id }).update({ status: ContractsStatusTypeEnum.purchased, purchasement });
    }

    public async getOne(id: number) {
      const contract = await this.model
      .findById(id)
      .leftJoin('addresses', function() {
        this.on('contracts.address', '=', 'addresses.id').andOnNotNull('contracts.address');
      })
      .leftJoin('property_conditions', function() {
        this.on('contracts.property_condition', '=', 'property_conditions.id').andOnNotNull('contracts.property_condition');
      })
      .leftJoin('areas', function() {
        this.on('contracts.offer', '=', 'areas.offer').andOnNotNull('contracts.offer');
      })
      .select(
        'contracts.id',
        'contracts.status',
        'contracts.address',
        'contracts.propertyType',
        'contracts.descriptionType',
        'contracts.builtYear',
        'contracts.heating',
        'contracts.airConditioning',
        'contracts.waterSupply',
        'contracts.sewer',
        'contracts.electricPanel',
        'contracts.lotSize',
        'contracts.currentHOA',
        'contracts.images',
        'contracts.files',
        'contracts.exteriorType',
        'contracts.totalSalesPrice',
        'contracts.estAvr',
        'contracts.estRentMo',
        'contracts.price',
        'contracts.estNetProfit',
        'contracts.estRepairCost',
        'contracts.buyersFee',
        'contracts.expire_at',
        'contracts.earnestMoneyDep',
        'contracts.totalAmount',
        'contracts.asignmentContract',
        'contracts.asignmentFee',
        'contracts.realEstatePurchseAgreement',
        'contracts.competitiveMarketAnalisys',
        'contracts.scopeOfWork',
        'contracts.created_at',
        'contracts.updated_at',
          Contract.raw(`
          jsonb_build_object(
            'id', addresses.id,
            'lat', addresses.lat,
            'lng', addresses.lng,
            'state', addresses.state,
            'country', addresses.country,
            'city', addresses.city,
            'postal_code', addresses.postal_code,
            'street', addresses.street,
            'formatted_address', addresses.formatted_address
          ) as address
        `),
        Contract.raw(`
          CASE 
            WHEN areas.id IS NOT NULL THEN jsonb_build_object(
              'id', areas.id,
              'bedrooms', areas.bedrooms,
              'bathrooms', areas.bathrooms
            )
            ELSE '[]'::jsonb
          END as areas
        `),
        Contract.raw(`
          jsonb_build_object(
            'id', property_conditions.id,
            'roof_and_gutters', property_conditions.roof_and_gutters, 
            'hvac', property_conditions.hvac,
            'plumbing_and_gas', property_conditions.plumbing_and_gas,
            'electrical', property_conditions.electrical,
            'kitchen', property_conditions.kitchen,
            'bathrooms', property_conditions.bathrooms,
            'windows', property_conditions.windows,
            'doors', property_conditions.doors,
            'water_heater', property_conditions.water_heater,
            'foundation', property_conditions.foundation,
            'framing', property_conditions.framing,
            'dry_wall_and_paint', property_conditions.dry_wall_and_paint,
            'flooring', property_conditions.flooring,
            'washer_and_dryer', property_conditions.washer_and_dryer,
            'siding_and_exterior_trim', property_conditions.siding_and_exterior_trim,
            'patio_and_shed', property_conditions.patio_and_shed,
            'landscaping', property_conditions.landscaping,
            'optional_features', property_conditions.optional_features
          ) as property_condition
        `)
      ).first();
      return contract
  }

    public async getAdminList(filter: GetContractsDto, userId: number) {
        const limit = +filter.limit || 20;
        const page = +filter.page || 1;
        const offset = (page - 1) * limit;
        const [list, count] = await Promise.all([
            this.model
            .leftJoin('addresses', function() {
              this.on('contracts.address', '=', 'addresses.id').andOnNotNull('contracts.address');
            })
            .leftJoin('property_conditions', function() {
              this.on('contracts.property_condition', '=', 'property_conditions.id').andOnNotNull('contracts.property_condition');
            })
            .leftJoin('areas', 'contracts.offer', 'areas.offer')
            .modify((queryBuilder) => {
              if (filter.search) {
                queryBuilder
                .where('addresses.formatted_address', 'ILIKE', `%${filter.search}%`)
                .orWhere('addresses.state', 'ILIKE', `%${filter.search}%`)
                .orWhere('addresses.city', 'ILIKE', `%${filter.search}%`);
              }
            })
            .select(
              'contracts.id',
              'contracts.status',
              'contracts.address',
              'contracts.propertyType',
              'contracts.descriptionType',
              'contracts.builtYear',
              'contracts.heating',
              'contracts.airConditioning',
              'contracts.waterSupply',
              'contracts.sewer',
              'contracts.electricPanel',
              'contracts.lotSize',
              'contracts.currentHOA',
              'contracts.images',
              'contracts.files',
              'contracts.exteriorType', 
              'contracts.totalSalesPrice',
              'contracts.estAvr',
              'contracts.estRentMo',
              'contracts.price',
              'contracts.estNetProfit',
              'contracts.estRepairCost',
              'contracts.buyersFee',
              'contracts.earnestMoneyDep',
              'contracts.totalAmount',
              'contracts.expire_at',
              'contracts.asignmentContract',
              'contracts.realEstatePurchseAgreement',
              'contracts.competitiveMarketAnalisys',
              'contracts.scopeOfWork',
              'contracts.created_at',
              'contracts.updated_at',
                Contract.raw(`
                jsonb_build_object(
                  'id', addresses.id,
                  'lat', addresses.lat,
                  'lng', addresses.lng,
                  'state', addresses.state,
                  'country', addresses.country,
                  'city', addresses.city,
                  'postal_code', addresses.postal_code,
                  'street', addresses.street,
                  'formatted_address', addresses.formatted_address
                ) as address
              `),
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
              Contract.raw(`
                jsonb_build_object(
                  'id', property_conditions.id,
                  'roof_and_gutters', property_conditions.roof_and_gutters, 
                  'hvac', property_conditions.hvac,
                  'plumbing_and_gas', property_conditions.plumbing_and_gas,
                  'electrical', property_conditions.electrical,
                  'kitchen', property_conditions.kitchen,
                  'bathrooms', property_conditions.bathrooms,
                  'windows', property_conditions.windows,
                  'doors', property_conditions.doors,
                  'water_heater', property_conditions.water_heater,
                  'foundation', property_conditions.foundation,
                  'framing', property_conditions.framing,
                  'dry_wall_and_paint', property_conditions.dry_wall_and_paint,
                  'flooring', property_conditions.flooring,
                  'washer_and_dryer', property_conditions.washer_and_dryer,
                  'siding_and_exterior_trim', property_conditions.siding_and_exterior_trim,
                  'patio_and_shed', property_conditions.patio_and_shed,
                  'landscaping', property_conditions.landscaping,
                  'optional_features', property_conditions.optional_features
                ) as property_condition
              `)
            )
            .groupBy(
              'contracts.id',
              'addresses.id',
              'property_conditions.id'
             )
             .orderBy('contracts.created_at', 'desc')
             .offset(offset)
             .limit(limit)
             ,
            this.model
            .clone()
            .leftJoin('addresses', function() {
              this.on('contracts.address', '=', 'addresses.id').andOnNotNull('contracts.address');
            })
            .modify((queryBuilder) => {
              if (filter.search) {
                queryBuilder
                .where('addresses.formatted_address', 'ILIKE', `%${filter.search}%`)
                .orWhere('addresses.state', 'ILIKE', `%${filter.search}%`)
                .orWhere('addresses.city', 'ILIKE', `%${filter.search}%`);
              }
            })
            .count('*')
            ])
  
            const totalCount = +count[0]['count'];
            return {
              totalCount,
              data: list,
            };
    }

    public async update (data: UpdateContractByAdminDto, id: number, user: number, address?: number, propertyCondition?: number) {
        let updateBody: any = {...data}
        delete updateBody.areas;
        if (address) updateBody.address = address
        if (propertyCondition) updateBody.property_condition = propertyCondition
        if (data.images) updateBody.images = JSON.stringify(data.images);
        if (data.files) updateBody.files = JSON.stringify(data.files);
        if (data.exteriorType) updateBody.exteriorType = JSON.stringify(data.exteriorType);
        return this.model.where({ id }).update(updateBody)
    }

    public async getById(id: number) {
        return this.model.findById(id);
    }

    public async delete(id: number) {
        return this.model.where({ id }).update({ deleted: 1 });
    }

    public async publish(id: number) {
        return this.model.where({ id }).update({ status: ContractsStatusTypeEnum.published })
    }

}
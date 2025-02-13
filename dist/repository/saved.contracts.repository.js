"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedContractsRepository = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const contracts_model_1 = require("../models/contracts.model");
const saved_contracts_model_1 = require("../models/saved.contracts.model");
const array_1 = require("../utils/array");
const database_1 = require("../utils/database");
const images_1 = require("../utils/images");
const file_repository_1 = require("./file.repository");
let SavedContractsRepository = class SavedContractsRepository {
    constructor() {
        this.filesRepo = new file_repository_1.FileRepository();
        this.getRandomOffset = (maxMeters) => {
            const metersToLat = maxMeters / 111000;
            const randomLatOffset = (Math.random() * 2 - 1) * metersToLat;
            const metersToLng = maxMeters / (111000 * Math.cos(randomLatOffset * (Math.PI / 180)));
            const randomLngOffset = (Math.random() * 2 - 1) * metersToLng;
            return { latOffset: randomLatOffset, lngOffset: randomLngOffset };
        };
    }
    get model() {
        return saved_contracts_model_1.SavedContracts.query();
    }
    async create(user, saved_list, contract) {
        return this.model.insert({ user, saved_list, contract });
    }
    async isContractSaved(user, saved_list, contract) {
        const data = await this.model.where({ user, saved_list, contract });
        return !!data.length;
    }
    async remove(user, saved_list, contract) {
        return this.model.where({ user, saved_list, contract }).delete();
    }
    async removeAll(contract) {
        return this.model.where({ contract }).delete();
    }
    async getSavedContracts(saved_list) {
        return this.model.where({ saved_list });
    }
    applyRangeFilter(queryBuilder, field, from, to) {
        if (from !== undefined && to !== undefined) {
            queryBuilder.whereBetween(field, [from, to]);
        }
        else if (from !== undefined) {
            queryBuilder.where(field, '>=', from);
        }
        else if (to !== undefined) {
            queryBuilder.where(field, '<=', to);
        }
    }
    async getPaginationResponse(filter, saved_list, unlocked) {
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
                    queryBuilder.whereIn('contract', unlocked);
                }
                else if (+filter.status === 2) {
                    queryBuilder.whereNotIn('contract', unlocked);
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
                    queryBuilder.whereIn('contracts.id', unlocked);
                }
                else if (+filter.status === 2) {
                    queryBuilder.whereNotIn('contracts.id', unlocked);
                }
                if (priceFrom !== undefined && priceTo !== undefined) {
                    this.applyRangeFilter(queryBuilder, 'contracts.price', priceFrom, priceTo);
                }
            })
                .select('saved_contracts.*', 'contracts.*', contracts_model_1.Contract.raw(`jsonb_build_object(
              'id', addresses.id,
              'lat', addresses.lat,
              'lng', addresses.lng,
              'state', addresses.state,
              'country', addresses.country,
              'city', addresses.city,
              'postal_code', addresses.postal_code,
              'formatted_address', addresses.formatted_address
            ) as address`), contracts_model_1.Contract.raw(`
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
            `), contracts_model_1.Contract.raw(`CASE 
                WHEN contracts.id = ANY(${unlockedList}) THEN true
                ELSE false
              END as unlocked`))
                .groupBy('saved_contracts.id', 'saved_contracts.user', 'saved_contracts.saved_list', 'saved_contracts.contract', 'saved_contracts.created_at', 'saved_contracts.updated_at', 'contracts.id', 'addresses.id', 'property_conditions.id')
                .orderBy('contracts.created_at', 'desc')
        ]);
        const totalCount = +countResult.count;
        return {
            totalCount,
            data: await this.formatData(list),
        };
    }
    async formatData(data) {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            const contract = data[i];
            let formated = {};
            if (!contract.unlocked) {
                const image = !contract.images.length ?
                    null :
                    await this.filesRepo.getByName(contract.images[0]);
                let ref = null;
                if (image) {
                    ref = await (0, images_1.getBluredImage)(image.name, image.user);
                }
                const address = this.changeLocation(contract.address);
                formated = {
                    id: contract.id,
                    expire_at: contract.expire_at,
                    areas: (0, array_1.getAsArray)(contract.areas),
                    images: (0, array_1.getAsArray)(ref),
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
                };
            }
            else
                formated = { ...contract, areas: (0, array_1.getAsArray)(contract.areas), unlocked: true };
            list.push(formated);
        }
        return list;
    }
    changeLocation(address) {
        const { latOffset, lngOffset } = this.getRandomOffset(200);
        let formattedAddress = {
            lat: address.lat = +address.lat + latOffset,
            lng: address.lng = +address.lng + lngOffset,
            country: address.country,
            city: address.city,
            state: address.state,
            street: address.street
        };
        return formattedAddress;
    }
};
exports.SavedContractsRepository = SavedContractsRepository;
exports.SavedContractsRepository = SavedContractsRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], SavedContractsRepository);
//# sourceMappingURL=saved.contracts.repository.js.map
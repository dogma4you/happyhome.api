"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersRepository = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../constants/enum");
const offer_model_1 = require("../models/offer.model");
const user_model_1 = require("../models/user.model");
const jwt_1 = require("@nestjs/jwt");
let OffersRepository = class OffersRepository {
    constructor() {
        this.jwtService = new jwt_1.JwtService();
    }
    get userModel() {
        return user_model_1.User.query();
    }
    get model() {
        return offer_model_1.Offer.query();
    }
    async create(data, address, propertyCondition, user) {
        const body = {
            ...data,
            address,
            user,
            exteriorType: JSON.stringify(data.exteriorType),
            images: JSON.stringify(data.images),
            property_condition: propertyCondition,
            status: enum_1.OfferStatusEnum.pending,
            isSentUploadLink: !!data.images.length
        };
        return this.model.insert(body);
    }
    async init(userId) {
        const offer = await this.model.insert({ user: userId });
        return offer;
    }
    async update(data, id, user, address, propertyCondition) {
        let updateBody = { ...data, user };
        if (address)
            updateBody.address = address;
        if (propertyCondition)
            updateBody.property_condition = propertyCondition;
        if (data.images)
            updateBody.images = JSON.stringify(data.images);
        if (data.files)
            updateBody.files = JSON.stringify(data.files);
        if (data.exteriorType)
            updateBody.exteriorType = JSON.stringify(data.exteriorType);
        return this.model.where({ id, user }).update(updateBody);
    }
    async updatePricing(data, id, user) {
        let updateBody = { ...data, user };
        return this.model.where({ id, user }).update(updateBody);
    }
    async cancel(id) {
        return this.model.where({ id }).update({ status: enum_1.OfferStatusEnum.canceled });
    }
    async approve(id) {
        return this.model.where({ id }).update({ status: enum_1.OfferStatusEnum.approved });
    }
    async findById(id) {
        return this.model.where({ id }).first();
    }
    async submit(id) {
        return this.model.where({ id }).update({ status: enum_1.OfferStatusEnum.onApproval });
    }
    async getById(id) {
        let offer = await this.model
            .leftJoin('addresses', function () {
            this.on('offers.address', '=', 'addresses.id').andOnNotNull('offers.address');
        })
            .leftJoin('property_conditions', function () {
            this.on('offers.property_condition', '=', 'property_conditions.id').andOnNotNull('offers.property_condition');
        })
            .leftJoin('areas', 'offers.id', 'areas.offer')
            .where('offers.id', id)
            .orderBy('offers.created_at', 'desc')
            .select('offers.id', 'offers.user', 'offers.status', 'offers.sellerType', 'offers.address', 'offers.propertyType', 'offers.descriptionType', 'offers.builtYear', 'offers.heating', 'offers.airConditioning', 'offers.waterSupply', 'offers.sewer', 'offers.electricPanel', 'offers.lotSize', 'offers.currentHOA', 'offers.property_condition', 'offers.isSentUploadLink', 'offers.price', 'offers.estimated_lower_price', 'offers.estimated_higher_price', 'offers.estimated_date', 'offers.estimated_by', 'offers.images', 'offers.files', 'offers.created_at', 'offers.updated_at', offer_model_1.Offer.raw(`
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
          `), offer_model_1.Offer.raw(`
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
          `))
            .groupBy('offers.id', 'offers.user', 'offers.status', 'offers.sellerType', 'offers.address', 'offers.propertyType', 'offers.descriptionType', 'offers.builtYear', 'offers.heating', 'offers.airConditioning', 'offers.waterSupply', 'offers.sewer', 'offers.electricPanel', 'offers.lotSize', 'offers.currentHOA', 'offers.property_condition', 'offers.isSentUploadLink', 'offers.price', 'offers.estimated_lower_price', 'offers.estimated_higher_price', 'offers.estimated_date', 'offers.estimated_by', 'offers.images', 'offers.files', 'offers.created_at', 'offers.updated_at', 'addresses.id', 'property_conditions.id')
            .first();
        if (offer) {
            const user = await this.userModel.findById(offer.user);
            const payload = { id: user.id, type: user.type };
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d'
            });
            const uploadUrl = `https://happyhomeinitiative.com/upload-latter?token=${token}&offerview=UPLOAD_IMAGES`;
            offer.user = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone
            };
            offer['uploadUrl'] = uploadUrl;
        }
        return offer;
    }
    async getAdminOffers(filter) {
        const offset = (+filter.page - 1) * +filter.limit;
        const [countResult, data] = await Promise.all([
            this.model
                .clone()
                .count('*')
                .leftJoin('users', function () {
                this.on('offers.user', '=', 'users.id')
                    .andOnNotNull('offers.user');
            })
                .modify(queryBuilder => {
                if (filter.lotSizeMin) {
                    if (filter.lotSizeMax)
                        queryBuilder.whereBetween('offers.bedrooms', [filter.lotSizeMin, filter.lotSizeMax]);
                    else
                        queryBuilder.where('bathrooms', '>', filter.lotSizeMin);
                }
                if (filter.lotSizeMax && !filter.lotSizeMin) {
                    queryBuilder.where('bathrooms', '<', filter.lotSizeMax);
                }
                filter.status && queryBuilder.where("status", filter.status);
                filter.sellerType && queryBuilder.where('sellerType', filter.sellerType);
                filter.propertyType && queryBuilder.where('propertyType', filter.propertyType);
                filter.descriptionType && queryBuilder.where('descriptionType', filter.descriptionType);
                if (filter.search) {
                    queryBuilder
                        .where('users.first_name', 'ILIKE', `%${filter.search}%`)
                        .orWhere('users.last_name', 'ILIKE', `%${filter.search}%`);
                }
            }),
            this.model
                .leftJoin('addresses', function () {
                this.on('offers.address', '=', 'addresses.id')
                    .andOnNotNull('offers.address');
            })
                .leftJoin('property_conditions', function () {
                this.on('offers.property_condition', '=', 'property_conditions.id')
                    .andOnNotNull('offers.property_condition');
            })
                .leftJoin('areas', 'offers.id', 'areas.offer')
                .leftJoin('users', function () {
                this.on('offers.user', '=', 'users.id')
                    .andOnNotNull('offers.user');
            })
                .modify(queryBuilder => {
                if (filter.lotSizeMin) {
                    if (filter.lotSizeMax)
                        queryBuilder.whereBetween('offers.bedrooms', [filter.lotSizeMin, filter.lotSizeMax]);
                    else
                        queryBuilder.where('bathrooms', '>', filter.lotSizeMin);
                }
                if (filter.lotSizeMax && !filter.lotSizeMin) {
                    queryBuilder.where('bathrooms', '<', filter.lotSizeMax);
                }
                filter.status && queryBuilder.where("status", filter.status);
                filter.sellerType && queryBuilder.where('sellerType', filter.sellerType);
                filter.propertyType && queryBuilder.where('propertyType', filter.propertyType);
                filter.descriptionType && queryBuilder.where('descriptionType', filter.descriptionType);
                if (filter.search) {
                    queryBuilder
                        .where('users.first_name', 'ILIKE', `%${filter.search}%`)
                        .orWhere('users.last_name', 'ILIKE', `%${filter.search}%`);
                }
            })
                .orderBy('offers.created_at', 'desc')
                .select('offers.id', 'offers.user', 'offers.status', 'offers.sellerType', 'offers.address', 'offers.propertyType', 'offers.descriptionType', 'offers.builtYear', 'offers.heating', 'offers.airConditioning', 'offers.waterSupply', 'offers.sewer', 'offers.electricPanel', 'offers.lotSize', 'offers.currentHOA', 'offers.property_condition', 'offers.isSentUploadLink', 'offers.price', 'offers.images', 'offers.files', 'offers.estimated_lower_price', 'offers.estimated_higher_price', 'offers.estimated_date', 'offers.estimated_by', 'offers.created_at', 'offers.updated_at', offer_model_1.Offer.raw(`
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
            `), offer_model_1.Offer.raw(`
              jsonb_build_object(
                'id', users.id,
                'first_name', users.first_name,
                'last_name', users.last_name,
                'email', users.email,
                'type', users.type
              ) as user
            `), offer_model_1.Offer.raw(`
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
            `))
                .groupBy('offers.id', 'offers.user', 'offers.status', 'offers.sellerType', 'offers.address', 'offers.propertyType', 'offers.descriptionType', 'offers.builtYear', 'offers.heating', 'offers.airConditioning', 'offers.waterSupply', 'offers.sewer', 'offers.electricPanel', 'offers.lotSize', 'offers.currentHOA', 'offers.property_condition', 'offers.isSentUploadLink', 'offers.price', 'offers.estimated_lower_price', 'offers.estimated_higher_price', 'offers.estimated_date', 'offers.estimated_by', 'offers.images', 'offers.files', 'offers.created_at', 'offers.updated_at', 'addresses.id', 'property_conditions.id', 'users.id')
                .orderBy('offers.created_at', 'desc')
                .offset(offset)
                .limit(+filter.limit)
        ]);
        const totalCount = +countResult[0]['count'];
        return {
            totalCount,
            data,
        };
    }
    async getUsersOffers(userId) {
        const [list, count] = await Promise.all([
            this.model
                .leftJoin('addresses', function () {
                this.on('offers.address', '=', 'addresses.id').andOnNotNull('offers.address');
            })
                .leftJoin('property_conditions', function () {
                this.on('offers.property_condition', '=', 'property_conditions.id').andOnNotNull('offers.property_condition');
            })
                .leftJoin('areas', 'offers.id', 'areas.offer')
                .where('offers.user', userId)
                .groupBy('offers.id', 'addresses.id', 'property_conditions.id')
                .select('offers.id', 'offers.user', 'offers.status', 'offers.sellerType', 'offers.address', 'offers.propertyType', 'offers.descriptionType', 'offers.builtYear', 'offers.heating', 'offers.airConditioning', 'offers.waterSupply', 'offers.sewer', 'offers.electricPanel', 'offers.lotSize', 'offers.currentHOA', 'offers.isSentUploadLink', 'offers.price', 'offers.images', 'offers.files', 'offers.exteriorType', 'offers.estimated_lower_price', 'offers.estimated_higher_price', 'offers.estimated_date', 'offers.estimated_by', 'offers.created_at', 'offers.updated_at', offer_model_1.Offer.raw(`
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
          `), offer_model_1.Offer.raw(`
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
            `), offer_model_1.Offer.raw(`
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
            `)),
            this.model
                .where({ user: userId })
                .clone()
                .count('*')
        ]);
        const totalCount = +count[0]['count'];
        return {
            totalCount,
            data: list,
        };
    }
    async getOffer(userId) {
        const offer = await this.model
            .leftJoin('addresses', function () {
            this.on('offers.address', '=', 'addresses.id').andOnNotNull('offers.address');
        })
            .leftJoin('property_conditions', function () {
            this.on('offers.property_condition', '=', 'property_conditions.id').andOnNotNull('offers.property_condition');
        })
            .leftJoin('areas', 'offers.id', 'areas.offer')
            .where('offers.user', userId)
            .select('offers.id', 'offers.user', 'offers.status', 'offers.sellerType', 'offers.address', 'offers.propertyType', 'offers.descriptionType', 'offers.builtYear', 'offers.heating', 'offers.airConditioning', 'offers.waterSupply', 'offers.sewer', 'offers.electricPanel', 'offers.lotSize', 'offers.currentHOA', 'offers.isSentUploadLink', 'offers.price', 'offers.images', 'offers.files', 'offers.exteriorType', 'offers.estimated_lower_price', 'offers.estimated_higher_price', 'offers.estimated_date', 'offers.estimated_by', 'offers.created_at', 'offers.updated_at', offer_model_1.Offer.raw(`
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
          `), offer_model_1.Offer.raw(`
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
          `))
            .orderBy('created_at', 'desc')
            .first();
        if (!offer || [enum_1.OfferStatusEnum.onApproval, enum_1.OfferStatusEnum.approved].includes(offer.status)) {
            return await this.init(userId);
        }
        else {
            const areas = await this.model
                .table('areas')
                .where('areas.offer', offer.id)
                .select('areas.id', 'areas.bedrooms', 'areas.bathrooms', 'areas.square_feet');
            offer.areas = areas;
            return offer;
        }
    }
    async getPayedOffers(user) {
        return this.model
            .leftJoin('addresses', 'offers.address', 'addresses.id')
            .leftJoin('property_conditions', 'offers.property_condition', 'property_conditions.id')
            .leftJoin('payed_offers', function () {
            this.on('offers.id', '=', 'payed_offers.offer')
                .andOn('payed_offers.user', '=', `${user}`);
        })
            .where('offers.user', user)
            .select('offers.*', offer_model_1.Offer.raw(`
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
          `), offer_model_1.Offer.raw(`
            jsonb_build_object(
              'id', property_conditions.id,
              'condition', property_conditions.condition
            ) as property_condition
          `), offer_model_1.Offer.raw('CASE WHEN payed_offers.id IS NULL THEN FALSE ELSE TRUE END as payed'))
            .orderBy('offers.created_at', 'desc');
    }
};
exports.OffersRepository = OffersRepository;
exports.OffersRepository = OffersRepository = __decorate([
    (0, common_1.Injectable)()
], OffersRepository);
//# sourceMappingURL=offers.repository.js.map
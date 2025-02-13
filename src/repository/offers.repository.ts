import { Injectable } from "@nestjs/common";
import { CreateOfferDto } from "src/appDto/offer.dto";
import { OfferStatusEnum } from "src/constants/enum";
import { Offer } from "src/models/offer.model";
import { User } from "src/models/user.model";
import { AdminGetOffersDto } from "src/appDto/admin.dto";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class OffersRepository {

    private jwtService = new JwtService();
    private get userModel() {
      return User.query();
    }

    private get model() {
        return Offer.query()
    }

    public async create(data: CreateOfferDto, address: number, propertyCondition: number, user: number) {
        const body: any = {
            ...data,
            address, 
            user,
            exteriorType: JSON.stringify(data.exteriorType),
            images: JSON.stringify(data.images),
            property_condition: propertyCondition,
            status: OfferStatusEnum.pending,
            isSentUploadLink: !!data.images.length
        }
        return this.model.insert(body)
    }

    public async init(userId: number) {
        const offer = await this.model.insert({ user: userId })
        return offer
    }

    public async update(data: CreateOfferDto, id: number, user: number, address?: number, propertyCondition?: number) {
        let updateBody: any = {...data, user}

        Object.keys(data).forEach((key) => {
            if (data[key] === null || data[key] === "") delete updateBody[key]
        })

        if (address) updateBody.address = address
        if (propertyCondition) updateBody.property_condition = propertyCondition
        if (data.images) updateBody.images = JSON.stringify(data.images);
        if (data.files) updateBody.files = JSON.stringify(data.files);
        if (data.exteriorType) updateBody.exteriorType = JSON.stringify(data.exteriorType);
        return this.model.where({ id, user }).update(updateBody)
    }

    public async updatePricing(data: object, id: number, user: number) {
      let updateBody: any = {...data, user}
      return this.model.where({ id, user }).update(updateBody)
  }

  public async cancel(id: number) {
    return this.model.where({ id }).update({ status: OfferStatusEnum.canceled });
  }

  public async approve(id: number) {
    return this.model.where({ id }).update({ status: OfferStatusEnum.approved });
  }

  public async findById(id: number) {
    return this.model.where({ id }).first()
  }

  public async submit(id: number) {
    return this.model.where({ id }).update({ status: OfferStatusEnum.onApproval });
  } 

  public async getById(id: number) {
      let offer: any = await this.model
        .leftJoin('addresses', function() {
          this.on('offers.address', '=', 'addresses.id').andOnNotNull('offers.address');
        })
        .leftJoin('property_conditions', function() {
          this.on('offers.property_condition', '=', 'property_conditions.id').andOnNotNull('offers.property_condition');
        })
        .leftJoin('areas', 'offers.id', 'areas.offer')
        .where('offers.id', id)
        .orderBy('offers.created_at', 'desc')
        .select(
          'offers.id',
          'offers.user',
          'offers.status',
          'offers.sellerType',
          'offers.address',
          'offers.propertyType',
          'offers.descriptionType',
          'offers.builtYear',
          'offers.heating',
          'offers.airConditioning',
          'offers.waterSupply',
          'offers.sewer',
          'offers.electricPanel',
          'offers.lotSize',
          'offers.currentHOA',
          'offers.property_condition',
          'offers.isSentUploadLink',
          'offers.price',
          'offers.estimated_lower_price',
          'offers.estimated_higher_price',
          'offers.estimated_date',
          'offers.estimated_by',
          'offers.images',
          'offers.files',
          'offers.created_at',
          'offers.updated_at',
          Offer.raw(`
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
          Offer.raw(`
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
          'offers.id',
          'offers.user',
          'offers.status',
          'offers.sellerType',
          'offers.address',
          'offers.propertyType',
          'offers.descriptionType',
          'offers.builtYear',
          'offers.heating',
          'offers.airConditioning',
          'offers.waterSupply',
          'offers.sewer',
          'offers.electricPanel',
          'offers.lotSize',
          'offers.currentHOA',
          'offers.property_condition',
          'offers.isSentUploadLink',
          'offers.price',
          'offers.estimated_lower_price',
          'offers.estimated_higher_price',
          'offers.estimated_date',
          'offers.estimated_by',
          'offers.images',
          'offers.files',
          'offers.created_at',
          'offers.updated_at',
          'addresses.id',
          'property_conditions.id'
        )
        .first();

        if (offer) {
          const user = await this.userModel.findById(offer.user);
          const payload = { id: user.id, type: user.type }
          const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d'
          });
          const uploadUrl = `https://happyhomeinitiative.com/upload-latter?token=${token}&offerview=UPLOAD_IMAGES`
          offer.user = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone
          }
          offer['uploadUrl'] = uploadUrl;
        }

        return offer
    }

    public async getAdminOffers(filter: AdminGetOffersDto) {
      const offset = (+filter.page - 1) * +filter.limit;

      const [countResult, data] = await Promise.all([
        this.model
            .clone()
            .count('*')
            .leftJoin('users', function() {
              this.on('offers.user', '=', 'users.id')
                .andOnNotNull('offers.user')
            })
            .modify(queryBuilder => {
              if (filter.lotSizeMin) {
                if (filter.lotSizeMax) queryBuilder.whereBetween('offers.bedrooms', [filter.lotSizeMin, filter.lotSizeMax]);
                else queryBuilder.where('bathrooms', '>', filter.lotSizeMin);
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
                .orWhere('users.last_name', 'ILIKE', `%${filter.search}%`)
                // .orWhere('users.email', 'ILIKE', `%${filter.search}%`);
              }
  
            }),

        this.model
        .leftJoin('addresses', function() {
          this.on('offers.address', '=', 'addresses.id')
              .andOnNotNull('offers.address');
        })
        .leftJoin('property_conditions', function() {
          this.on('offers.property_condition', '=', 'property_conditions.id')
            .andOnNotNull('offers.property_condition')
        })
        .leftJoin('areas', 'offers.id', 'areas.offer')
        .leftJoin('users', function() {
          this.on('offers.user', '=', 'users.id')
            .andOnNotNull('offers.user')
        })
          .modify(queryBuilder => {
            if (filter.lotSizeMin) {
              if (filter.lotSizeMax) queryBuilder.whereBetween('offers.bedrooms', [filter.lotSizeMin, filter.lotSizeMax]);
              else queryBuilder.where('bathrooms', '>', filter.lotSizeMin);
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
              .orWhere('users.last_name', 'ILIKE', `%${filter.search}%`)
              // .orWhere('users.email', 'ILIKE', `%${filter.search}%`);
            }



          })
          .orderBy('offers.created_at', 'desc')
          .select(
            'offers.id',
            'offers.user',
            'offers.status',
            'offers.sellerType',
            'offers.address',
            'offers.propertyType',
            'offers.descriptionType',
            'offers.builtYear',
            'offers.heating',
            'offers.airConditioning',
            'offers.waterSupply',
            'offers.sewer',
            'offers.electricPanel',
            'offers.lotSize',
            'offers.currentHOA',
            'offers.property_condition',
            'offers.isSentUploadLink',
            'offers.price',
            'offers.images',
            'offers.files',
            'offers.estimated_lower_price',
            'offers.estimated_higher_price',
            'offers.estimated_date',
            'offers.estimated_by',
            'offers.created_at',
            'offers.updated_at',
            Offer.raw(`
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
            Offer.raw(`
              jsonb_build_object(
                'id', users.id,
                'first_name', users.first_name,
                'last_name', users.last_name,
                'email', users.email,
                'type', users.type
              ) as user
            `),
            Offer.raw(`
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
            'offers.id',
            'offers.user',
            'offers.status',
            'offers.sellerType',
            'offers.address',
            'offers.propertyType',
            'offers.descriptionType',
            'offers.builtYear',
            'offers.heating',
            'offers.airConditioning',
            'offers.waterSupply',
            'offers.sewer',
            'offers.electricPanel',
            'offers.lotSize',
            'offers.currentHOA',
            'offers.property_condition',
            'offers.isSentUploadLink',
            'offers.price',
            'offers.estimated_lower_price',
            'offers.estimated_higher_price',
            'offers.estimated_date',
            'offers.estimated_by',
            'offers.images',
            'offers.files',
            'offers.created_at',
            'offers.updated_at',
            'addresses.id',
            'property_conditions.id',
            'users.id'
          )
            .orderBy('offers.created_at', 'desc')
            .offset(offset)
            .limit(+filter.limit)
      ]);

      const totalCount = +countResult[0]['count'];
      // const formattedData = await Promise.all(data.map(async (item: any) => {
      //   const payload = { id: item.user.id, type: item.user.type }
      //   const token = await this.jwtService.signAsync(payload, {
      //     secret: process.env.JWT_SECRET,
      //     expiresIn: '1d'
      //   });
      //   return {
      //     ...item,
      //     uploadUrl: `https://happyhomeinitiative.com/upload-latter?token=${token}&offerview=UPLOAD_IMAGES`
      //   }
      // }))
      return {
        totalCount,
        data,
      };
    }

    public async getUsersOffers(userId: number) {
        const [list, count] = await Promise.all([
          this.model
          .leftJoin('addresses', function() {
            this.on('offers.address', '=', 'addresses.id').andOnNotNull('offers.address');
          })
          .leftJoin('property_conditions', function() {
            this.on('offers.property_condition', '=', 'property_conditions.id').andOnNotNull('offers.property_condition');
          })
          .leftJoin('areas', 'offers.id', 'areas.offer')
          .where('offers.user', userId)
          .groupBy(
            'offers.id',
            'addresses.id',
            'property_conditions.id'
          )
          .select(
            'offers.id',
            'offers.user',
            'offers.status',
            'offers.sellerType',
            'offers.address',
            'offers.propertyType',
            'offers.descriptionType',
            'offers.builtYear',
            'offers.heating',
            'offers.airConditioning',
            'offers.waterSupply',
            'offers.sewer',
            'offers.electricPanel',
            'offers.lotSize',
            'offers.currentHOA',
            'offers.isSentUploadLink',
            'offers.price',
            'offers.images',
            'offers.files',
            'offers.exteriorType', 
            'offers.estimated_lower_price',
            'offers.estimated_higher_price',
            'offers.estimated_date',
            'offers.estimated_by',
            'offers.created_at',
            'offers.updated_at',
            Offer.raw(`
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
            Offer.raw(`
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
            Offer.raw(`
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
          ),
          this.model
          .where({ user :userId })
          .clone()
          .count('*')
          ])

          const totalCount = +count[0]['count'];
          return {
            totalCount,
            data: list,
          };
    } 
    
    public async getOffer(userId: number) {
      const offer: any = await this.model
        .leftJoin('addresses', function() {
          this.on('offers.address', '=', 'addresses.id').andOnNotNull('offers.address');
        })
        .leftJoin('property_conditions', function() {
          this.on('offers.property_condition', '=', 'property_conditions.id').andOnNotNull('offers.property_condition');
        })
        .leftJoin('areas', 'offers.id', 'areas.offer')
        .where('offers.user', userId)
        .select(
          'offers.id',
          'offers.user',
          'offers.status',
          'offers.sellerType',
          'offers.address',
          'offers.propertyType',
          'offers.descriptionType',
          'offers.builtYear',
          'offers.heating',
          'offers.airConditioning',
          'offers.waterSupply',
          'offers.sewer',
          'offers.electricPanel',
          'offers.lotSize',
          'offers.currentHOA',
          'offers.isSentUploadLink',
          'offers.price',
          'offers.images',
          'offers.files',
          'offers.exteriorType', 
          'offers.estimated_lower_price',
          'offers.estimated_higher_price',
          'offers.estimated_date',
          'offers.estimated_by',
          'offers.created_at',
          'offers.updated_at',
          Offer.raw(`
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
          Offer.raw(`
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
        .orderBy('created_at', 'desc')
        .first();
      if (!offer || [OfferStatusEnum.onApproval, OfferStatusEnum.approved].includes(offer.status)) {
        return await this.init(userId);
      } else {
        const areas = await this.model
          .table('areas')
          .where('areas.offer', offer.id)
          .select(
            'areas.id',
            'areas.bedrooms',
            'areas.bathrooms',
            'areas.square_feet'
          );
        offer.areas = areas;
        return offer;
      }
    }
    
    
    
    

    public async getPayedOffers(user: number) {
        return this.model
        .leftJoin('addresses', 'offers.address', 'addresses.id')
        .leftJoin('property_conditions', 'offers.property_condition', 'property_conditions.id')
        .leftJoin('payed_offers', function () {
          this.on('offers.id', '=', 'payed_offers.offer')
          .andOn('payed_offers.user', '=', `${user}`);
        })
        .where('offers.user', user)
        .select(
          'offers.*',
          Offer.raw(`
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
          Offer.raw(`
            jsonb_build_object(
              'id', property_conditions.id,
              'condition', property_conditions.condition
            ) as property_condition
          `),
          Offer.raw('CASE WHEN payed_offers.id IS NULL THEN FALSE ELSE TRUE END as payed')
        )
        .orderBy('offers.created_at', 'desc');
    }
}
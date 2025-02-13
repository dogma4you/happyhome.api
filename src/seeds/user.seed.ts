import type { Knex } from "knex";
import { ExteriorTypeEnum, HOATypeEnum, OfferParamsStatusEnum, OfferStatusEnum, ProofOfFoundsStatusEnum, PropertyDescriptionTypeEnum, PropertyTypeEnum, SellerTypeEnum, SettingsModeTypeEnum, TransactionsStatusEnum, TransactionsTypeEnum, UserActivityTypeEnum, UserTypeEnum } from '../constants/enum';
import { HashService } from '../services/hash.service';
import { OfferService } from "../modules/offer/service";
import { generateTranssactionId } from "src/utils/uuid";


export async function seed(knex: Knex): Promise<void> {
  const userTableName = 'users';
  const hashService = new HashService();
  const run = true // process.env.SEED_MOCK_DATA
  if (run) {
    const users = await knex(userTableName).insert([
        {
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: 'user1@gmail.com',
            first_name: 'John Doe',
            last_name: 'John Doe',
            phone: '+1-888-88-8888',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        },
        {
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: 'maxim@gmail.com',
            first_name: 'Max Smith',
            last_name: 'Max Smith',
            phone: '+1-888-88-8888',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        },
        {
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: 'eminem@gmail.com',
            first_name: 'Eminem',
            last_name: 'Eminem',
            phone: '+1-888-88-8888',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        },
        {
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: 'crazy_dog@gmail.com',
            first_name: 'Snoop Dogg',
            last_name: 'Snoop Dogg',
            phone: '+1-888-88-8888',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        },
        {
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: 'anna897@gmail.com',
            first_name: 'Anna Smith',
            last_name: 'Anna Smith',
            phone: '+1-888-88-8888',
            email_verified_at: new Date(),
            registration_date: new Date(),
            password: await hashService.hash('Password1/')
        },
      ]).returning('id');
      console.log('SEED', 'Users created successful...')
      console.log('SEED', 'User settings setup started...')
      const settingsTableName = 'user_settings';
      await knex(settingsTableName).insert(users.map(user => ({
        user: user.id,
        mode: SettingsModeTypeEnum.light,
        push_notifications: true
      })))
      
      console.log('SEED', 'User settings setup finished...')


      console.log('SEED', 'Offers generation setup started...')

      const offer = {
        sellerType: SellerTypeEnum.homeowner,
        address: {
            country: 'usa',
            city: 'Glendale',
            state: 'California',
            postal_code: '10365',
            lat: 45.012121,
            lng: 31.25458
        },
        propertyType: PropertyTypeEnum.home,
        descriptionType: PropertyDescriptionTypeEnum.townhouse,
        builtYear: new Date(),
        // squareFeet: 125,
        // bedrooms: 4,
        // bathrooms: 2,
        heating: OfferParamsStatusEnum.required,
        airConditioning: OfferParamsStatusEnum.required,
        waterSupply: OfferParamsStatusEnum.required,
        sewer: OfferParamsStatusEnum.notImportant,
        electricPanel: OfferParamsStatusEnum.nodRequired,
        exteriorType: [ExteriorTypeEnum.aluminum, ExteriorTypeEnum.other],
        lotSize: 125,
        currentHOA: HOATypeEnum.annual,
        images: [],
        files: [],
        property_condition: {
            roof_and_gutters: 1,
            hvac: 4,
            plumbing_and_gas: 8,
            electrical: 9,
            kitchen: 9,
            bathrooms: 8,
            windows: 9,
            doors: 7,
            water_heater: 0,
            foundation: 7,
            framing: 7,
            dry_wall_and_paint: 5,
            flooring: 5,
            washer_and_dryer: 5,
            siding_and_exterior_trim: 6,
            patio_and_shed: 5,
            landscaping: 1,
            optional_features: 5,
        }
    
    }
      const addressTableName = 'addresses';
      const propertyConditionsTable = 'property_conditions'   
      const offersTable = 'offers'   
      const transactionsTableName = 'transactions'
      const proofsTableName = 'proof_of_founds'
      const balanceTableName = 'balances'
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const location = `SRID=4326;POINT(${offer.address.lng} ${offer.address.lat})`
        const [address, propertyCondition] = await Promise.all([
            knex(addressTableName).insert({ ...offer.address, location, user: user.id }).returning('id'),
            knex(propertyConditionsTable).insert(offer.property_condition).returning('id')
        ])
        const body: any = {
            ...offer,
            address: address[0].id, 
            user: user.id,
            exteriorType: JSON.stringify(offer.exteriorType),
            images: JSON.stringify(offer.images),
            files: JSON.stringify(offer.files),
            property_condition: propertyCondition[0].id,
            status: OfferStatusEnum.pending,
            isSentUploadLink: !!offer.images.length
        }
        await knex(offersTable).insert(body)

        await knex(transactionsTableName).insert({
            user: user.id,
            transactionId:`TR-3415${i}`,
            status: TransactionsStatusEnum.pending,
            type: i % 2 === 0 ? TransactionsTypeEnum.balanceFill : TransactionsTypeEnum.creditsFill,
            price: i % 2 === 0 ? 499 : 1499
        })
        await knex(proofsTableName).insert({
          status: ProofOfFoundsStatusEnum.pending,
          files: JSON.stringify([]),
          user: user.id
        })

        await knex(balanceTableName).insert({
          user: user.id,
          balance: 0,
          credits: 0
        })
      }
      const paymentMethodsTable = 'payment_methods'
      await knex(paymentMethodsTable).insert({
        name: 'Authorize.net',
        status: 1
      })

      console.log('SEED', 'Offers created for all users...')  

      console.log('SEED ','Mock data seed finished successful...');
  }
  
}
import { Injectable } from "@nestjs/common";
import { CreateAddressDto } from "src/appDto/address.dto";
import { Address } from "src/models/address.model";
import { generateLocatonRowByCordinates } from "src/utils/generator";

@Injectable()
export class AddressRepository {

    private get model() {
        return Address.query()
    }

    public async create(data: CreateAddressDto, user: number) {
        const location = generateLocatonRowByCordinates(data.lat, data.lng);
        return this.model.insert({ ...data, location, user })
    }

    public async getOne(filter: object) {
        return this.model.select('*').where(filter).first();
    }

    public async update(id: number, data: object) {
        return this.model.where({ id }).update(data).returning('*');
    }

    public async getByLocationRadius(filter: object, lat: number, lng: number, radius: number, page: number, limit: number): Promise<Address[]> {
        const offset = (page - 1) * limit 
        return this.model
            .select('*')
            .where(filter)
            .whereRaw(
            `ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`,
            [lng, lat, radius],
            )
            .limit(limit)
            .offset(offset);
    }

    public async getByMapArea(
        northLat: number,
        northLng: number,
        southLat: number,
        southLng: number,
        eastLat: number,
        eastLng: number,
        westLat: number,
        westLng: number
      ) {
        // Dynamically construct the WKT POLYGON string
        const polygonWKT = `
          POLYGON((
            ${westLng} ${northLat},
            ${eastLng} ${northLat},
            ${eastLng} ${southLat},
            ${westLng} ${southLat},
            ${westLng} ${northLat}
          ))
        `.trim();
        return this.model
          .select('*')
          .whereRaw(
            `ST_Within(
              addresses.location::geometry,
              ST_GeomFromText(?, 4326)
            )`,
            [polygonWKT]
          );
      }
      
      
      

}
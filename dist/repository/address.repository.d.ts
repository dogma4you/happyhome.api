import { CreateAddressDto } from "src/appDto/address.dto";
import { Address } from "src/models/address.model";
export declare class AddressRepository {
    private get model();
    create(data: CreateAddressDto, user: number): Promise<Address>;
    getOne(filter: object): Promise<Address>;
    update(id: number, data: object): Promise<Address[]>;
    getByLocationRadius(filter: object, lat: number, lng: number, radius: number, page: number, limit: number): Promise<Address[]>;
    getByMapArea(northLat: number, northLng: number, southLat: number, southLng: number, eastLat: number, eastLng: number, westLat: number, westLng: number): Promise<Address[]>;
}

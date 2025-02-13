import { CreatePropertyConditionsDto } from "src/appDto/offer.dto";
import { PropertyConditions } from "src/models/property_conditions";
export declare class PropertyConditionsRepository {
    private get model();
    create(data: CreatePropertyConditionsDto): Promise<PropertyConditions>;
    getById(id: number): Promise<PropertyConditions>;
    update(id: number, data: object): Promise<number>;
}

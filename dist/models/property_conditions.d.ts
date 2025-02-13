import { Model } from "objection";
export declare class PropertyConditions extends Model {
    static tableName: string;
    id?: number;
    roof_and_gutters: number;
    hvac: number;
    plumbing_and_gas: number;
    electrical: number;
    kitchen: number;
    bathrooms: number;
    windows: number;
    doors: number;
    water_heater: number;
    foundation: number;
    framing: number;
    dry_wall_and_paint: number;
    flooring: number;
    washer_and_dryer: number;
    siding_and_exterior_trim: number;
    patio_and_shed: number;
    landscaping: number;
    optional_features: number;
    created_at?: Date;
    updated_at?: Date;
}

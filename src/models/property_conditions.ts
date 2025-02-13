import { Model } from "objection"
import { snakeCaseMappers } from 'objection';

export class PropertyConditions extends Model {
    public static tableName: string = 'property_conditions';

    public id?: number
    public roof_and_gutters: number
    public hvac: number
    public plumbing_and_gas: number
    public electrical: number
    public kitchen: number
    public bathrooms: number
    public windows: number
    public doors: number
    public water_heater: number
    public foundation: number
    public framing: number
    public dry_wall_and_paint: number
    public flooring: number
    public washer_and_dryer: number
    public siding_and_exterior_trim: number
    public patio_and_shed: number
    public landscaping: number
    public optional_features: number
    public created_at?: Date
    public updated_at?: Date
}

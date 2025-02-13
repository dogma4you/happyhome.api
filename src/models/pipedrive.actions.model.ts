import { Model } from "objection"

export class PipedriveActions extends Model {
    public static tableName: string = 'pipedrive_actions'

    public id?: number
    public user: number
    public offer: number;
    public contract: number;
    public deal: number;
    public person: number;
    public created_at: Date
    public updated_at: Date
}
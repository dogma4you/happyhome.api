import { Model } from "objection"

export class SavedContracts extends Model {
    public static tableName: string = 'saved_contracts'

    public id?: number
    public user: number
    public saved_list: number
    public contract: number
    public created_at: Date
    public updated_at?: Date
  count: any
}
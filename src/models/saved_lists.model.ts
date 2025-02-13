import { Model } from "objection"

export class SavedLists extends Model {
    public static tableName: string = 'saved_lists'

    public id?: number
    public user: number
    public created_at: Date
    public updated_at?: Date
}
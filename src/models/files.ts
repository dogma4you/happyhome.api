import { Model } from "objection";
import { FileTypeEnum } from "src/constants/enum";

export class Files extends Model {
    public static tableName: string = 'files';

    public id?: number
    public user: number
    public belongs: number
    public originalName: string
    public name: string
    public type: FileTypeEnum
    public isPrimary: boolean
    public size: number
    public ext: string
    public created_at?: Date
    public updated_at?: Date
}
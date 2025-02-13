import { Model } from "objection";
import { FileTypeEnum } from "src/constants/enum";
export declare class Files extends Model {
    static tableName: string;
    id?: number;
    user: number;
    belongs: number;
    originalName: string;
    name: string;
    type: FileTypeEnum;
    isPrimary: boolean;
    size: number;
    ext: string;
    created_at?: Date;
    updated_at?: Date;
}

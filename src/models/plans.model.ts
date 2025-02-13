import { Model } from "objection";

export class Plans extends Model {
    public static tableName: string = 'plans'

    public id: number;

    public title: string;
    public description: string;
    public discount: number;
    public credits: number;
    public price: number;
    public published: number;

    public created_at: Date;
    public updated_at: Date;
}
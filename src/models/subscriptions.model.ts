import { Model } from "objection";

export class Subscriptions extends Model {
  public static tableName: string = 'subsctiptions';

  public id: number;
  public email: string;
  public subscription_to: string;
  public created_at: Date;
  public updated_at: Date;
}
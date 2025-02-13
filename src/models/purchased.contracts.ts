import { Model } from "objection";

export class PurchasedContracts extends Model {

  public static tableName: string = 'purchased_contracts';

  public id: number;
  public user: number;
  public contract: number;
  public price: number;
  public created_at: Date;
  public updated_at: Date;
}
import { Model } from "objection"
import { ProofOfFoundsStatusEnum } from "src/constants/enum"

export class ProofOfFounds extends Model {
    public static tableName: string = 'proof_of_founds'

    public id?: number
    public user: number
    public files: string[] | any
    public status: ProofOfFoundsStatusEnum;
    public expire_at: Date
    public created_at?: Date
    public updated_at?: Date
}
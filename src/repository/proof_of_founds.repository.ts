import { Injectable } from "@nestjs/common";
import { ProofOfFoundsStatusEnum } from "src/constants/enum";
import { ProofOfFounds } from "src/models/proof_of_founds.model";

@Injectable()
export class ProofOfFoundsRepository {
    private get model() {
        return ProofOfFounds.query()
    }

    public async getUserProofs(user: number) {
        const proof = await this.model.where({ user }).first()
        if (proof) return proof
        else return await this.createUserProofs(user, []);
    }

    public async createUserProofs(user: number, files: string[]) {
        return this.model.insert({ user, files: JSON.stringify(files), status: ProofOfFoundsStatusEnum.pending }).returning('*')
    }

    public async updateUserProofs(id: number, files: string[]) {
        return this.model.where({ id }).update({ files: JSON.stringify(files), status: ProofOfFoundsStatusEnum.pending })
    }

    public async adminUpdateStatus(id: number, status: ProofOfFoundsStatusEnum) {
        return this.model.where({ id }).update({ status });
    }

    public async adminUpdate(id: number, data: object) {
        return this.model.where({ id }).update(data);
    }
}
import { Injectable } from "@nestjs/common";
import { PaymentMethods } from "src/models/payment_methods";

@Injectable()
export class PaymentMethodsRepository {
    private get model() {
        return PaymentMethods.query()
    }

    public async getList() {
        return this.model.where({})
    }

    public async getById(id: number) {
        return this.model.where({ id }).first()
    }

    public async updateStatus(id: number, status: number) {
        return this.model.where({ id }).update({ status })
    }
}
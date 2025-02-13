import { PaymentMethods } from "src/models/payment_methods";
export declare class PaymentMethodsRepository {
    private get model();
    getList(): Promise<PaymentMethods[]>;
    getById(id: number): Promise<PaymentMethods>;
    updateStatus(id: number, status: number): Promise<number>;
}

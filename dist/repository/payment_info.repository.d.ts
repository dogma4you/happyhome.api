import { AdminCreatePayemtnInfo } from "src/appDto/address.dto";
import { PaymentInfo } from "src/models/payment_info.model";
export declare class PaymentInfoRepository {
    private get model();
    create(data: AdminCreatePayemtnInfo): Promise<PaymentInfo>;
    update(id: number, data: AdminCreatePayemtnInfo): Promise<number>;
    delete(id: number): Promise<number>;
    getAll(): Promise<PaymentInfo[]>;
}

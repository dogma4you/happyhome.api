import { TransactionsStatusEnum } from "src/constants/enum";
export declare class CreateAddressDto {
    country: string;
    city: string;
    state: string;
    postal_code: string;
    lat: number;
    lng: number;
    street: string;
    formatted_address: string;
}
export declare class AdminCreatePayemtnInfo {
    recipient: string;
    bank_name: string;
    bank_address: string;
    routing_number: string;
    account_number: string;
    account_type: string;
}
export declare class AdminUpdateTransactionsStatusManualDto {
    status: TransactionsStatusEnum;
}

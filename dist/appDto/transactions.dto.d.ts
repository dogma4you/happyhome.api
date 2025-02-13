import { TransactionsTypeEnum } from "src/constants/enum";
export declare class CreateTransactionDto {
    transactionId: string;
    user: number;
    price: number;
    type: TransactionsTypeEnum;
}

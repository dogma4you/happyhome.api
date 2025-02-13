export declare class AuthorizeNetService {
    private apiLoginId;
    private apiKey;
    private isSandbox;
    createPaymentTransaction(amount: number): Promise<{
        url: string;
    }>;
    createPayemtnTransactionRender(amount: number, res: any, transactionId: string): Promise<void>;
}

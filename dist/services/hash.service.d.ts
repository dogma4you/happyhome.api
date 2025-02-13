export declare class HashService {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    compare(password: string, storedHash: string): Promise<boolean>;
    generate(): string;
}

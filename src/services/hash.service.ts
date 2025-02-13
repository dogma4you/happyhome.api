import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
    private readonly saltRounds = 10;

    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

    public async compare(password: string, storedHash: string): Promise<boolean> {
        return bcrypt.compareSync(password, storedHash);
    }

    public generate(): string {
        let result = '';
        const characters = '0123456789';
        const charactersLength = 8;
    
        for (let i = 0; i < charactersLength; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters[randomIndex];
        }
    
        return result;
    }
}
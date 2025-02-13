import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { User } from 'src/models/user.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    private jwtService;
    private userRepo;
    validate(payload: any): Promise<User | UnauthorizedException>;
    verifyJwt(token: string): Promise<User>;
    signJwt(payload: any): Promise<{
        token: string;
        refresh_token: string;
    }>;
    signSocialJwt(payload: any, expiresIn: string): Promise<{
        token: string;
        refresh_token: string;
    }>;
    calculateExpireDate(date: Date): string;
}
export {};

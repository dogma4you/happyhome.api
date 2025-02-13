import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const WsJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class WsJwtGuard extends WsJwtGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    handleRequest(err: any, user: any, info: any): any;
}
export {};

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class PasswordGuard implements CanActivate {
    private hashService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    private validatePassword;
}

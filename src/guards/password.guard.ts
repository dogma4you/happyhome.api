import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HashService } from 'src/services/hash.service';

@Injectable()
export class PasswordGuard implements CanActivate {
    @Inject()
    private hashService: HashService
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const password = request.body.passwordNew;

        if (!user || !user.password) {
            throw new BadRequestException(`${!user.password ? 'Guest cant have a password' : 'User not found'}`);
        }

        return this.validatePassword(user.password, request.body.password);
    }

    private async validatePassword(hash: string, password: string): Promise<boolean> {
        const isMatch = await this.hashService.compare(password, hash);
        if (!isMatch) {
            throw new BadRequestException('Invalid password');
        }
        return isMatch;
    }
}

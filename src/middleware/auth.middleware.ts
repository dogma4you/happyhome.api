import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { UserTypeEnum } from 'src/constants/enum';
import { User } from 'src/models/user.model';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class Authentication implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const userRepository = new UserRepository()
        return passport.authenticate('jwt', { session: false }, async (err, user: User, info) => {
            if (err || !user) {
                return res.status(401).json({ message: info?.message || 'Unauthorized' });
            }
            const ctx = await userRepository.getById(user.id);
            req[UserTypeEnum[user.type]] = ctx;
            next();
        })(req, res, next);
    }
}

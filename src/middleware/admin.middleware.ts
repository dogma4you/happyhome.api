import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UserTypeEnum } from 'src/constants/enum';
import { IRequest } from 'src/types/request';

@Injectable()
export class AdminAuthentication implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction) {
        const user = req.admin
        if (!user) throw new ForbiddenException('Permission denied.')
        if (+user.type !== UserTypeEnum.admin) throw new ForbiddenException('Permission denied.')
        next()
    }
}

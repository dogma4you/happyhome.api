import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IRequest } from 'src/types/request';
export declare class AdminAuthentication implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction): void;
}

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class Authentication implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): any;
}

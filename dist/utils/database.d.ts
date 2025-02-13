import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class SqlExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}

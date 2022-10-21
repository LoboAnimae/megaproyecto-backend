import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express';
import { IErrorResponse } from "../Interfaces/Responses.interface";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const errorResponse: IErrorResponse = {
            success: false,
            statusCode: status,
            error: exception.message
        };
        response
            .status(status)
            .json(errorResponse);
    }
}
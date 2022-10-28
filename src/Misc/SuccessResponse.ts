import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(
                    (value) => {

                        return {
                            success: true,
                            statusCode: 200,
                            payload: value
                        };

                    }
                )
            );

    }
}
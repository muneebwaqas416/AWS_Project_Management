import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctxHTTP = context.switchToHttp();
    const request = ctxHTTP.getRequest<Request>();
    const response = ctxHTTP.getResponse<Response>();

    return next.handle().pipe(
      tap((data)=>{
        console.log("Res data" , data)
      }),
      catchError((error)=>{
        console.error(`❌ Error Occurred on ${request.method} ${request.url}:`, error);
        return new Observable((observer)=>{
          observer.next({
            statusCode: response.status,
            message : `Server Error Occurred on ${request.method} ${request.url}`
          })
          observer.complete();
        })
      })
    );
  }
}

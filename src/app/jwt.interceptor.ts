import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return next.handle(jsonReq);
    }
}

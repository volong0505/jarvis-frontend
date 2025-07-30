import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Provider } from "@angular/core";
import { Observable } from "rxjs";

export class ApiInterceptor implements HttpInterceptor {
    private host: string;
    
    constructor(host: string) {
        this.host = host;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url: endpoint } = req;

        req = req.clone({
            url: `${this.host}/api/${endpoint}`
        })

        return next.handle(req)
    }
}

export const apiInterceptorProvider: (host: string) => Provider = (host: string) => ({
    provide: HTTP_INTERCEPTORS,
    useValue: new ApiInterceptor(host),
    multi: true
})
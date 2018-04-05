import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "../shared/services/user.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True"){
            return next.handle(req.clone()).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.headers.keys().includes("token")){
                        localStorage.setItem('userToken', event.headers.get("token"));
                    }
                }
            });
        } else if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .do((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            localStorage.setItem('userToken', event.headers.get("token"));
                        }
                    },
                    (err: any) =>  {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) this.router.navigateByUrl('/login');
                        }
                   
                    }
                );
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}
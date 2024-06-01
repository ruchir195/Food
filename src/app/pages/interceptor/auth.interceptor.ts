import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from 'src/app/models/token-api.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if(myToken){
      
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            // this.toast.warning({detail:"warning", summary:"Token is expired, Please Login again"});
            // this.router.navigate(['login'])
            return this.handleUnAuthorizedError(request, next);
          }

          if (err.error) {
            let errorMessage = '';
            if (err.error.message) {
              errorMessage = err.error.message;
            } else if (err.error.error) {
              errorMessage = err.error.error;
            } else if (err.error) {
              errorMessage = err.error;
            }
             else {
              console.log(err);
              errorMessage = 'Unknown error occurred';
            }
            return throwError(() => {
              this.toast.error({ detail: 'ERROR', summary: errorMessage });
            });
          }
        }
        
        return throwError(() => {
          this.toast.error({ detail: 'ERROR', summary: 'Unknown error occurred' });
        });
    })
    )
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
    .pipe(
      switchMap((data: TokenApiModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          console.log("Ruchir : ",err)
          this.toast.warning({detail:"warning", summary:err.error});
        })
      })
    )
  }
}
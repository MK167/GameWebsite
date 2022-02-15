import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()

export class HttpHeaderInterceprtor implements HttpInterceptor {

  constructor(){}

//To Clone the Request and set the Headers
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        //Set Headers
        setHeaders: {
          'x-rapidapi-key': 'esGbwrm390mshS2BCl0RALxQRtZTp1W7sFMjsnyJlJzDXVkW0H',
          'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        },
        //Set Parms
        setParams:{
          key: 'e40e743af2c94b0c916a8aa618fb4473'

        }
      });
      return next.handle(req);
  }
}

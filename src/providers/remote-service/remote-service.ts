import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  iniciarSesion(data): Observable<any> {
    const body = new HttpParams()
      .set('action', 'Entrar')
      .set('data[userName]', data.userName)
      .set('data[contrasena]', data.contrasena);
    //let urlLogin = '../../../AppCatalogo/public/login/admin';
    let urlLogin = 'http://192.168.1.57/AppCatalogo/public/login/admin';
    console.log(body.toString());
    let u = '';
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(urlLogin, body.toString(), {headers : headers});
  }

}

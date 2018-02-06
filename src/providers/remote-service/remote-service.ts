import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Storage} from '@ionic/storage';
import {CONST} from "../constantes";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';


/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  private BASE_URL;


  constructor(public http: HttpClient, private storage: Storage) {
    console.log(' -- RemoteServiceProvider Provider -- ');
    this.BASE_URL = CONST.BASE_URL;
  }

  getToken() {
    return Observable.fromPromise(this.storage.get('KEY_APP'));
  }

  iniciarSesion(data): Observable<any> {
    const body = new HttpParams()
      .set('action', 'Entrar')
      .set('data[userName]', data.userName)
      .set('data[contrasena]', data.contrasena);
    let urlLogin = this.BASE_URL + 'login/admin';
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(urlLogin, body.toString(), {headers: headers});
  }

  getVehiculo(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getSerieAndMarca')
        .set("filter[nombre]", data);
      let urlCatalogo = this.BASE_URL + 'catalogo/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlCatalogo, body.toString(), {headers: headers});
    });
  }

  getProductosByMarcaAndSerie(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getListByVehiculo')
        .set("filter[id]", data.serieId)
        .set("filter[marcaId]", data.marcaId)
        .set("filter[subgrupoId]", data.subgrupoId)
        .set("filter[inicio]", data.inicio);
      let urlCatalogo = this.BASE_URL + 'catalogo/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlCatalogo, body.toString(), {headers: headers});
    });
  }

  getReferencia(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getListReferencia')
        .set("filter[referencia]", data);
      let urlProducto = this.BASE_URL + 'producto/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlProducto, body.toString(), {headers: headers});
    });
  }

  getProductosByReferencia(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getListByReferencia')
        .set("filter[idProducto]", data.id)
        .set("filter[inicio]", data.inicio);
      let urlCatalogo = this.BASE_URL + 'catalogo/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlCatalogo, body.toString(), {headers: headers});
    });
  }

  getSubgrupo() {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getList')
        .set("filter[pageSize]", '100')
        .set("filter[pageIndex]", '1');
      let urlSubgrupo = this.BASE_URL + 'subgrupo/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlSubgrupo, body.toString(), {headers: headers});
    });
  }

  existsImagen(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'existsImagen')
        .set("data[imagen]", data);
      let urlSubgrupo = this.BASE_URL + 'producto/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlSubgrupo, body.toString(), {headers: headers});
    });
  }

  getGeometria(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getListByGeometria')
        .set("filter[diametro]", data.diametro)
        .set("filter[diametroInt]", data.diametroInt)
        .set("filter[diametroIntBocin]", data.diametroIntBocin)
        .set("filter[longitud]", data.longitud)
        .set("filter[diametroExt]", data.diametroExt)
        .set("filter[espesor]", data.espesor)
        .set("filter[altura]", data.altura)
        .set("filter[agujeros]", data.agujeros)
        .set("filter[tipo]", data.tipo)
        .set("filter[subgrupoId]", data.subgrupoId)
        .set("filter[inicio]", data.inicio)
      let urlSubgrupo = this.BASE_URL + 'catalogo/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlSubgrupo, body.toString(), {headers: headers});
    });
  }

  getRango(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getListByRango')
        .set("filter[inicio]", data.min)
        .set("filter[fin]", data.max)
        .set("filter[filtro]", data.filtro)
        .set("filter[subgrupoId]", data.subgrupoId)
        .set("filter[ini]", data.inicio);
      let urlSubgrupo = this.BASE_URL + 'catalogo/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlSubgrupo, body.toString(), {headers: headers});
    });
  }

  getProductoById(data) {
    return this.getToken().flatMap(token => {
      const body = new HttpParams()
        .set('action', 'getByIdDetail')
        .set('id', data);
      let urlSubgrupo = this.BASE_URL + 'producto/admin';
      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Bearer ' + token);
      return this.http.post(urlSubgrupo, body.toString(), {headers: headers});
    });
  }

  registro(data) {
    const body = new HttpParams()
      .set('action', 'registro')
      .set('data[primerNombre]', data.primerNombre)
      .set('data[primerApellido]', data.primerApellido)
      .set('data[empresa]', data.empresa)
      .set('data[email]', data.email)
      .set('data[contrasena]', data.contrasena);

    let urlRegistro = this.BASE_URL + 'login/admin';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    return this.http.post(urlRegistro, body.toString(), {headers: headers});
  }

  recuperarpass(data) {
    const body = new HttpParams()
      .set('action', 'recuperarpass')
      .set('data[email]', data.email);

    let urlRegistro = this.BASE_URL + 'login/admin';
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    return this.http.post(urlRegistro, body.toString(), {headers: headers});
  }
}

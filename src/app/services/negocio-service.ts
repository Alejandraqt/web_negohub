import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class NegocioService {

  apiUri = '/api/negocio';
  //  apiUri1 = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {

  }

  //Metodo consultar todos los negocios
  getAllNegociosData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }

  //Metodo crear nuevo negocio
  newNegocio(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.httpOptions });
  }

  //Metodo actualizar negocio
  updateNegocio(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/' + id,
      data,
      { headers: this.httpOptions });
  }

  getOneNegocio(id: any): Observable<any> {
    console.log(this.apiUri + '/' + id)
    return this.http.get<any>(
      this.apiUri + '/' + id,
      { headers: this.httpOptions });
  }

  deleteNegocio(id: any) {
    return this.http.delete<any>(
      this.apiUri + "/" + id,
      { headers: this.httpOptions });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  apiUri = '/api/usuario';
  //  apiUri1 = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient){
    
  }

  //Metodo consultar todos los usuario
  getAllUsersData(): Observable<any> {
    return this.http.get<any>(this.apiUri)
  }

  //Metodo crear nuevo usuario
  newUser(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.httpOptions });
  }

  //Metodo actualizar usuario
  updateUser(id: any, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + '/' + id,
      data,
      { headers: this.httpOptions });
  }

  getOneUser(id: any): Observable<any> {
    console.log(this.apiUri + '/' + id)
    return this.http.get<any>(
      this.apiUri + '/' + id,
      { headers: this.httpOptions });
  }

  deleteUser(id: any) {
    return this.http.delete<any>(
      this.apiUri + "/" + id,
      { headers: this.httpOptions });
  }


}
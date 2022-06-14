import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://linkzipper-api.herokuapp.com/api"

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  constructor(private http: HttpClient) { }

  register(data: any) { //genera el token  si el usuario existe
    let body = new URLSearchParams();
    body.set('userName', data.userName);
    body.set('email', data.email);
    body.set('password', data.pass);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/register`, body.toString(), options)
  }
  login(data: any) { //genera el token  si el usuario existe
    let body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.pass);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/login`, body.toString(), options)
  }

  token(token: any) { //recoge el token

    let headers = new HttpHeaders().set('Authorization', `${token.token_type} ${token.access_token}`);

    return this.http.get(`${this.url}/getUserLogin`, { headers: headers })
  }

  getUser(token: any) { //Recoge los datos del usuario según el token

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.url}/getUserLogin`, { headers: headers })
  }
}

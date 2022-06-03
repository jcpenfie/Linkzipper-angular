import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://127.0.0.1:8000/api"

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


  // explore

  explore() {
    let options = {
      headers: this.headers
    };

    return this.http.get(`${this.url}/explore`, options)
  }

  // search

  searchName(user: any) {
    let body = new URLSearchParams();
    body.set('userName', user);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/searchName`, body.toString(), options)
  }
  search(user: any) {
    let body = new URLSearchParams();
    body.set('userName', user);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/search`, body.toString(), options)
  }


  //formulario panel profile

  panel(data: any) { //Actualiza los datos del usuario
    let body = new URLSearchParams();
    body.set('userName', data.userName);
    body.set('showName', data.showName);
    body.set('email', data.email);
    body.set('password', data.pass);
    body.set('theme', data.theme);
    body.set('publicAccount', data.publicAccount);
    body.set('description', data.description);
    body.set('profileImg', data.profileImg);
    body.set('backgroundImg', data.backgroundImg);

    let options = {
      headers: this.headers
    };

    return this.http.put<any>(`${this.url}/panel`, body.toString(), options)
  }
}

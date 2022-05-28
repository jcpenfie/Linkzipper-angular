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
    console.log(body);

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
    console.log(headers);

    return this.http.get(`${this.url}/getUserLogin`, { headers: headers })
  }

  getUser(token: any) { //Recoge los datos del usuario según el token

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);

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


  //likes/dislikes

  like(id: any) {
    let body = new URLSearchParams();
    body.set('id', id);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/like`, body.toString(), options)
  }
  dislike(id: any) {
    let body = new URLSearchParams();
    body.set('id', id);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/dislike`, body.toString(), options)
  }
}

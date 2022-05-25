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
      'Accept': 'application/json',
    }
  );
  constructor(private http: HttpClient) { }

  login(data: any) {
    let body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.pass);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/login`, body.toString(), options)
  }

  token(token: any) {
    console.log(token.access_token);
    
    let body = new URLSearchParams();

    let options = {
      headers: this.headers,
      'Authorization': 'Bearer' + token.access_token
    };

    return this.http.post(`${this.url}/getUserLogin`, body.toString(), options)
  }

}

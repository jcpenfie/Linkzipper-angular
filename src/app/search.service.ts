import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = "http://linkzipper-api.herokuapp.com/api"

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  constructor(private http: HttpClient) { }

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
}

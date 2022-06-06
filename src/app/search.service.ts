import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = "http://127.0.0.1:8000/api"

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

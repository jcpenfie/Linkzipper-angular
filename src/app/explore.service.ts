import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  url = "http://app-65923f03-3292-4553-a3bd-88214cf326e1.cleverapps.io/api"

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  constructor(private http: HttpClient) { }

  explore() {
    let options = {
      headers: this.headers
    };

    return this.http.get(`${this.url}/explore`, options)
  }
}

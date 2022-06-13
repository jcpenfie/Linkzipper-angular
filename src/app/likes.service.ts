import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  
  url = "http://app-65923f03-3292-4553-a3bd-88214cf326e1.cleverapps.io/api"

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  constructor(private http: HttpClient) { }

  //likes/dislikes

  show(id:any) {
    let body = new URLSearchParams();
    body.set('idUser', id);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/likes`, body.toString(), options)
  }
  like(data:any) {
    let body = new URLSearchParams();
    body.set('idUser', data.idUser);
    body.set('idUserLiked', data.idUserLiked);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/like`, body.toString(), options)
  }
  dislike(data: any) {
    let body = new URLSearchParams();
    body.set('idUser', data.idUser);
    body.set('idUserLiked', data.idUserLiked);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/dislike`, body.toString(), options)
  }
}

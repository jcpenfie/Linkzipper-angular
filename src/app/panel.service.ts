import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  url = "http://127.0.0.1:8000/api"

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  constructor(private http: HttpClient) { }

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

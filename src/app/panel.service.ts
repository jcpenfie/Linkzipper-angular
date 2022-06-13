import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  url = "http://linkzipper-api.heroku.com/api"
  constructor(private http: HttpClient) { }

  panel(data: any) { //Actualiza los datos del usuario
    let body = new FormData();
    body.append('userName', data.userName);
    body.append('showName', data.showName);
    body.append('password', data.pass);
    body.append('theme', data.theme);
    body.append('publicAccount', data.publicAccount);
    body.append('description', data.description);
    body.append('profileImg', data.profileImg);
    body.set('backgroundImg', data.backgroundImg);

    console.log(data);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }

    return this.http.post<any>(`${this.url}/panel`, body, httpOptions)
  }
}

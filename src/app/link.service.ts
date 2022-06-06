import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  url = "http://127.0.0.1:8000/api"

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  );
  constructor(private http: HttpClient) { }

  create(data: any) {
    let body = new URLSearchParams();
    body.set('title', data.title);
    body.set('link', data.link);
    body.set('logo', data.logo);
    body.set('idUser', data.idUser);

    let options = {
      headers: this.headers
    };

    return this.http.put(`${this.url}/link/create`, body.toString(), options)
  }
  show(id:any) {
    let body = new URLSearchParams();
    body.set('idUser', id);

    let options = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/link/show`, body.toString(), options)
  }
  update(data: any) {
    let body = new URLSearchParams();
    body.set('title', data.title);
    body.set('link', data.link);
    body.set('logo', data.logo);
    body.set('idLink', data.idLink);

    let options = {
      headers: this.headers
    };

    return this.http.put(`${this.url}/link/update`, body.toString(), options)
  }
  delete(id: any) {
    let options = {
      headers: this.headers
    };

    return this.http.delete(`${this.url}/link/${id}`, options)
  }
}

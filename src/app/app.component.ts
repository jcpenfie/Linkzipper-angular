import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opciones = ["EXPLORE","REGISTER","LOGIN"];

  presion(op: number) {
    alert("Se informa que se presiono la opcion " + op);
  }
}

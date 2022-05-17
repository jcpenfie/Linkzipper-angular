import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-panel-links',
  templateUrl: './panel-links.component.html',
  styleUrls: ['./panel-links.component.css']
})
export class PanelLinksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user = AppComponent.userLogin;

}

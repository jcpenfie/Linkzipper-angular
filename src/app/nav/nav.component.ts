import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() opciones!: string[];
  @Input() colorfondo!: string;
  @Output() presionopcion = new EventEmitter();

  ngOnInit(): void {
    window.onload = function () {
      let login = document.getElementById("LOGIN");
      login?.setAttribute("data-toggle", "modal")
      login?.setAttribute("data-target", "#LOGINModal")

      let register = document.getElementById("REGISTER");
      register?.setAttribute("data-toggle", "modal")
      register?.setAttribute("data-target", "#REGISTERModal")
    }
  }
}

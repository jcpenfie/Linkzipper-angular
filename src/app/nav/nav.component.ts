import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

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

  resultado!: string;

  constructor(private fb: FormBuilder) { }

  loginForm = this.fb.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });
  registerForm = this.fb.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
    passConfirm: ['', [Validators.required]],
    email: ['', [Validators.required]],
    emailConfirm: ['', [Validators.required]],
  });

  submit() {
    if (this.loginForm.valid) {
      //Redirect
    } else {
      this.resultado = "There is invalid data in the form";
    }

    if (this.registerForm.valid) {
      //Redirect
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }

}

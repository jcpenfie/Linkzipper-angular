import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  ngOnInit(): void {
  }


  resultado!: string;

  constructor(private fb: FormBuilder) { }

  loginForm = this.fb.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });


  submit() {
    if (this.loginForm.valid) {
      //Redirect
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }
}

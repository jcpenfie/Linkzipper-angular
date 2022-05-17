import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidacionesPropias } from '../validaciones-propias';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

  resultado!: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    user: ['', [Validators.required, Validators.maxLength(12)]],
    pass: ['', [Validators.required,ValidacionesPropias.passwordValid]],
    passConfirm: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    emailConfirm: ['', [Validators.required, Validators.email]],
  }, { validator: ValidacionesPropias.match });

  submit() {
    if (this.registerForm.valid) {
      //Redirect
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }


  handleChange() {
    if (this.registerForm.valid) {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "#REGISTERModal")
    } else {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "")
    }
  }

}

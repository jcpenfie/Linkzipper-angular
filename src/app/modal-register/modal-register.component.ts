import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidacionesPropias } from '../validaciones-propias';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

  resultado!: string;

  error!: any

  status:boolean = true

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(12)]],
    pass: ['', [Validators.required, ValidacionesPropias.passwordValid]],
    passConfirm: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    emailConfirm: ['', [Validators.required, Validators.email]],
  }, { validator: ValidacionesPropias.match });

  submit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(res => {
        
        this.error = res

        if (this.error.message != 'Good') { // si el mensaje que devuelve no es 'Good' salta el error de validación
          
          if (this.status) {
            document.getElementById("alertReg")?.setAttribute("class", "visible alert alert-danger mx-3")
          document.getElementById("btnSubmitRegister")?.setAttribute("data-target", "")
          this.resultado = "The user name or email has already been taken";
          }

        } 
        else {
          document.getElementById("alertReg")?.setAttribute("class", "invisible alert alert-danger mx-3")
          document.getElementById("btnSubmitRegister")?.setAttribute("data-target", "#REGISTERModal")
          document.getElementById("btnSubmitRegister")?.click()
          this.registerForm.reset()
          this.resultado =""
          this.status = false
          localStorage.setItem('token', this.error.access_token)
          location.reload()
        }
      })//registra al usuario
    } else {
      document.getElementById("alertReg")?.setAttribute("class", "visible alert alert-danger mx-3")

      this.resultado = "There is invalid data in the form";
    }

  }
}

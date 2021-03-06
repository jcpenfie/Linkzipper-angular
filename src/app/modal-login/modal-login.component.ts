import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router"
import { UserService } from '../user.service';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  ngOnInit(): void { }
  userInput!: any

  resultado!: string;

  error!: any

  completed: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
  });


  submit() {
    this.completed = true
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(res => { //recoge el token de usuario
        this.error = res

        if (this.error.message != 'Good') { // si el mensaje que devuelve no es 'Good' salta el error de validación
          document.getElementById("btnSubmit")?.setAttribute("data-target", "")
          document.getElementById("alert")?.setAttribute("class", "visible alert alert-danger mx-3")
          this.resultado = this.error.message;
        } else {
          this.setToken(res)

          document.getElementById("alert")?.setAttribute("class", "invisible alert alert-danger mx-3")
          document.getElementById("btnSubmit")?.setAttribute("data-target", "#LOGINModal")
          this.loginForm.reset()
          document.getElementById("btnSubmit")?.click()
        }
      })
    } else {
      document.getElementById("alert")?.setAttribute("class", "visible alert alert-danger mx-3")
      this.resultado = "There is invalid data in the form";
    }
  }

  setToken(token: any) { //guarda el token en el localStorage
    localStorage.setItem('token', token.access_token)
    if (localStorage.getItem("token") != null) {
      this.router.navigate(['/panel/profile'])
      location.reload()
      this.completed = false
    }
  }
  showPassword() {
    let input = document.getElementById("password")
    let ojo = document.getElementById("eye")
    if (input?.getAttribute('type') == "password") {
      input?.setAttribute('type', "text")
      ojo?.setAttribute("class", "fa-solid fa-eye-slash")
    } else {
      input?.setAttribute('type', "password")
      ojo?.setAttribute("class", "fa-solid fa-eye")
    }
  }

  reset() {
    this.loginForm.reset()
  }
}

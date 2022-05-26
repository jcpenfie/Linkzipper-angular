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

  ngOnInit(): void {
    localStorage.removeItem("token")
  }
  userInput!: any

  resultado!: string;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
  });


  submit() {    
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(res =>{ //recoge el token de usuario
        this.setToken(res)
      })
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }

  handleChange() {
    if (this.loginForm.valid) {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "#LOGINModal")
    } else {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "")
    }
  }

  setToken(token:any){ //guarda el token en el localStorage
    localStorage.setItem('token', token.access_token)
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token") != null){
      this.router.navigate(['/panel'])
      
    }
  }
}

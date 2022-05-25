import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router"
import { UserService } from '../user.service';
import { ValidacionesPropias } from '../validaciones-propias';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  ngOnInit(): void {
  }


  resultado!: string;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
  });


  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      // this.router.navigate(['/panel'])
      this.userService.login(this.loginForm.value).subscribe(response => {
        console.log(response);

        this.userService.token(response).subscribe(response => {
          console.log(response);
        })
        
      }
      );
      console.log(this.loginForm.value.user);

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
}

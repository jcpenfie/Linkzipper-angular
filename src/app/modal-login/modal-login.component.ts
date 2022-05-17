import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router"

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  ngOnInit(): void {
  }


  resultado!: string;

  constructor(private fb: FormBuilder, private router: Router) { }

  loginForm = this.fb.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });


  submit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/panel'])
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

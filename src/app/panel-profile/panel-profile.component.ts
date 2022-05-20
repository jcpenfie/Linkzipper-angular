import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-panel-profile',
  templateUrl: './panel-profile.component.html',
  styleUrls: ['./panel-profile.component.css']
})
export class PanelProfileComponent implements OnInit {

  resultado!: string;

  themeSelect = ""

  routerU = this.router

  constructor(private fb: FormBuilder, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let url: any = document.getElementById("url");
    url.innerHTML = `${window.location.origin}/@${AppComponent.userLogin.user}`;
  }

  profileForm = this.fb.group({
    displayName: ['', [Validators.required, Validators.maxLength(12)]],
    pass: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    theme: ['', [Validators.required]]
  });

  submit() {
    if (this.profileForm.valid) {
      //Redirect
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }

  copy() {
    let url: any = document.getElementById("url");
    window.getSelection()!.selectAllChildren(url);
    document.execCommand("Copy")
  }

}

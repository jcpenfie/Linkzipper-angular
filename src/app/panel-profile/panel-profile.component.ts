import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-panel-profile',
  templateUrl: './panel-profile.component.html',
  styleUrls: ['./panel-profile.component.css']
})
export class PanelProfileComponent implements OnInit {

  resultado!: string;

  routerU = this.router

  user: any = {
    backgroundImg: "",
    description: "",
    email: "",
    email_verified_at: null,
    id: null,
    profileImg: "",
    publicAccount: null,
    showName: "",
    theme: "",
    totalLikes: "",
    userName: "",
  }

  constructor(private fb: FormBuilder, private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
    }
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

  checkSwitch() {
    console.log(this.user.public);

    let icono = document.getElementById("inconoSwitch")
    let check = document.getElementById("toggle-switch")
    if (this.user.public) {
      icono?.setAttribute("class", "switchIconDes fa-solid fa-earth-americas mx-2")
      check?.setAttribute("checked", "checked")
      this.user.public = false
    } else {
      icono?.setAttribute("class", "fa-solid fa-earth-americas mx-2")
      check?.removeAttribute("checked")
      this.user.public = true

    }
  }

  setUser(data: any) {
    this.user = data;
    let url: any = document.getElementById("url");
    url.innerHTML = `${window.location.origin}/@${this.user.userName}`;

    let icono = document.getElementById("inconoSwitch")
    let check = document.getElementById("toggle-switch")
    if (this.user.publicAccount) {
      icono?.setAttribute("class", "fa-solid fa-earth-americas mx-2")
      check?.setAttribute("checked", "checked")
    } else {
      icono?.setAttribute("class", "switchIconDes fa-solid fa-earth-americas mx-2")
      check?.removeAttribute("checked")
    }
  }

}

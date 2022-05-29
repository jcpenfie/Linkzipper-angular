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
    theme: ['', [Validators.required]],
    description: [''],
    profileImg: [''],
    backgroundImg: [''],
  });

  submit() {
    if (this.profileForm.valid) {
      let data = {
        userName: this.user.userName,
        showName: this.profileForm.value.displayName,
        email: this.profileForm.value.email,
        pass: this.profileForm.value.pass,
        theme: this.profileForm.value.theme,
        publicAccount: this.user.publicAccount,
        description: this.profileForm.value.description,
        profileImg: '',
        backgroundImg: '',
      }

      if (this.profileForm.value.profileImg != '') {
        data.profileImg = `/img/profile/${this.profileForm.value.profileImg}`
      } else {
        data.profileImg = `/img/profile/${this.user.profileImg}`
      }
      if (this.profileForm.value.backgroundImg != '') {
        data.backgroundImg = `/img/profile/${this.profileForm.value.backgroundImg}`
      } else {
        data.backgroundImg = `/img/profile/${this.user.backgroundImg}`
      }
      if (this.profileForm.value.backgroundImg != '') {
        data.description = this.profileForm.value.description
      } else {
        data.description = this.user.description
      }

      this.userService.panel(data).subscribe(res => {
        if (res.message == 'Good, user updated') {
          location.reload()
        }
      })
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

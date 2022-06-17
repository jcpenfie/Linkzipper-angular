import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../panel.service';
import { UserService } from '../user.service';
import { ValidacionesPropias } from '../validaciones-propias';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-panel-profile',
  templateUrl: './panel-profile.component.html',
  styleUrls: ['./panel-profile.component.css', './panel-profile.component2.css']
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

  completed: boolean = false


  constructor(private fb: FormBuilder, private router: ActivatedRoute, private userService: UserService, private panelService: PanelService) { }

  ngOnInit(): void {
    document.getElementById("fileStyleProfile")!.style.backgroundImage = 'url(' + this.urlProfile + ')';
    document.getElementById("fileStyleBg")!.style.backgroundImage = 'url(' + this.urlBg + ')';
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
    }
  }

  profileForm = this.fb.group({
    displayName: [' ', [Validators.required, Validators.maxLength(12)]],
    pass: ['', [Validators.required, ValidacionesPropias.passwordValid]],
    theme: ['white', [Validators.required]],
    description: [' ', [Validators.required]],
    profileImg: [''],
    backgroundImg: [''],
  });

  submit() {
    
    document.getElementById("alertReg")?.setAttribute("class", "invisible alert alert-danger mx-3")
    if (this.profileForm.valid) {
      this.completed = true;
      let data = {
        userName: this.user.userName,
        showName: '',
        pass: this.profileForm.value.pass,
        theme: this.profileForm.value.theme,
        publicAccount: this.user.publicAccount,
        description: this.profileForm.value.description,
        profileImg: '',
        backgroundImg: '',
      }

      if (this.profileForm.value.profileImg != '') {
        data.profileImg = this.profileImg
      } else {
        data.profileImg = `${this.user.profileImg}`
      }
      if (this.profileForm.value.backgroundImg != '') {
        data.backgroundImg = this.backgroundImg
      } else {
        data.backgroundImg = `${this.user.backgroundImg}`
      }
      if (this.profileForm.value.description != ' ') {
        data.description = this.profileForm.value.description
      } else {
        data.description = this.user.description
      }

      if (this.profileForm.value.displayName != ' ') {
        data.showName = this.profileForm.value.displayName;
      } else {
        data.showName = this.user.showName;
      }
      this.panelService.panel(data).subscribe(res => {
        if (res.message == 'Good, user updated') {
          location.reload()
          this.completed = false
        }
      })
    } else {
      document.getElementById("alertReg")?.setAttribute("class", "visible alert alert-danger mx-3")
      this.resultado = "There is invalid data in the form";
    }
  }

  copy() {
    let url: any = document.getElementById("url");
    window.getSelection()!.selectAllChildren(url);
    document.execCommand("Copy")
    this.notification()
  }

  checkSwitch() {
    let icono = document.getElementById("inconoSwitch")
    let check = document.getElementById("toggle-switch")
    if (this.user.publicAccount) {
      icono?.setAttribute("class", "switchIconDes fa-solid fa-earth-americas mx-2")
      check?.setAttribute("checked", "checked")
      this.user.publicAccount = 0
    } else {
      icono?.setAttribute("class", "fa-solid fa-earth-americas mx-2")
      check?.removeAttribute("checked")
      this.user.publicAccount = 1
    }
  }

  setUser(data: any) {
    this.user = data;

    this.urlProfile = this.user.profileImg == "profileInput.png" ? "http://linkzipper-api.herokuapp.com/api/user/img/logo/profileInput.png" : `https://linkzipper-api.herokuapp.com/api/user/img/logo/${this.user.profileImg}`
    document.getElementById("fileStyleProfile")!.style.backgroundImage = 'url(' + this.urlProfile + ')';    
    
    this.urlBg = this.user.backgroundImg == "emptyBg.png" ? "http://linkzipper-api.herokuapp.com/api/user/img/bg/bgInput.png" : `http://linkzipper-api.herokuapp.com/api/user/img/bg/${this.user.backgroundImg}`
    document.getElementById("fileStyleBg")!.style.backgroundImage = 'url(' + this.urlBg + ')';

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

  urlProfile = "http://linkzipper-api.herokuapp.com/api/user/img/logo/profileInput.png"


  profileImg!: string;

  captureFileProfile(event: any): any {
    if (event.target.files) {
      this.profileImg = event.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => {
        this.urlProfile = e.target.result;
        document.getElementById("fileStyleProfile")!.style.backgroundImage = 'url(' + this.urlProfile + ')';
      }
    }
  }

  urlBg = "http://linkzipper-api.herokuapp.com/api/user/img/bg/bgInput.png"
  backgroundImg!: string;

  captureFilebackground(event: any): any {
    if (event.target.files) {
      this.backgroundImg = event.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => {
        this.urlBg = e.target.result;
        document.getElementById("fileStyleBg")!.style.backgroundImage = 'url(' + this.urlBg + ')';
      }
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
  //Notifications

  notification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      background: "#28a745",
      color: "#ffff",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      title: 'Link copied successfully :)'
    })
  }
}

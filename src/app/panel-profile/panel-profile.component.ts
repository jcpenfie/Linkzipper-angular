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
    displayName: ['', [Validators.required, Validators.maxLength(12)]],
    pass: ['', [Validators.required, ValidacionesPropias.passwordValid]],
    theme: ['', [Validators.required]],
    description: [''],
    profileImg: [''],
    backgroundImg: [''],
  });

  submit() {
    console.log(this.profileForm.value.profileImg);
    console.log(this.profileForm.value.backgroundImg);

    document.getElementById("alertReg")?.setAttribute("class", "invisible alert alert-danger mx-3")

    if (this.profileForm.valid) {
      console.log(this.profileForm.value.description);
      let data = {
        userName: this.user.userName,
        showName: this.profileForm.value.displayName,
        pass: this.profileForm.value.pass,
        theme: this.profileForm.value.theme,
        publicAccount: this.user.publicAccount,
        description: this.profileForm.value.description,
        profileImg: '',
        backgroundImg: '',
      }

      if (this.profileForm.value.profileImg != '') {
        data.profileImg = this.urlProfile
      } else {
        data.profileImg = `${this.user.profileImg}`
      }
      if (this.profileForm.value.backgroundImg != '') {
        data.backgroundImg = this.urlBg
      } else {
        data.backgroundImg = `${this.user.backgroundImg}`
      }
      if (this.profileForm.value.description != '') {
        data.description = this.profileForm.value.description
      } else {
        data.description = this.user.description
      }
      console.log(data);

      this.panelService.panel(data).subscribe(res => {
        console.log(res);

        if (res.message == 'Good, user updated') {
          // location.reload()
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
    console.log(this.user.publicAccount);

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

  urlProfile = this.user.profileImg
  urlBg = this.user.backgroundImage

  captureFile(event: any): any {
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e:any)=>{
        this.urlProfile = e.target.result;
        document.getElementById("fileStyleProfile")!.style.backgroundImage = 'url(' + this.urlProfile + ')';
        console.log(this.urlProfile);
        
      }
    }
  }

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

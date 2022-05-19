import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidacionesPropias } from '../validaciones-propias';

@Component({
  selector: 'app-panel-links',
  templateUrl: './panel-links.component.html',
  styleUrls: ['./panel-links.component.css']
})
export class PanelLinksComponent implements OnInit {
  ngOnInit(): void {
  }

  user = AppComponent.userLogin;
  
  delete(id:any){
    var indexOfId = this.user.links.indexOf(id);
    this.user.links.splice(indexOfId,1)
    
  }


  resultado!: string;

  constructor(private fb: FormBuilder) { }

  loginForm = this.fb.group({
    title: ['', [Validators.required]],
    link: ['', [Validators.required, ValidacionesPropias.linkValid]],
    logo: ['',[Validators.required]],
  },{});


  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.user.links.push([this.user.links.length+1,this.loginForm.value.title,this.loginForm.value.link, this.loginForm.value.logo])
      console.log(this.user.links);
      this.loginForm.reset()
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }

  handleChange() {
    if (this.loginForm.valid) {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "#AddLinkModal")
    } else {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "")
    }
  }

}

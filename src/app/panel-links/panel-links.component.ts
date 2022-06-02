import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidacionesPropias } from '../validaciones-propias';
import { LinkService } from '../link.service';
import { UserService } from '../user.service';
import { title } from 'process';

@Component({
  selector: 'app-panel-links',
  templateUrl: './panel-links.component.html',
  styleUrls: ['./panel-links.component.css']
})
export class PanelLinksComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
    }
  }

  user!: any;
  links!: any;

  setUser(data: any) { //le meto por parametros el usuario para obtener sus links
    this.user = data;
    //getLinks

    this.linkService.show(this.user.id).subscribe(res => {
      this.links = res
      this.links = this.links.links
    })

  }


  delete(id: any) {
    var indexOfId = this.links.indexOf(id);
    this.links.splice(indexOfId, 1)
    this.linkService.delete(id.id).subscribe(res => {
    })
  }
  edit(link: any) {
    let data = {
      title: link.title,
      link: link.link,
      logo: link.logo,
      idLink: link.id
    }
    this.linkForm.setValue({ title: link.title, link: link.link, logo: '', edit: true, idLink: link.id})
  }


  resultado!: string;

  constructor(private fb: FormBuilder, private linkService: LinkService, private userService: UserService) { }

  linkForm = this.fb.group({
    title: ['', [Validators.required]],
    link: ['', [Validators.required, ValidacionesPropias.linkValid]],
    logo: ['', [Validators.required]],
    edit: [false],
    idLink: ['']
  }, {});


  submit() {
    if (this.linkForm.valid) {
      if(this.linkForm.value.edit){

        let objIndex = this.links.findIndex(((linkObj:any) => linkObj.id == this.linkForm.value.idLink));
        

        this.links[objIndex].title = this.linkForm.value.title
        this.links[objIndex].link = this.linkForm.value.link
        this.links[objIndex].logo = this.linkForm.value.logo
        
        

        let data = {
          title: this.linkForm.value.title,
          link: this.linkForm.value.link,
          logo: this.linkForm.value.logo,
          idLink: this.linkForm.value.idLink
        }
        console.log(data);
  
        this.linkService.update(data).subscribe(res => {
          console.log(res);
  
        })
      }else{
        this.links.push({ id: this.links.length + 1, title: this.linkForm.value.title, link: this.linkForm.value.link, logo: this.linkForm.value.logo })

      let data = {
        title: this.linkForm.value.title,
        link: this.linkForm.value.link,
        logo: this.linkForm.value.logo,
        idUser: this.user.id
      }
      console.log(data);

      this.linkService.create(data).subscribe(res => {
        console.log(res);

      })
      }
      this.linkForm.reset()
    } else {
      this.resultado = "There is invalid data in the form";
    }
  }

  handleChange() {
    if (this.linkForm.valid) {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "#AddLinkModal")
    } else {
      document.getElementById("btnSubmit")?.setAttribute("data-target", "")
    }
  }

  setEditTrue(){
    this.linkForm.setValue({edit: false})
  }

}

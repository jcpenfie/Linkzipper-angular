import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidacionesPropias } from '../validaciones-propias';
import { LinkService } from '../link.service';
import { UserService } from '../user.service';
import Swal from 'sweetalert2'

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
  status!: boolean


  logoSelected!: string

  completed: boolean = false

  setUser(data: any) { //le meto por parametros el usuario para obtener sus links
    this.user = data;
    //getLinks

    this.linkService.show(this.user.id).subscribe(res => {

      this.links = res
      this.links = this.links.links
      if (this.links.length == 0) {
        this.status = true
      }
      this.completed = true
    })
  }

  delete(id: any) {
    var indexOfId = this.links.indexOf(id);
    this.links.splice(indexOfId, 1)
    this.linkService.delete(id.id).subscribe(res => {
    })

    if (this.links.length == 0) {
      this.status = true
    }
  }
  edit(link: any) {
    this.linkForm.setValue({ title: link.title, link: link.link, logo: '', edit: true, idLink: link.id })
  }


  resultado!: string;

  constructor(private fb: FormBuilder, private linkService: LinkService, private userService: UserService) { }

  linkForm = this.fb.group({
    title: ['', [Validators.required]],
    link: ['', [Validators.required, ValidacionesPropias.linkValid]],
    logo: ['o.png', [Validators.required]],
    edit: [false],
    idLink: ['']
  }, {});


  submit() {
    this.status = false
    if (this.linkForm.valid) {
      if (this.linkForm.value.edit) {

        let objIndex = this.links.findIndex(((linkObj: any) => linkObj.id == this.linkForm.value.idLink));


        this.links[objIndex].title = this.linkForm.value.title
        this.links[objIndex].link = this.linkForm.value.link.startsWith("https://") ? `${this.linkForm.value.link}` : `https://${this.linkForm.value.link}`
        this.links[objIndex].logo = this.logoSelected == this.linkForm.value.logo ? this.logoSelected : this.linkForm.value.logo == this.linkForm.value.logo ? this.logoSelected == this.linkForm.value.logo ? this.logoSelected : this.linkForm.value.logo : this.linkForm.value.logo



        let data = {
          title: this.linkForm.value.title,
          link: this.linkForm.value.link.startsWith("https://") ? `${this.linkForm.value.link}` : `https://${this.linkForm.value.link}`,
          logo: this.logoSelected == this.linkForm.value.logo ? this.logoSelected : this.linkForm.value.logo,
          idLink: this.linkForm.value.idLink
        }
        this.linkService.update(data).subscribe(res => {
          this.editLinkNotification()
        })
        this.linkForm.reset()

      } else {
        this.links.push({ id: this.links.length + 1, title: this.linkForm.value.title, link: `https://${this.linkForm.value.link}`, logo: this.logoSelected == this.linkForm.value.logo ? this.logoSelected : this.linkForm.value.logo })

        let data = {
          title: this.linkForm.value.title,
          link: `https://${this.linkForm.value.link}`,
          logo: this.logoSelected == this.linkForm.value.logo ? this.logoSelected : this.linkForm.value.logo,
          idUser: this.user.id
        }
        this.linkService.create(data).subscribe(res => {
          this.addLinkNotification()
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

  handleChangeLink(event: any) {
    this.handleChange()

    if (event.includes("whatsapp")) {
      document.getElementById("whatsapp")?.setAttribute("selected", "")
      this.logoSelected = "w.png"
    }
    else if (event.includes("youtube")) {
      document.getElementById("youtube")?.setAttribute("selected", "")
      this.logoSelected = "yt.png"
    }
    else if (event.includes("facebook")) {
      document.getElementById("facebook")?.setAttribute("selected", "")
      this.logoSelected = "f.png"
    }
    else if (event.includes("instagram")) {
      document.getElementById("instagram")?.setAttribute("selected", "")
      this.logoSelected = "i.png"
    }
    else if (event.includes("twitter")) {
      document.getElementById("twitter")?.setAttribute("selected", "")
      this.logoSelected = "t.png"
    }
    else if (event.includes("linkedin")) {
      document.getElementById("linkedin")?.setAttribute("selected", "")
      this.logoSelected = "l.png"
    }
    else if (event.includes("pinterest")) {
      document.getElementById("pinterest")?.setAttribute("selected", "")
      this.logoSelected = "p.png"
    } else {
      document.getElementById("other")?.setAttribute("selected", "")
      this.logoSelected = "o.png"
    }
  }

  setEditTrue() {
    this.linkForm.setValue({ edit: false })
  }

  reset() {
    this.linkForm.reset()
    this.linkForm.setControl('logo', this.fb.control('o.png', Validators.required))
  }


  //Notifications

  addLinkNotification() {
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
      title: 'Link added successfully'
    })
  }

  editLinkNotification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      background: "#f0ad4e",
      color: "#ffff",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      title: 'Link edited successfully'
    })
  }


  deleteNotification(link: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(link)
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your link has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your link is safe :)',
          'error'
        )
      }
    })
  }
}

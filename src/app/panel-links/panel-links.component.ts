import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
    this.linkForm.patchValue({ 
      titleLink: link.titleLink, 
      link: link.link, 
      logo: '', 
      edit: true, 
      idLink: link.id 
    })
  }


  resultado!: string;

  constructor(private fb: FormBuilder, private linkService: LinkService, private userService: UserService) { }

  linkForm = this.fb.group({
    titleLink: ['', [Validators.required]],
    link: ['', [Validators.required]],
    linkSelect: ['0', [Validators.required]],
    logo: ['o.png', [Validators.required]],
    edit: [false],
    idLink: ['']
  }, {});


  submit() {    
    this.status = false
    if (this.linkForm.valid) {
      if (this.linkForm.value.edit) {

        let objIndex = this.links.findIndex(((linkObj: any) => linkObj.id == this.linkForm.value.idLink));


        this.links[objIndex].title = this.linkForm.value.titleLink
        this.links[objIndex].link = this.linkForm.value.linkSelect != "0"? `${this.linkForm.value.linkSelect}${this.linkForm.value.link}`: `${this.linkForm.value.link}`
        this.links[objIndex].logo = this.linkForm.value.logo



        let data = {
          title: this.linkForm.value.titleLink,
          link:this.linkForm.value.linkSelect != "0"? `${this.linkForm.value.linkSelect}${this.linkForm.value.link}`: `${this.linkForm.value.link}`, 
          logo: this.linkForm.value.logo,
          idLink: this.linkForm.value.idLink
        }
        this.linkService.update(data).subscribe(res => {
          this.editLinkNotification()
        })
        this.linkForm.reset()

      } else {
        this.links.push({ 
          id: this.links.length + 1, 
          title: this.linkForm.value.titleLink, 
          link: this.linkForm.value.linkSelect != "0"? `${this.linkForm.value.linkSelect}${this.linkForm.value.link}`: `${this.linkForm.value.link}`, 
          logo: this.linkForm.value.logo 
        })

        let data = {
          title: this.linkForm.value.titleLink,
          link: this.linkForm.value.linkSelect != "0"? `${this.linkForm.value.linkSelect}${this.linkForm.value.link}`: `${this.linkForm.value.link}`, 
          logo: this.linkForm.value.logo,
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

  setEditTrue() {
    this.linkForm.patchValue({ edit: false })
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

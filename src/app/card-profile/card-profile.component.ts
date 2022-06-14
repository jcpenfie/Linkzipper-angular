import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2'
import { LikesService } from '../likes.service';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  @Input() user!: any;
  @Input() color!: string;
  @Input() btn!: boolean;
  @Input() liked!: boolean;

  idUser!: any;
  userDescriptionLength!: any

  constructor(private userService: UserService, private likeService: LikesService) { }

  ngOnInit(): void {
    
    if (this.user.description == "") {
      this.userDescriptionLength = this.user.description.length
    } else {
      this.userDescriptionLength = 0
    }
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
    }
    
    
    let boton = document.getElementById("btn");
    if (this.btn) {
      boton?.setAttribute("class", "visible btn negro text-light w-100")
    } else {
      boton?.setAttribute("class", "invisible btn negro text-light w-100")
    }
  }
  
  like(id: any) {
    
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
      
      let data = { idUser: this.idUser, idUserLiked: id };

      let like = document.getElementById(id + "like");
      let likeCount = document.getElementById(id + "likeCount");

      if (like?.getAttribute("class") == "fa-heart fa-regular heart") {

        like?.setAttribute("class", "heart fa fa-heart text-danger");
        if (parseInt(this.user.totalLikes) < 999) {
          let count = parseInt(this.user.totalLikes) + 1;
          this.user.totalLikes = count
          likeCount!.textContent = count.toString()
        }

        this.likeService.like(data).subscribe(res => {
          this.likeNotification()
        })
      } else {

        like?.setAttribute("class", "fa-heart fa-regular heart");
        if (parseInt(this.user.totalLikes) < 999) {
          let count = parseInt(this.user.totalLikes) - 1;
          this.user.totalLikes = count
          likeCount!.textContent = count.toString()
        }

        this.likeService.dislike(data).subscribe(res => {
          this.disLikeNotification()
        })
      }
    } else {
      document.getElementById("notification")?.click();
    }
  }


  disLike(id: any) {
    if (localStorage.getItem("token") != null) {
      let data = { idUser: this.idUser, idUserLiked: id };
      let like = document.getElementById(id + "like");
      let likeCount = document.getElementById(id + "likeCount");

      if (like?.getAttribute("class") == "heart fa fa-heart text-danger") {
        like?.setAttribute("class", "fa-heart fa-regular heart");
        if (parseInt(this.user.totalLikes) < 999) {
          let count = parseInt(this.user.totalLikes) - 1;
          this.user.totalLikes = count
          likeCount!.textContent = count.toString()
        }

        this.likeService.dislike(data).subscribe(res => {
          this.disLikeNotification()
        })
      } else {
        like?.setAttribute("class", "fa-heart fa-regular heart");
        if (parseInt(this.user.totalLikes) < 999) {
          let count = parseInt(this.user.totalLikes) - 1;
          this.user.totalLikes = count
          likeCount!.textContent = count.toString()
        }

        this.likeService.dislike(data).subscribe(res => {
          this.disLikeNotification()
        })
      }
    } else {
      document.getElementById("notification")?.click();
    }
  }

  setUser(data: any) {
    this.idUser = data.id;
  }

  heartControl(id: any) {
    let like = document.getElementById(id + "like");

    if (like?.getAttribute("class") == "fa-heart fa-regular heart") {
      this.like(id)
    } else {
      this.disLike(id)
    }
  }

  //notifications

  loginNotification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      background: "#dc3545",
      color: "#ffff",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      title: 'You need a account to do this!'
    })
  }


  likeNotification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      background: "#28a745",
      color: "#ffff",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      title: 'Liked'
    })
  }
  disLikeNotification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      background: "#dc3545",
      color: "#ffff",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      title: 'DisLiked'
    })
  }
}

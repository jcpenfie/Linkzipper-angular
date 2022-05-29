import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  @Input() user!: any;
  @Input() color!: string;
  @Input() btn!: string;
  @Input() liked!: boolean;
  @Output() disLikeEmit = new EventEmitter<string>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    let boton = document.getElementById("btn");

    if (this.btn === "false") {
      boton?.setAttribute("class", "invisible btn negro text-light w-100")
    } else {
      boton?.setAttribute("class", "visible btn negro text-light w-100")
    }
  }

  like(id: any) {
    if (localStorage.getItem("token") != null) {
      let like = document.getElementById(id + "like");
      let likeCount = document.getElementById(id + "likeCount");

      if (like?.getAttribute("class") == "heart fa-regular fa-heart") {
        like?.setAttribute("class", "heart fa fa-heart text-danger");
        let count = parseInt(this.user.totalLikes) + 1;
        this.user.totalLikes = count

        likeCount!.textContent = count.toString()

        this.userService.like(id).subscribe(res => {

        })
      } else {

        like?.setAttribute("class", "heart fa-regular fa-heart");
        let count = parseInt(this.user.totalLikes) - 1;
        this.user.totalLikes = count
        likeCount!.textContent = count.toString()
        this.userService.dislike(id).subscribe(res => {

        })
      }
    }else{
      document.getElementById("notification")?.click();
    }
  }


  disLike(id: any) {
    let like = document.getElementById(id + "like");
    let likeCount = document.getElementById(id + "likeCount");


    if ((like?.getAttribute("class") == "heart fa-regular fa-heart")) {
      like?.setAttribute("class", "heart fa fa-heart text-danger");
      let count = parseInt(this.user.totalLikes) + 1;
      this.user.totalLikes = count
      
      likeCount!.textContent = count.toString()
    } else {

      like?.setAttribute("class", "heart fa-regular fa-heart");
      let count = parseInt(this.user.totalLikes) - 1;
      this.user.totalLikes = count
      likeCount!.textContent = count.toString()
      this.disLikeEmit.emit(this.user);
    }
  }

  notification(){
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
}

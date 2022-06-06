import { Component, OnInit } from '@angular/core';
import { LikesService } from '../likes.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.css']
})
export class UserLikesComponent implements OnInit {

  constructor(private userService: UserService, private likeService: LikesService) { }
  idUser!: any;
  likes!: any


  status!: boolean

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
    }
  }
  users!: any;

  disLike(user: any) {
    var indexOfUser = this.users.indexOf(user);
    this.users.splice(indexOfUser, 1)
  }

  setUser(data: any) {
    this.idUser = data.id;
    this.likeService.show(this.idUser).subscribe(res => {
      this.likes = res
      console.log(this.likes.likes)
      this.users = this.likes.likes
      this.status = this.users.length == 0
    })



  }
}

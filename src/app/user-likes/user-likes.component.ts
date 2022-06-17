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

  completed: boolean = false

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        this.setUser(res)
      })
    }
  }
  users: Array<any> = [];

  setUser(data: any) {
    this.idUser = data.id;
    this.likeService.show(this.idUser).subscribe(res => {
      this.likes = res
      // this.users = this.likes.likes
      for (let i = 0; i < this.likes.likes.length; i++) {
        this.users[i] = this.likes.likes[i][0]
        this.users[i].liked = true
        
      }
      
      this.status = this.users.length == 0 || this.users.length == undefined
      this.completed = true
    })



  }
}

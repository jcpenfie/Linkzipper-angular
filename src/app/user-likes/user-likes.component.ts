import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.css']
})
export class UserLikesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  users = [
    {
      id: 1,
      user: "user1",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 2,
      user: "user2",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 3,
      user: "user3",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 4,
      user: "user4",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 5,
      user: "user5",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 6,
      user: "user6",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 7,
      user: "user7",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 8,
      user: "user8",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    }
  ]

  disLike(user:any){    
    var indexOfUser = this.users.indexOf(user);
    this.users.splice(indexOfUser,1)
  }
}

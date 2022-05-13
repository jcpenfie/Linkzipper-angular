import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }


  users = [
    {
      id: 1,
      user: "user",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 2,
      user: "user",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 3,
      user: "user",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    },
    {
      id: 4,
      user: "user",
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      img: "profile.png"
    }
  ]


  like(id: any) {
    let like = document.getElementById(id + "like");
    let likeCount = document.getElementById(id+ "likeCount");


    if (like?.getAttribute("class") == "heart fa-regular fa-heart") {
      like?.setAttribute("class", "heart fa fa-heart text-danger");
      let count = this.users[id-1].likes+1;
      this.users[id-1].likes = count



      likeCount!.textContent = count.toString()
      
    } else {

      like?.setAttribute("class", "heart fa-regular fa-heart");
    let count = this.users[id-1].likes-1;
    this.users[id-1].likes = count
      likeCount!.textContent = count.toString()

    }


  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  @Input() user!: any;
  @Input() color!: string;
  @Input() btn!: string;

  constructor() { }

  ngOnInit(): void {
    let boton = document.getElementById("btn");

    if (this.btn === "false") {
      boton?.setAttribute("class", "invisible btn negro text-light w-100")
    } else {
      boton?.setAttribute("class", "visible btn negro text-light w-100")

    }
  }

  like(id: any) {
    let like = document.getElementById(id + "like");
    let likeCount = document.getElementById(id + "likeCount");


    if (like?.getAttribute("class") == "heart fa-regular fa-heart") {
      like?.setAttribute("class", "heart fa fa-heart text-danger");
      let count = this.user.likes + 1;
      this.user.likes = count



      likeCount!.textContent = count.toString()

    } else {

      like?.setAttribute("class", "heart fa-regular fa-heart");
      let count = this.user.likes - 1;
      this.user.likes = count
      likeCount!.textContent = count.toString()

    }
  }

}

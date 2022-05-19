import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute) { }

  userInput = AppComponent.userLogin


    username = this.actRoute.snapshot.paramMap.get('username'); //recibir datos de la api

  ngOnInit(): void { }



  user = this.username? {
    id: 1,
    user: this.username? this.username:this.userInput,
    descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
    likes: 23,
    theme: "white",
    img: "profile.png",
    bgImg: "bgimg.jpg",
    links: [[1,"Instagram", "https://linkedin.es", "i.png"], [2,"Whatsapp", "https://linkedin.es", "w.png"], [3,"Youtube", "https://linkedin.es", "yt.png"], [4,"GitHub", "https://linkedin.es", "o.png"], [5,"Linkedin", "https://linkedin.es", "l.png"]]
  }: this.userInput
    

}

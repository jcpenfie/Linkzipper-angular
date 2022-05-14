import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute) { }

  username = this.actRoute.snapshot.paramMap.get('username');

  ngOnInit(): void {
  }

  user =
    {
      id: 1,
      user: this.username,
      descr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
      likes: 23,
      theme: "white",
      img: "profile.png",
      bgImg: "bgimg.jpg",
      links: [["Linkedin", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"]]
    }

}

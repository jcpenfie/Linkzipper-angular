import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../link.service';
import { SearchService } from '../search.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private searchService: SearchService, private userService: UserService, private linkService: LinkService) { }

  username!: any

  user: any = {}

  completed:boolean = false //estado de la carga

  bgurl:string = "http://linkzipper-api.herokuapp.com/api/user/img/bg/emptyBg.png"

  ngOnInit(): void {


    if (this.actRoute.snapshot.paramMap.get('username') != null) {
      this.username = this.actRoute.snapshot.paramMap.get('username');
      this.setUser()
    } else {
      if (localStorage.getItem("token") != null) {
        this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
          // this.setUser(res)
          this.username = res
          this.username = this.username.userName
          this.setUser()
        })
      }
    }
  }

  setUser() {
    if (this.username != undefined) {
      this.searchService.search(this.username).subscribe(res => {
        this.user = res
        this.user = this.user[0]
        this.getLinks(this.user.id)
      })
    }
  }

  getLinks(id: any) {
    this.linkService.show(id).subscribe(res => {
      let links: any = res
      this.user.links = links.links
      this.user.liked = true
    })
    document.getElementById("bg")?.setAttribute("style", `background-image: url('http://linkzipper-api.herokuapp.com/api/user/img/bg/${this.user.backgroundImg}'); height: 100vh;`)
    this.completed = true

  }
}

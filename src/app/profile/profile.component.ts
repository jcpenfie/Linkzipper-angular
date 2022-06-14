import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from '../likes.service';
import { LinkService } from '../link.service';
import { SearchService } from '../search.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private searchService: SearchService, private userService: UserService, private linkService: LinkService, private likeService: LikesService) { }

  username!: any

  user: any = {}

  completed: boolean = false //estado de la carga

  bgurl: string = "http://linkzipper-api.herokuapp.com/api/user/img/bg/emptyBg.png"

  likes: any

  idUserLogin!:number

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

    //recogida del usuario logueado
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        
        this.setUserLogin(res)
      })
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
    })
    document.getElementById("bg")?.setAttribute("style", `background-image: url('http://linkzipper-api.herokuapp.com/api/user/img/bg/${this.user.backgroundImg}'); height: 100vh;`)
    this.completed = true
  }

  setUserLogin(data: any) {
    this.idUserLogin = data.id;
    this.getLikes()
  }

  //recogida de likes dados por el usuario logueado
  getLikes() {
    this.likeService.show(this.idUserLogin).subscribe(res => {
      const likesRes: any = res
      let likes = []
      for (let i = 0; i < likesRes.likes.length; i++) {
        likes.push(likesRes.likes[i][0].id)
      }
      this.likes = likes
      this.setLiked()
    })

  }

  setLiked() {
    for (let i = 0; i < this.likes.length; i++) {
      if (this.likes[i] == this.user.id) {
        this.user.liked = true
      }
    }
    if(this.user.liked == null){
      this.user.liked = false
    }

  }
}

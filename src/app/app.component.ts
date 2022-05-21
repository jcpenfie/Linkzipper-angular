import { Component,OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showMenuHead: boolean = true
  showMenuFoot: boolean = true
  showMenuLogin: boolean = false

  constructor(private router: Router) {  }

  public static userLogin: any = {
    id: 1,
    user: "userName",
    descr: "DescLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
    likes: 23,
    theme: "white",
    img: "profile.png",
    bgImg: "bgimg.jpg",
    public: false,
    links: [[1,"Linkedin1", "https://linkedin.es", "w.png"], [2,"Linkedin2", "https://linkedin.es", "l.png"], [3,"Linkedin3", "https://linkedin.es", "yt.png"], [4,"Linkedin4", "https://linkedin.es", "p.png"], [5,"Linkedin5", "https://linkedin.es", "o.png"]]
  };

  ngOnInit(): void {
    console.log("Head: "+this.showMenuHead);
    console.log("Foot: "+this.showMenuFoot);
    console.log("Login: "+this.showMenuLogin);
    
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if(!event.url.startsWith("/@")){
          this.showMenuHead = true
          this.showMenuFoot = true
          if (event.url.startsWith("/panel")){
            this.showMenuHead = false
            this.showMenuFoot = true
            this.showMenuLogin = true

          }else{
            this.showMenuLogin = false

          }
        }else{
          this.showMenuHead = false
          this.showMenuFoot = false
        }
      }
    });
  }
}

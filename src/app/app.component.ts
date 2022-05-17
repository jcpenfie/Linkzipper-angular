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
  
  opciones = ["EXPLORE"];

  constructor(private router: Router) {  }

  public static userLogin: any = {
    id: 1,
    user: "userName",
    descr: "DescLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
    likes: 23,
    theme: "white",
    img: "profile.png",
    bgImg: "bgimg.jpg",
    links: [["Linkedin1", "https://linkedin.es", "logLinkedin.png"], ["Linkedin2", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"], ["Linkedin", "https://linkedin.es", "logLinkedin.png"]]
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

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

  public static userLogin: any = {};
  

  ngOnInit(): void {
    
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

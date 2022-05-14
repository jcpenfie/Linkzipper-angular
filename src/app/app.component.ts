import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showMenu: boolean = true
  opciones = ["EXPLORE"];

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if(!event.url.startsWith("/@")){
          this.showMenu = true
        }else{
          this.showMenu = false
        }
        console.log(event.url);
        
      }
    });
  }
}

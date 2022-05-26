import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css']
})
export class NavLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("token") == null){      
      this.router.navigate(['/'])
    }

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.startsWith("/panel")) {
          switch (event.url.split("/")[2]) {
            case "preview":
              document.getElementById("preview")?.setAttribute("class", "nav-link tex-dark fw-800")
              document.getElementById("links")?.setAttribute("class", "nav-link")
              document.getElementById("profile")?.setAttribute("class", "nav-link")
              break;
            case "links":
              document.getElementById("preview")?.setAttribute("class", "nav-link")
              document.getElementById("links")?.setAttribute("class", "nav-link tex-dark fw-800")
              document.getElementById("profile")?.setAttribute("class", "nav-link")
              break;
            case "profile":
              document.getElementById("preview")?.setAttribute("class", "nav-link")
              document.getElementById("links")?.setAttribute("class", "nav-link")
              document.getElementById("profile")?.setAttribute("class", "nav-link tex-dark fw-800")
              break;
            default:
              document.getElementById("preview")?.setAttribute("class", "nav-link")
              document.getElementById("links")?.setAttribute("class", "nav-link")
              document.getElementById("profile")?.setAttribute("class", "nav-link")
              break;
          }
        }
      }
    });
  }

  logout(){
    localStorage.removeItem("token")
  }
}

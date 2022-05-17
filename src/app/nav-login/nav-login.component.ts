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
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.startsWith("/panel")) {
          // document.getElementById(event.url.split("/")[2])?.setAttribute("class","nav-link tex-dark nav-selected")
          switch (event.url.split("/")[2]) {
            case "preview":
              document.getElementById("preview")?.setAttribute("classs", "nav-link tex-dark nav-selected")
              document.getElementById("links")?.setAttribute("classs", "nav-link")
              document.getElementById("profile")?.setAttribute("classs", "nav-link")
              break;
            case "links":
              document.getElementById("preview")?.setAttribute("classs", "nav-link")
              document.getElementById("links")?.setAttribute("classs", "nav-link tex-dark nav-selected")
              document.getElementById("profile")?.setAttribute("classs", "nav-link")
              break;
            case "profile":
              document.getElementById("preview")?.setAttribute("classs", "nav-link")
              document.getElementById("links")?.setAttribute("classs", "nav-link")
              document.getElementById("profile")?.setAttribute("classs", "nav-link tex-dark nav-selected")
              break;
            default:
              document.getElementById("preview")?.setAttribute("classs", "nav-link")
              document.getElementById("links")?.setAttribute("classs", "nav-link")
              document.getElementById("profile")?.setAttribute("classs", "nav-link")
              break;
          }
        }
      }
    });
  }
}

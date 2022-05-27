import { Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router){}
  login = false

  ngOnInit(): void {

    if(localStorage.getItem("token") == null){
      this.login = true
    }else{
      this.login = false
    }
  }

  logout() {
    localStorage.removeItem("token")
    location.reload()
  }
}

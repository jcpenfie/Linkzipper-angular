import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(){}
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

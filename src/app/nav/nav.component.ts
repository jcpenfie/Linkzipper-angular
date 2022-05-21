import { Component, OnInit, Input} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  login = false

  ngOnInit(): void {

    if(Object.keys(AppComponent.userLogin).length === 0){
      this.login = true
    }else{
      this.login = false
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showMenuHead: boolean = true
  showMenuFoot: boolean = true
  showMenuLogin: boolean = false

  constructor(private router: Router) { }

  public static userLogin: any = {};


  ngOnInit(): void {
    
    if(localStorage.getItem("cookiesAccpet") == null){
      Swal.fire({
        title: 'Do you like cookies? &#x1F36A;',
        text: 'We use cookies to ensure you get the best experience on our website.',
        target: '#custom-target',
        showCancelButton:true,
        cancelButtonText: '<a class= "text-dark" href="https://cookiesandyou.com/" target="_blank">Learn more</a>',
        cancelButtonColor: '#E9E6E1' ,
        confirmButtonColor: '#3D3D3D',
        customClass: {
          container: 'position-absolute'
        },
        toast: true,
        position: 'bottom-right'
      }).then((result) =>{
        if(result.isConfirmed){
          localStorage.setItem("cookiesAccpet","ACCPETED")
        }
      })
    }

    this.router.events.forEach((event) => {

      if (event instanceof NavigationStart) {
        if (!event.url.startsWith("/@")) {
          this.showMenuHead = true
          this.showMenuFoot = true
        } else {
          this.showMenuHead = false
          this.showMenuFoot = false
        }
      }
    });
  }

  cookieAccept(){
    
    
  }
}

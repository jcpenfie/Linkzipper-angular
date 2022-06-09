import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  usernameSearch: any

  dataList: Array<String> = []

  constructor(private router: Router, private searchService: SearchService) { }
  login = false

  ngOnInit(): void {

    if (localStorage.getItem("token") == null) {
      this.login = true
    } else {
      this.login = false
    }

    const search: any = document.getElementById("searchInput");
    const keyup = fromEvent(search, 'keyup')

    keyup.pipe(
      map((e: any) => e.currentTarget.value),
      debounceTime(500)
    ).subscribe(res => {
      this.usernameSearch = res
      this.searchName()
    });

  }

  logout() {
    localStorage.removeItem("token")
    location.reload()
  }

  searchName() {
    this.dataList = []
    this.searchService.searchName(this.usernameSearch).subscribe(res => {
      let data = res
      if (this.usernameSearch != "" && this.dataList.length < 5) {
        Object.entries(data).forEach(entry => {
          const [key, value] = entry;
          this.dataList.push(value.userName)
        });
      }

    })

  }

  sendName() {
    if(this.dataList.length != 0){
      this.router.navigate(['/@' + this.usernameSearch])
    }else{
      this.emptyNotification()
    }
  }

  //Notifications

  emptyNotification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      background: "#dc3545",
      color: "#ffff",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      title: 'There is no a user with that name'
    })
  }
}

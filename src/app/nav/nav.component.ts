import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

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

  sendName(){
    this.router.navigate(['/@'+ this.usernameSearch])
  }
}

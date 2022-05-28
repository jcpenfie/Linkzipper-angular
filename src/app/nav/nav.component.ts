import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'boot-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  usernameSearch: any

  dataList: Array<String> = []

  constructor(private userService: UserService) { }
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
    this.userService.searchName(this.usernameSearch).subscribe(res => {
      let data = res
      if (this.usernameSearch != "" && this.dataList.length < 5) {
        Object.entries(data).forEach(entry => {
          const [key, value] = entry;
          this.dataList.push(value.userName)
        });
      }

    })

  }

  search(){
    this.userService.search(this.usernameSearch).subscribe(res => {
      let data = res
      if (this.usernameSearch != "") {
        console.log(res);//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      }

    })
  }
}

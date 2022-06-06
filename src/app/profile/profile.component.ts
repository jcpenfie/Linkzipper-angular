import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private searchService: SearchService) { }

  // userInput = AppComponent.userLogin


  username = this.actRoute.snapshot.paramMap.get('username'); //recibir datos de la api

  user:any = { }

  ngOnInit(): void {
    this.searchService.search(this.username).subscribe(res => {
      this.user = res
      this.user = this.user[0]
    })

    //TODO: Recoger los links según la id del usuario y hacerle un push al array this.user
  }

  heigth = this.username ? "height: 100vh;"
    : "height: 100vh;"


}

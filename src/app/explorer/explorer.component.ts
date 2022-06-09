import { Component, OnInit, HostListener } from '@angular/core';
import { ExploreService } from '../explore.service';
import { LikesService } from '../likes.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  completed:boolean = false //estado de la carga


  users: any; //almaceno todos los usarios traidos de la api
  idUser!: any; //almaceno el id del usuario logueado
  likes: any = [0] //almacena los likes

  //para el scroll infinito
  usersToShow!: Array<string>; //Almacena los usuarios que se van a mostrar
  private finishPage = 5; //Paginado
  private actualPage: number; //Indica cuantas veces se ha ejecutado el paginado
  showGoUpButton: boolean; //Indica si el btn está oculto o no
  showScrollHeight = 400; //Indica cuando se muestra el botón para ir arriba según el alto de la pantalla
  hideScrollHeight = 200; //Indica cuando se oculta el botón para ir arriba según el alto de la pantalla

  constructor(private exploreService: ExploreService, private userService: UserService, private likeService: LikesService) {
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.exploreService.explore().subscribe(res => {      
      this.users = res
      this.usersToShow = new Array<string>();
      if(localStorage.getItem("token") == null){
        this.addUsers();
      }
    })

    //recogida del usuario logueado
    if (localStorage.getItem("token") != null) {
      this.userService.getUser(localStorage.getItem("token")).subscribe(res => {
        console.log(res);
        
        this.setUser(res)
      })
    }

  }

  //metodo que añade los usuarios al array que se va a mostrar
  addUsers() {
    let lineCounter = this.usersToShow.length;
    for (let i = 0; i < 40; i++) {
      if (this.users[lineCounter] != null) {
        this.usersToShow.push(this.users[lineCounter]);
      }
      lineCounter++;
    }
    this.completed = true
  }

  //metodo que se ejecuta cuando se hace scroll según si está al final de la página
  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.addUsers();
      this.actualPage++;
    }
  }


  //Pone el scroll arriba del todo de la página
  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }


  // Boton para volver arribo usando la librería ngx-infinite-scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  setUser(data: any) {
    this.idUser = data.id;
    this.getLikes()
  }


  //recogida de likes dados por el usuario logueado
  getLikes() {
    this.likeService.show(this.idUser).subscribe(res => {
      const likesRes: any = res
      let likes = []
      for (let i = 0; i < likesRes.likes.length; i++) {
        likes.push(likesRes.likes[i][0].id)
      }
      this.likes = likes
      this.setLiked()
    })
  }

  //añade a los usuarios correspondientes si tiene el like o no
  setLiked() {
    for (let i = 0; i < this.likes.length; i++) {
      for (let j = 0; j < this.users.length; j++) {        
        if(this.likes[i] == this.users[j].id){
          this.users[j].liked = true
        }
      }
    }
    this.addUsers();
    
  }
}

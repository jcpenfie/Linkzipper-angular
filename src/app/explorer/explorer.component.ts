import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  users: any; //almaceno todos los usarios traidos de la api


  usersToShow!: Array<string>; //Almacena los usuarios que se van a mostrar
  private finishPage = 5; //Paginado
  private actualPage: number; //Indica cuantas veces se ha ejecutado el paginado
  showGoUpButton: boolean; //Indica si el btn está oculto o no
  showScrollHeight = 400; //Indica cuando se muestra el botón para ir arriba según el alto de la pantalla
  hideScrollHeight = 200; //Indica cuando se oculta el botón para ir arriba según el alto de la pantalla

  constructor(private userService: UserService) {
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.userService.explore().subscribe(res => {
      this.users = res
      this.usersToShow = new Array<string>();
      this.addUsers();
    })

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
}

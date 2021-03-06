import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { TermsComponent } from './terms/terms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { RouterModule, UrlSegment } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { PanelLinksComponent } from './panel-links/panel-links.component';
import { PanelProfileComponent } from './panel-profile/panel-profile.component';
import { UserLikesComponent } from './user-likes/user-likes.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { DescripcionPipe } from './descripcion.pipe';
import { UnidadesLikesPipe } from './unidades-likes.pipe';
import { HelpComponent } from './help/help.component';
import { CargaComponent } from './carga/carga.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    IndexComponent,
    TermsComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    ExplorerComponent,
    ProfileComponent,
    CardProfileComponent,
    PanelLinksComponent,
    PanelProfileComponent,
    UserLikesComponent,
    DescripcionPipe,
    UnidadesLikesPipe,
    HelpComponent,
    CargaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{
      matcher: (url) => {
        if (url.length === 1 && url[0].path.match(/^@[\w]+$/gm)) {
          return {
            consumed: url,
            posParams: {
              username: new UrlSegment(url[0].path.substr(1), {})
            }
          };
        }
    
        return null;
      },
      component: ProfileComponent
    }]),
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

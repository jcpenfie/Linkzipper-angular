import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { TermsComponent } from './terms/terms.component';
import { NavLoginComponent } from './nav-login/nav-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { RouterModule, UrlSegment } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    IndexComponent,
    TermsComponent,
    NavLoginComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    ExplorerComponent,  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
      component: TermsComponent
    }]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

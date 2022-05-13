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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

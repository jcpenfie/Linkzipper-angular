import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'explore',
    component: TermsComponent
  },
  {
    path: 'panel',
    component: TermsComponent
  },
  {
    path: 'links',
    component: TermsComponent
  },
  {
    path: 'preview',
    component: TermsComponent
  },
  {
    path: 'profile/:nro', //profile/idUsuario
    component: TermsComponent
  },
  {
    path: 'likes',
    component: TermsComponent
  },
  {
    path: 'search',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

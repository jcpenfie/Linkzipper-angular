import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
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
    path: 'EXPLORE',
    component: ExplorerComponent
  },
  {
    path: 'panel',
    component: TermsComponent
  },
  {
    path: 'panel/links',
    component: TermsComponent
  },
  {
    path: 'panel/preview',
    component: TermsComponent
  },
  {
    path: 'panel/profile/:nro', //profile/idUsuario
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

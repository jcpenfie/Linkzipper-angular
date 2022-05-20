import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { IndexComponent } from './index/index.component';
import { PanelLinksComponent } from './panel-links/panel-links.component';
import { PanelProfileComponent } from './panel-profile/panel-profile.component';
import { ProfileComponent } from './profile/profile.component';
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
    component: PanelProfileComponent
  },
  {
    path: 'panel/profile',
    component: PanelProfileComponent
  },
  {
    path: 'panel/links',
    component: PanelLinksComponent
  },
  {
    path: 'panel/preview',
    component: ProfileComponent
  },
  {
    path: 'likes',
    component: TermsComponent
  },
  {
    path: 'search',
    component: TermsComponent
  },
  {
    path: 'help',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

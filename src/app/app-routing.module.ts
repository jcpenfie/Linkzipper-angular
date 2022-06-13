import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';
import { HelpComponent } from './help/help.component';
import { IndexComponent } from './index/index.component';
import { PanelLinksComponent } from './panel-links/panel-links.component';
import { PanelProfileComponent } from './panel-profile/panel-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { TermsComponent } from './terms/terms.component';
import { UserLikesComponent } from './user-likes/user-likes.component';

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
    component: ExplorerComponent
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
    path: 'panel/profile/likes',
    component: UserLikesComponent
  },
  {
    path: 'search',
    component: TermsComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleViewComponent } from './role-view/role-view.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { LoginComponent } from './login/login.component';
import { EssaisComponent } from './essais/essais.component';
import { ChatsComponent } from './chats/chats.component';
import { PersonnaliserComponent } from './personnaliser/personnaliser.component';
import { ProfileComponent } from './profile/profile.component';
import { ParametreCompteComponent } from './parametre-compte/parametre-compte.component';

const routes: Routes = [
  {path:'',component:LoginComponent},


  {path:'sidebar',component:SidebarComponent},
  {path:'userslist',component:UsersListComponent},
  {path:'rolelist',component:RoleListComponent},
  {path:'roleview',component:RoleViewComponent},
  {path:'permission',component:PermissionsComponent},
  {path:'usersview',component:UsersViewComponent},
  {path:'essais',component:EssaisComponent},
  {path:'chats',component:ChatsComponent},
  {path:'personnaliser',component:PersonnaliserComponent},
  {path:'profile',component:ProfileComponent},
  {path:'parametre',component:ParametreCompteComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

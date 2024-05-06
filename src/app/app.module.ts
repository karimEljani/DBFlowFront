import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleViewComponent } from './role-view/role-view.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UsersService } from './_service/users.service';
import { LoginComponent } from './login/login.component';
import { EssaisComponent } from './essais/essais.component';
import { ChatsComponent } from './chats/chats.component';
import { PersonnaliserComponent } from './personnaliser/personnaliser.component';
import { ProfileComponent } from './profile/profile.component';
import { ParametreCompteComponent } from './parametre-compte/parametre-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersListComponent,
    RoleListComponent,
    RoleViewComponent,
    PermissionsComponent,
    UsersViewComponent,
    LoginComponent,
    EssaisComponent,
    ChatsComponent,
    PersonnaliserComponent,
    ProfileComponent,
    ParametreCompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
    
    
    
    
  
  ],
  providers:[
     AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  UsersService,
  
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }

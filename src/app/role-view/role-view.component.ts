import { Component } from '@angular/core';
import { UsersService } from '../_service/users.service';
import { EmailService } from '../_service/email-service.service';
import { Router } from '@angular/router';
import { Users } from '../_model/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.css']
})
export class RoleViewComponent {

  user: Users = new Users();

  
  users: Users[] = [];
  roles: string[] = [];
  selectedRole: string = '';
  role: string[] = ['Administrateur', 'Super-Administrateur'];
  selectedUserDetails: Users | null = null;
  constructor(private usersService: UsersService,
    private router: Router, private emailService: EmailService) { }

    ngOnInit(): void {
      this.loadUsers();
      this.loadRoles();
      this.getUsers();
  
    }
    loadRoles() {
      this.usersService.getRoles().subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            this.roles = response;
          } else if (response && Array.isArray(response.roles)) {
            this.roles = response.roles;
          } else {
            console.error('Structure de données des rôles non valide:', response);
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des rôles :', error);
        }
      );
    }
    private getUsers() {
      this.usersService.getUsersList().subscribe(data =>{
        this.users = data;
        console.log(this.users);
      });
    }
    loadUsers() {
      this.usersService.getUsersList().subscribe(
        (users) => {
          this.users = users;
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
    }

  selectUser(user: any) {
    this.usersService.selectedUserDetails = user;
    this.router.navigate(['/usersview']);
  }

  deleteUser(userId?: number) {
    if (userId !== undefined) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: 'Vous ne pourrez pas récupérer cet utilisateur!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usersService.deleteUser(userId).subscribe(
            () => {
              console.log('User deleted successfully!');
              this.getUsers();
            },
            (error) => {
              console.error('Error deleting user:', error);
              // Ajoutez ici une gestion des erreurs spécifiques, si nécessaire
            }
          );
        }
      });
    } else {
      console.error('User ID is undefined');
    }
  }
}

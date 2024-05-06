import { Component } from '@angular/core';
import { Users } from '../_model/users';
import { UsersService } from '../_service/users.service';
import { Router } from '@angular/router';
import { EmailService } from '../_service/email-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent {

  user: Users = new Users();

  
  users: Users[] = [];
  roles: string[] = [];
  selectedUserDetails: Users | null = null;
  userDetails: any;
  menuDropdownVisible: boolean = false;
  selectedRole: string = '';
  role: string[] = ['Administrateur', 'Super-Administrateur'];

  constructor(private usersService: UsersService,
    private router: Router, private emailService: EmailService) { }
    ngOnInit(): void {
      this.loadUsers();
      this.loadRoles();
      this.getUsers();
      this.userDetails = this.usersService.selectedUserDetails;

  
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
    toggleDropdown() {
      this.menuDropdownVisible = !this.menuDropdownVisible;
    }

    onSubmit() {
    console.log('Submitting user:', this.userDetails);
    
    if (this.userDetails && this.userDetails.userId) { // Ensure user data is valid
      this.usersService.updateUser(this.userDetails.userId, this.userDetails).subscribe(
        () => {
          console.log('User updated successfully!');
          
          // Show SweetAlert success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User updated successfully.',
          }).then(() => {
            // After the user clicks "OK", navigate to the user list
            this.goToUsersList();
          });
        },
        (error) => {
          console.log('Error updating user:', error);
        }
      );
    } else {
      console.error('Invalid user data:', this.userDetails);
    }
  }
  
  

  goToUsersList() {
    this.router.navigate(['/usersview']);
  }

}

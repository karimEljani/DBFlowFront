import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Users } from '../_model/users';
import { UsersService } from '../_service/users.service';
import Swal from 'sweetalert2';
import { EmailService } from '../_service/email-service.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  providers: [MessageService],
})
export class ChatsComponent implements OnInit {
  userDialog = false; // Controls visibility of the "New/Edit" user dialog
  deleteUserDialog = false; // Controls visibility of the delete user dialog
  deleteUsersDialog = false; // Controls visibility of the delete multiple users dialog

  selectedRole: string = '';

  users: Users[] = []; // Stores the list of users
  user: Users = { 
    userId: undefined,
    username: '',
    name: '',
    password: '',
    role: [],
    id: undefined,
    code: '',
    image: '',
    activated:'',
    response:'',
  };
  selectedUsers: Users[] = []; // Holds selected users for batch operations
  submitted = false; // Indicates form submission
  cols: any[] = []; // Columns configuration for PrimeNG table
  statuses: any[] = []; // Holds possible user statuses


  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef, // Change detector for force update
    private emailService:EmailService
  ) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users when component initializes
    
  }

  fetchUsers(): void {
    this.usersService.getUsersList().subscribe(
      (data) => {
        this.users = data; // Update the list of users
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  openNew(): void {
    console.log("hi");
    this.user = {
      userId: undefined,
      username: '',
      name: '',
      password: '',
      role: [],
      id: undefined,
      code: '',
      image: '',
      activated:'',
      response:'',
    };
    this.submitted = false;
    this.userDialog = true; // Open the dialog for new user creation
  }

  editUser(user: Users): void {
    this.user = { ...user }; // Clone the user object for editing
    this.userDialog = true; // Open the dialog for editing
  }

  deleteSelectedUsers(): void {
    if (this.selectedUsers.length === 0) {
        console.warn("Aucun utilisateur sélectionné pour la suppression.");
        return;
    }

    // Ouvrir le dialogue de confirmation
    this.deleteUsersDialog = true; 
}

confirmDeleteSelected(): void {
  if (this.selectedUsers.length === 0) {
      console.warn("Aucun utilisateur sélectionné pour la suppression.");
      return;
  }

  const userIds = this.selectedUsers
      .map(user => user.userId) // Obtenir les IDs
      .filter((id): id is number => id !== undefined); // Filtrer les `undefined`

  if (userIds.length === 0) {
      console.warn("Aucun ID valide pour la suppression.");
      return;
  }

  // Envoyer la demande de suppression
  this.usersService.deleteMultipleUsers(userIds).subscribe(
      () => {
          // Afficher un message de succès
          this.messageService.add({
              severity: 'success',
              summary: 'Suppression réussie',
              detail: 'Les utilisateurs sélectionnés ont été supprimés avec succès.',
              life: 3000,
          });

          this.fetchUsers(); // Recharger la liste des utilisateurs
          this.selectedUsers = []; // Effacer la sélection après suppression
      },
      (error) => {
          console.error("Erreur lors de la suppression des utilisateurs sélectionnés:", error);
          this.messageService.add({
              severity: 'error',
              summary: 'Suppression échouée',
              detail: 'La suppression des utilisateurs sélectionnés a échoué. Veuillez réessayer.',
              life: 3000,
          });
      }
  );
}




  deleteUser(user: Users): void {
    if (user.userId === undefined) {
        console.error("User ID is undefined.");
        return;
    }

    // Ouvrir le dialogue de confirmation et stocker l'utilisateur à supprimer
    this.deleteUserDialog = true; // Afficher le dialogue de confirmation
    this.user = user; // Définir l'utilisateur à supprimer
}

confirmDelete(): void {
    if (this.user.userId === undefined) {
        console.error("User ID is undefined.");
        return;
    }

    // Si confirmé, supprimer l'utilisateur et actualiser la liste des utilisateurs
    this.usersService.deleteUser(this.user.userId).subscribe(
        () => {
            // Afficher un message de succès lors de la suppression réussie
            this.messageService.add({
                severity: 'success',
                summary: 'Suppression réussie',
                detail: `L'utilisateur ${this.user.username} a été supprimé avec succès.`,
                life: 3000,
            });

            this.getUsers(); // Actualiser la liste des utilisateurs après la suppression
        },
        (error) => {
            // Gérer les erreurs lors de la suppression
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            this.messageService.add({
                severity: 'error',
                summary: 'Suppression échouée',
                detail: `La suppression de l'utilisateur ${this.user.username} a échoué. Veuillez réessayer.`,
                life: 3000,
            });
        }
    );

    this.deleteUserDialog = false; // Fermer le dialogue de confirmation après l'action
}


  private getUsers() {
    this.usersService.getUsersList().subscribe(data =>{
      this.users = data;
      console.log(this.users);
    });
  }

  

  

  hideDialog(): void {
    this.userDialog = false; // Hide the user dialog
    this.submitted = false; // Reset form submission state
  }

  saveUser(): void {
    this.submitted = true; // Indicate form submission

    if (this.user.username?.trim()) { // Ensure username is not empty
      if (this.user.userId) {
        // Update existing user
        this.usersService.updateUser(this.user.userId, this.user).subscribe(
          () => {
            // Success message for updating a user
            this.messageService.add({
              severity: 'succès',
              summary: 'Utilisateur mis à jour',
              detail: 'Les informations utilisateur ont été mises à jour.',
              life: 3000,
            });
          },
          (error) => {
            // Error handling for update failure
            console.error('Erreur lors de la mise à jour de l utilisateur :', error);
            this.messageService.add({
              severity: 'erreur',
              summary: 'Erreur de mise à jour',
              detail: 'Échec de la mise à jour de lutilisateur. Veuillez réessayer.',
              life: 3000,
            });
          }
        );
      } else {
        // Create new user
        const plainTextPassword = this.generateRandomPassword(); // Generate a random password
        
        const newUser = {
          ...this.user,
          password: plainTextPassword,
          role: [{ roleName: this.selectedRole }],
        };

        this.usersService.createUser(newUser).subscribe(
          (addedUser) => {
            // Success message for creating a new user
            this.messageService.add({
              severity: 'success',
              summary: 'Utilisateur créé',
              detail: 'Un nouvel utilisateur a été créé.',
              life: 3000,
            });

            this.users.push(addedUser); // Add the new user to the list
            this.sendEmail(addedUser, plainTextPassword); // Send an email with the generated password
          },
          (error) => {
            // Error handling for create failure
            console.error('Error creating user:', error);
            this.messageService.add({
              severity: 'Erreur',
              summary: 'Create Error',
              detail: 'Échec de la création de l utilisateur. Veuillez réessayer.',
              life: 3000,
            });
          }
        );
      }

      this.userDialog = false; // Close the user dialog after saving
    }
  }
  
  
  sendEmail(user: Users, plainTextPassword: string) {
    const emailData = {
      mailTo: user.username,
      mailSubject: 'Bienvenue dans notre application',
      mailContent: `Bonjour ${user.username}, votre compte a été créé avec succès. Votre Mot de passe est : ${plainTextPassword}`,
      mailFrom: 'karimsuslu@gmail.com'
    };

    this.emailService.sendEmail(emailData).subscribe(
      () => {
        console.log('E-mail envoyé avec succès !');
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      }
    );
  }
  generateRandomPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPassword = '';
    for (let i = 0; i < 8; i++) {
      randomPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomPassword;
  }
  
  

  onGlobalFilter(table: Table, event: Event): void {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains'); // Apply global filter to the table
  }

  
}

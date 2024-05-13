import { Component, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { UsersService } from '../_service/users.service';
import { Router } from '@angular/router';
import { Users } from '../_model/users';
import { EmailService } from '../_service/email-service.service';
import Swal from 'sweetalert2';
import { ExportService } from '../_service/export.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  user: Users = { // Default user object
    userId: undefined,
    username: '',
    name: '',
    password: '',
    role: [],
    id: undefined,
    code: '',
    image: '',
    activated:'',
      response:''
  };
  
  users: Users[] = [];
  roles: string[] = [];
  selectedRole: string = '';
  role: string[] = ['Administrateur', 'Super-Administrateur'];
  selectedUserDetails: Users | null = null;


  constructor(private usersService: UsersService,
    private router: Router, private emailService: EmailService,private exportService: ExportService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
    this.getUsers();

  }

  goToUsersList() {
    this.router.navigate(['/userslist']);
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
  
  

  onSubmit() {
    console.log(this.user);
    const plainTextPassword = this.generateRandomPassword(); // Générer le mot de passe en clair

    const newUser = {
      ...this.user,
      role: [{ roleName: this.selectedRole }]
  };

    // Créer un nouvel utilisateur via le service
    this.usersService.createUser(newUser).subscribe(
        (addedUser) => {
            console.log('Utilisateur ajouté avec succès !', addedUser);

            // Ajouter le nouvel utilisateur à la liste
            this.users.push(addedUser);

            // Afficher une notification de succès
            Swal.fire({
                icon: 'success',
                title: 'Succès !',
                text: 'Utilisateur ajouté avec succès.',
            }).then(() => {
                this.goToUsersList();
            });

            // Envoyer un e-mail à l'utilisateur ajouté avec le mot de passe en clair
            this.sendEmail(addedUser, plainTextPassword);
        },
        (error) => {
            // En cas d'erreur, afficher une notification d'erreur
            Swal.fire({
                icon: 'error',
                title: 'Erreur !',
                text: 'Échec de l\'ajout de l\'utilisateur. Veuillez réessayer.',
            });
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
    );
}
private getUsers() {
  this.usersService.getUsersList().subscribe(data =>{
    this.users = data;
    console.log(this.users);
  });
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

  generateRandomPassword(): string {
    const randomPassword = Math.random().toString(36).slice(-8); // Generates an 8-character random string
    this.user.password = randomPassword;
    return randomPassword; // Retourner le mot de passe en clair généré
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

  detailUser(userId?: number) {
    // Récupérez les détails du user en fonction de l'ID
    this.selectedUserDetails = this.users.find(user => user.userId === userId) || null;
    // Affichez la boîte de dialogue de suppression ou effectuez d'autres opérations nécessaires
  }
  selectUser(user: any) {
    this.usersService.selectedUserDetails = user;
    this.router.navigate(['/usersview']);
  }



  export() {
    const form = document.getElementById('kt_modal_export_users_form') as HTMLFormElement; // Obtenir le formulaire par son ID
    
    if (!form) {
      console.error("Formulaire introuvable");
      return;
    }
  
    const roleElement = form.querySelector('[name="role"]') as HTMLSelectElement; // Assurez-vous qu'il s'agit bien d'un select
    const formatElement = form.querySelector('[name="format"]') as HTMLSelectElement; // Assurez-vous qu'il s'agit bien d'un select
  
    if (roleElement && formatElement) { // Vérifier que les éléments existent
      const role = roleElement.value; // Récupérer la valeur du rôle
      const format = formatElement.value; // Récupérer la valeur du format
  
      if (role && format) { // Vérifier que les valeurs ne sont pas nulles ou vides
        this.exportService.exportUsers(role, format); // Appeler le service pour exporter les utilisateurs
      } else {
        console.error('Rôle et format doivent être sélectionnés.');
      }
    } else {
      console.error("Élément 'role' ou 'format' introuvable ou n'est pas un select.");
    }
  }
  

}

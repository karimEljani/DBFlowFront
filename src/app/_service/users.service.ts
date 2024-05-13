import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Users } from '../_model/users';
import { UserAuthService } from './user-auth.service';
import { EmailData } from '../_model/email-data';
import { map } from 'rxjs/operators';
import { Role } from '../_model/role'; // Assurez-vous que le chemin d'importation est correct



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = "http://localhost:8080/admin/users";
  private authURL = "http://localhost:8080/authenticate";
  private rolesUrl ="http://localhost:8080/admin/roles";
  


  private usersSubject = new BehaviorSubject<Users[]>([]);
  users$ = this.usersSubject.asObservable();

  selectedUserDetails: any;


  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService,
  ) { }

  private getRequestHeaders(): HttpHeaders {
    // Ajouter le token d'authentification si disponible
    const token = this.userAuthService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public login(loginData: NgForm): Observable<any> {
    // Utiliser la nouvelle méthode getRequestHeaders pour obtenir les en-têtes
    return this.httpClient.post(this.authURL, loginData, {
      headers: this.getRequestHeaders()
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }

    return false;
  }

  getUsersList(): Observable<Users[]> {
    // Utiliser la nouvelle méthode getRequestHeaders pour obtenir les en-têtes
    return this.httpClient.get<Users[]>(this.baseURL, { headers: this.getRequestHeaders() });
  }

  

  createUser(user: Users): Observable<Users> {
    return this.httpClient.post<Users>(this.baseURL, user, { headers: this.getRequestHeaders() })
      .pipe(
        tap((addedUser) => {
          const currentUsers = this.usersSubject.value;
          // Mettez à jour le tableau d'utilisateurs et émettez une nouvelle valeur
          this.usersSubject.next([...currentUsers, addedUser]);
        })
      );
  }

  getUserById(userId: number): Observable<Users> {
    // Utiliser la nouvelle méthode getRequestHeaders pour obtenir les en-têtes
    return this.httpClient.get<Users>(`${this.baseURL}/${userId}`, { headers: this.getRequestHeaders() });
  }

  // updateUser(userId: number, user: Users): Observable<Object> {
  // Utiliser la nouvelle méthode getRequestHeaders pour obtenir les en-têtes
  //  return this.httpClient.put(`${this.baseURL}/${userId}`, user, { headers: this.getRequestHeaders() });
  //}
  updateUser(userId: number, user: Users): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${userId}`, user, { headers: this.getRequestHeaders() });
  }
  

  deleteUser(userId: number): Observable<void> {
    const url = `${this.baseURL}/${userId}`;

    return this.httpClient.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  sendEmail(emailData: EmailData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/sendemail`, emailData);
  }

  getRoles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.rolesUrl);
  }
  
  addUserByAdmin(user: any, selectedRole: string) {
    return this.httpClient.post('/admin/users', user, { params: { selectedRole } });
  }

  
  deleteMultipleUsers(userIds: number[]): Observable<void> {
    const url = `${this.baseURL}/delete-multiple`; // Ne pas inclure de valeurs dans le chemin
    const body = { userIds }; // Envoyer les IDs dans le corps de la requête

    return this.httpClient.request<void>('DELETE', url, {
        headers: this.getRequestHeaders(),
        body, // Envoyer le corps
    }).pipe(
        catchError((error) => {
            console.error("Erreur lors de la suppression des utilisateurs:", error);
            return throwError("La suppression a échoué. Veuillez réessayer.");
        })
    );
}







  

  
  
}

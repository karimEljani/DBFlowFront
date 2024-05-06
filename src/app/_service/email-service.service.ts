import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8080/admin/users/sendemail'; // Mettez ici l'URL de votre point de terminaison d'envoi d'e-mails

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any) {
    return this.http.post(this.apiUrl, emailData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver'; // Assurez-vous que file-saver est importé

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private baseUrl = 'http://localhost:8080/export'; 

  constructor(private http: HttpClient) {}

  exportUsers(role: string, format: string) {
    
    const exportUrl = `${this.baseUrl}?role=${role}&format=${format}`;

    this.http
      .get(exportUrl, {
        responseType: 'blob', 
      })
      .subscribe(
        (blob) => {
          const fileName = `users.${format}`; 
          saveAs(blob, fileName); 
        },
        (error) => {
          console.error("Erreur lors de l'exportation des utilisateurs:", error); 
        }
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EssaiClinique } from '../_model/essai-clinique';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EssaisService {

  private baseUrl = 'http://localhost:8080/essais-cliniques'; // Remplacez cette URL par l'URL de votre backend Spring Boot
  private baseUrl1 = 'http://localhost:8080/essais';
  constructor(private http: HttpClient) { }

  enregistrerEssaiClinique(essaiClinique: EssaiClinique): Observable<EssaiClinique> {
    return this.http.post<EssaiClinique>(`${this.baseUrl}`, essaiClinique);
  }


  getAllEssais(): Observable<EssaiClinique[]> {
    return this.http.get<EssaiClinique[]>(`${this.baseUrl1}`);
  }

}

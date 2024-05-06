import { Component } from '@angular/core';
import { EssaisService } from '../_service/essais.service';
import { EssaiClinique } from '../_model/essai-clinique';

@Component({
  selector: 'app-essais',
  templateUrl: './essais.component.html',
  styleUrls: ['./essais.component.css']
})
export class EssaisComponent {

  //essaiClinique: any = {};
  essaisCliniques: EssaiClinique[] = [];

  calendrierTheorique: any = {};
  gb: any = {};
  essaiClinique: EssaiClinique = new EssaiClinique();

  constructor(private essaiCliniqueService :EssaisService) { }
  ngOnInit(): void {
    this.loadEssais();
  }

  sauvegarder(): void {
    this.essaiCliniqueService.enregistrerEssaiClinique(this.essaiClinique)
      .subscribe(response => {
        console.log('Enregistrement réussi : ', response);
        // Réinitialiser le formulaire ou effectuer d'autres actions après l'enregistrement réussi
      }, error => {
        console.error('Erreur lors de l\'enregistrement : ', error);
      });
  }
  onSubmit(): void {
    this.essaiCliniqueService.enregistrerEssaiClinique(this.essaiClinique)
      .subscribe(response => {
        console.log('Enregistrement réussi : ', response);
        // Réinitialiser le formulaire ou effectuer d'autres actions après l'enregistrement réussi
      }, error => {
        console.error('Erreur lors de l\'enregistrement : ', error);
      });
  }

  loadEssais(): void {
    this.essaiCliniqueService.getAllEssais()
      .subscribe(essais => {
        this.essaisCliniques = essais;
      });
  }
}

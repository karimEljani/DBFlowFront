import { Injectable } from '@angular/core';
import { HistoriqueEntry } from '../_model/historique-entry';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historique: HistoriqueEntry[] = [];

  constructor() { }

  addToHistorique(action: string) {
    const entry: HistoriqueEntry = {
      action: action,
      timestamp: new Date()
    };
    this.historique.push(entry);
  }

  getHistorique(): HistoriqueEntry[] {
    return this.historique;
  }}

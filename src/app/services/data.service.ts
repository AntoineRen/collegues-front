import { Injectable } from '@angular/core';
import { listeMatricule } from '../mock/matricules.mock';
import Collegue from '../models/Collegue';
import { collegueMock } from '../mock/collegues.mock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  rechercherParNom(nom: string): string[]{
    return listeMatricule;
  }

  recupererCollegueCourant(): Collegue{
    return collegueMock;
  }
}

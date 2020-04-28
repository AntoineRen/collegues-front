import { Injectable } from '@angular/core';
import { listeMatricule } from '../mock/matricules.mock';
import Collegue from '../models/Collegue';
import { collegueMock } from '../mock/collegues.mock';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import CollegueSaisie from '../models/CollegueSaisie';

const URL_BACKEND = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /** Subject de collegues */
  private collegueCourant = new Subject<Collegue>();
  /** Cache de collegues */
  private cacheCollegue = new Map();

  constructor(private http: HttpClient) { }

  /** Effectue une requête pour obtenir la liste des matricules en fonction d'un nom */
  rechercherParNom(nom: string): Observable<string[]> {

    this.cacheCollegue = new Map(); // clear cache

    return this.http.get<string[]>(URL_BACKEND + '?nom=' + nom);
  }

  /** Rend le collegue mock par défaut au début de l'application */
  recupererCollegueDefaut(): Collegue{
    return collegueMock;
  }

  /** push un collegue dans le subject */
  requestGetCollegue(matricule: string){

    if (this.cacheCollegue.has(matricule)){ // si collegue déja présent en cache

      this.collegueCourant.next(this.cacheCollegue.get(matricule));

    }else{

      this.http.get<Collegue>(URL_BACKEND + matricule).subscribe( collegue => {

        this.cacheCollegue.set(collegue.matricule, collegue); // add to cache
        this.collegueCourant.next(collegue);

      }, error => {
        console.log(`Erreur ${error.message}`);
      }
      );
    }

  }

  creerCollegue(collegueSaisie: CollegueSaisie){
    return this.http.post<Collegue>(URL_BACKEND, collegueSaisie).subscribe( collegue => {
      this.collegueCourant.next(collegue);
    }), error => {
      console.log(`Erreur ${error.message}`);
    };
  }

  /** Getter qui retourne le subject sous forme d'observable */
  get colCourant() {
    return this.collegueCourant.asObservable();
  }
}

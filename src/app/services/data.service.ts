import { Injectable } from '@angular/core';
import { listeMatricule } from '../mock/matricules.mock';
import Collegue from '../models/Collegue';
import { collegueMock } from '../mock/collegues.mock';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import CollegueSaisie from '../models/CollegueSaisie';
import CollegueModif from '../models/CollegueModif';
import { tap } from 'rxjs/operators';

const URL_BACKEND = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /** Subject de collegues */
  private collegueCourant = new BehaviorSubject<Collegue>(collegueMock);
  /** Subject pour mode creation */
  private modeCreation = new Subject<boolean>();
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
    return this.http.post<Collegue>(URL_BACKEND, collegueSaisie).pipe(
      tap(collegue => {
        this.collegueCourant.next(collegue);
        this.desactiverModeCreation();
      })
    );
  }

  /** modifie un collègue */
  updateCollegue(collegueModif: CollegueModif){

    return this.http.patch<Collegue>(URL_BACKEND + collegueModif.matricule, collegueModif).pipe(
      tap(collegue => {
        this.collegueCourant.next(collegue);
      })
    );
  }

  activerModeCreation(){
    this.modeCreation.next(true);
  }

  desactiverModeCreation(){
    this.modeCreation.next(false);
  }

  /** Getter qui retourne le subject collegueCourant sous forme d'observable */
  get colCourant() {
    return this.collegueCourant.asObservable();
  }

  /** Getter qui retourne le subject modeCreation sous forme d'observable */
  get modeCrea() {
    return this.modeCreation.asObservable();
  }
}

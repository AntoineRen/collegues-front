import { Injectable } from '@angular/core';
import { listeMatricule } from '../mock/matricules.mock';
import Collegue from '../models/Collegue';
import { collegueMock } from '../mock/collegues.mock';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

const URL_BACKEND = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  rechercherParNom(nom: string): Observable<string[]> {

    return this.http.get<string[]>(URL_BACKEND + '?nom=' + nom);
  }

  recupererCollegueCourant(): Collegue{
    return collegueMock;
  }
}

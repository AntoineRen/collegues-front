import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import Collegue from '../models/Collegue';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css']
})
export class CollegueComponent implements OnInit, OnDestroy {

  /** Objet Collegue transmettant les infos au html */
  col: Collegue = this.dataService.recupererCollegueDefaut();
  /** boolean indique si on est entrain de modifier les infos d'un collègue */
  public modif = false;
  /**  Abonnement a un subject qui renvoie des collègues */
  collegueSub: Subscription;

  constructor(private dataService: DataService) { }

  /** passage en mode modification */
  modifier() {
    this.modif = true;
  }

  /** validation des modifications */
  valider(newEmail, newPhoto) {
    this.modif = false;
    this.col.email = newEmail;

    if (newPhoto.length > 0) {
      this.col.photoUrl = newPhoto;
    }

  }

  nouveauCollegue() {
    console.log('Création d’un nouveau collègue');
  }

  /** abonnement au subject lors de l'initialisation du composant */
  ngOnInit(): void {
    this.collegueSub = this.dataService.colCourant.subscribe( collegue => {
      this.col = collegue;
    }, error => {
      console.log(`Erreur : ${error.message}`);
    });
  }

  /** désabonnement du subject */
  ngOnDestroy() {
    this.collegueSub.unsubscribe();
  }
}

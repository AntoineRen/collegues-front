import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import Collegue from '../models/Collegue';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import CollegueModif from '../models/CollegueModif';

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css']
})
export class CollegueComponent implements OnInit, OnDestroy {

  /** Objet Collegue transmettant les infos au html */
  col: Collegue;
  /** boolean indique si on est entrain de modifier les infos d'un collègue */
  public modif = false;
  /**  Abonnement a un subject qui renvoie des collègues */
  collegueSub: Subscription;
  /** Si aucun collègue n'a pu être récupérer */
  public error = false;
  /** Si erreur modification */
  public errorModif = false;
  /** collegueModif contenant les valeurs à modifier */
  public collegueModif: CollegueModif = {};
  /** sur validation d'une modification */
  public submit = false;

  constructor(private dataService: DataService) { }

  /** passage en mode modification */
  modifier() {
    this.modif = true;
  }

  /** validation des modifications */
  valider() {

    this.submit = true;

    if (this.collegueModif.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]') && this.collegueModif.photoUrl.length >= 7){

      this.dataService.updateCollegue(this.collegueModif).subscribe(
        () => this.modif = false,
        error => this.errorModif = true
      );
    }
  }

  nouveauCollegue() {
    this.dataService.activerModeCreation();
  }

  /** abonnement au subject lors de l'initialisation du composant */
  ngOnInit(): void {
    this.collegueSub = this.dataService.colCourant.subscribe( collegue => {
      this.col = collegue;

      this.collegueModif.matricule = this.col.matricule;
      this.collegueModif.email = this.col.email;
      this.collegueModif.photoUrl = this.col.photoUrl;
    }, error => {
      this.error = true;
    });
  }

  /** désabonnement du subject */
  ngOnDestroy() {
    this.collegueSub.unsubscribe();
  }
}

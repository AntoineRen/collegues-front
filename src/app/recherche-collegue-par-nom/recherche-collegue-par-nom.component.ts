import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit, OnDestroy {

  /** Boolean définnissant si on affiche la liste de matricules */
  public affListe = false;
  /** Liste de matricule */
  public listeMatricule: string[];
  /** Abonnement à un observable */
  public subToRechercheParNom: Subscription;

  constructor(private dataService: DataService) { }

  /** Reçoit les matricules via dataService pour alimenter la liste */
  afficherListe(nomRecherche: string) {

    this.subToRechercheParNom = this.dataService.rechercherParNom(nomRecherche).subscribe(data => {
      this.listeMatricule = data;
    }, error => {
      console.log(`erreur : ${error}`);
    });

    this.affListe = true;
  }

  /** Appel le dataService pour lancer une recherche d'un collègue en fonction d'un matricule */
  afficherCollegue(matricule: string){
    this.dataService.requestGetCollegue(matricule);
  }

  ngOnInit(): void {
  }

  /** suppression de l'abonnement à l'observable */
  ngOnDestroy(): void {
    this.subToRechercheParNom.unsubscribe();
  }

}

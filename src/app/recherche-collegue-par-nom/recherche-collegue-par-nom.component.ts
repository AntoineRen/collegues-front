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
  /** Indique si aucun collègue n'a été trouvé */
  public aucunCollegue = false;
  /** Si il y a eu une erreur dans la requete */
  public error = false;

  constructor(private dataService: DataService) { }

  /** Reçoit les matricules via dataService pour alimenter la liste */
  afficherListe(nomRecherche: string) {

    this.subToRechercheParNom = this.dataService.rechercherParNom(nomRecherche).subscribe(data => {
      this.listeMatricule = data;
      this.error = false;

      if (data.length > 0){
        this.aucunCollegue = false;
        this.affListe = true;
      }else{
        this.aucunCollegue = true;
      }

    }, error => {
      this.error = true;
    });

  }

  /** Appel le dataService pour lancer une recherche d'un collègue en fonction d'un matricule */
  afficherCollegue(matricule: string){
    this.dataService.requestGetCollegue(matricule);
    this.dataService.desactiverModeCreation();
  }

  ngOnInit(): void {
  }

  /** suppression de l'abonnement à l'observable */
  ngOnDestroy(): void {
    this.subToRechercheParNom.unsubscribe();
  }

}

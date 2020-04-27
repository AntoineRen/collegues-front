import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit {

  public affListe = false;
  public listeMatricule: string[];

  constructor(private dataService: DataService) { }

  afficherListe(nomRecherche: string) {

    this.dataService.rechercherParNom(nomRecherche).subscribe(data => {
      this.listeMatricule = data;
    }, error => {
      console.log(`erreur : ${error}`);
    });

    this.affListe = true;
  }

  afficherCollegue(matricule: string){
    this.dataService.requestGetCollegue(matricule);
  }

  ngOnInit(): void {
  }

}

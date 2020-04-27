import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit {

  public affListe = false;
  public listeMatricule = this.dataService.rechercherParNom('temp');

  constructor(private dataService: DataService) { }

  afficherListe() {
    this.affListe = true;
  }

  ngOnInit(): void {
  }

}

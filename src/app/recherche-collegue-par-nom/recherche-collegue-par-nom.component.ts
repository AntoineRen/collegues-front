import { Component, OnInit, Input } from '@angular/core';
import {listeMatricule} from '../mock/matricules.mock';

@Component({
  selector: 'app-recherche-collegue-par-nom',
  templateUrl: './recherche-collegue-par-nom.component.html',
  styleUrls: ['./recherche-collegue-par-nom.component.css']
})
export class RechercheCollegueParNomComponent implements OnInit {

  public affListe = false;
  public listeMatricule = listeMatricule;

  constructor() { }

  afficherListe(){
    this.affListe = true;
  }

  ngOnInit(): void {
  }

}

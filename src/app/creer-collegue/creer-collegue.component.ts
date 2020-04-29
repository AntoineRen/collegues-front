import { Component, OnInit } from '@angular/core';
import CollegueSaisie from '../models/CollegueSaisie';
import {DataService} from '../services/data.service';
@Component({
  selector: 'app-creer-collegue',
  templateUrl: './creer-collegue.component.html',
  styleUrls: ['./creer-collegue.component.css']
})
export class CreerCollegueComponent implements OnInit {

  public collegueSaisie: CollegueSaisie = {};
  public submit = false;
  public error = false;
  public previPhoto = false;

  constructor(private dataService: DataService) { }

  creerCollegue(){
    this.submit = true;

    if (this.collegueSaisie.nom && this.collegueSaisie.prenoms && this.collegueSaisie.dateDeNaissance
      && this.collegueSaisie.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]')
       && this.collegueSaisie.photoUrl && this.collegueSaisie.photoUrl.length >= 7){

        this.dataService.creerCollegue(this.collegueSaisie).subscribe( () => {}, error => this.error = true);
      }
  }

  previsualiserPhoto(){
    this.previPhoto = true;
  }

  ngOnInit(): void {
  }

}

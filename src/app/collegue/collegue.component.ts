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

  col: Collegue = this.dataService.recupererCollegueDefaut();
  public modif = false;
  collegueSub: Subscription;

  constructor(private dataService: DataService) { }

  modifier() {
    this.modif = true;
  }

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

  ngOnInit(): void {
    this.collegueSub = this.dataService.colCourant.subscribe( collegue => {
      this.col = collegue;
    }, error => {
      console.log(`Erreur : ${error.message}`);
    });
  }

  ngOnDestroy() {
    this.collegueSub.unsubscribe();
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Collegue from '../models/Collegue';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.css']
})
export class CollegueComponent implements OnInit {

  col: Collegue = this.dataService.recupererCollegueCourant();
  public modif = false;

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
  }

}

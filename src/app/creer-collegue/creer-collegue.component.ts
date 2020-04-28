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

  constructor(private dataService: DataService) { }

  creerCollegue(){
    this.dataService.creerCollegue(this.collegueSaisie);
  }

  ngOnInit(): void {
  }

}

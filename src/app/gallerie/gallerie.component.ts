import { Component, OnInit } from '@angular/core';
import { MatPhoto } from '../models/MatPhoto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-gallerie',
  templateUrl: './gallerie.component.html',
  styleUrls: ['./gallerie.component.css']
})
export class GallerieComponent implements OnInit {

  /** liste contenant les matricules et photos de tous les collègues */
  public matPhotos: MatPhoto[];
  /** boolean si erreur de requète */
  public error = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllMatPhoto().subscribe(
      data => this.matPhotos = data,
      error => this.error = true
    );
  }

}

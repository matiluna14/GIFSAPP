import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gisfService: GifsService) {}

  private _historial: string[] = [];
  get historial(){
    return [...this.gisfService.historial];
  }


  buscar(argumento: string){

    this.gisfService.buscarGifs(argumento);

  }



}

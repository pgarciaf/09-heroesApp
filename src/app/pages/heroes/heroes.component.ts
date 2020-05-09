import { Component, OnInit } from '@angular/core';
import { HeroesServiceService } from 'src/app/services/heroes-service.service';
import { IHeroe } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  lstHeroes: IHeroe[] = [];
  constructor(private serviceHeroes: HeroesServiceService) { }

  ngOnInit(): void {
    let peticion: Observable<any>;
    peticion = this.serviceHeroes.getHeroes();

    peticion.subscribe(p => {
      this.lstHeroes = p;
    });

  }

  deleteHeroe(){
  }

  addHeroe(){

    //const loHeroe: IHeroe = { id: '', nombre: 'Pedro', poder: 'Limpiar', vivo: true};
    //this.serviceHeroes.addHeroe(loHeroe).then(p => console.log(p)).catch(p => console.warn(p));
  }
}




import { Injectable } from '@angular/core';
import { IHeroe } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesServiceService {
  private url = 'https://heroesapp-68f2b.firebaseio.com';
  
  constructor(private http: HttpClient) { 
  }

  addHeroe(loHeroe: IHeroe) {
    return this.http.post(`${this.url}/heroes.json`, loHeroe)
            .pipe(
              map((resp: any) => {
                loHeroe.id = resp.name;
                return loHeroe;
              })
            );
  }

  updateHeroe(loHeroe: IHeroe){
    const tempHeroe = {
      ...loHeroe
    };

    delete tempHeroe.id;
    return this.http.put(`${this.url}/heroes/${loHeroe.id}.json`, tempHeroe);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map(p => {
                return this.crearArreglo(p);
              })
            );
  }

  private crearArreglo(heroesObj: object){
    const lstHeroes: IHeroe[] = [];
    if (heroesObj === null) { return []; }
    Object.keys(heroesObj).forEach(key => {
      const heroe: IHeroe = heroesObj[key];
      heroe.id = key;
      lstHeroes.push(heroe);
    });
    //console.log(lstHeroes);
    return lstHeroes;
  }



}

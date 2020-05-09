import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IHeroe } from '../../models/heroe.model';
import { HeroesServiceService } from '../../services/heroes-service.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  loHeroe = new IHeroe();
  constructor(private serviceHeroe: HeroesServiceService) { }

  ngOnInit(): void {
  }

  addHeroe(form: NgForm){
    if (form.invalid){
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    
    if(this.loHeroe.id){
      peticion = this.serviceHeroe.updateHeroe(this.loHeroe);
    }else
    {
      peticion = this.serviceHeroe.addHeroe(this.loHeroe);
    }

    peticion.subscribe(p => {
      Swal.fire({
        title: this.loHeroe.nombre,
        text: 'Se actualizó correctamente',
        confirmButtonText: 'Cool'
      });
    });
    
    
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View. 2 -> Create. 3 -> Update
  theater: Theater;
  // Se encarga de activar la ruta
  constructor(private activateRoute: ActivatedRoute,
              private service: TheaterService,
              private router: Router
  ) {
    this.mode = 1;
    // Objeto creado por defecto, enlaza la vista con el controlador
    this.theater = {id: 0, capacity: 0, location: ""}
  }

  ngOnInit(): void {
    // Esta línea se encarga de tomarle una foto a la ruta y se la asigna a 'currentUrl'
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    // Si la ruta incluye la palabra 'view', se le asigna el modo 1
    if (currentUrl.includes('view')) {
      this.mode =  1;
    } else if (currentUrl.includes('create')) {
      this.mode =  2;
    } else if (currentUrl.includes('update')) {
      this.mode =  3;
    }
    if(this.activateRoute.snapshot.params.id) {
      /*  
      Lo que hace este condicional es tomarle una foto al 'activateRoute',
      y si viene el parámetro 'id' se le asigna al 'id' del 'theater' 
      */
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }
  }

  getTheater(id: number){
    this.service.view(id).subscribe(data => {
      this.theater = data;
    })
  }

  create() {
    this.service.create(this.theater).subscribe(data => {
      Swal.fire("Completado", "Se ha creado correctamente", "success");
      this.router.navigate(['theaters/list'])
    })
  }

  update(){
    this.service.update(this.theater).subscribe(data => {
      Swal.fire("Actualizado", "Se ha actualizado correctamente", "success");
      this.router.navigate(['theaters/list'])
    })
  }
}

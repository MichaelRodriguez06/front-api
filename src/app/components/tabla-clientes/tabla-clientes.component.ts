import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AirplaneFlightService } from 'src/app/services/clientes/airplane-flight.service';
import { Airflight } from 'src/app/models/airflight';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AirflightAddEditComponent } from '../cliente-add-edit/cliente-add-edit.component';
import { MatSort } from '@angular/material/sort';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Form, FormGroup } from '@angular/forms';



export interface ClienteItems {
  Id: number;
  nombre: string;
  apellido: string;
  celular: string;
  direccion: string;
  fechaNacimiento: Date;
}

const COLUMS_SCHEMA = [
  { field: 'Id', header: 'Id' },
  { field: 'sId', header: 'sId' },
  { field: 'Nombre', header: 'nombre' },
  { field: 'precio', header: 'precio' },
  { field: 'Opciones' },
];

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrls: ['./tabla-clientes.component.css'],
})
export class TablaClientesComponent implements OnInit, AfterViewInit {
  public loading: boolean = true;
  columsSchema = COLUMS_SCHEMA;
  clientList: Airflight[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'Nombre',
    'Email',
    'Clase de tiquete',
    
    'Telefono',
    
    'Opciones',
  ];

  cargando: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private matDialog: MatDialog,
    private airplaneFlightService: AirplaneFlightService
  ) {
    this.getListAirplaneflights();
  }

  getListAirplaneflights() {
    this.cargando = true;
    this.airplaneFlightService.getListAirplaneFlight().subscribe({
      next: (data) => {
        this.cargando = false;
        this.clientList = data.data;
        this.dataSource = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditClient() {
    const dialogRef = this.matDialog.open(AirflightAddEditComponent);
    this.airplaneFlightService.getAirplaneFlight('hj').subscribe({
      next: (data) => {
        console.log(data.data)
        
      },
      error: (error) => {
        console.log(error);
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (vale) => {
        if (vale) {
          this.getListAirplaneflights();
        }
      },
    });
  }

  deleteAirplaneFlight(id: string) {
    console.log(id);
    this.airplaneFlightService.deleteAirplaneFlight(id).subscribe({
      next: (data) => {
        alert('Vuelo borrado correctamente');
        this.getListAirplaneflights();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openEditForm(data: string) {
    console.log(data);
    this.airplaneFlightService.getAirplaneFlight(data).subscribe({
      next: (res) => {
        console.log(res)
        this.matDialog.open(AirflightAddEditComponent, res);
      },
      error: (error) => {
        alert('Error al obtener el vuelo');
      } 
    });
    // this.matDialog.open(AirflightAddEditComponent, {
    //   data,
    // });
  }

  ngAfterViewInit() {
    // @ts-ignore
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
  }

  deleteCliente(id: string) {
    console.log(id);
    this.airplaneFlightService.deleteAirplaneFlight(id).subscribe({
      next: (data) => {
        alert('Empleado borrado correctamente');
        this.getListAirplaneflights();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createClient() {
  }

  getStatusName(cliente: Airflight) {
    return 'FULL';
  }
}

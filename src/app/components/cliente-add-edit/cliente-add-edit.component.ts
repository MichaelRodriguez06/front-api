import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AirplaneFlightService } from 'src/app/services/clientes/airplane-flight.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.component.html',
  styleUrls: ['./cliente-add-edit.component.css'],
})
export class AirflightAddEditComponent implements OnInit {
  formParent: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private clientService: AirplaneFlightService,
    private _dialogRef: MatDialogRef<AirflightAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formParent = _fb.group({
      nombre: '',
      precio: '',
    });
  }

  ngOnInit(): void {
    this.formParent.patchValue(this.data);
    this.formParent = new FormGroup({
      _id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      ticketClass: new FormControl('', Validators.required),
      ticketId: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      flyDate: new FormControl('', Validators.required),
      destinyCountry: new FormControl('', Validators.required),
      planeScale: new FormArray([], [Validators.required]),
      company: new FormArray([], [Validators.required])
    });
  }

  addPlaneScale(): void {
    const refPlaneScale = this.formParent.get('planeScale') as FormArray;
    refPlaneScale.push(this.initFormPlaneScale());
  }

  addCompany(): void {
    const refCompany = this.formParent.get('company') as FormArray;
    refCompany.push(this.initCompanyForm());
  }

  initFormPlaneScale(): FormGroup {
    return new FormGroup({
      scale: new FormControl('', Validators.required),
    });
  }
  initCompanyForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  closeDialog() {
    this._dialogRef.close();
  }

  onFormSubmit() {
    if (this.formParent.valid) {
      if (this.data) {
        console.log(this.data.id, this.data);
        this.clientService.putAirplaneFlight(this.data.id, this.data).subscribe({
          next: (data) => {
            data.id = data.id;
            data = this.formParent.value;
            console.log(data);
            alert('El producto se actualizo correctamente');
            this._dialogRef.close(true);

          },
        });
      } else {
        var cliente = this.formParent.value;
        console.log(this.formParent.value);
        this.clientService.postAirplaneFlight(cliente).subscribe({
          next: (data) => {
            alert('Producto registrado existosamente.');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}

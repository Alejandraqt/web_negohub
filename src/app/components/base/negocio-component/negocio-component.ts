import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NegocioService } from '../../../services/negocio-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Menu } from '../../menu/menu';


@Component({
  selector: 'app-negocio-component',
  imports: [ReactiveFormsModule, CommonModule, Menu],
  templateUrl: './negocio-component.html',
  styleUrl: './negocio-component.css',
})

export class NegocioComponent {

  constructor(
    private negocioService: NegocioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  
  titlePage: string = 'Negocios';
  negociosList: any = [];
  negocioForm!: FormGroup ;
  idNegocio: any;
  editableNegocio: boolean = false;
  user = 'Usuario';


  ngOnInit() {
    this.negocioForm = this.formBuilder.group({
      razonSocial: '',
      descripcion: '',
      telefono: '',
      correo: '',
      idUsuario: '',
      idCategoria: ''
    })
    this.getAllNegocios();
  }

  getAllNegocios() {
    this.negocioService.getAllNegociosData().subscribe((data: {}) => {
      this.negociosList = data;
    });
  }

  newNegocioEntry() {
    this.negocioService.newNegocio(this.negocioForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /inicio y recargando la ventana
        this.router.navigate(['/negocio'])
          .then(() => {
            this.newMessage('Registro exitoso');
          })
      }
    );
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  updateNegocioEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.negocioForm.value) {
      if (this.negocioForm.value[key] === '') {
        this.negocioForm.removeControl(key);
      }
    }
    this.negocioService.updateNegocio(this.idNegocio, this.negocioForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Negocio editado");
      }
    );
  }

  toggleEditNegocio(id: any) {
    this.idNegocio = id;
    console.log(this.idNegocio)
    this.negocioService.getOneNegocio(id).subscribe(
      data => {
        this.negocioForm.setValue({
          razonSocial: data.razonSocial,
          descripcion: data.descripcion,
          telefono: data.telefono,
          correo: data.correo,
          idUsuario: data.idUsuario,
          idCategoria: data.idCategoria,
        });
      }
    );

    this.editableNegocio = !this.editableNegocio;
  }
  
  deleteNegocioEntry(id: any) {
    console.log(id)
    this.negocioService.deleteNegocio(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Negocio eliminado");
      }
    );
  }

}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { categoria } from '../../../services/categoriaServ';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Menu } from '../../menu/menu';


@Component({
  selector: 'app-categoria',
  imports: [ReactiveFormsModule, CommonModule, Menu],
  templateUrl: './categoriaComp.html',
  styleUrl: './categoriaComp.css',
})

export class CategoriaComponent {

  constructor(
    private categoria: categoria,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  
  titlePage: string = 'Categorias';
  categoriasList: any = [];
  categoriaForm!: FormGroup ;
  idCategoria: any;
  editableCategoria: boolean = false;
  user = 'Usuario';


  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      nombre: ''
    })
    this.getAllCategorias();
  }

  getAllCategorias() {
    this.categoria.getAllCategoriasData().subscribe((data: {}) => {
      this.categoriasList = data;
    });
  }

  newCategoriaEntry() {
    this.categoria.newCategoria(this.categoriaForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /inicio y recargando la ventana
        this.router.navigate(['/categoria'])
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

  updateCategoriaEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.categoriaForm.value) {
      if (this.categoriaForm.value[key] === '') {
        this.categoriaForm.removeControl(key);
      }
    }
    this.categoria.updateCategoria(this.idCategoria, this.categoriaForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Categoria editada");
      }
    );
  }

  toggleEditCategoria(id: any) {
    this.idCategoria = id;
    console.log(this.idCategoria)
    this.categoria.getOneCategoria(id).subscribe(
      data => {
        this.categoriaForm.setValue({
          nombre: data.nombre
        });
      }
    );

    this.editableCategoria = !this.editableCategoria;
  }
  
  deleteCategoriaEntry(id: any) {
    console.log(id)
    this.categoria.deleteCategoria(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Categoria eliminada");
      }
    );
  }

}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { Menu } from '../../menu/menu';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule, CommonModule, Menu],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  titlePage: string = 'Usuarios';
  usersList: any = [];
  userForm!: FormGroup ;
  idUser: any;
  editableUser: boolean = false;
  user = 'Usuario';


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nombre: '',
      correo: '',
      contrasenia: '',
      rol: ''
    })
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsersData().subscribe((data: {}) => {
      this.usersList = data;
    });
  }

  newUserEntry() {
    this.userService.newUser(this.userForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /inicio y recargando la ventana
        this.router.navigate(['/users'])
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

  updateUserEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.userForm.value) {
      if (this.userForm.value[key] === '') {
        this.userForm.removeControl(key);
      }
    }
    this.userService.updateUser(this.idUser, this.userForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("user editado");
      }
    );
  }

  toggleEditUser(id: any) {
    this.idUser = id;
    console.log(this.idUser)
    this.userService.getOneUser(id).subscribe(
      data => {
        this.userForm.setValue({
          nombre: data.nombre,
          correo: data.correo,
          contrasenia: data.contrasenia,
          rol: data.rol,
        });
      }
    );

    this.editableUser = !this.editableUser;
  }
  
  deleteUserEntry(id: any) {
    console.log(id)
    this.userService.deleteUser(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("user eliminado");
      }
    );
  }

}

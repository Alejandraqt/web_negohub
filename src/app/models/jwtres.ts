export interface Jwtres {
  datosUsuario: {
    id: number,
    nombre: string,
    correo: string,
    contrasenia: string,
    accessToken: string,
    expiresIn: string
  }
}
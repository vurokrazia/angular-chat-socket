import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;
  constructor(private socket: Socket, private Router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }
  checkStatus()
  {
    this.socket.on('connect',()=>{
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });  
    this.socket.on('disconnect',()=>{
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });  
  }
  emit(evento: string, payload?: any, callback?: Function){
    console.log("Emitiendo msg");
    this.socket.emit(evento, payload, callback);
  }  
  listen(evento: string){
    return this.socket.fromEvent( evento );
  }  
  getUsuario () {
    return this.usuario;
  }
  loginWS(nombre: string){
    return new Promise((resolve,reject) => {
      this.socket.emit('configurar-usuario',{nombre},(resp)=>{
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }
  guardarStorage()
  {
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }
  cargarStorage(){
    if(localStorage.getItem('usuario'))
    {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }
  logoutWS()
  {
    this.usuario = null;
    localStorage.removeItem('usuarios');
    this.emit('configurar-usuario',{
      nombre: 'sin-nombre'
    }, ()=>{});
    this.Router.navigateByUrl("/");
  }
}

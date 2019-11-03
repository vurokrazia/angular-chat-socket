import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) {
    
   }

   sendMessage(mensaje:string){
     var u = this.wsService.getUsuario();
     const payload = {
       de: u ? u.nombre : '',
       cuerpo: mensaje
     };
     this.wsService.emit('mensaje',payload);
   }

   getMessages()
   {
    return this.wsService.listen('nuevo-mensaje');
   }

   getProducts()
   {
    return this.wsService.listen('new-product');
   }
   getMessagesPrivate(){
     return this.wsService.listen('mensaje-privado');
   }
   getUsuariosActivos(){
     return this.wsService.listen('usuarios-activos');
   }
   emitirUsuariosActivos(){
     return this.wsService.listen('obtener-usuarios');
   }
}

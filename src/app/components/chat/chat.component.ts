import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  mensajes: any[] = [];
  elemento: HTMLElement;
  mensajesSubscription: Subscription;
  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes')
    this.mensajesSubscription = this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg)
      setTimeout(()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },500)
      console.log(msg);
    });
  }
  ngOnDestroy(){
    this.mensajesSubscription.unsubscribe();
  }
  enviar(){
    if(this.texto.trim().length == 0)
    return;
    this.chatService.sendMessage(this.texto);
    this.texto="";
  }
}

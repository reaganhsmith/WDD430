import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  @Output() messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  fireBaseUrl = "https://wdd430-f6314-default-rtdb.firebaseio.com/messages.json";
  maxMessageId: number;

  constructor(private httpClient: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    this.httpClient
      .get<Message[]>(this.fireBaseUrl)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.sortMessages();
        this.messageChangedEvent.next(this.messages.slice());
      });

    return this.messages.slice();
  }

  private sortMessages(){
    this.messages.sort((a, b) => a.msgText.localeCompare(b.msgText));
  }

  storeMessages(){
    this.httpClient
    .put(this.fireBaseUrl, JSON.stringify(this.messages), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.sortMessages;
      this.messageChangedEvent.next(this.messages.slice());
    }); 
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages){
      if(message.id === id){
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages){
      let currentId =+ maxId;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;

  }


}

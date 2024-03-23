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
  messagesUrl = "http://localhost:3000/messages";
  maxMessageId: number;

  constructor(private httpClient: HttpClient) {
  }

  getMessages(): Message[] {
    this.httpClient
      .get<Message[]>(this.messagesUrl)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.sortMessages();
        this.messageChangedEvent.next(this.messages.slice());
      });

    return this.messages.slice();
  }

  private sortMessages() {
    this.messages.sort((a, b) => a.msgText.localeCompare(b.msgText));
  }

  storeMessages() {
    this.httpClient
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortMessages;
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string){
    return this.messages[id];
  }

  addMessage(newMessage: Message) {
    if (!newMessage) return;
    newMessage.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; messageObject: Message }>(
        this.messagesUrl,
        newMessage,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.messages.push(res.messageObject);
            this.sortMessages();
          }
        })
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentId = + maxId;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;

  }


}

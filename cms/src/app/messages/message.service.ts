import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  @Output() messageSelectedEvent = new EventEmitter<Message>();
  @Output() messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  messagesUrl = "http://localhost:3000/messages";

  messages: Message[] = [];
  maxMessageId: number;
  messagesListClone: Message[];


  constructor(private httpClient: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }


  getMessages(): Message[] {
    this.httpClient
      .get<Message[]>(this.messagesUrl)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.sortMessages();
        this.messageListChangedEvent.next(this.messages.slice());
      });

    return this.messages.slice();
  }

  private sortMessages() {
    this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
  }

  storeMessages() {
    this.httpClient
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortMessages;
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }


  getMessage(id: string) {
    return this.messages[id];
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

  addMessage(newMessage: Message) {
    if (!newMessage) return;
    newMessage.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; msg: Message }>(
        this.messagesUrl,
        newMessage,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.messages.push(res.msg);
            this.sortMessages();
          }
        })
  }



}

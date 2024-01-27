import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {

  messages: Message[] = [
    new Message(
      1,"Hello", "I just wanted to check in and make sure you're doing good:)", "Sam" 
    ),
    new Message(
      2, "Schedule", "Do you have time for me this week? Just let me know!", "Jessica" 
    ),
    new Message(
      3,"Dogg", "Hi howw is your dog?? I miss her. Giver her love for me", "Becca" )
  ];

  onAddMessage(message: Message){
    this.messages.push(message)
  }
}

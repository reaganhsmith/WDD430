import { Component, ElementRef, ViewChild,EventEmitter, Output } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subjectInput') subInputRef: ElementRef;
  @ViewChild('messageInput') mesInputRef: ElementRef;
  @Output() messageSent = new EventEmitter<Message>();
  currentSender = "Reagan";

  onSendMessage() {
    const mesSubject = this.subInputRef.nativeElement.value;
    const mesMessage = this.mesInputRef.nativeElement.value;
    const newMessage = new Message(4, mesSubject, mesMessage, this.currentSender);
    this.messageSent.emit(newMessage);
  }

  onClear(){
      this.subInputRef.nativeElement.value = " ";
      this.mesInputRef.nativeElement.value = " ";
  }
}

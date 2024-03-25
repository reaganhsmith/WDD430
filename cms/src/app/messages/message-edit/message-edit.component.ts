import { Component, ElementRef, ViewChild,EventEmitter, Output } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = '65fc895ad34307cca27715c5';
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;  

  constructor(private messageService: MessageService) { }
  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(null, subjectValue, msgTextValue, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {

    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}

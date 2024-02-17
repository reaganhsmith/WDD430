import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements OnInit {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  ngOnInit(){

  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string){
    return this.contacts[id];
  }

  deleteContact(contact: Contact){
    if(!contact){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0){
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  
  





}
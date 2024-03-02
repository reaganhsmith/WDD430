import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements OnInit {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  

  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[]

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

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts){
      let currentId =+ maxId;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;

  }

  addContact(newContact: Contact){
    if (newContact === undefined || newContact === null){
      return;
    }
    this.maxContactId ++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();

    this.contactListChangedEvent.next(this.contactsListClone)
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact){
      return
    }
    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0 ){
      return 
    }

    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone)
    
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
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone)
  }

  

}
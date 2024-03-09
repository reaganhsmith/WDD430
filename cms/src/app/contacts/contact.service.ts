import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements OnInit {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  fireBaseUrl = "https://wdd430-f6314-default-rtdb.firebaseio.com/contacts.json";
  

  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[]

  constructor(private httpClient : HttpClient) {
    this.contacts = MOCKCONTACTS;
  }
  ngOnInit(){

  }

  getContacts() {
    this.httpClient
      .get<Contact[]>(this.fireBaseUrl)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.sortContacts();
        this.contactListChangedEvent.next(this.contacts.slice());
      });

    return this.contacts.slice();
  }

  private sortContacts(){
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeContacts(){
    this.httpClient
    .put(this.fireBaseUrl, JSON.stringify(this.contacts), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.sortContacts;
      this.contactListChangedEvent.next(this.contacts.slice());
    }); 
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

    this.storeContacts();
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
    this.storeContacts();
    
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
    this.storeContacts();
  }

  

}
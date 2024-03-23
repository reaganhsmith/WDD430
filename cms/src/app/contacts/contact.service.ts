import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements OnInit {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactsUrl = "http://localhost:3000/contacts";
  

  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[]

  constructor(private httpClient : HttpClient) {
  }
  ngOnInit(){

  }

  getContacts() {
    this.httpClient
      .get<Contact[]>(this.contactsUrl)
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
    .put(this.contactsUrl, JSON.stringify(this.contacts), {
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
    if (!newContact) return;
    newContact.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; contact: Contact }>(
        this.contactsUrl,
        newContact,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.contacts.push(res.contact);
            this.sortContacts();
          }
        })
      
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

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete(`${this.contactsUrl}/${contact.id}`)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortContacts();
        }
      )

  }

  

}
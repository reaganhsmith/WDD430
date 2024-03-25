import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactsUrl = "http://localhost:3000/contacts";

  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[];

  constructor(private httpClient: HttpClient) {
    this.maxContactId = this.getMaxId();
  }


  getContacts(): Contact[] {
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

  private sortContacts() {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeContacts() {
    this.httpClient
      .put(this.contactsUrl, JSON.stringify(this.contacts), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortContacts;
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }


  getContact(id: string) {
    return this.contacts[id];
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = + maxId;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;

  }

  addContact(newContact: Contact) {
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


  updateContact(originalContact: Contact, newContact: Contact) {
    // Check if originalDocument or newDocument is missing
    if (!originalContact || !newContact) {
      return;
    }

    // Find the position of the original document in the documents array
    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    // If original document not found, return
    if (pos < 0) {
      return;
    }

    // Set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;

    // Define headers for HTTP request
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Update database by sending HTTP PUT request
    this.httpClient.put(`${this.contactsUrl}/${newContact.id}`,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          // If update successful, update local documents array
          this.contacts[pos] = newContact;
          // Sort and send documents
          this.sortContacts();
        }
      );
      
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
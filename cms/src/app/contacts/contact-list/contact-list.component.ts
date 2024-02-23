import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  contacts: Contact[];
  subscription: Subscription;


  constructor(private contactService: ContactService){
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangedEvent
    // .subscribe((contacts: Contact[]) => {
    //   this.contacts = contacts;
    // })

    this.subscription = this.contactService.contactListChangedEvent
    .subscribe((contactList: Contact[]) => {
      this.contacts = contactList
    })
  }

  // onContactSelected(contact: Contact){
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
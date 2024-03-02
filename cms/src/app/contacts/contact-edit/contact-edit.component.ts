import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{
  groupContacts: Contact[] = [];
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  id: string;
  


  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return
      }
      this.originalContact = this.contactService.getContact(id);
      if (!this.originalContact) {
        return
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.originalContact.group){
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group))
      }
    })



  }


  onCancel() {
    this.router.navigate(['/contacts']);

  }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }

    const values = form.value;
    const newContact = new Contact(
      "",
      values.name,
      values.email,
      values.phone,
      values.imageUrl,
      this.groupContacts
    );
      if(this.editMode){
        this.contactService.updateContact(this.originalContact, newContact)
      }else{
        this.contactService.addContact(newContact)

      }

      this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }

    if(this.contact && newContact.id === this.contact.id){
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++ ){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  onRemoveItem(index: number){
    if(index < 0 || index >= this.groupContacts.length){
      return
    }
    this.groupContacts.splice(index, 1)
  }

  addToGroup($event: any){
    const SelectedContact: Contact = $event.dragData;
    const invalidGroupData = this.isInvalidContact(SelectedContact);
    if(invalidGroupData){
      return;
    }
    this.groupContacts.push(SelectedContact);
  }


}

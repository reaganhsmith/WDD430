import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent{
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();
  @Input() index: Number;


  onSelected(){
    this.contactSelected.emit();
  }
}

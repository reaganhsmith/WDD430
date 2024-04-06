import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';
import { filter } from 'rxjs';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {


  transform(contacts: Contact[], term: string): Contact[] {
    let filterArray: Contact[] = [];


    if (term && term.length > 0) {
      filterArray = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      )

    }

    if (filterArray.length < 1) {
      return contacts;
    }
    return filterArray;
  }

}

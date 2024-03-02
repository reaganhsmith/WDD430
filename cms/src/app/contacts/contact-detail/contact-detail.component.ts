import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit{
  contact: Contact;
  id: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService){
  }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          
          this.contact = this.contactService.getContact(this.id); 
        }
      );
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }




} 

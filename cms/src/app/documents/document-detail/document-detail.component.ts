import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document: Document;

  constructor(private route: ActivatedRoute,
    private router: Router){}

  onEditDocument(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

}

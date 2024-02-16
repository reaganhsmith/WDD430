import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  document: Document[] = []

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute){
  }


  ngOnInit(){
    this.document = this.documentService.getDocuments();
  }

}

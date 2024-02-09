import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  document: Document[] = []

  constructor(private documentService: DocumentService){
  }


  ngOnInit(){
    this.document = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document){
   this.documentService.documentSelectedEvent.emit(document);
  }
}

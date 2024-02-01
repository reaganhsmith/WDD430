import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  document: Document[] = [
    new Document(
      1, "Document #1", "This is the FIRST document", "Doc1URL"
    ),
    new Document(
      2, "Document #2", "This is the SECOND document", "Doc2URL"
    ),
    new Document(
      3, "Document #3", "This is the THIRD document", "Doc3URL"
    ),
    new Document(
      4, "Document #4", "This is the FOURTH document", "Doc4URL"
    ),

  ]

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}

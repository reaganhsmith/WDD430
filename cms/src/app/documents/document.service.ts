import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
  
  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id: string){
    return this.documents[id];
  }

  
}

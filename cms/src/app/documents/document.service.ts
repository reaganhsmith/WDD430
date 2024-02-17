import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
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

  deleteDocument(document: Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  
}

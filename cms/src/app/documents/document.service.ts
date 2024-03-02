import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[]

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  
  getDocuments(){
    return this.documents.slice();
  }

  getDocument(id: string){
    return this.documents[id];
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents){
      let currentId =+ maxId;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;

  }

  addDocument(newDocument: Document){
    if (!newDocument){
      return;
    }
    
    this.maxDocumentId ++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    
    this.documentsListClone = this.documents.slice();

    this.documentListChangedEvent.next(this.documentsListClone)
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument || !newDocument){
      return
    }
    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0 ){
      return 
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.documentListChangedEvent.next(this.documents.slice())
    
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
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone)
  }

  
}

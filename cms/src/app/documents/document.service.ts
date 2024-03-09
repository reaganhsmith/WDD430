import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  fireBaseUrl = "https://wdd430-f6314-default-rtdb.firebaseio.com/documents.json";

  documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[];
  

  constructor(private httpClient : HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  
  getDocuments(): Document[] {
    this.httpClient
      .get<Document[]>(this.fireBaseUrl)
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortDocuments();
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  private sortDocuments(){
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeDocuments(){
    this.httpClient
    .put(this.fireBaseUrl, JSON.stringify(this.documents), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
    .subscribe(() =>{
      this.sortDocuments;
      this.documentListChangedEvent.next(this.documents.slice());
    }); 
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
    this.storeDocuments();
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
    this.storeDocuments();
    
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
    this.storeDocuments();
  }

  
}

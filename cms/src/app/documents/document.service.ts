import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }
  
  getDocuments(){
    return this.documents.slice();
  }

  // getContact(id: string): Document | null {
  //   for (const document of this.documents) {
  //     if (document.id == id) {
  //             return document;
  //     }
  //   }
  //   return null;
  // }
}

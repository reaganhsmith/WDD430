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
  documentsUrl = "http://localhost:3000/documents";

  documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[];


  constructor(private httpClient: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }


  getDocuments(): Document[] {
    this.httpClient
      .get<Document[]>(this.documentsUrl)
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortDocuments();
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  private sortDocuments() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeDocuments() {
    this.httpClient
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortDocuments;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }


  getDocument(id: string) {
    return this.documents[id];
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = + maxId;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;

  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    newDocument.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; document: Document }>(
        this.documentsUrl,
        newDocument,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.documents.push(res.document);
            this.sortDocuments();
          }
        })
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    // Check if originalDocument or newDocument is missing
    if (!originalDocument || !newDocument) {
      return;
    }

    // Find the position of the original document in the documents array
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    // If original document not found, return
    if (pos < 0) {
      return;
    }

    // Set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    // Define headers for HTTP request
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Update database by sending HTTP PUT request
    this.httpClient.put(`${this.documentsUrl}/${newDocument.id}`,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          // If update successful, update local documents array
          this.documents[pos] = newDocument;
          // Sort and send documents
          this.sortDocuments();
        }
      );
  }



  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete(`${this.documentsUrl}/${document.id}`)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortDocuments();
        }
      )

  }




}

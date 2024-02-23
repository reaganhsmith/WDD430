import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  document: Document[] = []
  private subscription: Subscription

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute){
  }


  ngOnInit(){
    this.document = this.documentService.getDocuments();
    // this.documentService.documentChangedEvent
    // .subscribe((documents: Document[]) => {this.document = documents})

    this.subscription = this.documentService.documentListChangedEvent
    .subscribe((documentList: Document[]) => {
      this.document = documentList
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

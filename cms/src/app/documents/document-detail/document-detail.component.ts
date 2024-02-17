import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'] 
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;
  id: string;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.route.params
      .subscribe(
        (params: Params) => {
          
          this.id = params['id'];
          console.log(this.id)
          this.document = this.documentService.getDocument(this.id); 
        }
      );
  }

  onView() {
    if(this.document.url){
      this.nativeWindow.open(this.document.url)
    }

  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}

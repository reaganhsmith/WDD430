import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (!this.originalDocument) {
        return
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    })

  }

  onSubmit(form: NgForm) {
    if(form.invalid){
      return;
    }

    const values = form.value;
    const newDocument = new Document(
      "",
      values.name,
      values.description,
      values.url
    );
      if(this.editMode){
        this.documentService.updateDocument(this.originalDocument, newDocument)
      }else{
        this.documentService.addDocument(newDocument)

      }

      this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);

  }


}

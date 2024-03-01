import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Document } from '../document.model';


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit{
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;


  ngOnInit(){

  }

  onSubmit(form: NgForm){
    
  }

  onCancel(){

  }


}

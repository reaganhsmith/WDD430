import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'] 
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document;

  constructor(
    private windowRefService: WindRefService
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DocumentsModule { }

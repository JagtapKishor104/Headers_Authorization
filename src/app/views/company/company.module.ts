import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ComapnyComponent } from './comapny.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import {SearchCompanyPipe} from "./searchCompany.pipe";
@NgModule({
  declarations: [
    ComapnyComponent,
    SearchCompanyPipe
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule
  ]
})
export class CompanyModule { }

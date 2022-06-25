import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorComponent } from './supervisor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import {SearchCompanyPipe} from "./searchCompany.pipe";
@NgModule({
  declarations: [
    SupervisorComponent,
    SearchCompanyPipe
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule
  ]
})
export class SupervisorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgencyComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgencyModule { }

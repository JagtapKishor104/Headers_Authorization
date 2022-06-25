import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { ButtonsComponent } from './attendence.component';


import { ButtonsRoutingModule } from './attendence-routing.module';
import {SearchPipe} from "./search.pipe";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {SearchDatePipe} from "./searchDate.pipe";
import { NgxPaginationModule } from 'ngx-pagination';
import{SampleComponent} from "./sample/sample.component";
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavbarModule,
  NavModule,
  SharedModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ButtonsComponent,
    SampleComponent,
    SearchPipe,
    SearchDatePipe,
  ],
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    ButtonModule,
    ButtonGroupModule,
    GridModule,
    IconModule,
    CardModule,
    UtilitiesModule,
    DropdownModule,
    SharedModule,
    FormModule,
    ReactiveFormsModule,
    DocsComponentsModule,
    NavbarModule,
    CollapseModule,
    NavModule,
    NavbarModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    NgSelectModule
  ]
})
export class ButtonsModule {
}

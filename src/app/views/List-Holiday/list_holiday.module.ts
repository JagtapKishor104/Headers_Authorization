import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { WidgetsRoutingModule } from './list_holiday-routing.module';
import { WidgetsComponent } from './list_holiday.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WidgetsComponent,

  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  
  ]
})
export class WidgetsModule {
}

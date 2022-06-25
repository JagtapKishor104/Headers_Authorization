import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './leave_management.component';
import { ChartsRoutingModule } from './leave_management-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MbscModule
  ]
})
export class ChartsModule {
}

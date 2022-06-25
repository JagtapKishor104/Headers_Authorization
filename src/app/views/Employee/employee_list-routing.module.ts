import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionsComponent } from './employee_list.component';

import {GuardGuard} from "../Guard_Services/guard.guard";

const routes: Routes = [
  {
    path: '',
    component:AccordionsComponent,
    // canActivate:[GuardGuard],
    data: {
      title: 'Employee List',
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}


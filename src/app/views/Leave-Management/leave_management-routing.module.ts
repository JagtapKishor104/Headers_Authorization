import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './leave_management.component';
import {GuardGuard} from "../Guard_Services/guard.guard";

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    // canActivate:[GuardGuard],
    data: {
      title: 'Leave Management',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}


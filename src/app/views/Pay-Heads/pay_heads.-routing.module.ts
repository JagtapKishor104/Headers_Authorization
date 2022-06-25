import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertsComponent } from './pay_heads.component';
import {GuardGuard} from "../Guard_Services/guard.guard";

const routes: Routes = [
  {
    path: '',
    component:AlertsComponent,
    // canActivate:[GuardGuard],
    data: {
      title: 'Pay Heads'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}

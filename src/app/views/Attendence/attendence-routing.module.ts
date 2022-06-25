import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsComponent } from './attendence.component';

import {GuardGuard} from "../Guard_Services/guard.guard";

const routes: Routes = [
  {
    path: '',
    component:ButtonsComponent,
    // canActivate:[GuardGuard],
    data: {
      title: 'Attendence'
    },

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {
}

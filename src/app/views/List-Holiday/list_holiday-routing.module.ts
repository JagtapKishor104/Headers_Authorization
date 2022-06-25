import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsComponent } from './list_holiday.component';
import {GuardGuard} from "../Guard_Services/guard.guard";

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    // canActivate:[GuardGuard],
    data: {
      title: 'List Holidays'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {
}

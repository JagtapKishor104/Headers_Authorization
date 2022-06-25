import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComapnyComponent } from './comapny.component';

const routes: Routes = [
  {
    path:"",
    component:ComapnyComponent,
    data: {
      title: 'Company List'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }

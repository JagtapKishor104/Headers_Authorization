import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormControlsComponent } from "./salary_slip.component";
import { SlipComponent } from './slip/slip.component';
const routes: Routes = [
  {
    path: '',
    component: FormControlsComponent,
    //  canActivate: [GuardGuard],
    
    data: {
      title: 'Salary Slip'
    },
    children:[
      {
        path:"slip",
        component:SlipComponent
      
      },
  
    ],
    
  
   
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}

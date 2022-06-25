import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {GuardGuard} from "./views/Guard_Services/guard.guard";
import { EmpLoginComponent } from './views/pages/emp_login/emp-login.component';
import { SlipComponent } from './views/Salary-Slip/slip/slip.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    // dashboard
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivate:[GuardGuard],
    data: {
      title: 'Home'
    },
    children: [
        // {
        //   path: 'dashboard',
        //   loadChildren: () =>
        //     import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
        // },
      // {
      //   path: 'theme',
      //   loadChildren: () =>
      //     import('./views/theme/theme.module').then((m) => m.ThemeModule)
      // },
      {
        path: 'company',
        loadChildren: () =>
          import('./views/company/company.module').then((m) => m.CompanyModule)
      },
      {
        path: 'supervisor',
        loadChildren: () =>
          import('./views/supervisor/supervisor.module').then((m) => m.SupervisorModule)
      },
      {
        path:'agency',
        loadChildren:()=>
        import('./views/Agency/agency.module').then((m)=>m.AgencyModule)
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./views/Employee/employee_list.module').then((m) => m.BaseModule)
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./views/Documents/documents.module').then((m) => m.DocumentsModule)
      },
      {
        path: 'attendence',
        loadChildren: () =>
          import('./views/Attendence/attendence.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'salary_slip',
        loadChildren: () =>
          import('./views/Salary-Slip/salary_slip.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('./views/Leave-Management/leave_management.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'pay_heads',
        loadChildren: () =>
          import('./views/Pay-Heads/pay_heads.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'list_holidays',
        loadChildren: () =>
          import('./views/List-Holiday/list_holiday.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'emp_login',
    component: EmpLoginComponent,
    data: {
      title: 'Employee Page'
    }
    
  },
  {
    path: 'slip',
    component: SlipComponent,
    data: {
      title: 'Slip Page'
    }
  },
  {
    path: 'slip/:emp_code',
    component: SlipComponent,
    
  },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

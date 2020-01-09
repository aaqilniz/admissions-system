import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { LogNotitficationGuard } from 'app/theme/Guards';
import { UserAuthenticationGuard } from 'app/theme/Guards/UserAuth';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {path: 'login',loadChildren: 'app/pages/login/login.module#LoginModule'},
  {path: 'login/:reg',loadChildren: 'app/pages/login/login.module#LoginModule' , canActivate: [LogNotitficationGuard]},
  {path: 'register',loadChildren: 'app/pages/register/register.module#RegisterModule'},
  {path: 'resetpassword', loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'application', loadChildren: './application/application.module#ApplicationModule'}
      // { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      // { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      // { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      // { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      // { path: 'maps', loadChildren: './maps/maps.module#MapsModule' }
    ]
    // canActivate: [UserAuthenticationGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

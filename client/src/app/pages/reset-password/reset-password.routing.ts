import { Routes, RouterModule }  from '@angular/router';

import { ResetPasswordComponent } from './reset-password.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  }
];

export const routing = RouterModule.forChild(routes);

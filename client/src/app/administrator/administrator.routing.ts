import { OverallReportComponent } from './overall-report/overall-report.component';
import { MeritManagerComponent } from './merit-manager/merit-manager.component';
import { EntrytestInterviewmarksComponent } from './entrytest-interviewmarks/entrytest-interviewmarks.component';
import { ReportcenterComponent } from './reportcenter/reportcenter.component';
import { ModifyapplicationComponent } from './modifyapplication/modifyapplication.component';
import { FeeVerificationComponent } from './fee-verification/fee-verification.component';
import { PrintApplicationComponent } from './print-application/print-application.component';
import { VerifyApplicationComponent } from './verify-application/verify-application.component';
import { SettingsComponent } from './settings/settings.component';
import { Dashboard } from './dashboard/dashboard.component';
import { AdministratorComponent } from './administrator.component';

import { Component, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
     path: 'admin', component: AdministratorComponent,
     children: [
        { path: 'dashboard', component: Dashboard},
        { path: '', component: Dashboard, pathMatch: 'full' },
        { path: 'settings', component: SettingsComponent },
        { path: 'app-verify-application', component: VerifyApplicationComponent },
        { path: 'app-print-application', component: PrintApplicationComponent },
        { path: 'FeeVerification', component: FeeVerificationComponent },
        { path: 'modifyApplication', component: ModifyapplicationComponent},
        { path: 'reportcenter',  component: ReportcenterComponent},
        { path: 'entrytest', component: EntrytestInterviewmarksComponent },
        { path: 'meritmanager', component: MeritManagerComponent },
        { path: 'overallReport', component:OverallReportComponent }
     ]
  }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);

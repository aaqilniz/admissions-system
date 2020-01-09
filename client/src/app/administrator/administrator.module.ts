import { OverallReportComponent } from './overall-report/overall-report.component';
import { MeritManagerComponent } from './merit-manager/merit-manager.component';
import { EntrytestInterviewmarksComponent } from './entrytest-interviewmarks/entrytest-interviewmarks.component';
import { ReportcenterComponent } from './reportcenter/reportcenter.component';
import { ModifyapplicationComponent } from './modifyapplication/modifyapplication.component';
import { FeeVerificationComponent } from './fee-verification/fee-verification.component';
import { PrintApplicationComponent } from './print-application/print-application.component';
import { SettingsComponent } from './settings/settings.component';
import { VerifyApplicationComponent } from './verify-application/verify-application.component';
import { Dashboard } from './dashboard/dashboard.component';
import { AdministratorComponent } from './administrator.component';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../app.translation.module';
import { NgaModule } from '../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { adminRouting }       from './administrator.routing';
import { ResearchInterest } from 'app/pages/application/researchInterest';




@NgModule({
    imports: [
      CommonModule,
      AngularFormsModule,
      AppTranslationModule,
      NgaModule,
      NgbRatingModule,
      adminRouting,
      ReactiveFormsModule,
    ],
    declarations: [
       AdministratorComponent,
       Dashboard,
       VerifyApplicationComponent,
       SettingsComponent,
       PrintApplicationComponent,
       FeeVerificationComponent,
       ReportcenterComponent,
       EntrytestInterviewmarksComponent,
       OverallReportComponent,
       MeritManagerComponent,
       ModifyapplicationComponent,
    ]
  })
  export class AdministratorModule {
  }
  
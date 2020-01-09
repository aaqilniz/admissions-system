import { Component } from '@angular/core';
import { ApplicationComponent } from './application.component';
import { PersonalDetails } from './personalDetails/personalDetails.component';
import { AddressDetails } from 'app/pages/application/addressDetails';
import { EducationalDetails } from './educationalDetails/educationalDetails.component';
import { UploadPhoto } from './uploadPhoto/uploadPhoto.component';
import { LanguageProficiency } from 'app/pages/application/languageProficiency';
import { ApptitudeTests } from 'app/pages/application/aptitudeTests';
import { FamilyDetails } from './familyDetails/familyDetails.component';
import { OtherDetails } from 'app/pages/application/otherDetails';
import { FundDetails } from './fundDetails/fundDetails.component';

import { Routes, RouterModule }  from '@angular/router';
import { ResearchInterest } from 'app/pages/application/researchInterest';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
     path: '', component: ApplicationComponent,
     children: [
      { path: 'personalDetails', component: PersonalDetails},
      { path: 'addressDetails', component: AddressDetails },
      { path: 'educationalDetails', component: EducationalDetails},
      { path: 'uploadPhoto', component: UploadPhoto},
      { path: 'languageProficiency', component: LanguageProficiency},
      { path: 'aptitudeTests', component: ApptitudeTests},
      { path: 'familyDetails', component: FamilyDetails},
      { path: 'otherDetails', component: OtherDetails},
      { path: 'fundDetails', component: FundDetails},
      { path: 'researchInterest', component: ResearchInterest}
     ]
  }
];

export const routing = RouterModule.forChild(routes);

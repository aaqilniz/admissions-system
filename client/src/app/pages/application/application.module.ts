import { ImageNameService } from './Services/imageName/imageName.service';
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

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }       from './application.routing';
import { TextMaskModule } from 'angular2-text-mask'; 
import { ApplyingDegreeService } from 'app/pages/application/Services';
import { ResearchInterest } from 'app/pages/application/researchInterest';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';




@NgModule({
    imports: [
      CommonModule,
      AngularFormsModule,
      AppTranslationModule,
      NgaModule,
      NgbRatingModule,
      routing,
      ReactiveFormsModule,
      TextMaskModule,
      SlimLoadingBarModule.forRoot()
    ],
    providers:[
      ImageNameService
    ],
    declarations: [
       ApplicationComponent,
       PersonalDetails,
       AddressDetails,
       EducationalDetails,
       UploadPhoto,
       LanguageProficiency,
       ApptitudeTests,
       FamilyDetails,
       OtherDetails,
       FundDetails,
       ResearchInterest
    ]
  })
  export class ApplicationModule {
  }
  
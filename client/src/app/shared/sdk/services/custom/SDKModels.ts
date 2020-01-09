/* tslint:disable */
import { Injectable } from '@angular/core';
import { StudentAddress } from '../../models/StudentAddress';
import { EducationalDetails } from '../../models/EducationalDetails';
import { ExtraCurricularActivities } from '../../models/ExtraCurricularActivities';
import { FamilyDetails } from '../../models/FamilyDetails';
import { BankDetails } from '../../models/BankDetails';
import { StudentAptitudeTests } from '../../models/StudentAptitudeTests';
import { Hobbies } from '../../models/Hobbies';
import { Language } from '../../models/Language';
import { FundDetails } from '../../models/FundDetails';
import { ResearchInterests } from '../../models/ResearchInterests';
import { Student } from '../../models/Student';
import { Email } from '../../models/Email';
import { Department } from '../../models/Department';
import { Degree } from '../../models/Degree';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    StudentAddress: StudentAddress,
    EducationalDetails: EducationalDetails,
    ExtraCurricularActivities: ExtraCurricularActivities,
    FamilyDetails: FamilyDetails,
    BankDetails: BankDetails,
    StudentAptitudeTests: StudentAptitudeTests,
    Hobbies: Hobbies,
    Language: Language,
    FundDetails: FundDetails,
    ResearchInterests: ResearchInterests,
    Student: Student,
    Email: Email,
    Department: Department,
    Degree: Degree,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}

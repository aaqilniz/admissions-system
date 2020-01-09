/* tslint:disable */
import {
  StudentAddress,
  ExtraCurricularActivities,
  EducationalDetails,
  FamilyDetails,
  BankDetails,
  StudentAptitudeTests,
  Hobbies,
  Language,
  FundDetails,
  ResearchInterests
} from '../index';

declare var Object: any;
export interface StudentInterface {
  "name": string;
  "cnic"?: string;
  "fatherName"?: string;
  "nationality": string;
  "ApplyFor": string;
  "district"?: string;
  "domicile"?: string;
  "passport"?: string;
  "studentMobileNumber"?: string;
  "Gender"?: string;
  "DoB"?: string;
  "department"?: string;
  "imageName"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  studentAddresses?: StudentAddress[];
  extraCurricularActivities?: ExtraCurricularActivities[];
  educationalDetails?: EducationalDetails[];
  familyDetails?: FamilyDetails;
  bankDetails?: BankDetails;
  studentAptitudeTests?: StudentAptitudeTests[];
  hobbies?: Hobbies[];
  languages?: Language[];
  fundDetails?: FundDetails;
  researchInterests?: ResearchInterests[];
  accessTokens?: any[];
}

export class Student implements StudentInterface {
  "name": string;
  "cnic": string;
  "fatherName": string;
  "nationality": string;
  "ApplyFor": string;
  "district": string;
  "domicile": string;
  "passport": string;
  "studentMobileNumber": string;
  "Gender": string;
  "DoB": string;
  "department": string;
  "imageName": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  studentAddresses: StudentAddress[];
  extraCurricularActivities: ExtraCurricularActivities[];
  educationalDetails: EducationalDetails[];
  familyDetails: FamilyDetails;
  bankDetails: BankDetails;
  studentAptitudeTests: StudentAptitudeTests[];
  hobbies: Hobbies[];
  languages: Language[];
  fundDetails: FundDetails;
  researchInterests: ResearchInterests[];
  accessTokens: any[];
  constructor(data?: StudentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Student`.
   */
  public static getModelName() {
    return "Student";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Student for dynamic purposes.
  **/
  public static factory(data: StudentInterface): Student{
    return new Student(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Student',
      plural: 'Students',
      path: 'Students',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "cnic": {
          name: 'cnic',
          type: 'string'
        },
        "fatherName": {
          name: 'fatherName',
          type: 'string'
        },
        "nationality": {
          name: 'nationality',
          type: 'string'
        },
        "ApplyFor": {
          name: 'ApplyFor',
          type: 'string'
        },
        "district": {
          name: 'district',
          type: 'string'
        },
        "domicile": {
          name: 'domicile',
          type: 'string'
        },
        "passport": {
          name: 'passport',
          type: 'string'
        },
        "studentMobileNumber": {
          name: 'studentMobileNumber',
          type: 'string'
        },
        "Gender": {
          name: 'Gender',
          type: 'string'
        },
        "DoB": {
          name: 'DoB',
          type: 'string'
        },
        "department": {
          name: 'department',
          type: 'string'
        },
        "imageName": {
          name: 'imageName',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        studentAddresses: {
          name: 'studentAddresses',
          type: 'StudentAddress[]',
          model: 'StudentAddress',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        extraCurricularActivities: {
          name: 'extraCurricularActivities',
          type: 'ExtraCurricularActivities[]',
          model: 'ExtraCurricularActivities',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        educationalDetails: {
          name: 'educationalDetails',
          type: 'EducationalDetails[]',
          model: 'EducationalDetails',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        familyDetails: {
          name: 'familyDetails',
          type: 'FamilyDetails',
          model: 'FamilyDetails',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        bankDetails: {
          name: 'bankDetails',
          type: 'BankDetails',
          model: 'BankDetails',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        studentAptitudeTests: {
          name: 'studentAptitudeTests',
          type: 'StudentAptitudeTests[]',
          model: 'StudentAptitudeTests',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        hobbies: {
          name: 'hobbies',
          type: 'Hobbies[]',
          model: 'Hobbies',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        languages: {
          name: 'languages',
          type: 'Language[]',
          model: 'Language',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        fundDetails: {
          name: 'fundDetails',
          type: 'FundDetails',
          model: 'FundDetails',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        researchInterests: {
          name: 'researchInterests',
          type: 'ResearchInterests[]',
          model: 'ResearchInterests',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'studentId'
        },
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}

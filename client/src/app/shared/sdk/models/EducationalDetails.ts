/* tslint:disable */

declare var Object: any;
export interface EducationalDetailsInterface {
  "degreeName": string;
  "degreeLevel": string;
  "degreeInstitute": string;
  "degreeSubject": string;
  "totalMarks"?: number;
  "obtainedMarks"?: number;
  "totalGPA"?: number;
  "obtainedGPA"?: number;
  "passingYear"?: string;
  "rollNumber"?: string;
  "thesisCheck"?: boolean;
  "id"?: number;
  "studentId"?: number;
}

export class EducationalDetails implements EducationalDetailsInterface {
  "degreeName": string;
  "degreeLevel": string;
  "degreeInstitute": string;
  "degreeSubject": string;
  "totalMarks": number;
  "obtainedMarks": number;
  "totalGPA": number;
  "obtainedGPA": number;
  "passingYear": string;
  "rollNumber": string;
  "thesisCheck": boolean;
  "id": number;
  "studentId": number;
  constructor(data?: EducationalDetailsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EducationalDetails`.
   */
  public static getModelName() {
    return "EducationalDetails";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EducationalDetails for dynamic purposes.
  **/
  public static factory(data: EducationalDetailsInterface): EducationalDetails{
    return new EducationalDetails(data);
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
      name: 'EducationalDetails',
      plural: 'EducationalDetails',
      path: 'EducationalDetails',
      idName: 'id',
      properties: {
        "degreeName": {
          name: 'degreeName',
          type: 'string'
        },
        "degreeLevel": {
          name: 'degreeLevel',
          type: 'string'
        },
        "degreeInstitute": {
          name: 'degreeInstitute',
          type: 'string'
        },
        "degreeSubject": {
          name: 'degreeSubject',
          type: 'string'
        },
        "totalMarks": {
          name: 'totalMarks',
          type: 'number'
        },
        "obtainedMarks": {
          name: 'obtainedMarks',
          type: 'number'
        },
        "totalGPA": {
          name: 'totalGPA',
          type: 'number'
        },
        "obtainedGPA": {
          name: 'obtainedGPA',
          type: 'number'
        },
        "passingYear": {
          name: 'passingYear',
          type: 'string'
        },
        "rollNumber": {
          name: 'rollNumber',
          type: 'string'
        },
        "thesisCheck": {
          name: 'thesisCheck',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "studentId": {
          name: 'studentId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}

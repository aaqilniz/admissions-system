/* tslint:disable */

declare var Object: any;
export interface FamilyDetailsInterface {
  "fatherOrGaurdianName": string;
  "fatherOrGaurdianPhoneNumber"?: number;
  "fatherLivingStatus": string;
  "fatherOrGaurdianOcupation": string;
  "monthlyIncome": number;
  "fatherOrGaurdianMobileNumber": string;
  "numberOfDependents": number;
  "id"?: number;
  "studentId"?: number;
}

export class FamilyDetails implements FamilyDetailsInterface {
  "fatherOrGaurdianName": string;
  "fatherOrGaurdianPhoneNumber": number;
  "fatherLivingStatus": string;
  "fatherOrGaurdianOcupation": string;
  "monthlyIncome": number;
  "fatherOrGaurdianMobileNumber": string;
  "numberOfDependents": number;
  "id": number;
  "studentId": number;
  constructor(data?: FamilyDetailsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FamilyDetails`.
   */
  public static getModelName() {
    return "FamilyDetails";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FamilyDetails for dynamic purposes.
  **/
  public static factory(data: FamilyDetailsInterface): FamilyDetails{
    return new FamilyDetails(data);
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
      name: 'FamilyDetails',
      plural: 'FamilyDetails',
      path: 'FamilyDetails',
      idName: 'id',
      properties: {
        "fatherOrGaurdianName": {
          name: 'fatherOrGaurdianName',
          type: 'string'
        },
        "fatherOrGaurdianPhoneNumber": {
          name: 'fatherOrGaurdianPhoneNumber',
          type: 'number'
        },
        "fatherLivingStatus": {
          name: 'fatherLivingStatus',
          type: 'string'
        },
        "fatherOrGaurdianOcupation": {
          name: 'fatherOrGaurdianOcupation',
          type: 'string'
        },
        "monthlyIncome": {
          name: 'monthlyIncome',
          type: 'number'
        },
        "fatherOrGaurdianMobileNumber": {
          name: 'fatherOrGaurdianMobileNumber',
          type: 'string'
        },
        "numberOfDependents": {
          name: 'numberOfDependents',
          type: 'number'
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

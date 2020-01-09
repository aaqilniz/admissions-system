/* tslint:disable */

declare var Object: any;
export interface StudentAptitudeTestsInterface {
  "yearTaken"?: string;
  "obtainedMarks"?: number;
  "testType"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class StudentAptitudeTests implements StudentAptitudeTestsInterface {
  "yearTaken": string;
  "obtainedMarks": number;
  "testType": string;
  "id": number;
  "studentId": number;
  constructor(data?: StudentAptitudeTestsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StudentAptitudeTests`.
   */
  public static getModelName() {
    return "StudentAptitudeTests";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StudentAptitudeTests for dynamic purposes.
  **/
  public static factory(data: StudentAptitudeTestsInterface): StudentAptitudeTests{
    return new StudentAptitudeTests(data);
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
      name: 'StudentAptitudeTests',
      plural: 'StudentAptitudeTests',
      path: 'StudentAptitudeTests',
      idName: 'id',
      properties: {
        "yearTaken": {
          name: 'yearTaken',
          type: 'string'
        },
        "obtainedMarks": {
          name: 'obtainedMarks',
          type: 'number'
        },
        "testType": {
          name: 'testType',
          type: 'string'
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

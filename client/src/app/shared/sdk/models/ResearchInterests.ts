/* tslint:disable */

declare var Object: any;
export interface ResearchInterestsInterface {
  "researchInterest"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class ResearchInterests implements ResearchInterestsInterface {
  "researchInterest": string;
  "id": number;
  "studentId": number;
  constructor(data?: ResearchInterestsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ResearchInterests`.
   */
  public static getModelName() {
    return "ResearchInterests";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ResearchInterests for dynamic purposes.
  **/
  public static factory(data: ResearchInterestsInterface): ResearchInterests{
    return new ResearchInterests(data);
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
      name: 'ResearchInterests',
      plural: 'ResearchInterests',
      path: 'ResearchInterests',
      idName: 'id',
      properties: {
        "researchInterest": {
          name: 'researchInterest',
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

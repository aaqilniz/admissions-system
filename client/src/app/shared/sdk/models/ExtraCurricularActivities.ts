/* tslint:disable */

declare var Object: any;
export interface ExtraCurricularActivitiesInterface {
  "activity"?: string;
  "prize"?: string;
  "awardedBy"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class ExtraCurricularActivities implements ExtraCurricularActivitiesInterface {
  "activity": string;
  "prize": string;
  "awardedBy": string;
  "id": number;
  "studentId": number;
  constructor(data?: ExtraCurricularActivitiesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ExtraCurricularActivities`.
   */
  public static getModelName() {
    return "ExtraCurricularActivities";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ExtraCurricularActivities for dynamic purposes.
  **/
  public static factory(data: ExtraCurricularActivitiesInterface): ExtraCurricularActivities{
    return new ExtraCurricularActivities(data);
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
      name: 'ExtraCurricularActivities',
      plural: 'ExtraCurricularActivities',
      path: 'ExtraCurricularActivities',
      idName: 'id',
      properties: {
        "activity": {
          name: 'activity',
          type: 'string'
        },
        "prize": {
          name: 'prize',
          type: 'string'
        },
        "awardedBy": {
          name: 'awardedBy',
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

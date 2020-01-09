/* tslint:disable */

declare var Object: any;
export interface FundDetailsInterface {
  "source"?: string;
  "amountNumber"?: string;
  "duration"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class FundDetails implements FundDetailsInterface {
  "source": string;
  "amountNumber": string;
  "duration": string;
  "id": number;
  "studentId": number;
  constructor(data?: FundDetailsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FundDetails`.
   */
  public static getModelName() {
    return "FundDetails";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FundDetails for dynamic purposes.
  **/
  public static factory(data: FundDetailsInterface): FundDetails{
    return new FundDetails(data);
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
      name: 'FundDetails',
      plural: 'FundDetails',
      path: 'FundDetails',
      idName: 'id',
      properties: {
        "source": {
          name: 'source',
          type: 'string'
        },
        "amountNumber": {
          name: 'amountNumber',
          type: 'string'
        },
        "duration": {
          name: 'duration',
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

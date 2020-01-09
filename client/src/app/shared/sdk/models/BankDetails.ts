/* tslint:disable */

declare var Object: any;
export interface BankDetailsInterface {
  "bankName"?: string;
  "bankBranch"?: string;
  "accountTitle"?: string;
  "accountNumber"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class BankDetails implements BankDetailsInterface {
  "bankName": string;
  "bankBranch": string;
  "accountTitle": string;
  "accountNumber": string;
  "id": number;
  "studentId": number;
  constructor(data?: BankDetailsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BankDetails`.
   */
  public static getModelName() {
    return "BankDetails";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BankDetails for dynamic purposes.
  **/
  public static factory(data: BankDetailsInterface): BankDetails{
    return new BankDetails(data);
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
      name: 'BankDetails',
      plural: 'BankDetails',
      path: 'BankDetails',
      idName: 'id',
      properties: {
        "bankName": {
          name: 'bankName',
          type: 'string'
        },
        "bankBranch": {
          name: 'bankBranch',
          type: 'string'
        },
        "accountTitle": {
          name: 'accountTitle',
          type: 'string'
        },
        "accountNumber": {
          name: 'accountNumber',
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

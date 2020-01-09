/* tslint:disable */

declare var Object: any;
export interface StudentAddressInterface {
  "addressType": string;
  "address": string;
  "city": string;
  "phoneNumber"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class StudentAddress implements StudentAddressInterface {
  "addressType": string;
  "address": string;
  "city": string;
  "phoneNumber": string;
  "id": number;
  "studentId": number;
  constructor(data?: StudentAddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StudentAddress`.
   */
  public static getModelName() {
    return "StudentAddress";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StudentAddress for dynamic purposes.
  **/
  public static factory(data: StudentAddressInterface): StudentAddress{
    return new StudentAddress(data);
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
      name: 'StudentAddress',
      plural: 'StudentAddresses',
      path: 'StudentAddresses',
      idName: 'id',
      properties: {
        "addressType": {
          name: 'addressType',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "phoneNumber": {
          name: 'phoneNumber',
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

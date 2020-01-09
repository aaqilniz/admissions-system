/* tslint:disable */

declare var Object: any;
export interface HobbiesInterface {
  "hobby"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class Hobbies implements HobbiesInterface {
  "hobby": string;
  "id": number;
  "studentId": number;
  constructor(data?: HobbiesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Hobbies`.
   */
  public static getModelName() {
    return "Hobbies";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Hobbies for dynamic purposes.
  **/
  public static factory(data: HobbiesInterface): Hobbies{
    return new Hobbies(data);
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
      name: 'Hobbies',
      plural: 'Hobbies',
      path: 'Hobbies',
      idName: 'id',
      properties: {
        "hobby": {
          name: 'hobby',
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

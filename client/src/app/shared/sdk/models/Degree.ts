/* tslint:disable */
import {
  Department
} from '../index';

declare var Object: any;
export interface DegreeInterface {
  "degName"?: string;
  "id"?: number;
  departments?: Department[];
}

export class Degree implements DegreeInterface {
  "degName": string;
  "id": number;
  departments: Department[];
  constructor(data?: DegreeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Degree`.
   */
  public static getModelName() {
    return "Degree";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Degree for dynamic purposes.
  **/
  public static factory(data: DegreeInterface): Degree{
    return new Degree(data);
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
      name: 'Degree',
      plural: 'Degrees',
      path: 'Degrees',
      idName: 'id',
      properties: {
        "degName": {
          name: 'degName',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        departments: {
          name: 'departments',
          type: 'Department[]',
          model: 'Department',
          relationType: 'hasMany',
          modelThrough: 'Degreedepartment',
          keyThrough: 'departmentId',
          keyFrom: 'id',
          keyTo: 'degreeId'
        },
      }
    }
  }
}

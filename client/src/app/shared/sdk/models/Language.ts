/* tslint:disable */

declare var Object: any;
export interface LanguageInterface {
  "languageName"?: string;
  "spokenSkill"?: string;
  "writtenSkill"?: string;
  "id"?: number;
  "studentId"?: number;
}

export class Language implements LanguageInterface {
  "languageName": string;
  "spokenSkill": string;
  "writtenSkill": string;
  "id": number;
  "studentId": number;
  constructor(data?: LanguageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Language`.
   */
  public static getModelName() {
    return "Language";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Language for dynamic purposes.
  **/
  public static factory(data: LanguageInterface): Language{
    return new Language(data);
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
      name: 'Language',
      plural: 'Languages',
      path: 'Languages',
      idName: 'id',
      properties: {
        "languageName": {
          name: 'languageName',
          type: 'string'
        },
        "spokenSkill": {
          name: 'spokenSkill',
          type: 'string'
        },
        "writtenSkill": {
          name: 'writtenSkill',
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

import {AbstractControl} from '@angular/forms';

export class MaskValidator {

public static validate(c:AbstractControl) {
    if(c.value !== null){ 
        var valueArray: string[] = c.value;
        return( !valueArray.includes('_'))? null :{ 
            validateMask: {
            valid: false
            }
        }
    }
}
}
import { StudentApi } from './../../../shared/sdk/services/custom/Student';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class UserAuthenticationGuard implements CanActivate {

    constructor(private StudentregisterationApi: StudentApi ){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean { 
        return this.StudentregisterationApi.isAuthenticated();
    }

}
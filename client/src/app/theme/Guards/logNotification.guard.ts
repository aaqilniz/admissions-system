import { notifyLogin } from './../services/notifiyLogin/notifyLogin.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
@Injectable()
export class LogNotitficationGuard implements CanActivate {

    private logNote:any;
    constructor(){
        this.logNote = notifyLogin.getShareService();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean { 
        return this.logNote.getValue();
    }

}
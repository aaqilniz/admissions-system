import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ApplyingDegreeService{
    private applyingDegree = new BehaviorSubject<string>('');

    applyingDegree$ = this.applyingDegree.asObservable();

    sendApplyingDegree(degree: string){
        this.applyingDegree.next(degree);
    }

}
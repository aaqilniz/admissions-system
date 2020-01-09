import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ImageNameService{
    private imageName = new BehaviorSubject<string>('');

    imageName$ = this.imageName.asObservable();

    sendImageName(name: string){
        this.imageName.next(name);
    }

}
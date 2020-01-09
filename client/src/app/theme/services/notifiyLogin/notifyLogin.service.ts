import {Injectable} from '@angular/core';

@Injectable()
export class notifyLogin{

    private value : boolean = false;
    private email : string ;
    private static SharingInstance;

    constructor(){}
    
    public static getShareService(){
        if(this.SharingInstance == null){
            this.SharingInstance = new notifyLogin();
        }
        return this.SharingInstance;
    }
    public setValue(value:boolean, email:string){
      this.value = value;
      if(email !== null){
        this.email = email;
      }
    }
    public getValue(): boolean{
      return this.value;
    }
    public getEmail(): string{
        return this.email;
    }
}
//importing angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Routes } from '@angular/router';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//importing StrorageBrowser for storing temporary data
import { StorageBrowser, LoopBackAuth, StudentApi } from 'app/shared/sdk';

//declaring component with component decorator
@Component({
    selector: 'research-interest',
    templateUrl: './researchInterest.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting ResearchInterest class
export class ResearchInterest implements OnInit{
    //declaring Variables
    public form: FormGroup;
    public researchInterest1: AbstractControl;
    public researchInterest2: AbstractControl;
    public researchInterest3: AbstractControl;
    public submitted:boolean = false;
    private created: boolean;

    //constructor for ResearchInterest class
    constructor(
        private localstorage: StorageBrowser,
        private _menuService: BaMenuService,
        private auth:LoopBackAuth,
        private StudentApi:StudentApi,
        fb: FormBuilder){
        this.form = fb.group({
            'researchInterest1': [''],
            'researchInterest2': [''],
            'researchInterest3': ['']
        });
        //assigning form controls to abstractControl variables
        this.researchInterest1 = this.form.controls['researchInterest1'],
        this.researchInterest2 = this.form.controls['researchInterest2'],
        this.researchInterest3 = this.form.controls['researchInterest3']
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {

        if(this.localstorage.get('rd') !== null){
            if(this.localstorage.get('rd').length !== 0){
                console.log("line 54", this.localstorage.get('rd'));
                this.restoreResearchDetails(this.localstorage.get('rd'));
                this.created = true;
            }
            else{
                this.StudentApi.getResearchInterests(this.auth.getCurrentUserId()).subscribe( 
                    (data) => {
                        this.restoreResearchDetails(data); 
                        console.log("line 62",data);
                        this.localstorage.set('rd',data); 
                        if(data.length !== 0){
                            
                            this.created = true;
                        }     
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        } else {
            this.StudentApi.getResearchInterests(this.auth.getCurrentUserId()).subscribe( 
                (data) => {
                    this.restoreResearchDetails(data); 
                    console.log("line 78",data);
                    this.localstorage.set('rd',data);      
                    if(data.length !== 0){
                        this.created = true;
                    }    
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }

    //restoreResearchDetails
    public restoreResearchDetails(body:any){
        var length = body.length;
        console.log("in restore body",body[0].researchInterest);
        for(var i : number = 0; i <length; i++){
            if(i === 0){
                console.log("in if body",body[0].researchInterest);
                this.researchInterest1.setValue(body[0].researchInterest);
            }else if(i === 1){
                this.researchInterest2.setValue(body[1].researchInterest);
            }else if(i === 2){
                this.researchInterest2.setValue(body[2].researchInterest);
            }
        }

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values: object):void {
        var body = [];
        var localBody = {
            'researchInterest1' : this.researchInterest1.value,
            'researchInterest2' : this.researchInterest2.value,
            'researchInterest3' : this.researchInterest3.value
        }

        body = this.bodyMaker(localBody);
        console.log('line 131',body);
        this.StudentApi.createManyResearchInterests(this.auth.getCurrentUserId(),body).subscribe(
            (success) => {
                //adding checked icon with title when this form is filled
                PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';
         
                //method responsible for showing sidebar
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
         
                // saving variable status to local storage
                this.localstorage.set('rd', success);
            },
            (error)=>{
                console.log(error);
            }
        );
    }

    public onUpdateSubmit(values: object):void{
        var body = [];
        var counter:number = 0;
        var localBody = {
            'researchInterest1' : this.researchInterest1.value,
            'researchInterest2' : this.researchInterest2.value,
            'researchInterest3' : this.researchInterest3.value
        }

        body = this.bodyMaker(localBody);
        this.localstorage.get('rd').forEach(element => {
            this.StudentApi.updateByIdResearchInterests(this.auth.getCurrentUserId(),element.id,body[counter]).subscribe(
                (success) => {
                    //adding checked icon with title when this form is filled
                    PAGES_MENU[0].children[1].children[9].data.menu.icon = 'ion-android-done';
                
                    //method responsible for showing sidebar
                    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            
                    // saving variable status to local storage
                    this.localstorage.set('rd', success);
                },
                (error)=> {
                    console.log(error);
                }
            );
            counter++
        });
    }

    public bodyMaker(localBody:any){
        var body = [];
       if(localBody.researchInterest1 !== "" && localBody.researchInterest1 !== undefined){
           body.push({
            'researchInterest': localBody.researchInterest1
           });
       }
       if(localBody.researchInterest2 !== "" && localBody.researchInterest2 !== undefined){
            body.push({
            'researchInterest': localBody.researchInterest2
            });
        }
        if(localBody.researchInterest3 !== "" && localBody.researchInterest3 !== undefined){
            body.push({
             'researchInterest': localBody.researchInterest1
            });
        }
        return body;
     }
    
}
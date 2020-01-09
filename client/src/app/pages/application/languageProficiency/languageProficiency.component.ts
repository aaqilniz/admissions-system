import { StudentApi } from './../../../shared/sdk/services/custom/Student';
import { LoopBackAuth } from './../../../shared/sdk/services/core/auth.service';
import { Language } from './../../../shared/sdk/models/Language';
//imports section
// imports angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { StorageBrowser } from 'app/shared/sdk';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
    selector: 'language-proficiency',
    templateUrl: './languageProficiency.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting LanguageProficiency class
export class LanguageProficiency implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public languages: any;
    public writtens: any;
    public spokens: any;

    public submitted: boolean = false;
    private created : boolean;

    //constructor for LanguageProficiency class
    constructor(
        private _menuService: BaMenuService,
        fb: FormBuilder,
        private auth:LoopBackAuth,
        private StudentApi:StudentApi,
        private router: Router,
        private localstorage: StorageBrowser){
        this.form = fb.group({
            'languages':fb.array(['']),
            'writtens': fb.array(['']),
            'spokens': fb.array([''])
        });
        //assigning form controls to abstractControl variables
        this.languages = this.form.controls['languages'];
        this.writtens = this.form.controls['writtens'];
        this.spokens = this.form.controls['spokens'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        
        if(this.localstorage.get('ld') !== null){
            if(this.localstorage.get('ld').length !== 0){
                
                this.restoreLanguageDetails(this.localstorage.get('ld'));
                this.created = true;
            }else{
                this.getDBValues();
            }

        } else {
           this.getDBValues();
        }
    }

    public getDBValues(){
        this.StudentApi.getLanguages(this.auth.getCurrentUserId()).subscribe( 
            (data) => {
                this.restoreLanguageDetails(data);
                this.localstorage.set('ld',data);
                if(data.length !== 0){
                    this.created = true;
                }    
            },
            (err) => {
                console.log(err);
            }
        );
    }

    //restoreLanguageDetails
    public restoreLanguageDetails(body:any){
        var languageName = [] ; 
        var writtenSkill = [] ;
        var spokenSkill = [];
        var addLanguageCounter = 0;
        body.forEach(languageDetail => {
            if(addLanguageCounter !== 0){
                this.onAddLanguage();
            }
            languageName.push(languageDetail.languageName);
            writtenSkill.push(languageDetail.writtenSkill);
            spokenSkill.push(languageDetail.spokenSkill);
            addLanguageCounter++;
        });
        this.languages.setValue(languageName);
        this.writtens.setValue(writtenSkill);
        this.spokens.setValue(spokenSkill);

         //adding checked icon with title when this form is filled
         PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onAddLanguage() method which is bind with button to push three arrays
    onAddLanguage() {
        (<FormArray>this.languages).push(new FormControl(''));
        (<FormArray>this.writtens).push(new FormControl(''));
        (<FormArray>this.spokens).push(new FormControl(''));
    }

    //defining onDeleteLanguage() method which is bind with button to delete three arrays
    onDeleteLanguage(){
        (<FormArray>this.languages).removeAt(-1);
        (<FormArray>this.writtens).removeAt(-1);
        (<FormArray>this.spokens).removeAt(-1);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        
        //navigating to aptitudeTests after skip button is clicked
        this.router.navigateByUrl('/pages/application/aptitudeTests');
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        this.submitted = true;
        var localBody,body;

        localBody = {
            'languages' : this.languages.value,
            'writtens' : this.writtens.value,
            'spokens' : this.spokens.value
        }
        body = this.bodyMaker(localBody);
        this.StudentApi.createManyLanguages(this.auth.getCurrentUserId(),body).subscribe(
            (success) => {

                 //adding checked icon with title when this form is filled
                PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';
        
                //method responsible for showing sidebar
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        
                //navigating to aptitudeTests after this form is submitted
                this.router.navigateByUrl('/pages/application/aptitudeTests');
        
                // saving variable status to local storage
                this.localstorage.set('ld', success);
            }
        )

       
    }

    public onUpdateSubmit(values: object):void{

        var localBody,body;
        var dbBody = [];
        var counter : number = 0;
        localBody = {
            'languages' : this.languages.value,
            'writtens' : this.writtens.value,
            'spokens' : this.spokens.value
        }
        body = this.bodyMaker(localBody);
        
        this.StudentApi.deleteLanguages(this.auth.getCurrentUserId()).subscribe(
            (success) => {
                this.StudentApi.createManyLanguages(this.auth.getCurrentUserId(),body).subscribe(
                    (success) => {
        
                         //adding checked icon with title when this form is filled
                        PAGES_MENU[0].children[1].children[4].data.menu.icon = 'ion-android-done';
                
                        //method responsible for showing sidebar
                        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                
                        //navigating to aptitudeTests after this form is submitted
                        this.router.navigateByUrl('/pages/application/aptitudeTests');
                
                        // saving variable status to local storage
                        this.localstorage.set('ld', success);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public bodyMaker(localBody:any){
        length = localBody.languages.length;
        var body = [];
        for(var i:number = 0; i<length; i++){
            if((
                localBody.languages[i] !== '' && 
                localBody.spokens[i] !== '' && 
                localBody.writtens[i] !== '') && (
                localBody.languages[i] !== undefined && 
                localBody.spokens[i] !== undefined && 
                localBody.writtens[i] !== undefined 
                )){
                var makeSingleBody ={
                    'languageName': localBody.languages[i],
                    'spokenSkill': localBody.spokens[i],
                    'writtenSkill': localBody.writtens[i]
                }
                body.push(makeSingleBody);
            }
        }
        return body;
    }
}
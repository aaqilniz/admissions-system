//imports section
// imports angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { StorageBrowser, LoopBackAuth, StudentApi } from 'app/shared/sdk';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';
import { Http } from '@angular/http';

//declaring component with component decorator
@Component({
    selector: 'aptitude-test',
    templateUrl: './aptitudeTests.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting ApptitudeTests class
export class ApptitudeTests implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public testTypes: any;
    public yearTakens: any;
    public obtainedMarks: any;
    private years: any;

    public submitted: boolean = false;
    private created: boolean;

    //constructor for ApptitudeTests class
    constructor(
        private _menuService: BaMenuService,
        fb: FormBuilder,
        private router: Router,
        private auth:LoopBackAuth,
        private StudentApi:StudentApi,
        private http:Http,
        private localstorage: StorageBrowser){
        this.form = fb.group({
            'testTypes':fb.array(['']),
            'yearTakens': fb.array(['']),
            'obtainedMarks': fb.array([''])
        });
        //assigning form controls to abstractControl variables
        this.testTypes = this.form.controls['testTypes'];
        this.yearTakens = this.form.controls['yearTakens'];
        this.obtainedMarks = this.form.controls['obtainedMarks'];
    }

    //defining onAddLanguage() method which is bind with button to push three arrays
    onAddLanguage() {
        (<FormArray>this.testTypes).push(new FormControl(''));
        (<FormArray>this.yearTakens).push(new FormControl(''));
        (<FormArray>this.obtainedMarks).push(new FormControl(''));  
    }

    //defining onDeleteLanguage() method which is bind with button to delete three arrays
    onDeleteLanguage(){
        (<FormArray>this.testTypes).removeAt(-1);
        (<FormArray>this.yearTakens).removeAt(-1);
        (<FormArray>this.obtainedMarks).removeAt(-1);
    }

    //defining getYears() method for getting data from json file at specified location which contains list of years
    public getYears(){
        return this.http.get('/assets/countries-cities/years.json')
        .map((res: any) => res.json());
      }

    //ngOnit hook is called before the form is loaded
    ngOnInit(): void{

        //using getYears() method which contains list of years to assign data to array
        this.getYears()
        .subscribe((data) => {
        this.years = data;
        },(error) => {
            console.log('Unable to load some data' + error);
        })

        if(this.localstorage.get('atd') !== null){
            if(this.localstorage.get('atd').length !== 0){
                this.restoreAptitudeTestDetails(this.localstorage.get('atd'));
                this.created = true;
            }
            else{
                this.getDBValues();
            }

        } else {
           this.getDBValues();
        }
    }

    public getDBValues(){
        this.StudentApi.getStudentAptitudeTests(this.auth.getCurrentUserId()).subscribe( 
            (data) => {
                this.restoreAptitudeTestDetails(data);
                this.localstorage.set('atd',data);
                if(data.length !== 0){
                    this.created = true;
                }    
            },
            (err) => {
                console.log(err);
            }
        );
    }

    //restoreAptitudeTestDetails
    public restoreAptitudeTestDetails(body:any){
        var testTypes = [] ; 
        var yearTakens = [] ;
        var obtainedMarks = [];
        var addLanguageCounter = 0;
        body.forEach(testTypesDetails => {
            if(addLanguageCounter !== 0){
                this.onAddLanguage();
            }
            testTypes.push(testTypesDetails.testType);
            yearTakens.push(testTypesDetails.yearTaken);
            obtainedMarks.push(testTypesDetails.obtainedMarks);
            addLanguageCounter++;
        });

        this.testTypes.setValue(testTypes);
        this.yearTakens.setValue(yearTakens);
        this.obtainedMarks.setValue(obtainedMarks);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        
        //navigating to familyDetails after skip button is clicked
        this.router.navigateByUrl('/pages/application/familyDetails');
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        this.submitted = true;
        var body, localBody;
        localBody = {
            'testTypes' : this.testTypes.value,
            'yearTakens' : this.yearTakens.value,
            'obtainedMarks' : this.obtainedMarks.value
        }

        body = this.bodyMaker(localBody);
        this.StudentApi.createManyStudentAptitudeTests(this.auth.getCurrentUserId(),body).subscribe(
        (success) => {
            //adding checked icon with title when this form is filled
            PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';

            //method responsible for showing sidebar
            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

            //navigating to familyDetails after this form is submitted
            this.router.navigateByUrl('/pages/application/familyDetails');

            // saving variable status to local storage
            this.localstorage.set('atd', success);
        });
    }

    public onUpdateSubmit(values: object):void{

        var body, localBody;
        localBody = {
            'testTypes' : this.testTypes.value,
            'yearTakens' : this.yearTakens.value,
            'obtainedMarks' : this.obtainedMarks.value
        }

        body = this.bodyMaker(localBody);
        this.StudentApi.deleteStudentAptitudeTests(this.auth.getCurrentUserId()).subscribe(
            (success) => {
                this.StudentApi.createManyStudentAptitudeTests(this.auth.getCurrentUserId(),body).subscribe(
                (success) => {
                    //adding checked icon with title when this form is filled
                    PAGES_MENU[0].children[1].children[5].data.menu.icon = 'ion-android-done';
        
                    //method responsible for showing sidebar
                    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        
                    //navigating to familyDetails after this form is submitted
                    this.router.navigateByUrl('/pages/application/familyDetails');
        
                    // saving variable status to local storage
                    this.localstorage.set('atd', success);
                },
                (error) => {
                    console.log(error);
                }
            );
            },
            (error) => {
                console.log(error);
            }
        );
    }


    public bodyMaker(localBody:any){
        length = localBody.testTypes.length;
        console.log(length);
        var body = [];
        for(var i:number = 0; i<length; i++){
            if((
                localBody.testTypes[i] !== '' && 
                localBody.yearTakens[i] !== '' && 
                localBody.obtainedMarks[i] !== '') && (
                localBody.testTypes[i] !== undefined && 
                localBody.yearTakens[i] !== undefined && 
                localBody.obtainedMarks[i] !== undefined
                )){
                var makeSingleBody ={
                    'yearTaken': localBody.yearTakens[i],
                    'obtainedMarks': localBody.obtainedMarks[i],
                    'testType': localBody.testTypes[i]
                }
                body.push(makeSingleBody);
            }
        }
        return body;
    }
}
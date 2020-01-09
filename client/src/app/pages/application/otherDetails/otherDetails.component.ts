
//imports section
// imports angular modules
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Component,  OnInit } from '@angular/core';
import { Routes, Router} from '@angular/router';
import { StorageBrowser, LoopBackAuth, StudentApi } from 'app/shared/sdk';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from '../../../pages/pages.menu';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';
import { ApplyingDegreeService } from 'app/pages/application/Services';

//declaring component with component decorator
@Component({
    selector: 'other-details',
    templateUrl: './otherDetails.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting OtherDetails class
export class OtherDetails implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public hobbies: any;
    public activities: any;
    public prize: any;
    public awarded: any;
    public applyingDegree: string;
    public submitted: boolean = false;
    public created: boolean;

    //constructor for OtherDetails class
    constructor(
        private _menuService: BaMenuService,
        private fb: FormBuilder,
        private router: Router,
        private auth:LoopBackAuth,
        private StudentApi:StudentApi,
        private applingDegreeService: ApplyingDegreeService,
        private localstorage: StorageBrowser
    ){
        this.form = fb.group({
            'hobbies': fb.array(['']),
            'activities':fb.array(['']),
            'prize': fb.array(['']),
            'awarded': fb.array([''])
        });
        //assigning form controls to abstractControl variables
        this.hobbies = this.form.controls['hobbies'];
        this.activities = this.form.controls['activities'];
        this.prize = this.form.controls['prize'];
        this.awarded = this.form.controls['awarded'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
       if(this.localstorage.get('hd') !== null){
        if(this.localstorage.get('hd').length !== 0){
            this.restoreOtherDetails(this.localstorage.get('hd'),'Hobbies');
            if(this.localstorage.get('ecad') !== null){
                if(this.localstorage.get('ecad').length !== 0){
                    this.restoreOtherDetails(this.localstorage.get('ecad'),'Activities');
                    this.created = true;
                }else{
                    this.getActivitiesDbValues();
                }
            }else{
               this.getActivitiesDbValues();
            }
        }else{
            this.getHobbiesDbValues();
        }
        } else {
            this.StudentApi.getHobbies(this.auth.getCurrentUserId()).subscribe(
                (data) => {
                    this.restoreOtherDetails(data,'Hobbies');
                    this.localstorage.set('hd',data);
                    if(this.localstorage.get('ecad') !== null){
                        if(this.localstorage.get('ecad').length !== 0){
                            this.restoreOtherDetails(this.localstorage.get('ecad'),'Activities');
                            this.created = true;
                        }else{
                            this.getActivitiesDbValues();
                        }
                    }else{
                       this.getActivitiesDbValues();
                    }
                    this.created = true;
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        this.applingDegreeService.applyingDegree$.subscribe(applyingDegree => this.applyingDegree = applyingDegree);
    }

    getActivitiesDbValues(){
        this.StudentApi.getExtraCurricularActivities(this.auth.getCurrentUserId()).subscribe(
            (data) => {
                this.restoreOtherDetails(data,'Activities');
                this.localstorage.set('ecad',data);
                if(data.length !== 0){
                    this.created = true;
                }    
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getHobbiesDbValues(){
        this.StudentApi.getHobbies(this.auth.getCurrentUserId()).subscribe(
            (data) => {
                this.restoreOtherDetails(data,'Hobbies');
                this.localstorage.set('hd',data);
                if(data.length !== 0){
                    this.created = true;
                }    
            },
            (err) => {
                console.log(err);
            }
        );
    }
    //restoreOtherDetails
    public restoreOtherDetails(body:any, restoreFor: any){
        if(restoreFor === 'Hobbies' && body.length !== 0){
            var hobby = [] ; 
            var addhobbyCounter = 0;
            body.forEach(otherDetails => {
                if(addhobbyCounter !== 0){
                    this.onAddHobby('restore');
                }
                hobby.push(otherDetails.hobby);
                addhobbyCounter++;
            });
            this.hobbies.setValue(hobby);

        }else if(restoreFor === 'Activities' && body.length !== 0){
            var prize = [] ; 
            var activities = [] ;
            var awarded = [];
            var addactivitesCounter = 0;
            body.forEach(otherDetails => {
                if(addactivitesCounter !== 0){
                    this.onAddActivity('restore');
                }
                prize.push(otherDetails.prize);
                activities.push(otherDetails.activity);
                awarded.push(otherDetails.awardedBy);
                addactivitesCounter++;
            });
    
            this.activities.setValue(activities);
            this.prize.setValue(prize);
            this.awarded.setValue(awarded);
        }
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //when skip button is pressed
    public onSkipClick(): void {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
        
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //defining onAddHobby() method which is bind with add hobby button to push another element of array
    onAddHobby(restoring?:any) {
        if(this.hobbies.value[0] !== ''){
        (<FormArray>this.hobbies).push(new FormControl('')); 
        } else if(restoring === 'restore') { 
            (<FormArray>this.hobbies).push(new FormControl(''))
        }
    }

    //defining onAddActivity() method which is bind with button to push three arrays
    onAddActivity(restoring?:any) {
        if(this.activities.value[0] !== '' || this.prize.value[0] !== '' || this.awarded.value[0] !== ''){
            (<FormArray>this.activities).push(new FormControl(''));
            (<FormArray>this.prize).push(new FormControl(''));
            (<FormArray>this.awarded).push(new FormControl(''));
        }else if(restoring === 'restore'){
            (<FormArray>this.activities).push(new FormControl(''));
            (<FormArray>this.prize).push(new FormControl(''));
            (<FormArray>this.awarded).push(new FormControl(''));
        } 
    }  
    
    //defining onDeleteHobby() method which is bind with button to delete one element of hobby array
    onDeleteHobby(){
        (<FormArray>this.hobbies).removeAt(-1);
    }

    //defining onDeleteActivity() method which is bind with button to delete three arrays
    onDeleteActivity(){
        (<FormArray>this.activities).removeAt(-1);
        (<FormArray>this.prize).removeAt(-1);
        (<FormArray>this.awarded).removeAt(-1);
    }

    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object):void {
        var activityBody, hobbyBody, activitesBody,hobbies;
        activitesBody = {
            'activities' : this.activities.value,
            'prize' : this.prize.value,
            'awarded' : this.awarded.value
        }
        hobbies = {
            'hobbies' : this.hobbies.value
        }
        activityBody = this.bodyMaker(activitesBody, 'activities');
        hobbyBody = this.bodyMaker(hobbies, 'hobbies');

        
        if( this.hobbies.value.length !== 0 && this.hobbies.value[0] !== ""){
            this.StudentApi.createManyHobbies(this.auth.getCurrentUserId(),hobbyBody).subscribe(
                (hobbiesSuccess) => {
                    if(this.activities.value.length !== 0 && this.activities.value[0] !== ""){
                        this.StudentApi.createManyExtraCurricularActivities(this.auth.getCurrentUserId(),activityBody).subscribe(
                        (activitiesSuccess) => {
                            //adding checked icon with title when this form is filled
                            PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
                            
                            //method responsible for showing sidebar
                            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                    
                            if(this.applyingDegree === 'PHD' || this.applyingDegree === 'Graduate'){
                                this.router.navigateByUrl('/pages/application/fundDetails');
                            } else {
                                //code goes here
                            }
                    
                            // saving variable status to local storage
                            this.localstorage.set('ecad', activitiesSuccess);
                        },
                        (activitiesError) => {
                            console.log(activitiesError);
                        });
                    }else {
                         //adding checked icon with title when this form is filled
                         PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
                         
                         //method responsible for showing sidebar
                         this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                 
                         if(this.applyingDegree === 'PHD' || this.applyingDegree === 'Graduate'){
                             this.router.navigateByUrl('/pages/application/fundDetails');
                         } else {
                             //code goes here
                         }
                    }
                    this.localstorage.set('hd', hobbiesSuccess);
                    console.log("line 267",this.localstorage.get('hd'));
                },
                (hobbiesError) => {
                    console.log(hobbiesError);
                }
            );

        }else {
            if(this.activities.value.length !== 0 && this.activities.value[0] !== ""){
                this.StudentApi.createManyExtraCurricularActivities(this.auth.getCurrentUserId(),activityBody).subscribe(
                (activitiesSuccess) => {
                    //adding checked icon with title when this form is filled
                    PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
                    
                    //method responsible for showing sidebar
                    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            
                    if(this.applyingDegree === 'PHD' || this.applyingDegree === 'Graduate'){
                        this.router.navigateByUrl('/pages/application/fundDetails');
                    } else {
                        //code goes here
                    }
            
                    // saving variable status to local storage
                    this.localstorage.set('ecad', activitiesSuccess);
                    this.localstorage.set('hd', null);
                },
                (activitiesError) => {
                    console.log(activitiesError);
                });
            }
        }
    }

    public onUpdateSubmit(values: object):void{

        var activityBody, hobbyBody, activitesBody,hobbies;
        activitesBody = {
            'activities' : this.activities.value,
            'prize' : this.prize.value,
            'awarded' : this.awarded.value
        }
        hobbies = {
            'hobbies' : this.hobbies.value
        }

        activityBody = this.bodyMaker(activitesBody, 'activities');
        hobbyBody = this.bodyMaker(hobbies, 'hobbies');

        this.StudentApi.deleteHobbies(this.auth.getCurrentUserId()).subscribe(
            (success) => {
                this.StudentApi.createManyHobbies(this.auth.getCurrentUserId(),hobbyBody).subscribe(
                    (hobbiesSuccess) => {
                        //adding checked icon with title when this form is filled
                        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
                        
                        //method responsible for showing sidebar
                        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                
                        if(this.applyingDegree === 'PHD' || this.applyingDegree === 'Graduate'){
                            this.router.navigateByUrl('/pages/application/fundDetails');
                        } else {
                            //code goes here
                        }
                
                        // saving variable status to local storage
                        this.localstorage.set('hd', hobbies);
                        console.log("line 330",this.localstorage.get('hd'));
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        );

        this.StudentApi.deleteExtraCurricularActivities(this.auth.getCurrentUserId()).subscribe(
            (success) => {
                this.StudentApi.createManyExtraCurricularActivities(this.auth.getCurrentUserId(),activityBody).subscribe(
                    (activitiesSuccess) => {
                        //adding checked icon with title when this form is filled
                        PAGES_MENU[0].children[1].children[7].data.menu.icon = 'ion-android-done';
                        
                        //method responsible for showing sidebar
                        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                
                        if(this.applyingDegree === 'PHD' || this.applyingDegree === 'Graduate'){
                            this.router.navigateByUrl('/pages/application/fundDetails');
                        } else {
                            //code goes here
                        }
                
                        // saving variable status to local storage
                        this.localstorage.set('ecad', activitiesSuccess);
                        console.log("line 357",this.localstorage.get('ecad'));
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        );
    }

    public bodyMaker(localBody:any, bodyFor: any){
        var body = [];
        if(bodyFor === 'activities'){
            length = localBody.activities.length;
            for(var i:number = 0; i<length; i++){
                if((
                    localBody.activities[i] !== '' && 
                    localBody.prize[i] !== '' && 
                    localBody.awarded[i] !== '') && (
                    localBody.activities[i] !== undefined && 
                    localBody.prize[i] !== undefined && 
                    localBody.awarded[i] !== undefined
                    )){
                    var makeSingleBody ={
                        'activity': localBody.activities[i],
                        'prize': localBody.prize[i],
                        'awardedBy': localBody.awarded[i]
                    }
                    body.push(makeSingleBody);
                }
            }
        } else if(bodyFor === 'hobbies') {
            length = localBody.hobbies.length;
            for(var i:number = 0; i<length; i++){
                if(localBody.hobbies[i] !== '' && localBody.hobbies[i] !== undefined){
                    var makeBody = {
                        'hobby': localBody.hobbies[i]
                    }
                    body.push(makeBody);
                }
            }
        }
        
        return body;
    }
}
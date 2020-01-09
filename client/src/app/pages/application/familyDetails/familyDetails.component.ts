//imports section
// imports angular modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { StorageBrowser, LoopBackAuth, StudentApi } from 'app/shared/sdk';

//importing services and maskvalidator to be used in this class
import { BaMenuService } from 'app/theme';
import { MaskValidator } from './../../../theme/validators/mask.validator';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
    selector:'family-Details',
    templateUrl: './familyDetails.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting FamilyDetailsclass
export class FamilyDetails implements OnInit{
    //declaring valriables
    public form: FormGroup;
    public livingStatus: AbstractControl;
    public noOfDependants: AbstractControl;
    public monthlyIncome: AbstractControl;
    public guardianFatherName: AbstractControl;
    public guardianFatherOccupation: AbstractControl;
    public guardianFatherPhone: AbstractControl;
    public guardianFatherMobile: AbstractControl;
    public accountTitle: AbstractControl;
    public accountNo: AbstractControl;
    public bankName: AbstractControl;
    public bankBranch: AbstractControl;
    public submitted: boolean = false;
    public created: boolean;

    private mobileMask = [ /[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,];
    
    //constructor for FamilyDetails class
    constructor(
        private _menuService: BaMenuService,
        fb:FormBuilder, private router: Router,
        private auth:LoopBackAuth,
        private StudentApi:StudentApi,
        private localstorage: StorageBrowser) {
        this.form = fb.group({
            'livingStatus' : ['',Validators.required],
            'noOfDependants' : ['',Validators.required],
            'monthlyIncome' : ['',Validators.required],
            'guardianFatherName' : ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'guardianFatherOccupation' : ['',Validators.required],
            'guardianFatherPhone' : [''],
            'guardianFatherMobile' : ['',Validators.compose([Validators.required,MaskValidator.validate])],
            'accountTitle' : [''],
            'accountNo' : [''],
            'bankName' : [''],
            'bankBranch' : ['']
        });
        //assigning form controls to abstractControl variables
        this.livingStatus = this.form.controls['livingStatus'];
        this.noOfDependants = this.form.controls['noOfDependants'];
        this.monthlyIncome = this.form.controls['monthlyIncome'];
        this.guardianFatherName = this.form.controls['guardianFatherName'];
        this.guardianFatherOccupation = this.form.controls['guardianFatherOccupation'];
        this.guardianFatherPhone = this.form.controls['guardianFatherPhone'];
        this.guardianFatherMobile = this.form.controls['guardianFatherMobile'];
        this.accountTitle = this.form.controls['accountTitle'];
        this.accountNo = this.form.controls['accountNo'];
        this.bankName = this.form.controls['bankName'];
        this.bankBranch = this.form.controls['bankBranch'];
    }

    //ngOnit hook is executed before the form is loaded
    ngOnInit(): void {
        
        if(this.localstorage.get('fd') !== null){

            this.restoreFamilyDetails(this.localstorage.get('fd'));
            if(this.localstorage.get('bd') !== null){

                this.restoreBankDetails(this.localstorage.get('bd'));
                this.created = true;
            }else{
            
                this.StudentApi.getBankDetails(this.auth.getCurrentUserId()).subscribe(
                    (data) => {
                        this.restoreBankDetails(data);
                        this.localstorage.set('bd',data);
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

            this.StudentApi.getFamilyDetails(this.auth.getCurrentUserId()).subscribe(
                (data) => {
                    this.restoreFamilyDetails(data);
                    this.localstorage.set('fd',data);
                    if(this.localstorage.get('bd') !== null){

                        this.restoreBankDetails(this.localstorage.get('bd'));
                        this.created = true;
                    }else{
                    
                        this.StudentApi.getBankDetails(this.auth.getCurrentUserId()).subscribe(
                            (data) => {
                                this.restoreBankDetails(data);
                                this.localstorage.set('bd',data);
                                if(data.length !== 0){
                                    this.created = true;
                                }    
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                    }
                    this.created = true;
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }

    //restoreFamilyDetails
    public restoreFamilyDetails(body:any){

        this.livingStatus.setValue(body.fatherLivingStatus);
        this.noOfDependants.setValue(body.numberOfDependents);
        this.monthlyIncome.setValue(body.monthlyIncome);
        this.guardianFatherName.setValue(body.fatherOrGaurdianName);
        this.guardianFatherOccupation.setValue(body.fatherOrGaurdianOcupation);
        this.guardianFatherPhone.setValue(body.fatherOrGaurdianPhoneNumber);
        this.guardianFatherMobile.setValue(body.fatherOrGaurdianMobileNumber);
        this.accountTitle.setValue(body.accountTitle);
        this.accountNo.setValue(body.accountNo);
        this.bankName.setValue(body.bankName);
        this.bankBranch.setValue(body.bankBranch);

        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    }

    //restorebankDetails
    public restoreBankDetails(body:any){

                this.accountTitle.setValue(body.accountTitle);
                this.accountNo.setValue(body.accountNumber);
                this.bankName.setValue(body.bankName);
                this.bankBranch.setValue(body.bankBranch);
        
                //adding checked icon with title when this form is filled
                PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
        
                //method responsible for showing sidebar
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            }


    //defining onSubmit() method which is called when submit button is clicked
    public onSubmit(values:object): void {
        this.submitted = true;
        var bankLocalBody = null;
        var familyLocalBody = null;
        if(this.form.valid) {
            familyLocalBody = {
                'fatherLivingStatus' : this.livingStatus.value,
                'numberOfDependents' : this.noOfDependants.value,
                'monthlyIncome' : this.monthlyIncome.value,
                'fatherOrGaurdianName' : this.guardianFatherName.value,
                'fatherOrGaurdianOcupation' : this.guardianFatherOccupation.value,
                'fatherOrGaurdianPhoneNumber' : this.guardianFatherPhone.value,
                'fatherOrGaurdianMobileNumber' : this.guardianFatherMobile.value,
                
            }
            if((
                this.accountTitle.value !== '' && 
                this.accountNo.value !== '' && 
                this.bankName.value !== '' && 
                this.bankBranch.value !== '') && (
                this.accountTitle.value !== undefined && 
                this.accountNo.value !== undefined && 
                this.bankName.value !== undefined && 
                this.bankBranch.value !== undefined
                )){
                
                bankLocalBody ={
                    'accountTitle' : this.accountTitle.value,
                    'accountNumber' : this.accountNo.value,
                    'bankName' : this.bankName.value,
                    'bankBranch' : this.bankBranch.value
                }
            }
        }

        this.StudentApi.createFamilyDetails(this.auth.getCurrentUserId(),familyLocalBody).subscribe(
            (familyDetailsCreateSuccess) => {
                if(bankLocalBody !== null){
                    this.StudentApi.createBankDetails(this.auth.getCurrentUserId(),bankLocalBody).subscribe(
                        (bankDetailsCreateSuccess) => {
                                //adding checked icon with title when this form is filled
                                PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
            
                                //method responsible for showing sidebar
                                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            
                                //navigating to otherDetails after this form is submitted
                                this.router.navigateByUrl('/pages/application/otherDetails');

                                //saving variable status to localstorage
                                this.localstorage.set('bd', bankLocalBody);
                                this.localstorage.set('fd', familyLocalBody);
                        },
                        (bankDetailsCreateError) =>{
                            if(bankDetailsCreateError.message === 'HasOne relation cannot create more than one instance of bankDetails'){
                                this.StudentApi.updateBankDetails(this.auth.getCurrentUserId(),bankLocalBody).subscribe(
                                    (bankDetailsUpdateSuccess) => {
                                         //adding checked icon with title when this form is filled
                                        PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
                                
                                        //method responsible for showing sidebar
                                        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                    
                                        //navigating to otherDetails after this form is submitted
                                        this.router.navigateByUrl('/pages/application/otherDetails');
        
                                        //saving variable status to localstorage
                                        this.localstorage.set('bd', bankLocalBody);
                                        this.localstorage.set('fd', familyLocalBody);
                                    }, 
                                    (bankDetailsUpdateError) =>{
                                        console.log(bankDetailsUpdateError);
                                    }
                                );
                            }else {
                                console.log(bankDetailsCreateError);
                            }
                        }
                    );
                }else {
                    //adding checked icon with title when this form is filled
                    PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
                      
                    //method responsible for showing sidebar
                    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

                    //navigating to otherDetails after this form is submitted
                    this.router.navigateByUrl('/pages/application/otherDetails');

                    //saving variable status to localstorage
                    this.localstorage.set('bd', bankLocalBody);
                    this.localstorage.set('fd', familyLocalBody);
                }
            },
            (familyDetailsCreateError) => {
                if(familyDetailsCreateError.message === 'HasOne relation cannot create more than one instance of familyDetails'){
                    this.StudentApi.updateFamilyDetails(this.auth.getCurrentUserId(),familyLocalBody).subscribe(
                        (familyDetailsUpdateSuccess) => {
                            if(bankLocalBody !== null){
                                this.StudentApi.createBankDetails(this.auth.getCurrentUserId(),bankLocalBody).subscribe(
                                    (bankDetailsCreateSuccess) => {
                                            //adding checked icon with title when this form is filled
                                            PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
                        
                                            //method responsible for showing sidebar
                                            this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                        
                                            //navigating to otherDetails after this form is submitted
                                            this.router.navigateByUrl('/pages/application/otherDetails');
            
                                            //saving variable status to localstorage
                                            this.localstorage.set('bd', bankLocalBody);
                                            this.localstorage.set('fd', familyLocalBody);
                                    },
                                    (bankDetailsCreateError) =>{
                                        if(bankDetailsCreateError.message === 'HasOne relation cannot create more than one instance of bankDetails'){
                                            this.StudentApi.updateBankDetails(this.auth.getCurrentUserId(),bankLocalBody).subscribe(
                                                (bankDetailsUpdateSuccess) => {
                                                     //adding checked icon with title when this form is filled
                                                    PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
                                            
                                                    //method responsible for showing sidebar
                                                    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                                
                                                    //navigating to otherDetails after this form is submitted
                                                    this.router.navigateByUrl('/pages/application/otherDetails');
                    
                                                    //saving variable status to localstorage
                                                    this.localstorage.set('bd', bankLocalBody);
                                                    this.localstorage.set('fd', familyLocalBody);
                                                }, 
                                                (bankDetailsUpdateError) =>{
                                                    console.log(bankDetailsUpdateError);
                                                }
                                            );
                                        }else {
                                            console.log(bankDetailsCreateError);
                                        }
                                    }
                                );
                            }else {
                                //adding checked icon with title when this form is filled
                                PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
                                  
                                //method responsible for showing sidebar
                                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            
                                //navigating to otherDetails after this form is submitted
                                this.router.navigateByUrl('/pages/application/otherDetails');
            
                                //saving variable status to localstorage
                                this.localstorage.set('bd', bankLocalBody);
                                this.localstorage.set('fd', familyLocalBody);
                            }
                        }
                    );
                }else{
                    console.log(familyDetailsCreateError);
                }
            }
            
        );
    }

    public onUpdateSubmit(values: object):void{
        var bankLocalBody = null;
        var familyLocalBody = null;
        if(this.form.valid) {
            familyLocalBody = {
                'fatherLivingStatus' : this.livingStatus.value,
                'numberOfDependents' : this.noOfDependants.value,
                'monthlyIncome' : this.monthlyIncome.value,
                'fatherOrGaurdianName' : this.guardianFatherName.value,
                'fatherOrGaurdianOcupation' : this.guardianFatherOccupation.value,
                'fatherOrGaurdianPhoneNumber' : this.guardianFatherPhone.value,
                'fatherOrGaurdianMobileNumber' : this.guardianFatherMobile.value,
                
            }
            if((
                this.accountTitle.value !== '' && 
                this.accountNo.value !== '' && 
                this.bankName.value !== '' && 
                this.bankBranch.value !== '') && (
                this.accountTitle.value !== undefined && 
                this.accountNo.value !== undefined && 
                this.bankName.value !== undefined && 
                this.bankBranch.value !== undefined
                )){
                
                bankLocalBody ={
                    'accountTitle' : this.accountTitle.value,
                    'accountNumber' : this.accountNo.value,
                    'bankName' : this.bankName.value,
                    'bankBranch' : this.bankBranch.value
                }
            }
        }

        this.StudentApi.updateFamilyDetails(this.auth.getCurrentUserId(),familyLocalBody).subscribe(
            (success) => {
                if(bankLocalBody !== null){
                    this.StudentApi.createBankDetails(this.auth.getCurrentUserId(),bankLocalBody).subscribe(
                        (bankDetailsCreateSuccess) => {
                                //adding checked icon with title when this form is filled
                                PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
            
                                //method responsible for showing sidebar
                                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            
                                //navigating to otherDetails after this form is submitted
                                this.router.navigateByUrl('/pages/application/otherDetails');

                                //saving variable status to localstorage
                                this.localstorage.set('bd', bankLocalBody);
                                this.localstorage.set('fd', familyLocalBody);
                        },
                        (bankDetailsCreateError) =>{
                            if(bankDetailsCreateError.message === 'HasOne relation cannot create more than one instance of bankDetails'){
                                this.StudentApi.updateBankDetails(this.auth.getCurrentUserId(),bankLocalBody).subscribe(
                                    (bankDetailsUpdateSuccess) => {
                                         //adding checked icon with title when this form is filled
                                        PAGES_MENU[0].children[1].children[6].data.menu.icon = 'ion-android-done';
                                
                                        //method responsible for showing sidebar
                                        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                    
                                        //navigating to otherDetails after this form is submitted
                                        this.router.navigateByUrl('/pages/application/otherDetails');
        
                                        //saving variable status to localstorage
                                        this.localstorage.set('bd', bankLocalBody);
                                        this.localstorage.set('fd', familyLocalBody);
                                    }, 
                                    (bankDetailsUpdateError) =>{
                                        console.log(bankDetailsUpdateError);
                                    }
                                );
                            }else {
                                console.log(bankDetailsCreateError);
                            }
                        }
                    );
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
}
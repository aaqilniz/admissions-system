import { LoopBackAuth } from './../../../shared/sdk/services/core/auth.service';

//importing angular modules
import { Router, Routes } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { StorageBrowser } from './../../../shared/sdk/storage/storage.browser';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//importing validators for mask
import { MaskValidator } from './../../../theme/validators/mask.validator';
import { StudentApi } from 'app/shared/sdk';

//declaring component with component decorator
@Component({
    selector:'address-details',
    templateUrl: './addressDetails.html',
    styleUrls: ['../application.scss']
})

//defining and exporting AddressDetails class
export class AddressDetails implements OnInit{
    //declaring Variables
    public form: FormGroup;
    public permanentAddress: AbstractControl;
    public permanentCity: AbstractControl;
    public permanentPhone: AbstractControl;
    public mailingAddress: AbstractControl;
    public mailingCity: AbstractControl;
    public mailingPhone: AbstractControl;
    public fatherAddress: AbstractControl;
    public fatherCity: AbstractControl;
    public fatherPhone: AbstractControl;
    public mailingCheckbox: AbstractControl;
    public fatherCheckbox: AbstractControl;
    public submitted:boolean = false;
    private mobileMask = [ /[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,];

    private cities: any;
    private created: boolean;

    //constructor for AddressDetails class
    constructor(
        private _menuService: BaMenuService, 
        fb:FormBuilder,
        private http: Http, 
        private localstorage:StorageBrowser,
        private StudentApi: StudentApi,
        private auth : LoopBackAuth,
        private router: Router) {
        this.form = fb.group({
            'permanentAddress': ['',Validators.compose([Validators.required, Validators.minLength(8)]) ],
            'permanentCity': ['',Validators.required],
            'permanentPhone': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'mailingAddress': ['',Validators.compose([Validators.required, Validators.minLength(8)]) ],
            'mailingCity': ['',Validators.compose([Validators.required ]) ],
            'mailingPhone': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'fatherAddress': ['',Validators.compose([Validators.required, Validators.minLength(8)]) ],
            'fatherCity': ['',Validators.compose([Validators.required ]) ],
            'fatherPhone': ['', Validators.compose([Validators.required,MaskValidator.validate])],
            'mailingCheckbox': [''],
            'fatherCheckbox': ['']
        });

        //assigning form controls to abstractControl variables
        this.permanentAddress = this.form.controls['permanentAddress'];
        this.permanentCity = this.form.controls['permanentCity'];
        this.permanentPhone = this.form.controls['permanentPhone'];
        this.mailingCheckbox = this.form.controls['mailingCheckbox'];
        this.mailingAddress = this.form.controls['mailingAddress'];
        this.mailingCity = this.form.controls['mailingCity'];
        this.mailingPhone = this.form.controls['mailingPhone'];
        this.fatherCheckbox = this.form.controls['fatherCheckbox'];
        this.fatherAddress = this.form.controls['fatherAddress'];
        this.fatherCity = this.form.controls['fatherCity'];
        this.fatherPhone = this.form.controls['fatherPhone'];
        }

        //method for setting validotrs(null) if mailing address is same as permament address
        onChange(checked){          
            if(checked){
                this.mailingAddress.setValue(this.permanentAddress.value);
                this.mailingCity.setValue(this.permanentCity.value);
                this.mailingPhone.setValue(this.permanentPhone.value);
            }
            this.addressSame('mailing',checked);    
        }

        //method for setting validotrs(null) if father address is same as permament address
        onFChange(checked){        
            if(checked){
                this.fatherAddress.setValue(this.permanentAddress.value);
                this.fatherCity.setValue(this.permanentCity.value);
                this.fatherPhone.setValue(this.permanentPhone.value);
                
            }
            this.addressSame('father',checked);   
        }

        addressSame(formControlType: string, checked: boolean){
            if(checked){
                this.form.get(formControlType+'Address').disable();
                this.form.get(formControlType+'City').disable();
                this.form.get(formControlType+'Phone').disable();
            } else {
                this.form.get(formControlType+'Address').enable();
                this.form.get(formControlType+'City').enable();
                this.form.get(formControlType+'Phone').enable();
            }  
        }

        //method for getting data from json file at specified location which contains cities of pakistan
        public getCities(){
            return this.http.get('/assets/countries-cities/cities-pak.json')
            .map((res:any) => res.json());
          } 

        //ngOnit hook is called before the form is loaded
        ngOnInit(): void {
            //using getCities method which contains cities name to assign data to array
            this.getCities()
            .subscribe((data) => {
              this.cities = data;
            },(error) => {
              console.log("Unable to load some data" + error)
            });
            
            
            //restoring variable status 
            if(this.localstorage.get('ad') !== null){
                if(this.localstorage.get('ad').length !== 0){
                    this.restoreValues(this.localstorage.get('ad'));
                    this.created = true;
                }else {
                    this.getValueFromDB();
                }

            }else{
               this.getValueFromDB();
            }
        }

        public getValueFromDB(){
            this.StudentApi.getStudentAddresses(this.auth.getCurrentUserId()).subscribe( 
                (data) => {
                    this.restoreValues(data); 
                    this.localstorage.set('ad',data);      
                    if(data.length !== 0){
                        this.created = true;
                    }    
                },
                (err) => {
                    console.log(err);
                }
            );
        }

        public restoreValues(body:any){

            body.forEach(address => {
                if(address.addressType === "Permanent"){
                    this.permanentAddress.setValue(address.address);
                    this.permanentCity.setValue(address.city);
                    this.permanentPhone.setValue(address.phoneNumber);
                }else if( address.addressType === "Mailing" ){
                    this.mailingAddress.setValue(address.address);
                    this.mailingCity.setValue(address.city);
                    this.mailingPhone.setValue(address.phoneNumber);
                }else if( address.addressType === "Father" ){
                    this.fatherAddress.setValue(address.address);
                    this.fatherCity.setValue(address.city);
                    this.fatherPhone.setValue(address.phoneNumber);
                }
                PAGES_MENU[0].children[1].children[1].data.menu.icon = 'ion-android-done';
                //method responsible for showing sidebar
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
            });

        }
        //defining onSubmit() method which is called when submit button is clicked
        public onSubmit(values: object):void {
            this.submitted = true;
            var body = this.addressChecker();
            if (this.form.valid) {
                this.StudentApi.createManyStudentAddresses(this.auth.getCurrentUserId(),body).subscribe(
                    (addressDetailsSuccess)=>{
                        console.log(addressDetailsSuccess);
                        PAGES_MENU[0].children[1].children[1].data.menu.icon = 'ion-android-done';
                        //method responsible for showing sidebar
                        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                        //navigating to educationalDetails after this form is submitted
                        this.router.navigateByUrl('/pages/application/educationalDetails');   
                        //send variables status to the localstorage
                        this.localstorage.set('ad',addressDetailsSuccess);
                    }
                );
            }
            
            
        }

        public onUpdateSubmit(values: object):void{
            
            var body = this.addressChecker();
            var adBody = [];
            var counter:number = 0;
            if (this.form.valid) {
                this.localstorage.get('ad').forEach(element => {
                    this.StudentApi.updateByIdStudentAddresses(this.auth.getCurrentUserId(),element.id, body[counter]).subscribe(
                        (addressDetailsSuccess)=>{
                           
                            adBody.push(addressDetailsSuccess);
                            //send variables status to the localstorage
                            this.localstorage.set('ad',adBody);

                        },
                        (addressDetailsError) => {
                            console.log(addressDetailsError);
                        }
                    );
                    counter++;   
                });
                PAGES_MENU[0].children[1].children[1].data.menu.icon = 'ion-android-done';
                //method responsible for showing sidebar
                this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
                //navigating to educationalDetails after this form is submitted
                this.router.navigateByUrl('/pages/application/educationalDetails');
                
            }
           
        }

    public addressChecker(){
       var body = [];
       //permanent body
        var bodyPermanent = {
            'address': this.permanentAddress.value,
            'city': this.permanentCity.value,
            'phoneNumber': this.permanentPhone.value,
            'addressType': 'Permanent'
            }
        body.push(bodyPermanent);
        //mailing body
        if(!this.mailingCheckbox.value){
            var bodyMailing = {
                'address': this.mailingAddress.value,
                'city': this.mailingCity.value,
                'phoneNumber': this.mailingPhone.value,
                'addressType': 'Mailing'
            }
            body.push(bodyMailing);
        }else{
            var bodyPermanent = {
                'address': this.permanentAddress.value,
                'city': this.permanentCity.value,
                'phoneNumber': this.permanentPhone.value,
                'addressType': 'Mailing'
            }
            body.push(bodyPermanent);
        }
        
        //bodyfather 
        if(!this.fatherCheckbox.value){
            var bodyFather = {
                'address': this.fatherAddress.value,
                'city': this.fatherCity.value,
                'phoneNumber': this.fatherPhone.value,
                'addressType': 'Father'
            }
            body.push(bodyFather);
        }else{
            var bodyPermanent = {
                'address': this.permanentAddress.value,
                'city': this.permanentCity.value,
                'phoneNumber': this.permanentPhone.value,
                'addressType': 'Father'
            }
            body.push(bodyPermanent);
        }
        return body;
    }
}
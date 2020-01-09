import { StudentApi } from './../../shared/sdk/services/custom/Student';
import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { notifyLogin } from './../../theme/services/notifiyLogin/notifyLogin.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, EqualPasswordsValidator } from 'app/theme/validators';
import { MaskValidator } from 'app/theme/validators/mask.validator';



@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})

export class Register implements OnInit{
  
  // All Variables

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public cnic:AbstractControl;
  public applyingFor: AbstractControl;
  public nationality: AbstractControl;
  private submitted = true;
  public verifier: string;
  private mask = [ /[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/,];
  private countries:any;
  private degrees:any;
  private notifyLogin:any;
 

  // COnstructor
  constructor(
    fb:FormBuilder, 
    public http: Http, 
    private StudentRegistrationApi:StudentApi,
    private router: Router
    ) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'cnic': ['', MaskValidator.validate],
      'applyingFor': ['', Validators.required],
      'nationality': ['', Validators.required],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.cnic = this.form.controls['cnic'],
    this.applyingFor = this.form.controls['applyingFor'],
    this.nationality = this.form.controls['nationality']
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword']; 
    this.notifyLogin = notifyLogin.getShareService();
    LoopBackConfig.setBaseURL('http://localhost:3000');
  }
 
  //Mehtod executed on form loading
  ngOnInit(): void {
    this.getCountries()
    .subscribe((data) => {
      this.countries = data;
    },(error) => {
      console.log("Unable to load some data" + error)
    });
    this.degrees = ['Graduate','Undergraduate'];
  }

  //Methods to get countries
  public getCountries(){
    return this.http.get('/assets/countriesInfo/countries-by-name.json')
    .map((res:any) => res.json())
    .catch(res => res);
  }  
  

  //Method executed on form submittion
  public onSubmit(values: Object): void {
   
    if (this.form.valid) {
        const body = {
        'name': this.name.value,
        'email': this.email.value,
        'password': this.password.value,
        'nationality': this.nationality.value,
        'cnic': this.cnic.value,
        'ApplyFor': this.applyingFor.value,
        'fatherName': 'null',
        'studentMobileNumber': 'null',
        'Gender': 'null',
        'DoB': 'null'
      };
      this.StudentRegistrationApi.create(body)
      .subscribe(
      (status: any) => {
        this.submitted =  true;
        this.notifyLogin.setValue(true,this.email.value);
        this.form.reset();
        this.router.navigate(['/login', '4!Az3%']);
      },
      (error: any) => {
        if (error.details.messages.email[0] === "Email already exists") {
          this.submitted = false;
          this.verifier = this.email.value;
        }else{
          console.log("Unable to connect");
        }
      });
    }
  }
  
  // Mehtod to show wether exisiting email is changed or not
  public emailChanged(value: any){
    if(value === this.verifier){
      this.submitted = false;
    } else{
      this.submitted = true;
    }
  }

  //Method to show wehter email exist or not
  public show(value: any) {
    if (this.email.valid) {
      if (this.verifier  !== value) {
        this.StudentRegistrationApi.getEmail(value)
        .subscribe(
          (stats: any) => {
            console.log(stats);
            if(stats.email !== null)
            {
               //if email found
              if(stats.email.email === value){
                this.submitted = false;
                this.verifier = value;
              }
           }else {
              //if email not found
                this.submitted = true;
            }
        },
        (error: any) => {
          if (error) {
            console.log('failed in getting email');
          }
        });
      }
    }
  }
}
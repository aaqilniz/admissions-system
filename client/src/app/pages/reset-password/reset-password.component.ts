import { StudentApi } from './../../shared/sdk/services/custom/Student';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { Subscription } from 'rxjs/Subscription';
import { LoopBackAuth } from './../../shared/sdk/services/core/auth.service';
import { EqualPasswordsValidator } from './../../theme/validators/equalPasswords.validator';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoopBackConfig } from 'app/shared/sdk';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  //variable
  public form:FormGroup;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  private submitted = true;
  private token:any;
  private configuration: ToasterConfig;  

  constructor( 
    fb:FormBuilder, 
    private StudentRegistrationApi:StudentApi,
    private route: ActivatedRoute,
    private auth: LoopBackAuth,
    private location: Location,
    private toasterService: ToasterService,
    private router: Router) {
      this.form = fb.group({
        'passwords': fb.group({
          'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
      });
  
     
      this.passwords = <FormGroup> this.form.controls['passwords'];
      this.password = this.passwords.controls['password'];
      this.repeatPassword = this.passwords.controls['repeatPassword']; 
      LoopBackConfig.setBaseURL('http://localhost:3000');
     }

  ngOnInit() {
   this.token = this.route.snapshot.queryParams['access_token'];
   this.location.replaceState('/resetpassword');
  }

  public onSubmit(values: Object): void {
    this.StudentRegistrationApi.setPassword(this.password.value,this.token).subscribe(
      (data:any)=>{
        this.showToast('success','Successfully Reset Password', 'Password is reset please login with new password');
        setTimeout((router: Router) => {
          this.router.navigate(['/login']);
        }, 5000);
      }
      ,(err:any)=>{
        if(err.code==="AUTHORIZATION_REQUIRED"){this.showToast('error','Unable to reset password','Password is not reset please try again');}
        else if(err.code==="INVALID_TOKEN"){this.showToast('error','Password reset failed','Verfication Access link time expired please try again');}
      });
    
  }
  
  private showToast(type: string, title: string, body: string) {
    console.log("this is something");
    
    this.configuration = new ToasterConfig({
      positionClass:"toast-top-full-width",
      timeout: 5000,
      tapToDismiss: false,
      showCloseButton: true,
      preventDuplicates: false,
      animation: "fade",
      limit: 1,
    });

    console.log("1");
    
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}

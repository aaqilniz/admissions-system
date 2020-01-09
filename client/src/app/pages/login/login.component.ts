import { LoopBackAuth } from './../../shared/sdk/services/core/auth.service';
import { StudentApi } from './../../shared/sdk/services/custom/Student';
import { LoopBackConfig } from './../../shared/sdk/lb.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { notifyLogin } from './../../theme/services/notifiyLogin/notifyLogin.service';
import { Component, ElementRef, ViewChild, Renderer, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit{

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  private noticfication:any;
  private notifyLogin:any;
  private config: ToasterConfig;
  private currentUserEmail: any;
  private unverifiedUserId: any = null;
  private verificationMessage: any;
  private verified: boolean = true;

  constructor(
    fb:FormBuilder,
    private element:ElementRef, 
    private rend: Renderer,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private auth: LoopBackAuth,
    private location: Location,
    private StudentRegistrationApi:StudentApi,
    private modalService: NgbModal) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.notifyLogin = notifyLogin.getShareService();
    LoopBackConfig.setBaseURL('http://localhost:3000');
  }
  
  //method executed on loading
  ngOnInit(): void {
    this.noticfication = this.route.snapshot.params['reg'];
    if(this.noticfication === '4!Az3%'){
     this.sucessfullyRegistered();
    }
  }

  //method to display modal
  public staticModalShow(display, id) {
    var x = this.element.nativeElement.querySelector(id);
    this.rend.setElementStyle(x,'display',display);
  }

  //method to show notification after successfull registeration
  public sucessfullyRegistered(){
    this.currentUserEmail = this.notifyLogin.getEmail();
    this.notifyLogin.setValue(false,null);
    history.replaceState({},"Edit","http://localhost:4200/#/login");
    this.location.replaceState('login', '/2%3ud');
    this.showToast('success','Successfully Registered', 'Please verify the email by clicking link that has been sent to your email account');
    setTimeout(() => {
      this.verificationMessage = "If you haven't received verification email then ";
      this.emailResendNotification('block');
    }, 7050);
    
  }
  //mehtod to show notification for resend email
  public emailResendNotification(display) {
    var x = this.element.nativeElement.querySelector('#snackbar');
    this.rend.setElementStyle(x,'display',display);
    x.className = "show";
  }

  //method to resend email
  public resendEmail(){
    this.verified = true;
    if((this.noticfication === null || this.noticfication === undefined) && this.unverifiedUserId === null){

      this.staticModalShow('block','#myModal');

    }else if(this.noticfication === '4!Az3%' && this.currentUserEmail !== null){

      this.StudentRegistrationApi.getEmail(this.currentUserEmail).subscribe(
        (stats: any) => {
          if(stats.email !== null)
          {
            this.StudentRegistrationApi.verify(stats.email.id).subscribe(
              (success :any) => {
                this.showToast('success','Email has been resent', 'Please verify the email by clicking link that has been sent to your email account'); 
                this.noticfication = this.currentUserEmail = null;
              },
              (error: any)=> {
                alert("Unable to send Email please retry");
              }
            );
          }else {
            alert("Couldn't able to find your account");
          }
        },
        (error: any) => {
          if (error) {
            alert("Unable to send Email please retry");
          }
        }
      );
    }else if(this.unverifiedUserId !== null){
      this.StudentRegistrationApi.verify(this.unverifiedUserId).subscribe(
        (success: any) => {
          this.showToast('success','Email has been resent', 'Please verify the email by clicking link that has been sent to your email account'); 
        },
        (error: any) => {
          console.log(error);
        }
      )
      this.unverifiedUserId = null;
    }
    this.emailResendNotification('none');
  }
 //Method to show toaster
 private showToast(type: string, title: string, body: string) {
  this.config = new ToasterConfig({
    positionClass:"toast-top-full-width",
    timeout: 7000,
    tapToDismiss: false,
    showCloseButton: true,
    preventDuplicates: false,
    animation: "fade",
    limit: 1,
  });

  const toast: Toast = {
    type: type,
    title: title,
    body: body,
    timeout: 7000,
    bodyOutputType: BodyOutputType.TrustedHtml,
  };
  this.toasterService.popAsync(toast);
}

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      const body = {
        'email': this.email.value,
        'password': this.password.value
      };
      this.StudentRegistrationApi.login(body).subscribe(
        (success:any) => {
          console.log(success);
          console.log(this.auth.getCurrentUserId());
        },
        (error: any) => {
          if(error.code === "LOGIN_FAILED" && error.message === "login failed"){
            //check admin data
            this.showToast('error','Login Failed', 'Wrong password/email. Please login with correct email and password');
          }else if(error.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
            this.verified = false;
            this.unverifiedUserId = error.details.userId;
            console.log(this.unverifiedUserId);
            this.verificationMessage = "Please verify your email by clicking the following link " 
            this.emailResendNotification('block');
          }else{
            console.log(error);
          }
        }
      );
    }
  }
  //needhelp method executed on clicking helplink
  public needHelp(){
    this.verificationMessage = "If you haven't received verification email then ";
    this.emailResendNotification('block');
  }
  //executed on clicking forgotpassward link
  public forgotPassword(){
    this.staticModalShow('block','#forgotPass');
  }

  //executed on clicking the forgotpassmodal send button
  modalforgotPassword(value: HTMLInputElement){
    if(value.value !== '' && value.value !== null)
    {
      this.StudentRegistrationApi.getEmail(value.value).subscribe(
        (success :any) => {
          if(success.email !== null){
            if(success.email.email !== null || success.email.email !== 'undefined'){
              const body = {
                "email":success.email.email
              }
              this.StudentRegistrationApi.resetPassword(body).subscribe(
                (suc:any)=>{
                  this.showToast('success','Password reset','An email has been to your email to reset password');
                },
                (err:any) =>{
                  alert('unable to reset password');
                }
              )
            }
          }else{
            this.showToast('info','Account not registerd', "This account doesn't exist in database.");
          }
        },
        (error:any) => {
          this.showToast('error','Failed','Unable to reset password');
        }
      )
    }
  }

  //executed on clicking the modal send button
  public modalResendEmail(value: HTMLInputElement){
    if(value.value !== '' && value.value !== null)
    {
      this.StudentRegistrationApi.getEmail(value.value).subscribe(
        (success :any) => {
          if(success.email !== null){
            if(success.email.emailVerified === null || success.email.emailVerified === false){
              this.StudentRegistrationApi.verify(success.email.id).subscribe(
                (success: any) => {
                  this.showToast('success','Email has been resent', 'Please verify the email by clicking link that has been sent to your email account');
                  value.value = '';
                  this.staticModalShow('none','#myModal'); 
                },
                (error: any) => {
                  alert('Unable to send email please retry');
                }
              );
            }else{
              this.showToast('info','Already verified', 'This email is already verified.');
            }
          }else{
            this.showToast('info','Account not registerd', "This account doesn't exist in database.");
          }
        }
      )
    }
  }
}

import { LoopBackAuth } from './../../../shared/sdk/services/core/auth.service';
import { StudentApi } from 'app/shared/sdk';
//imports section
// imports angular modules
import { Router, Routes } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, NgForm, AbstractControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageBrowser } from './../../../shared/sdk/storage/storage.browser';

//importing services to be used in this class
import { ApplyingDegreeService } from './../Services/applyingDegree.service';
import { BaMenuService } from 'app/theme';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
  selector: 'educational-details',
  templateUrl: './educationalDetails.html',
  styleUrls:  ['../application.scss']
})

//defining and exporting EducationalDetails class
export class EducationalDetails implements OnInit {
    //declaring variables
    public form: FormGroup;
    public sscDegree: AbstractControl;
    public sscBoard: AbstractControl;
    public sscSubject: AbstractControl;
    public otherSscSubject: AbstractControl;
    public sscTotalMarks: AbstractControl;
    public sscObtainedMarks: AbstractControl;
    public hsscResultAwaiting: AbstractControl;
    public hsscRollNumber: AbstractControl;
    public hsscDegree: AbstractControl;
    public hsscBoard: AbstractControl;
    public hsscSubject: AbstractControl;
    public otherHsscSubject: AbstractControl;
    public hsscTotalMarks: AbstractControl;
    public hsscObtainedMarks: AbstractControl;
    public undergraduateResultAwaiting: AbstractControl;
    public undergraduateRollNumber: AbstractControl;
    public undergraduateDegree: AbstractControl;
    public undergraduateUniversity: AbstractControl;
    public undergraduateSubjects: AbstractControl;
    public undergraduateTotalMarks: AbstractControl;
    public undergraduateObtainedMarks: AbstractControl;
    public graduateDegree: AbstractControl;
    public graduateYear: AbstractControl;
    public graduateUniversity: AbstractControl;
    public graduateSubjects: AbstractControl;
    public graduateTotalMarks: AbstractControl;
    public graduateObtainedMarks: AbstractControl;
    public msMphilDegree: AbstractControl;
    public msMphilYear: AbstractControl;
    public msMphilUniversity: AbstractControl;
    public msMphilSubjects: AbstractControl;
    public msMphilTotalMarks: AbstractControl;
    public msMphilObtainedMarks: AbstractControl;
    public msMphilThesis: AbstractControl;
    public applyingDegree: string;
    
    public submitted: boolean = false;
    private created : boolean;

    private boards: any;
    private universities: any;
    private years: any;
    private sscSubjectsArray = ['Art','Science','Other'];
    private sscDegreesArray = ['Metric','O-Level'];
    private hsscDegreesArray = ['FSc','A-Level','DAE','DCom','ICom','Ics','FA'];
    private hsscSubjectArray = ['Pre Engineering','Computer Science','Pre Medical','Arts and Humanities','General Science','Commerce','Other'];
    private undergraduateDegreeArray = ['BA','BSc','BCom','BBA(2 years)'];

    //constructor for EducationDetails class
    constructor(
      private _menuService: BaMenuService,
      fb:FormBuilder,
      private http:Http,
      private localstorage: StorageBrowser,
      private studentApi: StudentApi,
      private auth: LoopBackAuth,
      private router: Router,
      private applingDegreeService: ApplyingDegreeService,){
        this.form = fb.group ({
            'sscDegree': ['',Validators.required],
            'sscBoard': ['',Validators.required],
            'sscSubject': ['',Validators.required],
            'otherSscSubject': [''],
            'sscTotalMarks': ['',Validators.required],
            'sscObtainedMarks': ['',Validators.required],
            'hsscResultAwaiting': [''],
            'hsscRollNumber': [''],
            'hsscDegree': ['',Validators.required],
            'hsscBoard': ['',Validators.required],
            'hsscSubject': ['',Validators.required],
            'otherHsscSubject': [''],
            'hsscTotalMarks': ['',Validators.required],
            'hsscObtainedMarks': ['',Validators.required],
            'undergraduateResultAwaiting': [''],
            'undergraduateRollNumber': [''],
            'undergraduateDegree': [''],
            'undergraduateUniversity': [''],
            'undergraduateSubjects': [''],
            'undergraduateTotalMarks': [''],
            'undergraduateObtainedMarks': [''],
            'graduateDegree': [''],
            'graduateYear': [''],
            'graduateUniversity': [''],
            'graduateSubjects': [''],
            'graduateTotalMarks': [''],
            'graduateObtainedMarks': [''],
            'msMphilDegree': [''],
            'msMphilYear': [''],
            'msMphilUniversity': [''],
            'msMphilSubjects': [''],
            'msMphilTotalMarks': [''],
            'msMphilObtainedMarks': [''],
            'msMphilThesis': ['']
        });
        // assigning form control values to abstract control variables
        this.sscDegree = this.form.controls['sscDegree'];
        this.sscBoard = this.form.controls['sscBoard'];
        this.sscSubject = this.form.controls['sscSubject'];
        this.otherSscSubject = this.form.controls['otherSscSubject'];
        this.sscTotalMarks = this.form.controls['sscTotalMarks'];
        this.sscObtainedMarks = this.form.controls['sscObtainedMarks'];
        this.hsscResultAwaiting = this.form.controls['hsscResultAwaiting'];
        this.hsscRollNumber = this.form.controls['hsscRollNumber'];
        this.hsscDegree = this.form.controls['hsscDegree'];
        this.hsscBoard = this.form.controls['hsscBoard'];
        this.hsscSubject = this.form.controls['hsscSubject'];
        this.otherHsscSubject = this.form.controls['otherHsscSubject'];
        this.hsscTotalMarks = this.form.controls['hsscTotalMarks'];
        this.hsscObtainedMarks = this.form.controls['hsscObtainedMarks'];
        this.undergraduateResultAwaiting = this.form.controls['undergraduateResultAwaiting'];
        this.undergraduateRollNumber = this.form.controls['undergraduateRollNumber'];
        this.undergraduateDegree = this.form.controls['undergraduateDegree'];
        this.undergraduateUniversity = this.form.controls['undergraduateUniversity'];
        this.undergraduateSubjects= this.form.controls['undergraduateSubjects'];
        this.undergraduateTotalMarks = this.form.controls['undergraduateTotalMarks'];
        this.undergraduateObtainedMarks = this.form.controls['undergraduateObtainedMarks'];
        this.graduateDegree = this.form.controls['graduateDegree'];
        this.graduateYear = this.form.controls['graduateYear'];
        this.graduateUniversity = this.form.controls['graduateUniversity'];
        this.graduateSubjects = this.form.controls['graduateSubjects'];
        this.graduateTotalMarks = this.form.controls['graduateTotalMarks'];
        this.graduateObtainedMarks = this.form.controls['graduateObtainedMarks'];
        this.msMphilDegree = this.form.controls['msMphilDegree'];
        this.msMphilYear = this.form.controls['msMphilYear'];
        this.msMphilUniversity = this.form.controls['msMphilUniversity'];
        this.msMphilSubjects = this.form.controls['msMphilSubjects'];
        this.msMphilTotalMarks = this.form.controls['msMphilTotalMarks'];
        this.msMphilObtainedMarks = this.form.controls['msMphilObtainedMarks'];
        this.msMphilThesis = this.form.controls['msMphilThesis'];
    }

    //method to set validator to paricular degree 
    private setValidatorMsPhd(dg: string){
      this.form.get(dg+'Degree').setValidators(Validators.required);
      this.form.get(dg+'Year').setValidators(Validators.required);
      this.form.get(dg+'University').setValidators(Validators.required);
      this.form.get(dg+'Subjects').setValidators(Validators.required);
      this.form.get(dg+'TotalMarks').setValidators(Validators.required);
      this.form.get(dg+'ObtainedMarks').setValidators(Validators.required);
      if(dg === 'msMphil'){
        this.form.get(dg+'Thesis').setValidators(Validators.requiredTrue);
      }
    }

    //method to set validators for hssc-2 and hssc-1 result if result awaiting
    onChange(checked){
      if(checked){
        this.form.get('hsscRollNumber').setValidators(Validators.required);
      }
      else{
        this.form.get('hsscRollNumber').setValidators(null);
      }
      this.form.get('hsscRollNumber').updateValueAndValidity();
    }

    //if subject's value is Other than setting validator on other subject field
    sscSubjectChange(subject){
      this.subjectChange('otherSscSubject', subject);
    }

    hsscSubjectChange(subject){
      this.subjectChange('otherHsscSubject', subject);
    }

    private subjectChange(degree: string, subject: any){
      if(subject === 'Other'){
        this.form.get(degree).setValidators(Validators.required);
      }
       else {
        this.form.get(degree).setValidators(null);
      }
      this.form.get(degree).updateValueAndValidity();       
    }

    //defining getBoards method for getting data from json file at specified location which contains educational boards
    public getBoards(){
      return this.http.get('/assets/countries-cities/boards-pak.json')
      .map((res: any) => res.json());
    }

    //defining getUniversities() method for getting data from json file at specified location which contains Universities List
    public getUniversities(){
      return this.http.get('/assets/countries-cities/universities-pak.json')
      .map((res:any) => res.json());
    }

    //defining getYears() method for getting data from json file at specified location which contains list of years
    public getYears(){
      return this.http.get('/assets/countries-cities/years.json')
      .map((res: any) => res.json());
    }

    //make same body contents for all
    private sameBodyContent(degreeType:any){
      var body = {
            'sscDegree': this.sscDegree.value,
            'sscBoard': this.sscBoard.value,
            'sscSubject': this.sscSubject.value,
            'otherSscSubject': this.otherSscSubject.value,
            'sscTotalMarks': this.sscTotalMarks.value,
            'sscObtainedMarks': this.sscObtainedMarks.value,
            'hsscResultAwaiting': this.hsscResultAwaiting.value,
            'hsscRollNumber': this.hsscRollNumber.value,
            'hsscDegree': this.hsscDegree.value,
            'hsscBoard': this.hsscBoard.value,
            'hsscSubject': this.hsscSubject.value,
            'otherHsscSubject': this.otherHsscSubject.value,
            'hsscTotalMarks': this.hsscTotalMarks.value,
            'hsscObtainedMarks':this.hsscObtainedMarks.value,
            'undergraduateResultAwaiting': this.undergraduateResultAwaiting.value,
            'undergraduateRollNumber': this.undergraduateRollNumber.value,
            'undergraduateDegree': this.undergraduateDegree.value,
            'undergraduateUniversity': this.undergraduateUniversity.value,
            'undergraduateSubjects': this.undergraduateSubjects.value,
            'undergraduateTotalMarks': this.undergraduateTotalMarks.value,
            'undergraduateObtainedMarks': this.undergraduateObtainedMarks.value
          }
        if(degreeType === 'Graduate' || degreeType === 'PHD'){
          body["graduateDegree"] = this.graduateDegree.value;
          body['graduateYear'] = this.graduateYear.value;
          body["graduateUniversity"] = this.graduateUniversity.value;
          body["graduateSubjects"] = this.graduateSubjects.value;
          body["graduateTotalMarks"] = this.graduateTotalMarks.value;
          body["graduateObtainedMarks"] = this.graduateObtainedMarks.value;
        }
        if(degreeType === 'PHD'){
          body["msMphilDegree"] = this.msMphilDegree.value;
          body["msMphilYear"] = this.msMphilYear.value;
          body["msMphilUniversity"] = this.msMphilUniversity.value;
          body["msMphilSubjects"] = this.msMphilSubjects.value;
          body["msMphilTotalMarks"] = this.msMphilTotalMarks.value;
          body["msMphilObtainedMarks"] = this.msMphilObtainedMarks.value;
          body["msMphilThesis"] = this.msMphilThesis.value;
        }
      return body;
    }

    // restoring variables status
    private restoreEducationalDetails(body:any){
      body.forEach(educationalDetailsElement => {
  
        if(educationalDetailsElement.degreeLevel === 'SSC/O-LEVEL'){ //For SSC/O-LEVEL
          this.sscDegree.setValue(educationalDetailsElement.degreeName);
          this.sscBoard.setValue(educationalDetailsElement.degreeInstitute);
          this.sscTotalMarks.setValue(educationalDetailsElement.totalMarks);
          this.sscObtainedMarks.setValue(educationalDetailsElement.obtainedMarks);
          
          if(educationalDetailsElement.degreeSubject !== 'Art' && educationalDetailsElement.degreeSubject !== 'Science'){
            
            this.otherSscSubject.setValue(educationalDetailsElement.degreeSubject);
            this.sscSubject.setValue('Other');
          } else{
            this.sscSubject.setValue(educationalDetailsElement.degreeSubject);
          }
        }else if(educationalDetailsElement.degreeLevel === 'HSSC/O-LEVEL'){ //For HSSC/O-LEVEL
          this.hsscDegree.setValue(educationalDetailsElement.degreeName);
          this.hsscBoard.setValue(educationalDetailsElement.degreeInstitute);
          this.hsscTotalMarks.setValue(educationalDetailsElement.totalMarks);
          this.hsscObtainedMarks.setValue(educationalDetailsElement.obtainedMarks);
          if(
            educationalDetailsElement.degreeSubject !== 'Pre Engineering' && 
            educationalDetailsElement.degreeSubject !== 'Computer Science' && 
            educationalDetailsElement.degreeSubject !== 'Pre Medical' && 
            educationalDetailsElement.degreeSubject !== 'Arts and Humanities' && 
            educationalDetailsElement.degreeSubject !== 'General Science' && 
            educationalDetailsElement.degreeSubject !== 'Commerce'){

            this.otherHsscSubject.setValue(educationalDetailsElement.degreeSubject);
            this.hsscSubject.setValue('Other');
          }else{
            this.hsscSubject.setValue(educationalDetailsElement.degreeSubject);
          }

          if(educationalDetailsElement.rollNumber !== undefined && educationalDetailsElement.rollNumber !== '' && educationalDetailsElement.rollNumber !== null){
            this.hsscResultAwaiting.setValue(true);
            this.hsscRollNumber.setValue(educationalDetailsElement.rollNumber);
          }

        }else if(educationalDetailsElement.degreeLevel === 'UNDERGRADUATE (14YEAR)'){ //For UNDERGRADUATE (14YEAR)

          this.undergraduateDegree.setValue(educationalDetailsElement.degreeName);
          this.undergraduateUniversity.setValue(educationalDetailsElement.degreeInstitute);
          this.undergraduateSubjects.setValue(educationalDetailsElement.degreeSubject);
          this.undergraduateTotalMarks.setValue(educationalDetailsElement.totalMarks);
          this.undergraduateObtainedMarks.setValue(educationalDetailsElement.obtainedMarks);

          if(educationalDetailsElement.rollNumber !== undefined && educationalDetailsElement.rollNumber !== '' && educationalDetailsElement.rollNumber !== null){
            this.undergraduateResultAwaiting.setValue(true);
            this.undergraduateRollNumber.setValue(educationalDetailsElement.rollNumber);
          }
        }else if(educationalDetailsElement.degreeLevel === 'GRADUATE'){ //For GRADUATE

          this.graduateDegree.setValue(educationalDetailsElement.degreeName);
          this.graduateYear.setValue(educationalDetailsElement.passingYear);
          this.graduateUniversity.setValue(educationalDetailsElement.degreeInstitute);
          this.graduateSubjects.setValue(educationalDetailsElement.degreeSubject);
          this.graduateTotalMarks.setValue(educationalDetailsElement.totalGPA);
          this.graduateObtainedMarks.setValue(educationalDetailsElement.obtainedGPA);

        }else if(educationalDetailsElement.degreeLevel === 'PHD'){ //For PHD

          this.msMphilDegree.setValue(educationalDetailsElement.degreeName);
          this.msMphilYear.setValue(educationalDetailsElement.passingYear);
          this.msMphilUniversity.setValue(educationalDetailsElement.degreeInstitute);
          this.msMphilSubjects.setValue(educationalDetailsElement.degreeSubject);
          this.msMphilTotalMarks.setValue(educationalDetailsElement.totalGPA);
          this.msMphilObtainedMarks.setValue(educationalDetailsElement.obtainedGPA);
          this.msMphilThesis.setValue(educationalDetailsElement.thesisCheck);
        }  
    });
  }

  // ngOnInit hook for some functionality to be inserted before form is loaded
  ngOnInit(): void{
    // getting applying degree from personal details component through applyingDegree.service
    this.applingDegreeService.applyingDegree$.subscribe(applyingDegree => this.applyingDegree = applyingDegree);
    if(this.applyingDegree === 'Graduate' || this.applyingDegree === 'PHD'){
      this.setValidatorMsPhd('graduate');
    }
    if(this.applyingDegree === 'PHD'){
      this.setValidatorMsPhd('msMphil');
    }

    //using getBoards() method which contains educational boards' name to assign data to array
    this.getBoards()
    .subscribe((data) => {
      this.boards = data;
    }, (error) => {
      console.log('Unable to load some data'+ error);
    });

    //using getUniversities() method which contains universities' name to assign data to array
    this.getUniversities()
    .subscribe((data) => {
      this.universities = data;
    }, (error) => {
      console.log('unable to load some data' + error);
    });

    //using getYears() method which contains list of years to assign data to array
    this.getYears()
    .subscribe((data) => {
      this.years = data;
    },(error) => {
      console.log('Unable to load some data' + error);
      
    })

    if(this.localstorage.get('ed') !== null){
      if(this.localstorage.get('ed').length !== 0){
        this.restoreEducationalDetails(this.localstorage.get('ed'));
        this.created = true;
        
      }else{
        this.getValueFromDB();
      }
    } else {
      this.getValueFromDB();
    }
  }

  public getValueFromDB(){
    this.studentApi.getEducationalDetails(this.auth.getCurrentUserId()).subscribe( 
      (data) => {
          this.restoreEducationalDetails(data)
          if(data.length !== 0){
            this.created = true;
          }    
          //adding checked icon with title when this form is filled
          PAGES_MENU[0].children[1].children[2].data.menu.icon = 'ion-android-done';
          //method responsible for showing sidebar
          this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
          //adding to localstorage
          this.localstorage.set('ed',data);
      },
      (err) => {
          console.log(err);
      }
    );
  } 
  //defining onSubmit() method which is called when submit button is clicked
  public onSubmit(values: object):void {

    this.submitted = true;
    var localBody, dbBody;
    if (this.form.valid) {
      if(this.applyingDegree === 'Undergraduate'){
        localBody = this.subjectChecker('Undergraduate');
        dbBody = this.degreeChecker(localBody , 'Undergraduate');
      }
      else if(this.applyingDegree === 'Graduate'){
        localBody = this.subjectChecker('Graduate');
        dbBody = this.degreeChecker(localBody, 'Graduate');
      }
      else {
        localBody = this.subjectChecker('PHD');
        dbBody = this.degreeChecker(localBody, 'PHD');
      }

    this.studentApi.createManyEducationalDetails(this.auth.getCurrentUserId(),dbBody).subscribe(
      (success) => {
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[2].data.menu.icon = 'ion-android-done';
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        //navigating to uploadPhoto after this form is submitted
        this.router.navigateByUrl('/pages/application/uploadPhoto');
        //saving variable status to localstorage
        this.localstorage.set('ed', success);
      });
    }
  }

  //function on submit update
  public onUpdateSubmit(values: object):void{
    var localBody,dbBody; 
    var Body = [];
    var counter:number = 0;
    if (this.form.valid) {
      if(this.applyingDegree === 'Undergraduate'){
        localBody = this.subjectChecker('Undergraduate');
        dbBody = this.degreeChecker(localBody , 'Undergraduate');
      }
      else if(this.applyingDegree === 'Graduate'){
        localBody = this.subjectChecker('Graduate');
        dbBody = this.degreeChecker(localBody, 'Graduate');
      }
      else {
        localBody = this.subjectChecker('PHD');
        dbBody = this.degreeChecker(localBody, 'PHD');
      }

      
      this.localstorage.get('ed').forEach(element => {
        this.studentApi.updateByIdEducationalDetails(this.auth.getCurrentUserId(),element.id,dbBody[counter]).subscribe(
          (success) => {
            Body.push(success); 
            //saving variable status to localstorage
            this.localstorage.set('ed', Body);
          },
          (error) => {
            console.log(error);
          });
        counter++;
      });
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[2].data.menu.icon = 'ion-android-done';
        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
        //navigating to uploadPhoto after this form is submitted
        this.router.navigateByUrl('/pages/application/uploadPhoto');
    }
  }

  //check degree name and make body for database
  public degreeChecker(localBody:any, bodyDeterminent:any){
    var body = [];
    //Level-SSC body
    var sscBody = {
      'degreeLevel': 'SSC/O-LEVEL',
      'degreeName': localBody.sscDegree,
      'degreeInstitute': localBody.sscBoard,
      'degreeSubject': localBody.sscSubject,
      'totalMarks': localBody.sscTotalMarks,
      'obtainedMarks': localBody.sscObtainedMarks
    }
    body.push(sscBody);

    //LEVEL-HSSC Body
    var hsscBody = {
      'degreeLevel': 'HSSC/O-LEVEL',
      'degreeName': localBody.hsscDegree,
      'degreeInstitute': localBody.hsscBoard,
      'degreeSubject': localBody.hsscSubject,
      'totalMarks': localBody.hsscTotalMarks,
      'obtainedMarks': localBody.hsscObtainedMarks
    }
    if(localBody.hsscResultAwaiting === true){
      hsscBody["rollNumber"] = localBody.hsscRollNumber
    }
    body.push(hsscBody);

    //LEVEL-UNDERGRADUATE (14YEAR) Body
    if(( 
      localBody.undergraduateDegree !== '' && 
      localBody.undergraduateUniversity !== '' && 
      localBody.undergraduateSubjects !== '' && 
      localBody.undergraduateTotalMarks !== '' && 
      localBody.undergraduateObtainedMarks !== '') && (
      localBody.undergraduateDegree !== undefined && 
      localBody.undergraduateUniversity !== undefined && 
      localBody.undergraduateSubjects !== undefined && 
      localBody.undergraduateTotalMarks !== undefined && 
      localBody.undergraduateObtainedMarks !== undefined
      )){

        var undergraduateOptionalBody = {
          'degreeLevel': 'UNDERGRADUATE (14YEAR)',
          'degreeName': localBody.undergraduateDegree,
          'degreeInstitute': localBody.undergraduateUniversity,
          'degreeSubject': localBody.undergraduateSubjects,
          'totalMarks': localBody.undergraduateTotalMarks,
          'obtainedMarks': localBody.undergraduateObtainedMarks
        }
        if(localBody.undergraduateResultAwaiting === true && localBody.undergraduateRollNumber !== ''){
          undergraduateOptionalBody["rollNumber"] = localBody.undergraduateRollNumber
        }
        body.push(undergraduateOptionalBody);
        
      }
      
      //LEVEL-GRADUATE Body
      if(bodyDeterminent === 'Graduate' || bodyDeterminent === 'PHD'){
        var graduateBody = {
          'degreeLevel': 'GRADUATE',
          'degreeName': localBody.graduateDegree,
          'degreeInstitute': localBody.graduateUniversity,
          'degreeSubject': localBody.graduateSubjects,
          'totalGPA': localBody.graduateTotalMarks,
          'obtainedGPA': localBody.graduateObtainedMarks,
          'passingYear' : localBody.graduateYear
        }
        body.push(graduateBody);
      }

      //LEVEL-PHD Body
      if(bodyDeterminent === 'PHD'){
        var phdBody = {
          'degreeLevel': 'PHD',
          'degreeName': localBody.msMphilDegree,
          'degreeInstitute': localBody.msMphilUniversity,
          'degreeSubject': localBody.msMphilSubjects,
          'totalGPA': localBody.msMphilTotalMarks,
          'obtainedGPA': localBody.msMphilObtainedMarks,
          'passingYear' : localBody.msMphilYear,
          'thesisCheck': localBody.msMphilThesis
        }
        body.push(phdBody);
      }

    //Returning body
    return body;
  }

  //check subejects and return body accordingly
  public subjectChecker(degreeType:any){

    var localBody = this.sameBodyContent(degreeType);
    
    if(localBody.sscSubject === 'Other'){
      localBody.sscSubject = localBody.otherSscSubject;
    }else if (localBody.sscSubject !== 'Other') {
      localBody.otherSscSubject = null;
    }

    if(localBody.hsscSubject === 'Other'){
      localBody.hsscSubject = localBody.otherHsscSubject;
    }else if(localBody.hsscSubject !== 'Other'){
      localBody.otherHsscSubject = null;
    }

    if(localBody.hsscResultAwaiting === false){
      localBody.hsscRollNumber = null;
    }
    if(localBody.undergraduateResultAwaiting === false){
      localBody.undergraduateRollNumber = null;
    }
    return localBody;
  }
}

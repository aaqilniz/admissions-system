import { Http } from '@angular/http';
//imports section
// imports angular modules
import { Router, Routes } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

//importing services to be used in this class
import { BaMenuService } from 'app/theme';
import { ImageNameService } from '../Services/imageName/imageName.service';

//importing PAGES_MENU variable from pages.menu
import { PAGES_MENU } from 'app/pages/pages.menu';

//declaring component with component decorator
@Component({
    selector: 'upload-photo',
    templateUrl: './uploadPhoto.html',
    styleUrls:  ['../application.scss']
})

//defining and exporting UploadPhoto class
export class UploadPhoto implements OnInit{
    //declaring valriables
    public imageName:String;
    public submitted: boolean = false;
    sizeLimit: number = 1000000;
    private id = 'naqash.jpg' ;
    public defaultPicture = '/assets/img/theme/no-photo.png';
    public profile:any = {
      picture: ''};

    @Output() inputUploadEvents = new EventEmitter<any>();

    //constructor for UploadPhot class
    constructor(
      private _menuService: BaMenuService,
      private router: Router,
      private imageNameService: ImageNameService,
      private http: Http){
    }
    
    ngOnInit(){
      // this.http.get(`http://localhost:3000/api/image-names/${this.id}`)
      // .map( response => response.json())
      // .subscribe(success => {
        
      // }, failed => {
      //   console.log('Problem');
      // });
      this.profile.picture = `http://localhost:3000/api/images/images/download/${this.id}`
    }

    

    public uploaderOptions:NgUploaderOptions = {
        url: 'http://localhost:3000/api/images/images/upload',
      };


    //defining onSubmit method which is called when submit button is clicked
    public onSubmit(values: object):void {
        this.submitted = true;
        this.imageNameService.imageName$.subscribe(imageName => this.imageName = imageName);
        const body = {
          'name': this.imageName
        };
        
        this.http.post('http://localhost:3000/api/image-names', body)
        .map(response => response.json())
        .subscribe(
            data => console.log(data),
            error => console.log(error)
          );
        //adding checked icon with title when this form is filled
        PAGES_MENU[0].children[1].children[3].data.menu.icon = 'ion-android-done';

        //method responsible for showing sidebar
        this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

        //navigating to languageProficiency after this form is submitted
        this.router.navigateByUrl('/pages/application/languageProficiency');
      }
}
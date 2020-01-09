import { Http } from '@angular/http';
import {Component, OnInit} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  private id = 15;

  private imageName: String;
  constructor(private _state:GlobalState, private http: Http) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  //mywork
  ngOnInit(){
    // this.http.get(`http://localhost:3000/api/image-names/${this.id}`)
    // .map( response => response.json())
    // .subscribe(success => {
    //   this.imageName = `http://localhost:3000/api/images/images/download/${success.name}`
    // }, failed => {
    //   console.log('Problem');
    // });
  }
  public toggleMenu() {


    // get request name 
    //var url = http://local:3000/conainer/download + name
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
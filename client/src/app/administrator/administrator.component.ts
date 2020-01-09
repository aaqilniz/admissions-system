import { ADMIN_MENU } from './administrator.menu';
import { Component, OnInit } from '@angular/core';
import { BaMenuService } from 'app/theme';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-administrator',
  template: 
  `<ba-sidebar></ba-sidebar>
  <ba-page-top></ba-page-top>
  <div class="al-main">
    <div class="al-content">
      <ba-content-top></ba-content-top>
      <router-outlet></router-outlet>
    </div>
  </div>
  <ba-back-top position="200"></ba-back-top>`,
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(private _menuService: BaMenuService,) { }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>ADMIN_MENU);
  }

}

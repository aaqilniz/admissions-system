import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(private router: Router) {
  }

  settingbtn = function () {
    this.router.navigate(['/admin/settings'])
  };

  verifyappbtn =  function () {
    this.router.navigate(['/admin/app-verify-application']);
  };

  printAppBtn = function () {
    this.router.navigate(['/admin/app-print-application']);
  };

  ModifyAppBtn = function () {
    this.router.navigate(['/admin/modifyApplication']);
  };

  ReportCenterBtn = function () {
    this.router.navigate(['/admin/reportcenter']);
  };

  FeeVerifyBtn = function () {
    this.router.navigate(['/admin/FeeVerification']);
  };

  EntryTestBtn = function () {
    this.router.navigate(['/admin/entrytest']);
  };

  ManagerMeritBtn = function () {
    this.router.navigate(['/admin/meritmanager']);
  };

}

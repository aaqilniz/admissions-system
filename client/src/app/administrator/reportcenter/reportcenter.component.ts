import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportcenter',
  templateUrl: './reportcenter.component.html',
  styleUrls: ['./reportcenter.component.scss']
})
export class ReportcenterComponent implements OnInit {

  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  OverallReportBtn = function () {
    this.router.navigate(['/admin/overallReport'])
      };

}


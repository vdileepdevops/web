import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { ReportService } from 'src/app/Services/Accounting/report.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-cheque-return',
  templateUrl: './cheque-return.component.html',
  styles: []
})
export class ChequeReturnComponent implements OnInit {

  FrmChequeReturn: FormGroup;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public savebutton = 'Generate Report';
  public loading = false;
  public isLoading = false;
  public StartDate: any;
  public EndDate: any;
  public strStartDate: any;
  public strEndDate: any;
  gridData: any = [];
  validation = false;
  constructor(private datePipe: DatePipe, private _routes: Router, private formbuilder: FormBuilder, private _reportservice: ReportService, private _CommonService: CommonService) {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig.maxDate = new Date();
    this.dpConfig.showWeekNumbers = false;

    this.dpConfig1.containerClass = 'theme-dark-blue';
    this.dpConfig1.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig1.maxDate = new Date();
    this.dpConfig1.showWeekNumbers = false;
  }

  ngOnInit() {
    this.FrmChequeReturn = this.formbuilder.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required]
    })
    this.FrmChequeReturn.controls.fromdate.setValue(new Date);
    this.FrmChequeReturn.controls.todate.setValue(new Date);
    this.DatesFormats();
  }
  get f() { return this.FrmChequeReturn.controls; }

  DatesFormats() {
    this.strStartDate = this.FrmChequeReturn.controls.fromdate.value;
    this.strEndDate = this.FrmChequeReturn.controls.todate.value;
    this.StartDate = this.datePipe.transform(this.strStartDate, 'dd-MMM-yyyy');
    this.EndDate = this.datePipe.transform(this.strEndDate, 'dd-MMM-yyyy');
  }

  ToDateChange(event) {
    debugger;
    this.dpConfig1.minDate = event;
    this.DatesFormats();
    if (this.strStartDate > this.strEndDate) {
      this.validation = true
    }
    else {
      this.validation = false;
    }
  }

  FromDateChange(event) {
    debugger;
    this.dpConfig.maxDate = event;
    this.DatesFormats();
    if (this.strStartDate > this.strEndDate) {
      this.validation = true
      this._CommonService.showWarningMessage("please select greater than or equal to from date");
    }
    else {
      this.validation = false;
    }
  }
  OnChequesReturnDateChanges(fromdate, todate): boolean {
    debugger;
    let isvalidate = true;
    if (todate != "") {
      if (fromdate > todate) {
        isvalidate = false;
      }
      else {
        isvalidate = true;
      }
    }
    return isvalidate;
  }
  GetChequeReturnDetails() {
    if (this.OnChequesReturnDateChanges(this.FrmChequeReturn.controls.fromdate.value, this.FrmChequeReturn.controls.todate.value)) {
      this.loading = true;
      this.isLoading = true;
      this.savebutton = 'Processing';
      debugger;
      try {
        this.DatesFormats();
        this._reportservice.GetChequeReturnDetails(this.StartDate, this.EndDate).subscribe(res => {
          debugger;
          //console.log(res);
          this.gridData = res;
          this.loading = false;
          this.isLoading = false;
          this.savebutton = 'Generate Report';
        }, (error) => {
          this._CommonService.showErrorMessage(error);
          this.isLoading = false;
          this.savebutton = 'Generate Report';
          this.loading = false;
        });
      } catch (e) {
        this._CommonService.showErrorMessage(e);
        this.isLoading = false;
        this.savebutton = 'Generate Report';
        this.loading = false;
      }
    }
  }
  print() {
    let printContents, popupWin;
    printContents = document.getElementById('temp-box').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Day Book</title>
          <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.3.917/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.3.917/styles/kendo.default.min.css" />
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2019.3.917/styles/kendo.default.mobile.min.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/custom.css" />
         
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}


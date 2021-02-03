import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { GroupDescriptor,SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { JvListReportServicesService } from 'src/app/Services/Accounting/jv-list-report-services.service';

@Component({
  selector: 'app-jv-list',
  templateUrl: './jv-list.component.html',
  styles: []
})
export class JvListComponent implements OnInit {
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public savebutton = 'Generate Report';
  public submitted = false;
  public JvlistReportForm: FormGroup;
  public today: Date = new Date();
  public isLoading = false;
  public loading = false;
  public paymentVouecherServicesData: any;
  public jvtype: any;
  public startDate: any = new Date();
  public endDate: any = new Date();
  public hdnJvNo = true;
  public jvlistData: any = [];
  public jvlistDataa: any = [];
  public narration: any;
  // public groups: GroupDescriptor[] = [{ field: 'ptransactiondate' }, { field: 'ptransactionno' }, , aggregates: [{ field: "ProductName", aggregate: "count" }]];
  public groups: GroupDescriptor[] = [{ field: "ptransactiondate" }, { field: 'ptransactionno'} ];
  public sort: SortDescriptor[] = [{
    field: 'ptransactiondate',
    dir: 'desc'
  }];
  constructor(private datePipe: DatePipe, private _routes: Router, private formbuilder: FormBuilder, private _CommonService: CommonService, private toaster: ToastrService, private _jvlistreport: JvListReportServicesService) {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD-MM-YYYY';
    this.dpConfig.maxDate = new Date();
    this.dpConfig.showWeekNumbers = false;

    this.dpConfig1.containerClass = 'theme-dark-blue';
    this.dpConfig1.dateInputFormat = 'DD-MM-YYYY';
    this.dpConfig1.maxDate = new Date();
    this.dpConfig1.showWeekNumbers = false;
  }

  ngOnInit() {
    this.startDate = this.datePipe.transform(this.startDate, "dd-MMM-yyyy");
    this.endDate = this.datePipe.transform(this.endDate, "dd-MMM-yyyy");
    this.JvlistReportForm = this.formbuilder.group({
      fromDate: [this.today, Validators.required],
      toDate: [this.today, Validators.required],
      ptranstype: ['', Validators.required]
    })
  }
  get f() { return this.JvlistReportForm.controls; }
  public ToDateChange(event) {
    this.dpConfig1.minDate = event;
  }
  public FromDateChange(event) {
    this.dpConfig.maxDate = event;
    // this.JvlistReportForm['controls']['fromDate'].setValue(event)
  }
  public getjvListReports() {
    debugger;
    this.jvtype = '';
    this.jvlistData = [];
    this.jvlistDataa = [];
    this.submitted = true;
    if (this.JvlistReportForm.valid) {
      this.loading = true
      this.isLoading = true;
      this.savebutton = 'Processing';
      try {
        let fromDate = this.JvlistReportForm['controls']['fromDate'].value;
        let toDate = this.JvlistReportForm['controls']['toDate'].value;
        this.jvtype = this.JvlistReportForm['controls']['ptranstype'].value;
        this.startDate = this.datePipe.transform(fromDate, "dd-MMM-yyyy");
        this.endDate = this.datePipe.transform(toDate, "dd-MMM-yyyy");
        this._jvlistreport.GetJvListReport(this.startDate, this.endDate, this.jvtype).subscribe(res => {
          debugger
          this.jvlistData = res;
         // this.jvlistData = this.jvlistData.filter(x => x.ptransactiondate = this._CommonService.formatDateFromDDMMYYYY(x.ptransactiondate));
          this.jvlistDataa = res;
          this.narrrationSepFn();

          this.isLoading = false;
          this.savebutton = 'Generate Report';
          this.loading = false;
        },
          (error) => {
            this.showErrorMessage(error);
            this.isLoading = false;
            this.savebutton = 'Generate Report';
            this.loading = false;
          });
      } catch (e) {
        this.showErrorMessage(e);
        this.isLoading = false;
        this.savebutton = 'Generate Report';
        this.loading = false;
      }
    }
  }
  public narrrationSepFn() {
    var groupByName = [];
    groupByName = this.jvlistData;
    const curr = this.jvlistData.map(data => data.ptransactionno);
    let jvlistJvNos: [] = curr.filter((x, i, a) => x && a.indexOf(x) === i);

    for (let i = 0; i < jvlistJvNos.length; i++) {
      let jvNos = jvlistJvNos[i];
      let jvNosArrayValues = groupByName.filter(jvNosArray => jvNosArray.ptransactionno == jvNos);

      let pdescription = jvNosArrayValues[0].pdescription;
      let ptransactiondate = jvNosArrayValues[0].ptransactiondate;
      let ptransactionno =jvNosArrayValues[0].ptransactionno;
        let c = jvNosArrayValues[0];
      this.jvlistDataa.push({
        "pparentname": null,
        "plstJvList": null,
        "pFormName": null,
        "ptransactiondate": ptransactiondate,
        "ptransactionno": ptransactionno,
        "pparticulars": "Narration: "+pdescription,
        "pdescription": '',
        "pdebitamount": 0,
        "pcreditamount": 0,
        "popeningbal": 0,
        "pclosingbal": 0,
        "pcashtotal": null,
        "pchequetotal": null,
        "pmodeoftransaction": null,
        "precordid": 0,
        "paccountname": null,
        "paccountid": 0,
        "pparentid": 0,
        "pBalanceType": null
      });


    }
  }

  public print() {
    let printContents, popupWin;
    printContents = document.getElementById('temp-box').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>JV List</title>
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

  public showErrorMessage(errormsg: string) {
    this._CommonService.showErrorMessage(errormsg);
  }

  public showInfoMessage(errormsg: string) {
    this._CommonService.showInfoMessage(errormsg);
  }

  //----------------VALIDATION----------------------- //
  public checkValidations(group: FormGroup, isValid: boolean): boolean {
    try {
      Object.keys(group.controls).forEach((key: string) => {
        isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }
  public GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {
    try {
      let formcontrol;
      formcontrol = formGroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.paymentVouecherServicesData[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.paymentVouecherServicesData[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
    return isValid;
  }
  public BlurEventAllControll(fromgroup: FormGroup) {
    try {
      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
  }
  public setBlurEvent(fromgroup: FormGroup, key: string) {
    try {
      let formcontrol;
      formcontrol = fromgroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.BlurEventAllControll(formcontrol)
        }
        else {
          if (formcontrol.validator)
            fromgroup.get(key).valueChanges.subscribe((data) => { this.GetValidationByControl(fromgroup, key, true) })
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
      return false;
    }
  }
}

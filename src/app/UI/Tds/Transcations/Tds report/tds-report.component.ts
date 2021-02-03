import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AccountingMastresService } from 'src/app/Services/Accounting/accounting-mastres.service';
import { AccountingTransactionsService } from 'src/app/Services/Accounting/accounting-transactions.service';
import { CommonService } from 'src/app/Services/common.service';
import { TdsreportService } from 'src/app/Services/Tds/tdsreport.service';

@Component({
  selector: 'app-tds-report',
  templateUrl: './tds-report.component.html',
  styles: []
})
export class TdsReportComponent implements OnInit {
  TDSReport:FormGroup;
  Tdsreporterrors:any;
  public pageSize = 10;
  public skip = 0;
  gridData:any=[]
  tdssectionlist: any;
  public today: Date = new Date();
  public isLoading: boolean = false;
  public savebutton: any = 'Generate Report';
  public dpFromConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpToConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  selecteddate: boolean;
  fromdate: any;
  todate: any;
  validation: boolean;
  frommonthof: any;
  tomonthof: any;
  section: any;
  pTdsSection: FormGroup;
  constructor(private formbuilder:FormBuilder,private tdsreportservice:TdsreportService,private _CommonService: CommonService,private datePipe: DatePipe,private AccountingTransactionsService: AccountingTransactionsService)
   { 
    this.dpFromConfig.dateInputFormat = 'DD-MMM-YYYY'
    this.dpFromConfig.maxDate = new Date();
    this.dpFromConfig.showWeekNumbers = false;

    this.dpToConfig.dateInputFormat = 'DD-MMM-YYYY'
    this.dpToConfig.maxDate = new Date();
    this.dpToConfig.showWeekNumbers = false;
   }

  ngOnInit()
   {
    this.GetformData();
    this.frommonthof = new Date();
    this.tomonthof = new Date();
    this.fromdate = this.datePipe.transform(this.frommonthof, "yyyy-MM-dd");
    this.todate = this.datePipe.transform(this.tomonthof, "yyyy-MM-dd");
    this.BlurEventAllControll(this.TDSReport)
  
  }
  public GetformData() {
    this.Tdsreporterrors = {}
    this.TDSReport = this.formbuilder.group({
    
      pTdsSection: ['', Validators.required],
     
      fromDate: [this.today],
      toDate: [this.today],
    });
    this.getTDSsectiondetails()
  }
  getTDSsectiondetails(): void {
    this.AccountingTransactionsService.getTDSsectiondetails().subscribe(
      (json) => {
        if (json != null) {
          console.log("TDS", json)
          this.tdssectionlist = json;
        }
      },
      (error) => {
        this._CommonService.showErrorMessage(error);
      }
    );
  }
  validationfordates() {

    let isValid = true;


  }
  FromDateChange(event) {
    debugger;
   // this.gridData = [];

  
   this.frommonthof = event;
   this.fromdate = this.datePipe.transform(this.frommonthof, "yyyy-MM-dd");

    if (this.tomonthof != [] || this.tomonthof == null || this.tomonthof == '') {
      this.validatedates();
    }
  }
  ToDateChange(event) {
    debugger;
  //this.gridData = [];
  this.tomonthof = event;
  this.todate = this.datePipe.transform(this.tomonthof, "yyyy-MM-dd");
    if (this.frommonthof != [] || this.frommonthof == null || this.frommonthof == '') {
      this.validatedates();
    }
  }
  validatedates() {
    debugger;
    if (this.fromdate > this.todate) {

      this.validation = true
    }

    else {
      this.validation = false;
    }

  }
  checkValidations(group: FormGroup, isValid: boolean): boolean {
    try {
      Object.keys(group.controls).forEach((key: string) => {
        isValid = this.GetValidationByControl(group, key, isValid);
      })
    }
    catch (e) {
      return false;
    }
    return isValid;
  }

  GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {
    try {

      let formcontrol;
      formcontrol = formGroup.get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.Tdsreporterrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                let lablename;
                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.Tdsreporterrors[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      return false;
    }
    return isValid;
  }
  BlurEventAllControll(fromgroup: FormGroup) {
    try {
      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })
    }
    catch (e) {
      return false;
    }
  }
  setBlurEvent(fromgroup: FormGroup, key: string) {
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
      return false;
    }
  }
  sectionchange(event)
  {
    debugger
   this.section=event.target.value
  }
  generatetdsreport() {
    debugger;
    let isValid: boolean = true;
     if(this.checkValidations(this.TDSReport,isValid))
     {
      
       // this.gridData.empty;
        //this.gridData = [];
  
        let fromdate = this.datePipe.transform(this.TDSReport['controls']['fromDate'].value, "dd-MMM-yyyy");
        let todate = this.datePipe.transform(this.TDSReport['controls']['toDate'].value, "dd-MMM-yyyy");
        this.frommonthof = fromdate;
        this.tomonthof = todate;
        this.tdsreportservice.GetTdsReport(fromdate,todate,this.section).subscribe(result => {
  
          this.gridData = result;
          console.log(this.gridData);
        })
  
      
     }
    //if(this.checkValidations(this.LienReleaseForm,isValid)){
    
  }
}

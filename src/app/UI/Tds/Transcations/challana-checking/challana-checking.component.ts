import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AccountingTransactionsService } from 'src/app/Services/Accounting/accounting-transactions.service';
import { TdsreportService } from 'src/app/Services/Tds/tdsreport.service';
import { CommonService } from 'src/app/Services/common.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CompanyconfigService } from '../../../../Services/Settings/companyconfig.service';

@Component({
  selector: 'app-challana-checking',
  templateUrl: './challana-checking.component.html',
  styleUrls: ['./challana-checking.component.css']
})
export class ChallanaCheckingComponent implements OnInit {
  challanachecking:any;
  ChallanaCheckingForm:FormGroup
  frommonthof: any;
  tomonthof:any;
  fromdate:any;
  todate:any;
  gridData:any=[]
  tdssectionlist: any;
  public today: Date = new Date();
  public savebutton: any = 'Show';
  public dpFromConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpToConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  section: any;
  validation: boolean;
  companytype: any;
  companyid: any;
  pantype: any;
  allStudentsSelected: boolean;
  allchecked: boolean;
  allSelectedModels: any=[];
  totaltdsamount: any;
  actualtotaltdsamount: any;
  paidamount: any;
  tds: any=[]
  constructor(private formbuilder: FormBuilder, private tdsreportservice: TdsreportService, private _CommonService: CommonService, private datePipe: DatePipe, private AccountingTransactionsService: AccountingTransactionsService, private _companyconfigservice: CompanyconfigService) 
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
    this.GetCompanyDetails();
    this.GetformData();
    this.frommonthof = new Date();
    this.tomonthof = new Date();
    this.fromdate = this.datePipe.transform(this.frommonthof, "yyyy-MM-dd");
    this.todate = this.datePipe.transform(this.tomonthof, "yyyy-MM-dd");
    this.BlurEventAllControll(this.ChallanaCheckingForm)

  }
  public GetformData() {
    this.challanachecking = {}
    this.ChallanaCheckingForm = this.formbuilder.group({
    
      pTdsSection: ['', Validators.required],
      pCompanyType:['',Validators.required],
      pTdsType:['',Validators.required],
      pFromDate: [this.today],
      pToDate: [this.today],
      pTotalTdsAmount:[''],
      pActualTotalTdsAmount:[''],
      pTotalPaidAmount: [''],
      pCompanyId: [''],
      ptypeofoperation:['CREATE']
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
          this.challanachecking[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                let lablename;
                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.challanachecking[key] += errormessage + ' ';
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
  FromDateChange(event) {
    debugger;
    this.gridData = [];

  
   this.frommonthof = event;
   this.fromdate = this.datePipe.transform(this.frommonthof, "yyyy-MM-dd");

    if (this.tomonthof != [] || this.tomonthof == null || this.tomonthof == '') {
      this.validatedates();
    }
  }
  ToDateChange(event) {
    debugger;
  this.gridData = [];
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
  Companytypechanges(event)
  {
    this.gridData = [];
    this.companytype=event.target.value;
    this.ChallanaCheckingForm.controls.pCompanyType.setValue(this.companytype)
  }
  Pantypechanges(event)
  {
    this.gridData = [];
    this.pantype=event.target.value;
    this.ChallanaCheckingForm.controls.pTdsType.setValue(this.pantype)
  }
  sectionchange(event)
  {
    debugger
     this.gridData = [];
   this.section=event.target.value
  }
  GetCompanyDetails() {
    this._companyconfigservice.Getcompanydetails().subscribe(data => {
      debugger
      console.log("get data:", data)
      if (data['pnameofenterprise'] != undefined || data['pnameofenterprise'] != null) {

        this.companyid = data['pCompanyId']
      }
           })
  }
  GetChallanaDetails() {
    debugger;
    let isValid: boolean = true;
   
     if(this.checkValidations(this.ChallanaCheckingForm,isValid))
     {
      
       // this.gridData.empty;
        //this.gridData = [];
  
        let fromdate = this.datePipe.transform(this.ChallanaCheckingForm
          ['controls']['pFromDate'].value, "dd-MMM-yyyy");
        let todate = this.datePipe.transform(this.ChallanaCheckingForm['controls']['pToDate'].value, "dd-MMM-yyyy");
        this.frommonthof = fromdate;
        this.tomonthof = todate;
        this.tdsreportservice.GetChallanaDetails(fromdate,todate,this.section,this.companytype,this.pantype).subscribe(result => {
  
         
          if(result)
          {
            this.gridData = result;
          }
          console.log(this.gridData);
        })
  
      
     }
    //if(this.checkValidations(this.LienReleaseForm,isValid)){
    
  }
  selectAllStudentsChange($event: any, dataItem, rowIndex) {
    debugger
    
    if ($event.target.checked) {
        this.allStudentsSelected = true;
        this.gridData.filter(a=>a.add=true);
        this.allSelectedModels=this.gridData;
       // this.allSelectedModels.push(this.gridData);
       this.totaltdsamount = this.gridData.reduce((sum, c) => sum + parseFloat((c.pTdsAmount)), 0);
       this.actualtotaltdsamount= this.gridData.reduce((sum, c) => sum + parseFloat((c.pActualTdsAmount)), 0);
       this.paidamount= this.gridData.reduce((sum, c) => sum + parseFloat((c.pPaidAmount)), 0);
    } else 
    {
      this.allStudentsSelected = false;
      this.gridData.filter(a=>a.add=false);
      this.allSelectedModels=[]
  
        
    }
   
console.log("selecting all",this.allSelectedModels)
}
clickselectforpayments($event: any, dataItem, rowIndex) {
  debugger;
  if (this.gridData.length == 1) {
      this.allStudentsSelected = true;
  }
 
  if ($event.target.checked) {
    this.gridData[rowIndex].add=true
   
      this.allSelectedModels.push(dataItem);
      this.totaltdsamount = this.allSelectedModels.reduce((sum, c) => sum + parseFloat((c.pTdsAmount)), 0);
      this.actualtotaltdsamount= this.allSelectedModels.reduce((sum, c) => sum + parseFloat((c.pActualTdsAmount)), 0);
      this.paidamount= this.allSelectedModels.reduce((sum, c) => sum + parseFloat((c.pPaidAmount)), 0);

  }
  else {

    this.gridData[rowIndex].add=false
     this.allSelectedModels= this.gridData.filter(a=>a.add==true);
  //this.tds=this.gridData.filter(a=>a.pTdsAmount==true)
      this.allStudentsSelected = false;
      this.totaltdsamount = this.allSelectedModels.reduce((sum, c) => sum + parseFloat((c.pTdsAmount)), 0);
      this.actualtotaltdsamount= this.allSelectedModels.reduce((sum, c) => sum + parseFloat((c.pActualTdsAmount)), 0);
      this.paidamount= this.allSelectedModels.reduce((sum, c) => sum + parseFloat((c.pPaidAmount)), 0);

  }
  console.log("if selecting one",this.allSelectedModels)
}
SaveForm()
{
  debugger;
  //this.GetChallanaDetails()
  let isValid: boolean = true;
  if(this.checkValidations(this.ChallanaCheckingForm,isValid))
  {
    if(this.gridData.length>0)
    {
      if(this.allSelectedModels.length>0)
      {
        this.ChallanaCheckingForm.controls.pTotalTdsAmount.setValue(this.totaltdsamount)
        this.ChallanaCheckingForm.controls.pActualTotalTdsAmount.setValue(this.actualtotaltdsamount)
        this.ChallanaCheckingForm.controls.pTotalPaidAmount.setValue(this.paidamount);
        this.ChallanaCheckingForm.controls.pCompanyId.setValue(this.companyid);
        
       let  t= Array.from(new Set(this.allSelectedModels))
        let challana = { _ChallanaEntryDetails: this.allSelectedModels }
        let challanaform = Object.assign(this.ChallanaCheckingForm.value, challana);
        let data=JSON.stringify(challanaform)
        console.log("challana form",data);
        this.tdsreportservice.SaveChallanaEntry(data).subscribe(res=>{
          console.log("res is",res);
          if(res)
          {
            this._CommonService.showInfoMessage("Saved Successfully");
            this.gridData=[]
          }
        })
        

      }
      else{
        this._CommonService.showWarningMessage("please select atleast one checkbox")
      }
      
    }
    else{
      this._CommonService.showWarningMessage("There are no records in grid")
    }
  
}
}
}

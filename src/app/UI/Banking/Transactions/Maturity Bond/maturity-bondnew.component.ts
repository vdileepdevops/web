import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { LienEntryService } from 'src/app/Services/Banking/lien-entry.service';
import { MaturityPaymentService } from '../../../../Services/Banking/Transactions/maturity-payment.service';
import { FdReceiptService } from 'src/app/Services/Banking/Transactions/fd-receipt.service';
import { isNullOrUndefined, debug } from 'util';
import { CommonService } from '../../../../Services/common.service';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-maturity-bondnew',
  templateUrl: './maturity-bondnew.component.html',
  styles: []
})
export class MaturityBondnewComponent implements OnInit {
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  MaturityBondForm: FormGroup
  public today: Date = new Date();
  public BranchDetails: any;
  public FdDetailsList: any;
  public FdDetailsListByid: any;
  public PreMaturityDetails: any;
  MaturityDetails:any;
  public LienDetails: any;
  public SchemeNames: any;
  public Schemeid: any;
  public MaturityTypeList: any;
  public formValidationMessages: any;

  public Fdaccountno: any;
  public Membername: any;
  public Depositamount: any;
  public Maturityamount: any;
  public Tenortype: any;
  public Tenor: any;
  public Interesttype: any;
  public Interestrate: any;
  public InterestPayble: any;
  public InterestPayout: any;
  public MemberType: any;
  public DepositDate: any;
  public MaturityDate: any;

  public PreMaturityInterestPayble: any;
  public Agencomm: any;
  public Netpay: any;
  public showPreMaturity: boolean = false;
  public showMaturity: boolean = false;
  public ShowFixeddepositdetails: boolean = false;
  public showPreMaturityDetails: boolean = false;
  public showMaturityDetails:boolean=false
  disablesavebutton = true;
  savebutton = "Save";



  public pre_Branch: any;
  public pre_Member: any;
  public pre_BondAmount: any;
  public pre_BondDate: any;
  public pre_MatureDate: any;
  public pre_Period: any;
  public pre_Netpay: any;
  public pre_Rateofinterest: any;
  public pre_Actualrateinterest: any;
  public pre_Interestpaidamt: any;
  public Interest_Payable: any;
  public TdsPayble: any;
  public CommissionPaid: any;

  
  disabledforButtons: boolean = true;
  hideliendetails: boolean = false;
  NotEditable: boolean = true;
  DateLockStatus: boolean = true;
  typepfmaturity: string;
  SuspenseAmount: any;
  
  constructor(private formbuilder: FormBuilder, private router: Router,private toastr: ToastrService, private datePipe: DatePipe,private zone: NgZone, private _LienEntryService: LienEntryService, private _MaturityPaymentService: MaturityPaymentService, private _commonservice: CommonService,
    private _FdReceiptService: FdReceiptService) {
    this.dpConfig1.dateInputFormat = 'DD/MM/YYYY'
    this.dpConfig1.maxDate = new Date();
    this.dpConfig1.showWeekNumbers = false;
    window['CallingFunctionOutsideFDData'] = {
      zone: this.zone,
      componentFn: (value) => this.FDAccountNoChange(value),
      component: this,
    };
  }

  ngOnInit() {
    this.formValidationMessages = {};
    this.MaturityBondForm = this.formbuilder.group({
      pTransdate: [this.today],
      pBranch: [null, Validators.required],
      pMaturityType: [null, Validators.required],
      pFdaccountno: [null, Validators.required],
      pSchemeName: [null, Validators.required],
      pMemberid: [''],
      pTranstype:["Fd"],
      pTranstypeid: [''],
      pMatureamount: [''],
      pPreinterestrate:[''],
      pInterestpayble: [''],
      pAgentcommssionvalue:[''],
      pAgentcommssionPayable: [0],
      pDamages: [0],
      pInterestpaid: [''],
      pCommissionpaid: [''],
      pNarration: ['', Validators.required],
      pNetpayble: [''],
      ptdsamount:[''],
      psuspenceamount:[''],
      ptypeofoperation:["CREATE"]
    });
    this.GetMeturityTypes();
    //this.GetBranchDetails();
    //this.GetSchemeNames();
    this.GetDateLockStatus();
    this.BlurEventAllControll(this.MaturityBondForm);
  }
  GetDateLockStatus() {
    debugger;
    this._commonservice.GetDateLockStatus().subscribe(json => {
      debugger;
      this.DateLockStatus = json ? false : true;
    })
  }
  ClearAllData() {
    this.LienDetails = [];
    this.disablesavebutton = true;
    this.hideliendetails = false;
    this.ngOnInit();
    this.showMaturity = false;
    this.ClearSchemeDetails();
    this.ClearPreMaturitydetails();
  }
  ClearPreMaturitydetails() {
    this.PreMaturityDetails = [];
    this.MaturityBondForm.controls.pAgentcommssionPayable.setValue('');
    this.MaturityBondForm.controls.pDamages.setValue(0);
    
    this.showPreMaturity = false;
    this.showPreMaturityDetails = false;
    this.showMaturityDetails=false;
    this.PreMaturityInterestPayble = "";
    this.Agencomm = "";
    this.Netpay = "";
    this.pre_Branch = "";
    this.pre_Member = "";
    this.pre_BondAmount = "";
    this.pre_BondDate = "";
    this.pre_MatureDate = "";
    this.pre_Period = "";
    this.pre_Netpay = "";
    this.pre_Rateofinterest="";
    this.pre_Actualrateinterest="";
    this.pre_Interestpaidamt="";


  }

  ClearSchemeDetails() {
    this.ShowFixeddepositdetails = false;
    this.MaturityBondForm.controls.pInterestpayble.setValue('');
    this.MaturityBondForm.controls.pNetpayble.setValue('');
    this.Fdaccountno = "";
    this.Membername = "";
    this.Depositamount = "";
    this.Maturityamount = "";
    this.DepositDate = "";
    this.MaturityDate = "";
    this.Tenortype = "";
    this.Tenor = "";
    this.Interesttype = "";
    this.Interestrate = "";
    this.InterestPayble = "";
    this.InterestPayout = "";
  }
customSearchFn(term: string, item: any) {
    debugger;
    console.log(item)
    term = term.toLowerCase();
  return item.pFdaccountno.toLowerCase().indexOf(term) > -1 || item.pMembername.toLowerCase().indexOf(term) > -1 || item.pContactno.toString().toLowerCase().indexOf(term) > -1;
  }
  GetMeturityTypes() {
    this.MaturityTypeList = [{ MaturityType: 'Pre-Maturity' }, { MaturityType: 'Maturity'}];
  }
  GetBranchDetails(MaturityType) {
    this._MaturityPaymentService.GetMaturityBranchDetails(MaturityType).subscribe(result => {
      this.BranchDetails = result;
    })
  }
  GetSchemeNames(Branchname, MaturityType) {
    this.MaturityBondForm.controls.pSchemeName.setValue(null);
    this.formValidationMessages.pSchemeName = "";
    this._MaturityPaymentService.GetSchemeNamesNew(Branchname, MaturityType).subscribe(Response => {
      this.SchemeNames = Response;
    });
  }
  BranchChange(event) {
    debugger;
    this.disabledforButtons = true;
   //if (!isNullOrUndefined(event)) {}
    let MeturityType = this.MaturityBondForm.controls.pMaturityType.value;
    this.ClearPreMaturitydetails();
    this.ClearSchemeDetails();
    this.SchemeNames = [];
    this.FdDetailsList = [];
    this.LienDetails = [];
    this.disablesavebutton = true;
    this.hideliendetails = false;
    this.GetSchemeNames(event.pBranchname, MeturityType);
    this.GetDepositIds(event.pBranchname, MeturityType, this.Schemeid);
  }
  MaturityTypeChange(event) {
    debugger;
    this.SchemeNames = [];
    this.FdDetailsList = [];
    this.BranchDetails = [];
    this.LienDetails = [];
    this.disablesavebutton = true;
    this.hideliendetails = false;
    this.disabledforButtons = true;
    this.showMaturity = false;
    this.showPreMaturity = false;
    let BranchName = "";
    if (!isNullOrUndefined(event)) {
      this.disabledforButtons = true;
      let MaturityType = this.MaturityBondForm.controls.pMaturityType.value;
      this.MaturityBondForm.controls.pBranch.setValue(null);
      this.formValidationMessages.pBranch = "";
      this.ClearPreMaturitydetails();
      this.ClearSchemeDetails();
      this.GetBranchDetails(MaturityType);
      this.GetSchemeNames(BranchName, MaturityType);
      this.GetDepositIds(BranchName, MaturityType, this.Schemeid);
    }
    else {
      this.disabledforButtons = true;
      this.MaturityBondForm.controls.pSchemeName.setValue(null);
      this.MaturityBondForm.controls.pFdaccountno.setValue(null);
      this.MaturityBondForm.controls.pBranch.setValue(null);
      this.formValidationMessages.pFdaccountno = "";
      this.formValidationMessages.pSchemeName = "";
      this.formValidationMessages.pBranch = "";
      this.formValidationMessages.pMaturityType = "";
      this.ClearPreMaturitydetails();
      this.ClearSchemeDetails();
    }
   
  }
  GetSchemAndMaturityDetails(type) {
    if (type == "SchemeDetails") {
      this.ShowFixeddepositdetails = true;
      this.showPreMaturityDetails = false;
      this.showMaturityDetails=false
    }
    if (type == "PreMaturityDetails") {
      this.ShowFixeddepositdetails = false;
      this.showPreMaturityDetails = true;
     
    }
    if(type=="MaturityDetails")
    {
      this.ShowFixeddepositdetails = false;
      this.showPreMaturityDetails = true;
    }
  }
  GetDepositIds(BranchName, MaturityType, Schemeid) {
    debugger;
    this.MaturityBondForm.controls.pFdaccountno.setValue(null);
    this.formValidationMessages.pFdaccountno="";
    if (!isNullOrEmptyString(BranchName) && !isNullOrEmptyString(MaturityType) && !isNullOrEmptyString(Schemeid)) {
      this._MaturityPaymentService.GetDepositIds(BranchName, MaturityType, Schemeid).subscribe(data => {
        debugger;
        this.FdDetailsList = data;
        this.ClearSchemeDetails();
        
      });
    }
  }
  DamagesChange(event) {
    if (event.target.value != "") {
      let Damages = parseFloat(event.target.value.toString().replace(/,/g, ""));
      let Netpay = this.Netpay - Damages;
      if (Netpay < 0) {
        this._commonservice.showWarningMessage("Damages should not be greater than Net Payble")
        this.MaturityBondForm.controls.pDamages.setValue(0);
      }
      else {
        this.MaturityBondForm.controls.pNetpayble.setValue(this._commonservice.currencyformat(Netpay));
      }
      
    }
  }
  SelectFdData(e) {
    debugger
    if (e.dataItem) {
      var dataItem = e.dataItem;
      window['CallingFunctionOutsideFDData'].componentFn(dataItem)
    }
    else {
      //var multicolumncombobox: any;
      //multicolumncombobox = $("#MemberData").data("kendoMultiColumnComboBox");
      //if (multicolumncombobox)
      //  multicolumncombobox.value("");
    }
  }
  FDAccountNoChange(event) {
    debugger
    this.LienDetails = [];
    this.disablesavebutton = true;
    this.hideliendetails = false;
    if (!isNullOrEmptyString(event)) {
      this.disabledforButtons = false;
      this.MaturityBondForm.controls.pMemberid.setValue(event.pMemberid);
      this.BindDetails(event.pFdaccountno);
      //cometed by venu
      //let date = this.MaturityBondForm.controls.pTransdate.value;
      //let MeturityType = this.MaturityBondForm.controls.pMaturityType.value;
     
     
      //this._FdReceiptService.GetFdDetailsById(event.pFdaccountno).subscribe(result => {
      //  debugger;
      //  this.ShowFixeddepositdetails = (MeturityType == "Maturity") ? true : false;
      //  this.showPreMaturityDetails = (MeturityType != "Maturity") ? true : false;
      //  if (result) {
      //    this.FdDetailsListByid = result;
      //    this.Fdaccountno = this.FdDetailsListByid[0].pFdaccountno;
      //    this.Membername = this.FdDetailsListByid[0].pMembername;
      //    this.Depositamount = this.FdDetailsListByid[0].pDeposiamount;
      //    this.Maturityamount = this.FdDetailsListByid[0].pMaturityamount;
      //    this.DepositDate = this.FdDetailsListByid[0].pDeposidate;
      //    this.MaturityDate = this.FdDetailsListByid[0].pMaturitydate;
      //    this.Tenortype = this.FdDetailsListByid[0].pTenortype;
      //    this.Tenor = this.FdDetailsListByid[0].pTenor;
      //    this.Interesttype = this.FdDetailsListByid[0].pInteresttype;
      //    this.Interestrate = this.FdDetailsListByid[0].pInterestrate;
      //    this.InterestPayble = this.FdDetailsListByid[0].pInterestPayble;
      //    this.InterestPayout = this.FdDetailsListByid[0].pInterestPayout;
      //    if (MeturityType == "Maturity") {
      //      this.MaturityBondForm.controls.pInterestpayble.setValue(this._commonservice.currencyformat(this.InterestPayble));
      //      this.MaturityBondForm.controls.pNetpayble.setValue(this._commonservice.currencyformat(this.Maturityamount));
      //      this.MaturityBondForm.controls.pAgentcommssionPayable.setValue(0);
      //    }
      //  }
      //})
      //this._MaturityPaymentService.GetLienDetails(event.pFdaccountno).subscribe(result => {
      //  debugger;
      //  this.LienDetails = result;
      //  if (this.LienDetails.length > 0) {
      //    this.disablesavebutton = true;
      //    this.hideliendetails = true;
      //  }
      //  else {
      //    this.disablesavebutton = false;
      //    this.hideliendetails = false;
      //  }
      //})
      //if (MeturityType != "Maturity") {
      //  this._MaturityPaymentService.GetPreMaturityDetails(event.pFdaccountno, this.datePipe.transform(new Date(date), "yyyy-MM-dd")).subscribe(Response => {
      //    debugger;
      //    this.PreMaturityDetails = Response;
      //    this.PreMaturityInterestPayble = Response["pCalcinterestamt"];
      //    this.Agencomm = Response["pPromotorsalary"];
      //    this.Netpay = Response["pNetpay"];
      //    this.pre_Branch = Response["pBranch"];
      //    this.pre_Member = Response["pMember"];
      //    this.pre_BondAmount = Response["pBondamount"];
      //    this.pre_BondDate = Response["pBondDate"];
      //    this.pre_MatureDate = Response["pPrematureDate"];
      //    this.pre_Period = Response["pPeriod"]+" "+ Response["pPeriodmode"];
      //    this.pre_Netpay = Response["pNetpay"];
      //    this.pre_Rateofinterest = Response["pRateofinterest"];
      //    this.pre_Actualrateinterest = Response["pActualrateinterest"];
      //    this.pre_Interestpaidamt = Response["pInterestpaidamt"];
      //    this.Interest_Payable = Response["pIntrestPayble"];
      //    this.TdsPayble = Response["pTdsPayble"];
      //    this.CommissionPaid = Response["pCommissionPaid"];

      //    console.log(Response);
      //    this.MaturityBondForm.controls.pInterestpayble.setValue(this._commonservice.currencyformat(this.PreMaturityInterestPayble));
      //    this.MaturityBondForm.controls.pNetpayble.setValue(this._commonservice.currencyformat(this.Netpay));
      //    this.MaturityBondForm.controls.pAgentcommssionPayable.setValue(this._commonservice.currencyformat(this.Agencomm));
      //  })
      
      //}
      
      //if (MeturityType == "Pre-Maturity") {
      //  this.showPreMaturity = true;
      //  this.showMaturity = false;
      //}
      //if (MeturityType == "Maturity") {
      //  this.showMaturity = true;
      //  this.showPreMaturity = false;
      //}
      //comented by venu
    }
    else {
      this.disabledforButtons = true;
      this.showPreMaturityDetails = false;
      this.ShowFixeddepositdetails = false;
      this.showMaturity = false;
      this.showPreMaturity = false;
    }
  }
  BindDetails(pFdaccountno) {
    
    let date = this.MaturityBondForm.controls.pTransdate.value;
    let MeturityType = this.MaturityBondForm.controls.pMaturityType.value;
    this._FdReceiptService.GetFdDetailsById(pFdaccountno).subscribe(result => {
      debugger;
      this.ShowFixeddepositdetails = (MeturityType == "Maturity") ? true : false;
      this.showPreMaturityDetails = (MeturityType != "Maturity") ? true : false;
      this.PreMaturityDetails = (MeturityType != "Maturity") ? false : true;
      if (result) {
        this.FdDetailsListByid = result;
        this.Fdaccountno = this.FdDetailsListByid[0].pFdaccountno;
        this.Membername = this.FdDetailsListByid[0].pMembername;
        this.Depositamount = this.FdDetailsListByid[0].pDeposiamount;
        this.Maturityamount = this.FdDetailsListByid[0].pMaturityamount;
        this.DepositDate = this.FdDetailsListByid[0].pDeposidate;
        this.MaturityDate = this.FdDetailsListByid[0].pMaturitydate;
        this.Tenortype = this.FdDetailsListByid[0].pTenortype;
        this.Tenor = this.FdDetailsListByid[0].pTenor;
        this.Interesttype = this.FdDetailsListByid[0].pInteresttype;
        this.Interestrate = this.FdDetailsListByid[0].pInterestrate;
        this.InterestPayble = this.FdDetailsListByid[0].pInterestPayble;
        this.InterestPayout = this.FdDetailsListByid[0].pInterestPayout;
        if (MeturityType == "Maturity") {
          this.MaturityBondForm.controls.pInterestpayble.setValue(this._commonservice.currencyformat(this.InterestPayble));
          this.MaturityBondForm.controls.pNetpayble.setValue(this._commonservice.currencyformat(this.Maturityamount));
          this.MaturityBondForm.controls.pAgentcommssionPayable.setValue(0);
        }
      }
    })
    this._MaturityPaymentService.GetLienDetails(pFdaccountno).subscribe(result => {
      debugger;
      this.LienDetails = result;
      if (this.LienDetails.length > 0) {
        this.disablesavebutton = true;
        this.hideliendetails = true;
      }
      else {
        this.disablesavebutton = false;
        this.hideliendetails = false;
      }
    })
    if (MeturityType != "Maturity") 
    {
      this.typepfmaturity="Pre-Maturity"
      this._MaturityPaymentService.GetPreMaturityDetails(pFdaccountno, this.datePipe.transform(new Date(date), "yyyy-MM-dd"),this.typepfmaturity).subscribe(Response => {
        debugger;
        this.PreMaturityDetails = Response;
      
        this.PreMaturityInterestPayble = Response["pCalcinterestamt"];
        this.Agencomm = Response["pPromotorsalary"];
        this.Netpay = Response["pNetpay"];
        this.pre_Branch = Response["pBranch"];
        this.pre_Member = Response["pMember"];
        this.pre_BondAmount = Response["pBondamount"];
        this.pre_BondDate = Response["pBondDate"];
        this.pre_MatureDate = Response["pPrematureDate"];
        this.pre_Period = Response["pPeriod"] + " " + Response["pPeriodmode"];
        this.pre_Netpay = Response["pNetpay"];
        this.pre_Rateofinterest = Response["pRateofinterest"];
        this.pre_Actualrateinterest = Response["pActualrateinterest"];
        this.pre_Interestpaidamt = Response["pInterestpaidamt"];
        this.Interest_Payable = Response["pIntrestPayble"];
        this.TdsPayble = Response["pTdsPayble"];
        this.CommissionPaid = Response["pCommissionPaid"];
        this.SuspenseAmount=Response['pSuspenceAmount']
        
        console.log(Response);
        this.MaturityBondForm.controls.psuspenceamount.setValue(this._commonservice.currencyformat(this.SuspenseAmount))
        this.MaturityBondForm.controls.ptdsamount.setValue(this._commonservice.currencyformat(this.TdsPayble))
        this.MaturityBondForm.controls.pInterestpayble.setValue(this._commonservice.currencyformat(this.PreMaturityInterestPayble));
        this.MaturityBondForm.controls.pNetpayble.setValue(this._commonservice.currencyformat(this.Netpay));
        this.MaturityBondForm.controls.pAgentcommssionPayable.setValue(this._commonservice.currencyformat(this.Agencomm));
      })

    }
if(MeturityType == "Maturity")
{
  this.typepfmaturity="Maturity"
  this._MaturityPaymentService.GetPreMaturityDetails(pFdaccountno, this.datePipe.transform(new Date(date), "yyyy-MM-dd"),this.typepfmaturity).subscribe(Response => {
    debugger;
    this.MaturityDetails = Response;
    console.log("maturitydetails",this.MaturityDetails)
    this.PreMaturityInterestPayble = Response["pCalcinterestamt"];
    this.Agencomm = Response["pPromotorsalary"];
    this.Netpay = Response["pNetpay"];
    this.pre_Branch = Response["pBranch"];
    this.pre_Member = Response["pMember"];
    this.pre_BondAmount = Response["pBondamount"];
    this.pre_BondDate = Response["pBondDate"];
    this.pre_MatureDate = Response["pPrematureDate"];
    this.pre_Period = Response["pPeriod"] + " " + Response["pPeriodmode"];
    this.pre_Netpay = Response["pNetpay"];
    this.pre_Rateofinterest = Response["pRateofinterest"];
    this.pre_Actualrateinterest = Response["pActualrateinterest"];
    this.pre_Interestpaidamt = Response["pInterestpaidamt"];
    this.Interest_Payable = Response["pIntrestPayble"];
    this.TdsPayble = Response["pTdsPayble"];
    this.CommissionPaid = Response["pCommissionPaid"];
    this.SuspenseAmount=Response['pSuspenceAmount']
    
    console.log(Response);
    this.MaturityBondForm.controls.psuspenceamount.setValue(this._commonservice.currencyformat(this.SuspenseAmount))
    this.MaturityBondForm.controls.ptdsamount.setValue(this._commonservice.currencyformat(this.TdsPayble))
    this.MaturityBondForm.controls.pInterestpayble.setValue(this._commonservice.currencyformat(this.PreMaturityInterestPayble));
    this.MaturityBondForm.controls.pNetpayble.setValue(this._commonservice.currencyformat(this.Netpay));
    this.MaturityBondForm.controls.pAgentcommssionPayable.setValue(this._commonservice.currencyformat(this.Agencomm));
  })

}
    if (MeturityType == "Pre-Maturity") {
      this.showPreMaturity = true;
      this.showMaturity = false;
    }
    if (MeturityType == "Maturity") {
      this.showMaturity = true;
      this.showPreMaturity = false;
    }
  }
  ReceiptDateChange() {
    debugger;
    let pFdaccountno = this.MaturityBondForm.controls.pFdaccountno.value;
    if (!isNullOrEmptyString(pFdaccountno)) {
      this.BindDetails(pFdaccountno);

    }
    
  }
  SchemeNameChange(event) {
    this.LienDetails = [];
    this.disablesavebutton = true;
    this.hideliendetails = false;
    if (!isNullOrUndefined(event)) {
      this.Schemeid = event.pSchemeid;
      let MeturityType = this.MaturityBondForm.controls.pMaturityType.value;
      let BranchName = this.MaturityBondForm.controls.pBranch.value;
      this.GetDepositIds(BranchName, MeturityType, this.Schemeid);
    }
    else {
      this.Schemeid = "";
      this.FdDetailsList = [];
      this.MaturityBondForm.controls.pFdaccountno.setValue(null);
      this.formValidationMessages.pFdaccountno = "";
      this.disabledforButtons = true;
      this.ClearSchemeDetails();
      this.ClearPreMaturitydetails();


    }
  }

  SaveMaturityBond() {
    debugger;
    let IsValid: boolean = true;
    if (this.checkValidations(this.MaturityBondForm, IsValid)) {
      this.disablesavebutton = true;
      this.savebutton = 'Processing';
      let maturityType = this.MaturityBondForm.controls.pMaturityType.value;
      this.MaturityBondForm.controls.pTranstypeid.setValue(this.FdDetailsListByid[0].pFdaccountid);
      this.MaturityBondForm.controls.pPreinterestrate.setValue(maturityType != "Maturity" ? this.PreMaturityDetails.pCalcinterestamt : 0);
      if (maturityType != "Maturity") {
        this.MaturityBondForm.controls.pInterestpayble.setValue(this.PreMaturityDetails.pRateofinterest);
      }
      this.MaturityBondForm.controls.pAgentcommssionvalue.setValue(0);
      this.MaturityBondForm.controls.pInterestpaid.setValue(maturityType != "Maturity" ? this.PreMaturityDetails.pInterestpaidamt : 0);
      this.MaturityBondForm.controls.pCommissionpaid.setValue(0);
      this.MaturityBondForm.controls.pMatureamount.setValue(maturityType != "Maturity" ? this.Maturityamount : this.Maturityamount);
      let formdata = this.MaturityBondForm.value;
      let Jsondata = JSON.stringify(formdata);
      console.log("json data",Jsondata)
      debugger;
      let MaturityBonddate = new Date(this.MaturityBondForm.controls.pTransdate.value);
      console.log("maturity date", this.MaturityDate)
      if (!isNullOrEmptyString(this.MaturityDate)) {
        let Maturitydate = new Date(this.MaturityDate);
      
        //if (MaturityBonddate < Maturitydate) {
        //  this._commonservice.showWarningMessage("Maturity Bond Date should not be less than Maturity Date.");
        //  this.MaturityBondForm.controls.pTransdate.setValue(new Date);
        //  this.disablesavebutton = false;
        //    this.savebutton = ' Save';
        //}
       
          this._MaturityPaymentService.SaveMaturityBond(Jsondata).subscribe(res => {

            if (res) {
              this._commonservice.showInfoMessage("Saved Successfully");
              // this.toastr.success("Saved Successfully");
              this.disablesavebutton = false;
              this.savebutton = ' Save';
              this.ClearAllData();
              //this.router.navigateByUrl("/LienEntryView")
              //  this.LienEntryform.reset();
            }
            else {
              this.disablesavebutton = false;
              this.savebutton = ' Save';
            }
          },
            err => {
              // this.loading = false;
              this.disablesavebutton = false;
              this.savebutton = ' Save';
              this._commonservice.showErrorMessage("Error while saving");
            }
          );
      
      }
      

    }
  }
  checkValidations(group: FormGroup, isValid: boolean): boolean {
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
  GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {

    try {
      let formcontrol;

      formcontrol = formGroup.get(key);

      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {

          //if (key != 'InsuranceMemberNomineeDetailsList')
          //  this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.formValidationMessages[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {

                let lablename;

                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.formValidationMessages[key] += errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }

    }
    catch (e) {
      this._commonservice.showErrorMessage(key);
      return false;
    }
    return isValid;
  }
  showErrorMessage(errormsg: string) {
    this._commonservice.showErrorMessage(errormsg);
  }
  BlurEventAllControll(fromgroup: FormGroup) {

    try {

      Object.keys(fromgroup.controls).forEach((key: string) => {
        this.setBlurEvent(fromgroup, key);
      })

    }
    catch (e) {
      this._commonservice.showErrorMessage(e);
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
      this._commonservice.showErrorMessage(e);
      return false;
    }



  }
  back() {
    debugger;
    this.router.navigate(['/MaturityBondView']);
  }
}

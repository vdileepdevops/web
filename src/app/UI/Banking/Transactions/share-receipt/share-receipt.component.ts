import { Component, OnInit, NgZone, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
import { SAReceiptService } from 'src/app/Services/Banking/Transactions/sa-receipt.service';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { State } from '@progress/kendo-data-query';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined, debug } from 'util';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-share-receipt',
  templateUrl: './share-receipt.component.html',
  styles: []
})
export class ShareReceiptComponent implements OnInit {
 public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  
receiptform: FormGroup;
ShareTransDetails: FormGroup;
ShareDetailsForm: FormGroup;
buttonName='Save';
ShowShareConfigDetails=true;
ShowShareTransDetails=false;
disablesavebutton=false;
savebutton='Save';
     ptotalamount='';
     pnomineename='';
     pfacevalue='';
     pnoofsharesissued='';
     psharesissuedate='';
     pshareaccountnumber='';
     psharename='';
     pmembername='';
ShareAccountDetails:any=[];
lstsavingAccountnumbers:any=[];
ShareTranshistoryDetails:any=[];
memberDocumentsDetailsDTO:any=[];
public bankshowhide: boolean = false;
public showAdjustment:boolean=false;
  public walletshowhide: boolean = false;
  public chequeshowhide: boolean = false;
  public onlineshowhide: boolean = false;
  public DebitShowhide: boolean = false;
  public creditShowhide: boolean = false;
  public DepositBankDisable: boolean = false;
  public MemberchangeFlag: boolean = false;
  public notEditable: boolean = true;
  public isLoading: boolean = false;
Modeofpayment: any;
formValidationMessages: any;
ShareAccountNames:any=[];
ShareAccountNumbers:any=[];
MemberDetails:any=[];
partyBalance:any;
subledgerBalance:any;
ledgerBalance:any;
bankBalance:any;
gstlist:any;
banklist:any;
modeoftransactionslist:any;
typeofpaymentlist:any;
ledgeraccountslist:any;
Transtype:any;
partylist:any;
cashBalance:any;
debitcardlist:any;
bankbookBalance:any;
bankpassbookBalance:any;

  public today: Date = new Date();

  constructor(private formbuilder: FormBuilder, private zone: NgZone,private toastr: ToastrService, private _commonService: CommonService, private datePipe: DatePipe, private router: Router, private _SaReceiptService: SAReceiptService) {

     this.dpConfig.dateInputFormat = 'DD/MM/YYYY'
    this.dpConfig.maxDate = new Date();
    this.dpConfig.showWeekNumbers = false;

    this.dpConfig1.dateInputFormat = 'DD/MM/YYYY'
    this.dpConfig1.maxDate = new Date();
    this.dpConfig1.showWeekNumbers = false;
   }

  ngOnInit() {
     debugger;

this.buttonName='Save';
this.partyBalance='';
this.subledgerBalance='';
this.ledgerBalance='';
this.bankBalance='';
this.gstlist='';
this.banklist='';
this.disablesavebutton=false;
this.savebutton='Save';
this.modeoftransactionslist='';
this.typeofpaymentlist='';
this.ledgeraccountslist='';
this.partylist='';
this.cashBalance='';
this.debitcardlist='';
this.bankbookBalance='';
this.bankpassbookBalance='';
this.Transtype = '';
 this.ptotalamount='';
    this.pnomineename='';
    this.pfacevalue='';
    this.pnoofsharesissued='';
    this.psharesissuedate='';
    this.pshareaccountnumber='';
    this.psharename='';
    this.pmembername='';
  this.bankshowhide = false;
  this.showAdjustment=false;
  this.walletshowhide = false;
  this.chequeshowhide = false;
  this.onlineshowhide = false;
  this.DebitShowhide = false;
  this.creditShowhide = false;
  this.DepositBankDisable = false;
  this.MemberchangeFlag = false;
  this.notEditable = true;
  this.isLoading = false;
  this.ShowShareConfigDetails=true;
 this.ShowShareTransDetails=false;
this.Modeofpayment='';
this.memberDocumentsDetailsDTO=[];
    this.ShareAccountNames=[];
    this.ShareAccountNumbers=[];
    this.MemberDetails=[];
    this.ShareAccountDetails=[];
    this.lstsavingAccountnumbers=[];
    this.ShareTranshistoryDetails=[];
    this.formValidationMessages= {};
    this.receiptform = this.formbuilder.group({
      pModeofreceipt: ['CASH'],
      pbankname: [''],
      pBranch: [''],
      pbranchname: [''],
      ptranstype: [''],
      ptypeofpayment: [''],
      pChequenumber: [''],
      pchequedate: [this.today],
      pDattransdate: [this.today, Validators.required],
      pBank: [''],
      pbankid: [0],
      pCardNumber: [''],
      pdepositbankid: [0],
      pAccountid:[''],
      pAccountno:[''],
      pBalance:'',
      pdepositbankname: [''],
      pRecordid: [0],
      pUpiname: [''],
      pUpiid: [''],

    });
       this.ShareDetailsForm = this.formbuilder.group({
         pRecordid:[0],
         pConid:[0],
         pSubledgerid:[0],
         pMemberid:[0],
         pMembercode:[''],
         pMembername:[''],
         pContactid:[''],
         pReceiptdate: [this.today, Validators.required],
         ptransactionDate:[this.today, Validators.required],
         pShareNameCode:[''],
         pShareconfigid:['',Validators.required],
         pshareaccountid:['',Validators.required],
         pshareaccountnumber:[''],
         pStatus:[true],
         pCreatedby: [this._commonService.pCreatedby],
         pModifiedby: [0],
         pStatusid: [''],
         pStatusname: [this._commonService.pStatusname],
         ptypeofoperation: [this._commonService.ptypeofoperation],
    });
      this.ShareTransDetails = this.formbuilder.group({
      ppenaltyamount:[0],
      pReceivedamount: ['', Validators.required],
      pNarration:['', Validators.required],
    });
  this.Paymenttype("Cash");
  this.GetShareAccountNames();
  this.getLoadData();
  //this.clearMemberDetailsTab();
  this.BlurEventAllControll(this.receiptform);
  this.BlurEventAllControll(this.ShareTransDetails);
  this.BlurEventAllControll(this.ShareDetailsForm);
  }

  public getLoadData() {
    this._SaReceiptService.GetReceiptsandPaymentsLoadingData('GENERAL RECEIPT').subscribe(json => {
      debugger;
      if (json != null) {
        this.banklist = json.banklist;
        this.modeoftransactionslist = json.modeofTransactionslist;
        this.typeofpaymentlist = this.gettypeofpaymentdata();
        this.ledgeraccountslist = json.accountslist;
        this.partylist = json.partylist;
        this.gstlist = json.gstlist;
        this.debitcardlist = json.bankdebitcardslist;
        this.setBalances('CASH', json.cashbalance);
        this.setBalances('BANK', json.bankbalance);

      }
    },
      (error) => {
      });
  }

public gettypeofpaymentdata(): any {
    let data = this.modeoftransactionslist.filter(function (payment) {
      return payment.ptranstype != payment.ptypeofpayment;
    });
    return data;
  }
  setBalances(balancetype, balanceamount) {

    let balancedetails;
    if (parseFloat(balanceamount) < 0) {
      balancedetails = this._commonService.currencyformat(Math.abs(balanceamount)) + ' Cr';
    }
    else if (parseFloat(balanceamount) >= 0) {
      balancedetails = this._commonService.currencyformat(balanceamount) + ' Dr';
    }
    if (balancetype == 'CASH')
      this.cashBalance = balancedetails;
    if (balancetype == 'BANK')
      this.bankBalance = balancedetails;
    if (balancetype == 'BANKBOOK')
      this.bankbookBalance = balancedetails;
    if (balancetype == 'PASSBOOK')
      this.bankpassbookBalance = balancedetails;
    if (balancetype == 'LEDGER')
      this.ledgerBalance = balancedetails;
    if (balancetype == 'SUBLEDGER')
      this.subledgerBalance = balancedetails;
    if (balancetype == 'PARTY')
      this.partyBalance = balancedetails;
  }

  public GetShareAccountNames() {
   this.ShareAccountNames=[];
   this.MemberDetails=[];
    this._SaReceiptService.GetShareAccountNames().subscribe(json => {
      debugger;
      if(json){
           this.ShareAccountNames = json;
      }
    });
  }
  public Paymentbuttondata: any = [
    { id: 1, type: "Cash", bankshowhide: false, walletshowhide: false,showAdjustment:false },
    { id: 2, type: "Bank", bankshowhide: true, walletshowhide: false ,showAdjustment:false}, 
    { id: 3, type: "Wallet", bankshowhide: false, walletshowhide: true ,showAdjustment:false},
     { id: 4, type: "Adjustment", bankshowhide: false, walletshowhide: false,showAdjustment:true }
    ];

  public Bankbuttondata: any = [{ id: 1, type: "Cheque", chequeshowhide: true, onlineshowhide: false, DebitShowhide: false, creditShowhide: false }, { id: 2, type: "Online", chequeshowhide: false, onlineshowhide: true, DebitShowhide: false, creditShowhide: false }, { id: 3, type: "Debit Card", chequeshowhide: false, onlineshowhide: false, DebitShowhide: true, creditShowhide: false }, { id: 4, type: "Credit Card", chequeshowhide: false, onlineshowhide: false, DebitShowhide: false, creditShowhide: true }];

  public Paymenttype(type) {
    debugger;
    for (var n = 0; n < this.Paymentbuttondata.length; n++) {
      if (this.Paymentbuttondata[n].type === type) {
        this.bankshowhide = this.Paymentbuttondata[n].bankshowhide;
        this.walletshowhide = this.Paymentbuttondata[n].walletshowhide;
         this.showAdjustment = this.Paymentbuttondata[n].showAdjustment;
      }
    }
    this.receiptform.controls['pbankname'].setValue('');
    this.receiptform.controls['pChequenumber'].setValue('');
    this.receiptform.controls['pchequedate'].setValue(this.today);
    this.receiptform.controls['pdepositbankname'].setValue('');
    this.receiptform.controls['ptypeofpayment'].setValue('');
    this.receiptform.controls['pbranchname'].setValue('');
    this.receiptform.controls['pCardNumber'].setValue('');
    this.receiptform.controls['pAccountid'].setValue('');
    this.receiptform.controls['pAccountno'].setValue('');
    this.receiptform.controls['pBalance'].setValue('');
    if (type == 'Bank') {
      let savingaccnoControl = this.receiptform.controls['pAccountno'];
      savingaccnoControl.clearValidators();
      savingaccnoControl.updateValueAndValidity();
      this.receiptform.controls.ptranstype.setValue('Cheque');
      this.Banktype('Cheque')
      this.Modeofpayment = type;
    }
    else if(type == 'Adjustment'){
    this.clearBankDetails(type);
    this.showAdjustment=true;
    this.Modeofpayment = type;
    let savingaccnoControl = this.receiptform.controls['pAccountno'];
    savingaccnoControl.setValidators(Validators.required)
    savingaccnoControl.updateValueAndValidity();
    let membercode=this.ShareDetailsForm.controls.pMembercode.value;
    this._SaReceiptService.GetSAvingsAccountDetails(membercode).subscribe(details=>{
      debugger;
      if(details){
        this.lstsavingAccountnumbers=details;
        let data=this.lstsavingAccountnumbers[0];
    this.receiptform.controls.pBalance.setValue(data.pBalance);
    this.receiptform.controls.pAccountid.setValue(data.pAccountid);
    this.receiptform.controls.pAccountno.setValue(data.pAccountno);
    this.receiptform.controls.pBalance.setValue(this._commonService.currencyformat(this.receiptform.controls.pBalance.value));

    if(this.showAdjustment==true){
   let receivedamount=this._commonService.removeCommasForEntredNumber(this.ShareTransDetails.controls.pReceivedamount.value)
    let savingamount=this._commonService.removeCommasForEntredNumber(this.receiptform.controls.pBalance.value)
    if(receivedamount>savingamount){
       this._commonService.showWarningMessage('Adjustment is Not Applicable for Selected Member');
       return;
    }
 }
        
      }
      else{
          this._commonService.showWarningMessage('There is No Saving Account for Selected Member');
          this.Paymenttype('Cash');
      }
    })

    }
    else{
      this.clearBankDetails(type);
      this.Modeofpayment = type;
    }
  }
  clearBankDetails(type){
    debugger;
    this.receiptform.controls.ptranstype.setValue('');
      let DepositBankNameControl = this.receiptform.controls['pdepositbankname']
      let BankControl = this.receiptform.controls['pbankname'];
      let ChequeControl = this.receiptform.controls['pChequenumber']
      let TypeofPAymentControl = this.receiptform.controls['ptypeofpayment'];
      let BranchControl = this.receiptform.controls['pbranchname'];
      let CardNumberControl = this.receiptform.controls['pCardNumber'];
      let ChequeDateControl = this.receiptform.controls['pchequedate'];
      let savingaccnoControl = this.receiptform.controls['pAccountno'];
      savingaccnoControl.clearValidators();
      savingaccnoControl.updateValueAndValidity();
      BankControl.clearValidators();
      ChequeControl.clearValidators();
      ChequeDateControl.clearValidators();
      DepositBankNameControl.clearValidators();
      TypeofPAymentControl.clearValidators();
      BranchControl.clearValidators();
      CardNumberControl.clearValidators();
      BankControl.updateValueAndValidity();
      ChequeControl.updateValueAndValidity();
      DepositBankNameControl.updateValueAndValidity();
      TypeofPAymentControl.updateValueAndValidity();
      BranchControl.updateValueAndValidity();
      CardNumberControl.updateValueAndValidity();
      ChequeDateControl.updateValueAndValidity();
      this.chequeshowhide = false;
      this.onlineshowhide = false;
      this.creditShowhide = false;
      this.DebitShowhide = false;
      this.Modeofpayment = type;
      this.Transtype = '';
      this.DepositBankDisable = false;
      this.receiptform.controls.ptranstype.setValue('');
  }
  public Banktype(type) {
    debugger;
    this.validation(type);
    this.receiptform.controls['pbankname'].setValue('');
    this.receiptform.controls['pChequenumber'].setValue('');
    this.receiptform.controls['pchequedate'].setValue(this.today);
    this.receiptform.controls['pdepositbankname'].setValue('');
    this.receiptform.controls['ptypeofpayment'].setValue('');
    this.receiptform.controls['pbranchname'].setValue('');
    this.receiptform.controls['pCardNumber'].setValue('');

    this.Transtype = type;
    for (var n = 0; n < this.Bankbuttondata.length; n++) {
      if (this.Bankbuttondata[n].type === type) {

        this.chequeshowhide = this.Bankbuttondata[n].chequeshowhide;
        this.onlineshowhide = this.Bankbuttondata[n].onlineshowhide;
        this.creditShowhide = this.Bankbuttondata[n].creditShowhide;
        this.DebitShowhide = this.Bankbuttondata[n].DebitShowhide;
      }
    }
    this.receiptform.controls.pdepositbankid.setValue(0);
    this.receiptform.controls.pdepositbankname.setValue('');
    if (type == 'Online') {
      this.receiptform.controls.ptypeofpayment.setValue('');
      this.DepositBankDisable = true
    }
    else {
      this.receiptform.controls.ptypeofpayment.setValue(type);
      if (type == 'Debit Card' || type == 'Credit Card') {

        let DepositBankDisable
        let Modeofpayment = this.receiptform.controls.pModeofreceipt.value.toUpperCase();
        let trantype = this.Transtype.toUpperCase();
        type = type.toUpperCase();
        this.modeoftransactionslist.filter(function (Data) {
          if (Data.ptypeofpayment == type && Data.pmodofPayment == Modeofpayment && Data.ptranstype == trantype) {
            if (Data.pchqonhandstatus == 'Y') {
              DepositBankDisable = true  //Enable
            }
            else if (Data.pchqonhandstatus == 'N') {
              DepositBankDisable = false  //Disable
            }
          }
        })
        const DepositBankIDControl = <FormGroup>this.receiptform['controls']['pdepositbankid'];
        this.DepositBankDisable = DepositBankDisable
        if (this.DepositBankDisable == true) {
          DepositBankIDControl.clearValidators();
        }
        else {
          DepositBankIDControl.setValidators(Validators.required)
        }
        DepositBankIDControl.updateValueAndValidity();
      }
    }
    this.bankbookBalance = '0' + 'Dr';
    this.bankpassbookBalance = '0' + 'Dr';
    this.BlurEventAllControll(this.receiptform);
    this.formValidationMessages= {};

  }
  validation(type) {
    this.formValidationMessages = {};
    let ChequeControl = this.receiptform.controls['pChequenumber']
    let ChequeDateControl = this.receiptform.controls['pchequedate'];
    let TypeofPaymentControl = this.receiptform.controls['ptypeofpayment']
    let BankControl = this.receiptform.controls['pbankname']
    let CardNumberControl = this.receiptform.controls['pCardNumber']
    let DepositBankNameControl = this.receiptform.controls['pdepositbankid'];
    DepositBankNameControl.clearValidators();
    ChequeControl.setValidators([Validators.required]);
    TypeofPaymentControl.setValidators([Validators.required]);
    if (type == 'Online' || type == 'Cheque') {
      ChequeDateControl.setValidators([Validators.required]);
      if (type = 'Online') {
        BankControl.setValidators([Validators.required]);
      }
      else {
        BankControl.clearValidators();
      }
      CardNumberControl.clearValidators();
    }
    else {
      ChequeDateControl.clearValidators();
      BankControl.clearValidators();
      CardNumberControl.setValidators([Validators.required]);
    }


    ChequeDateControl.updateValueAndValidity();
    ChequeControl.updateValueAndValidity();
    TypeofPaymentControl.updateValueAndValidity();
    BankControl.updateValueAndValidity();
    CardNumberControl.updateValueAndValidity();
    DepositBankNameControl.updateValueAndValidity();
    //this.BlurEventAllControll(this.receiptform)
  }
  Cleardetails(){
    debugger;
    this.ShareDetailsForm.patchValue({
        pRecordid:0 ,
         pConid:0 ,
         pSubledgerid:0 ,
         pMemberid:0 ,
         pMembercode:'',
         pMembername:'',
         pContactid:'',
         pReceiptdate: this.today ,
         pShareNameCode:'' ,
         pShareconfigid:'' ,
         pshareaccountid:'' ,
         pshareaccountnumber:'',
    })
    this.receiptform.patchValue({
      pModeofreceipt: 'CASH',
      pbankname: '',
      pBranch:  '' ,
      pbranchname:  '' ,
      ptranstype:  '' ,
      ptypeofpayment:  '' ,
      pChequenumber:  '' ,
      pchequedate:  this.today ,
      pDattransdate:  this.today ,
      pBank:  '' ,
      pbankid:  0 ,
      pCardNumber:  '' ,
      pdepositbankid:  0 ,
      pAccountid:'',
      pAccountno:'',
      pBalance:'',
      pdepositbankname:  '' ,
      pRecordid:  0 ,
      pUpiname:  '' ,
      pUpiid:  '' ,

    });
    this.ShareTransDetails.patchValue({
      ppenaltyamount: 0 ,
      pReceivedamount:  '' ,
      pNarration: '' ,
    });
    this.ShareAccountNames=[];
    this.ShareAccountNumbers=[];
    this.MemberDetails=[];
    this.ShareAccountDetails=[];
    this.lstsavingAccountnumbers=[];
    this.ShareTranshistoryDetails=[];
    this.cleartransDetails();
    this.GetShareAccountNames(); 
    this.formValidationMessages= {}; 
    }
  cleartransDetails(){
    this.ptotalamount='';
    this.pnomineename='';
    this.pfacevalue='';
    this.pnoofsharesissued='';
    this.psharesissuedate='';
    this.pshareaccountnumber='';
    this.psharename='';
    this.pmembername='';

this.partyBalance='';
this.subledgerBalance='';
this.ledgerBalance='';
this.bankBalance='';
this.gstlist='';
this.banklist='';
this.modeoftransactionslist='';
this.typeofpaymentlist='';
this.ledgeraccountslist='';
this.partylist='';
this.cashBalance='';
this.debitcardlist='';
this.bankbookBalance='';
this.bankpassbookBalance='';
this.Transtype = '';
this.bankshowhide = false;
this.showAdjustment=false;
  this.walletshowhide = false;
  this.chequeshowhide = false;
  this.onlineshowhide = false;
  this.DebitShowhide = false;
  this.creditShowhide = false;
  this.DepositBankDisable = false;
  this.MemberchangeFlag = false;
  this.notEditable = true;
  this.Modeofpayment='';
  this.lstsavingAccountnumbers=[];
  this.Paymenttype("Cash");
  this.getLoadData();
  this.ShowShareConfigDetails=true;
  this.ShowShareTransDetails=false;
   this.ptotalamount='';
    this.pnomineename='';
    this.pfacevalue='';
    this.pnoofsharesissued='';
    this.psharesissuedate='';
    this.pshareaccountnumber='';
    this.psharename='';
    this.pmembername='';
  //this.clearMemberDetailsTab();
  this.ShareAccountDetails.ptotalamount='';
  this.ShareAccountDetails=[];
  this.ShareTranshistoryDetails=[];
  this.memberDocumentsDetailsDTO=[];
  this.ShareTransDetails.controls.pReceivedamount.setValue('');
  this.ShareTransDetails.controls.pNarration.setValue('');
  this.formValidationMessages.pReceivedamount=null;
  this.formValidationMessages.pNarration=null;
  }
  BankNameChange() {
    this.GetValidationByControl(this.receiptform, 'pbankname', true);
  }
  ChequeNoChange() {
    this.GetValidationByControl(this.receiptform, 'pChequeisNullOrUndefinednumber', true);
  }
  ChequeDateChange() {
    this.GetValidationByControl(this.receiptform, 'pchequedate', true);
  }
  CardNoChange() {
    this.GetValidationByControl(this.receiptform, 'pCardNumber', true);
  }
  
  GetSAandTransDetails(type){
    debugger;
    if(type=='AccountDetails'){
       this.ShowShareConfigDetails=true;
       this.ShowShareTransDetails=false;
    }
    else{
      this.ShowShareConfigDetails=false;
       this.ShowShareTransDetails=true;
    }
  }
  AccountName_Change(event){
    debugger;
    this.cleartransDetails();
    this.ShareAccountNumbers=[];
     this.ShareDetailsForm.controls.pshareaccountid.setValue('');
     this.formValidationMessages.pshareaccountid=null;
     this.ShareDetailsForm.controls.pshareaccountnumber.setValue('');
     this.ShareDetailsForm.controls.pMemberid.setValue('');
     this.ShareDetailsForm.controls.pSubledgerid.setValue('');
     this.ShareDetailsForm.controls.pMembername.setValue('');
     this.ShareDetailsForm.controls.pMembercode.setValue('');
     this.ShareDetailsForm.controls.pContactid.setValue('');
    if(event!=''){
      let ShareConfigid=event.pShareconfigid;
      this.ShareDetailsForm.controls.pShareNameCode.setValue(event.pShareNameCode);
      this._SaReceiptService.GetShareAccountNumbers(parseInt(ShareConfigid)).subscribe(res=>{
        debugger;
        if(res){
          this.ShareAccountNumbers=res;
        }
      })
    }
    else{

    }
    
  }
  SharingAccountNo_Change(event){
    debugger;
    this.cleartransDetails();
    if(event){
     this.ShareAccountDetails=event;
    this.ptotalamount=this.ShareAccountDetails.ptotalamount;
    this.pnomineename=this.ShareAccountDetails.pnomineename;
    this.pfacevalue=this.ShareAccountDetails.pfacevalue;
    this.pnoofsharesissued=this.ShareAccountDetails.pnoofsharesissued;
    this.psharesissuedate=this.ShareAccountDetails.psharesissuedate;
    this.pshareaccountnumber=this.ShareAccountDetails.pshareaccountnumber;
    this.psharename=this.ShareAccountDetails.psharename;
    this.pmembername=this.ShareAccountDetails.pmembername;
     this.ShareDetailsForm.controls.pMemberid.setValue(event.pmemberid);
     this.ShareDetailsForm.controls.pSubledgerid.setValue(event.pAccountid);
     this.ShareDetailsForm.controls.pshareaccountnumber.setValue(event.pshareaccountnumber);
     this.ShareDetailsForm.controls.pMembername.setValue(event.pmembername);
     this.ShareDetailsForm.controls.pMembercode.setValue(event.pmembercode);
     this.ShareDetailsForm.controls.pContactid.setValue(parseInt(event.pcontactid));
     let ShareAccountId=parseInt(event.pshareaccountid);
    //  this._SaReceiptService.getShareAccountTransactionDetails(ShareAccountId).subscribe(res=>{
    //    debugger;
    //    if(res){
    //      this.ShareTranshistoryDetails=res;
    //    }
    //  })
    }
    else{

    }
  }
  checkValidationAll():boolean{
   let isvalid1 = true;
   let isvalid2 = true;
   let isvalid3 = true;
   isvalid1= this.checkValidations(this.ShareDetailsForm, isvalid1);
   isvalid2= this.checkValidations(this.receiptform, isvalid2);
   isvalid3= this.checkValidations(this.ShareTransDetails, isvalid3);
   if(isvalid1 && isvalid2 && isvalid3){
     return true;
   }
   else{
     return false;
   }
  }
  AccountNo_Change(event){
    debugger;
    if(event){
    this.receiptform.controls.pBalance.setValue(event.pBalance);
    this.receiptform.controls.pAccountid.setValue(event.pAccountid);
    this.receiptform.controls.pBalance.setValue(this._commonService.currencyformat(this.receiptform.controls.pBalance.value));
    }
    else{
      this.receiptform.controls.pBalance.setValue('');
    this.receiptform.controls.pBalance.setValue('');
    }


  }
  SaveShareReceipt(){
    debugger;
    let isValid:boolean = true;
    isValid=this.checkValidationAll();
    if (isValid) {
    let receivedamount=this._commonService.removeCommasForEntredNumber(this.ShareTransDetails.controls.pReceivedamount.value)
    let totalamount=this.ShareAccountDetails.ptotalamount;
    if(receivedamount!=totalamount){
       this.ShareTransDetails.controls.pReceivedamount.setValue('');
       this._commonService.showWarningMessage('Amount Received Must be Equal to Total Amount');
       return;
    }
    
 if(this.showAdjustment==true){
   this.receiptform.controls.pBalance.setValue(this._commonService.removeCommasForEntredNumber(this.receiptform.controls.pBalance.value));
   let receivedamount=this._commonService.removeCommasForEntredNumber(this.ShareTransDetails.controls.pReceivedamount.value)
    let savingamount=this.receiptform.controls.pBalance.value;
    if(receivedamount>savingamount){
       this._commonService.showWarningMessage('Adjustment is Not Applicable for Selected Member');
       this.receiptform.controls.pBalance.setValue(this._commonService.currencyformat(this.receiptform.controls.pBalance.value));
       return;
    }
 }
    this.ShareDetailsForm.controls.pReceiptdate.setValue((this.ShareDetailsForm.controls.pReceiptdate.value).toISOString());
     this.ShareTransDetails.controls.pReceivedamount.setValue(this._commonService.removeCommasForEntredNumber(this.ShareTransDetails.controls.pReceivedamount.value));
     this.disablesavebutton = true;
     this.savebutton = "Processing";
     let Formdata = Object.assign(this.receiptform.value, this.ShareTransDetails.value,this.ShareDetailsForm.value);
      debugger;
      let newdata = JSON.stringify(Formdata);
      this._SaReceiptService.SaveShareReceipt(newdata).subscribe(result=>{
        debugger;
        if(result){
          this.savebutton='Save';
          this.disablesavebutton=false;
          this._commonService.showInfoMessage("Saved Successfully");
          let receipt = btoa(result['pReceiptId'] + ',' + 'Receipt Voucher');
          window.open('/#/GeneralReceiptReports?id=' + receipt);
          this.ShareDetailsForm.controls.pReceiptdate.setValue(new Date);
         this.Cleardetails();
        //this.router.navigate(['/ShareReceiptView'])
        }
      },
      error=>{
        this._commonService.showErrorMessage(error);
        this.savebutton='Save';
        this.disablesavebutton=false;
      })
  }

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
          this.formValidationMessages[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                let lablename;
                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.formValidationMessages[key] += errormessage + ' ';
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

}

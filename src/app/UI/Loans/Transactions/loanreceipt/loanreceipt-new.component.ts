import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchememasterService } from 'src/app/Services/Loans/Masters/schememaster.service';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';
import { ApprovalService } from 'src/app/Services/Loans/Transactions/approval.service';
import { AccountingTransactionsService } from 'src/app/Services/Accounting/accounting-transactions.service';
import { CommonService } from 'src/app/Services/common.service';
import { ChargemasterService } from 'src/app/Services/Loans/Masters/chargemaster.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { LoanreceiptService } from 'src/app/Services/Loans/Transactions/loanreceipt.service';
import { Router } from '@angular/router';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

declare var $: any;

@Component({
  selector: 'app-loanreceipt-new',
  templateUrl: './loanreceipt-new.component.html',
  styles: []
})
export class LoanreceiptNewComponent implements OnInit {
  dates:any = []
  receiptForm: FormGroup;
  loandropForm: FormGroup;
  pFormname:any = "RECEIPT"

  forNarrationError = false;
  loading = false;
  public bankshowhide: boolean = false;
  public walletshowhide: boolean = false;
  public chequeshowhide: boolean = false;
  public onlineshowhide: boolean = false;
  public DebitShowhide: boolean = false;
  public creditShowhide: boolean = false;
  disabledforButtons: boolean = true;
  formValidationMessages: any;
  public today: Date = new Date();
  public Transtype: any;
  public DepositBankDisable: boolean = false;
  chargesForKendo: boolean = false;
  addCharge: boolean = false;
  penalityZeros: boolean;
  disabletransactiondate: boolean;
  noaddbuttonforcharges: boolean = true;
  buttonName = "Save";
  public isLoading: boolean = false;

  instalmentsView = [];
  modeOfData = [];
  loantypeid: any
  LoanNames: any[] = [];
  addedChargesNames = [];
  loandetailsOfApplicationid = [];
  viewParticularsdataForcalcu = [];
  getparticularsdata = [];
  LoanTypes: Response;
  bsValue = new Date();
  dateForMindate: any;
  loanreceiptAppliactionId: any;
  dataOfLoan = [];
  chargesAndFees = [];
  zeroReceipt = [];
  pApplicantname: any;
  pContactid: any;
  pDateofapplication: any;
  pLoanname: any;
  pPurposeofloan: any;
  pAmountrequested: any;
  pTenureofloan: any;
  pRateofinterest: any;
  pLoanpayin: any;
  enteredAmount: any;
  enteredWaiver: number;
  enteredReceipt: any;
  public banklist: any;
  public modeoftransactionslist: any;
  public typeofpaymentlist: any;
  public ledgeraccountslist: any;
  public partylist: any;
  public gstlist: any;
  public debitcardlist: any;
  public WalletBalance: number = 0;
  public cashBalance: number = 0;
  public bankBalance: number = 0;
  forcheckingviewer = 0;
  forcheckingreceipt = 0;
  public bankbookBalance: any = '0' + 'Dr';
  dataOfTransaction: any;

  public bankpassbookBalance: any = '0' + 'Dr';
  public ledgerBalance: any;
  public subledgerBalance: any;
  public partyBalance: any;
  pInterest: any;
  pPrincipal: any;
  dataOfParticulars: any[] = [];
  pParticularsname: any;
  pAmount: number;
  valueOfEvent: number;
  balanceDue: number;
  valueOgReceiptAmtOfCharge: number;
  valueOfWaiverAmtOfCharge: number;
  valueOfAmtOfCharge: number;
  valueOfBalnceDueOfCharge: number;
  valueOfReceipt: number;
  grandTotalAmountDue = 0;
  grandTotalAmountWavier = 0;
  grandTotalAmountReceipt = 0;
  grandTotalAmountbalance = 0;
  notInstallment = false;
  deleteCharge = false;
  emiAmount = 0;
  penalityorcharges = 0;
  advance = 0;
  fixedAdvance = 0;
  installmentReceipt = 0;
  totalinstalldue = 0;
  totalpenality = 0;
  totalCharge = 0;
  pApprovedamount = 0;
  forReceiptValidarion: any;
  pPrinciplereceivable: any;

  pLoantype;
  pLoantypeid;
  pmodofreceipt;
  pChargename;
  particularwaiveramt;
  narration;
  pReceiptdate: Date;
  pParticularstype: any;
  pApplicationid: number;
  pSubledgerid: any;
  pLoanid: any;
  Modeofpayment: any;
  pReceiptamount: any;
  pReceiptno: any;
  transactions = [];
  pIntrestreceivable: any;
  pInteresttype: any;
  pLoantypeloandetails: any;
  pEmiAmount: any;
  amount: any;
  forNarrationErrorValid: boolean = false;
  fixedemiAmount: number = 0;
  chargesReceivble: number = 0;
  penalityReceivble: number = 0;
  chargesReceived: number = 0;
  penalityReceived: number = 0;
  penalitywaived: number = 0;
  chargeswaived: number = 0;
  balance: any;
  amountAdjusted: number = 0;
  installmentDues: number = 0;
  installmentDate: any;
  installmentAmount: number = 0;
  lastreceiptAmount: number = 0;
  pBalance: number;
  upinameslist: any;
  chequenumberslist: any;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig2: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  pLoanstatus: any;
  Gsttype: any;
  Gstcaltype: any;
  Gstpercentagetype: any;
  PenalityView: any;
  applicationdate = new Date();
  pConid: any;
  pContacttype: any;
  forDatepicckerconfig: Date;
  lastTransactionDate: Date;
  constructor(public datePipe: DatePipe, private _ChargemasterService: ChargemasterService,
    private _loaanreceiptServie: LoanreceiptService, private _commonService: CommonService,
    private _Accountservice: AccountingTransactionsService, private _schememasterservice: SchememasterService,
    private _fiindividualservice: FIIndividualService, private formbuilder: FormBuilder,
    private _approvalService: ApprovalService, private zone: NgZone, private router: Router) {
    //kendo dropdown for application number started
    window['CallingFunctionOutsideSelectApplicantId' + this.dynamicLoanapplicationId] = {
      zone: this.zone,
      componentFn: (value) => this.selectedDetails(value),
      component: this,
    };
    window['CallingFunctionToHideCard' + this.dynamicLoanapplicationId] = {
      zone: this.zone,
      componentFn: () => this.HideCard(),
      component: this,
    };
    //kendo dropdown for application number ended

    //<----datepicker functionalities started---->
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig1.containerClass = 'theme-dark-blue';
    this.dpConfig1.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig1.maxDate = new Date();
    this.dpConfig2.showWeekNumbers = false;
    this.dpConfig2.containerClass = 'theme-dark-blue';
    this.dpConfig2.dateInputFormat = 'DD/MM/YYYY';
    this.dpConfig2.maxDate = new Date();
    this.dpConfig2.minDate = new Date();
    this.dpConfig2.showWeekNumbers = false;
    //<----datepicker functionalities ended---->
  }

  ngOnInit() {
    if (this._commonService.comapnydetails != null)
      this.disabletransactiondate = this._commonService.comapnydetails.pdatepickerenablestatus;


    this.formValidationMessages = {};
    this.loandropForm = this.formbuilder.group({
      loanname: ['', Validators.required],
      loanapplication: ['', Validators.required]

    })
    this.BlurEventAllControll(this.loandropForm)
    this.receiptForm = this.formbuilder.group({
      pmodofreceipt: ['CASH'],
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
      pdepositbankname: [''],
      pRecordid: [0],
      pUpiname: [''],
      pUpiid: [''],

    });
    this.BlurEventAllControll(this.receiptForm)

    this.getLoadData()
    this.BlurEventAllControll(this.receiptForm);
    this._fiindividualservice.getFiLoanTypes().subscribe((data: any) => {
      this.LoanTypes = data
      for (let i = 0; i < data.length; i++) {
        this.pLoanid = data[i].pLoantypeid;
      }

    })
    this.chargeNamesData();
  }
  //<----Validation for formgroup started---->
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
  //<----Validation for formgroup ended---->

  //<-----getting data for mode of receipt started--->
  public getLoadData() {
    this._Accountservice.GetReceiptsandPaymentsLoadingData('GENERAL RECEIPT').subscribe(json => {
      if (json != null) {

        this.banklist = json.banklist;
        this.modeoftransactionslist = json.modeofTransactionslist;  //Bank
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
  //<-----getting data for mode of receipt ended--->

  //<-----set balnces for mode of receipt started--->
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
  //<-----set balnces for mode of receipt ended--->

  public Bankbuttondata: any = [{ id: 1, type: "Cheque", chequeshowhide: true, onlineshowhide: false, DebitShowhide: false, creditShowhide: false }, { id: 2, type: "Online", chequeshowhide: false, onlineshowhide: true, DebitShowhide: false, creditShowhide: false }, { id: 3, type: "Debit Card", chequeshowhide: false, onlineshowhide: false, DebitShowhide: true, creditShowhide: false }, { id: 4, type: "Credit Card", chequeshowhide: false, onlineshowhide: false, DebitShowhide: false, creditShowhide: true }];

  public Paymentbuttondata: any = [{ id: 1, type: "Cash", bankshowhide: false, walletshowhide: false }, { id: 2, type: "Bank", bankshowhide: true, walletshowhide: false }, { id: 3, type: "Wallet", bankshowhide: false, walletshowhide: true }];

  //<-----type of depositbank in mode of receipt started--->
  typeofDepositBank(args) {
     this.GetValidationByControl(this.receiptForm, 'pdepositbankid', true);
    let type = args.target.options[args.target.selectedIndex].text;

    this.receiptForm.controls.pdepositbankname.setValue(type)

    this.getBankBranchName(this.receiptForm.controls.pdepositbankid.value);
  }
  //<-----type of depositbank in mode of receipt ended--->

  //<-----type of payment method in mode of receipt started--->
  public Paymenttype(type) {

    for (var n = 0; n < this.Paymentbuttondata.length; n++) {
      if (this.Paymentbuttondata[n].type === type) {
        this.bankshowhide = this.Paymentbuttondata[n].bankshowhide;
        this.walletshowhide = this.Paymentbuttondata[n].walletshowhide;
      }
    }
    this.receiptForm.controls['pbankname'].setValue('');
    this.receiptForm.controls['pChequenumber'].setValue('');
    this.receiptForm.controls['pchequedate'].setValue(this.today);
    this.receiptForm.controls['pdepositbankname'].setValue('');
    this.receiptForm.controls['ptypeofpayment'].setValue('');
    this.receiptForm.controls['pbranchname'].setValue('');
    this.receiptForm.controls['pCardNumber'].setValue('');
    if (type == 'Bank') {
      this.receiptForm.controls.ptranstype.setValue('Cheque');
      this.Banktype('Cheque')
      this.Modeofpayment = type;
    }
    else {
      this.receiptForm.controls.ptranstype.setValue('');
      let DepositBankNameControl = this.receiptForm.controls['pdepositbankname']
      let BankControl = this.receiptForm.controls['pbankname'];
      let ChequeControl = this.receiptForm.controls['pChequenumber']
      let TypeofPAymentControl = this.receiptForm.controls['ptypeofpayment'];
      let BranchControl = this.receiptForm.controls['pbranchname'];
      let CardNumberControl = this.receiptForm.controls['pCardNumber'];
      let ChequeDateControl = this.receiptForm.controls['pchequedate']
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
      this.receiptForm.controls.ptranstype.setValue('');
    }
  }
  //<-----type of payment method in mode of receipt ended--->

  //<-----type of bank method in mode of receipt started--->
  public Banktype(type) {
    this.validation(type);
    this.receiptForm.controls['pbankname'].setValue('');
    this.receiptForm.controls['pChequenumber'].setValue('');
    this.receiptForm.controls['pchequedate'].setValue(this.today);
    this.receiptForm.controls['pdepositbankname'].setValue('');
    this.receiptForm.controls['ptypeofpayment'].setValue('');
    this.receiptForm.controls['pbranchname'].setValue('');
    this.receiptForm.controls['pCardNumber'].setValue('');

    this.Transtype = type;
    for (var n = 0; n < this.Bankbuttondata.length; n++) {
      if (this.Bankbuttondata[n].type === type) {

        this.chequeshowhide = this.Bankbuttondata[n].chequeshowhide;
        this.onlineshowhide = this.Bankbuttondata[n].onlineshowhide;
        this.creditShowhide = this.Bankbuttondata[n].creditShowhide;
        this.DebitShowhide = this.Bankbuttondata[n].DebitShowhide;
      }
    }
    this.receiptForm.controls.pdepositbankid.setValue('');
    this.receiptForm.controls.pdepositbankname.setValue('');
    if (type == 'Online') {
      this.receiptForm.controls.ptypeofpayment.setValue('');
      this.DepositBankDisable = true
    }
    else {
      this.receiptForm.controls.ptypeofpayment.setValue(type);
      if (type == 'Debit Card' || type == 'Credit Card') {

        let DepositBankDisable
        let Modeofpayment = this.receiptForm.controls.pmodofreceipt.value.toUpperCase();
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
        const DepositBankIDControl = <FormGroup>this.receiptForm['controls']['pdepositbankid'];
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
    this.BlurEventAllControll(this.receiptForm);
    this.formValidationMessages = {};

  }
  //<-----type of bank method in mode of receipt ended--->

  //<-----set validations in mode of receipt started--->
  validation(type) {
    this.formValidationMessages = {};
    let ChequeControl = this.receiptForm.controls['pChequenumber']
    let ChequeDateControl = this.receiptForm.controls['pchequedate'];
    let TypeofPaymentControl = this.receiptForm.controls['ptypeofpayment']
    let BankControl = this.receiptForm.controls['pbankname']
    let CardNumberControl = this.receiptForm.controls['pCardNumber']
    let DepositBankNameControl = this.receiptForm.controls['pdepositbankid'];
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
    //this.BlurEventAllControll(this.receiptForm)
  }
  //<-----set validations in mode of receipt ended--->

  //<-----change type of payment method in mode of receipt started--->
  typeofPaymentChange(args) {
    this.formValidationMessages.pdepositbankid = '';
    this.GetValidationByControl(this.receiptForm, 'ptypeofpayment', true);
    let type = args.target.options[args.target.selectedIndex].text;
    if (this.Transtype != '') {
      this.receiptForm.controls.pdepositbankid.setValue('');
      this.receiptForm.controls.pdepositbankname.setValue('');
      let DepositBankDisable
      let Modeofpayment = this.receiptForm.controls.pmodofreceipt.value.toUpperCase();
      let trantype = this.Transtype.toUpperCase()
      this.modeoftransactionslist.filter(function (Data) {
        if (Data.ptypeofpayment == type && Data.pmodofPayment == Modeofpayment && Data.ptranstype == trantype) {
          if (Data.pchqonhandstatus == 'Y') {
            DepositBankDisable = true
          }
          else if (Data.pchqonhandstatus == 'N') {
            DepositBankDisable = false
          }
        }
      })
      const DepositBankIDControl = <FormGroup>this.receiptForm['controls']['pdepositbankid'];
      this.DepositBankDisable = DepositBankDisable
      if (this.DepositBankDisable == true) {
        DepositBankIDControl.clearValidators();
      }
      else {
        DepositBankIDControl.setValidators(Validators.required)
      }
      DepositBankIDControl.updateValueAndValidity();
    }
    this.BlurEventAllControll(this.receiptForm);
    this.formValidationMessages = {};
  }
  //<-----change type of payment method in mode of receipt ended--->

  //<-----change bank name method in mode of receipt started--->
  bankName_Change($event: any): void {

    const pbankid = $event.target.value;
    this.upinameslist = []
    this.receiptForm['controls']['pUpiname'].setValue('');
    this.receiptForm['controls']['pUpiid'].setValue('');
    if (pbankid && pbankid != '') {
      const bankname = $event.target.options[$event.target.selectedIndex].text;
      this.GetBankDetailsbyId(pbankid);
      this.getBankBranchName(pbankid);
      this.receiptForm['controls']['pbankname'].setValue(bankname);
    }
    else {
      this.receiptForm['controls']['pbankname'].setValue('');
    }
  }
  //<-----change bank name method in mode of receipt ended--->

  //<-----getting bank branch name using bank id method in mode of receipt started--->
  getBankBranchName(pbankid) {
    let data = this.banklist.filter(function (bank) {
      return bank.pbankid == pbankid;
    });
    this.receiptForm['controls']['pbranchname'].setValue(data[0].pbranchname);
    this.setBalances('BANKBOOK', data[0].pbankbalance);
    this.setBalances('PASSBOOK', data[0].pbankpassbookbalance);
  }
  //<-----getting bank branch name using bank id method in mode of receipt ended--->

  //<-----getting bank details using bank id method in mode of receipt started--->
  GetBankDetailsbyId(pbankid) {
    this._Accountservice.GetReceiptsandPaymentsLoadingData('GENERAL RECEIPT').subscribe(json => {
      if (json != null) {
        this.upinameslist = json.bankupilist;
        this.chequenumberslist = json.chequeslist;
      }
    },
      (error) => {
      });
  }
  //<-----getting bank details using bank id method in mode of receipt ended--->

  //<-----select application id in kendo dropdown started--->
  selectApplicantId(e) {

    if (e.dataItem) {
      var dataItem = e.dataItem;
      window['CallingFunctionOutsideSelectApplicantId' + this.dynamicLoanapplicationId].componentFn(dataItem);
    }
  }
  //<-----select application id in kendo dropdown ended--->

  //<-----select application id details in kendo dropdown started--->
  selectedDetails(data) {
    if (data) {
      if (this.pLoantype == data.loanTypye) {
        this.loandropForm.controls.loanapplication.setValue(data.pVchapplicationid);
        this.loanreceiptAppliactionId = data.pVchapplicationid;
        this.pApplicationid = data.pApplicationid;
        if (this.loanreceiptAppliactionId) {
          this.changeLoanApplicationId();
        }
      }
    }
  }
  //<-----select application id details in kendo dropdown ended--->

  //<-----refresh details after changing the application id details in kendo dropdown started--->
  refreshloanDataForSelectApplicant() {
    this.loandropForm.controls.loanapplication.setValue('');
    var multicolumncombobox: any;
    multicolumncombobox = $("#" + this.dynamicLoanapplicationId).data("kendoMultiColumnComboBox");
    if (multicolumncombobox) {
      multicolumncombobox.value("")
    }
    this.formValidationMessages.loanapplication = '';
  }
  //<-----refresh details after changing the application id details in kendo dropdown ended--->

  //<-----cancel buuton function in kendo dropdown started--->
  CancelClick() {
    window['CallingFunctionToHideCard' + this.dynamicLoanapplicationId].componentFn()
  }
  HideCard() {
    if (this.loandropForm.controls['pVchapplicationid'].value) {
      this.loandropForm.controls['pVchapplicationid'].setValue('');
      this.BlurEventAllControll(this.loandropForm);
    }
  }
  //<-----cancel buuton function in kendo dropdown ended--->
  dynamicLoanapplicationId: any;

  //<-----after selecting loan type getting the data of appliaction id dropdown function started--->
  ChangeLoanType(args) {
    let str = args.target.options[args.target.selectedIndex].text
    if (str.toString().toUpperCase() == 'SELECT') {
      this.refreshloanDataForSelectApplicant();
      $("#" + this.dynamicLoanapplicationId).data("kendoMultiColumnComboBox").dataSource = [];
      this.formValidationMessages.loanname = '';
    }
    this.resetData();
    this.BlurEventAllControll(this.loandropForm)
    if (this.loandropForm.value.loanapplication) {
      this.refreshloanDataForSelectApplicant();
    }
    this.loantypeid = args.currentTarget.value;
    let loanName = args.currentTarget.value.replace(/ +/g, "");
    this.dynamicLoanapplicationId = loanName;
    this.pLoantype = str
    this._loaanreceiptServie.getReceiptApplicationId(this.loantypeid,this.pFormname).subscribe((data: any) => {
      this.LoanNames = [];
      this.loandetailsOfApplicationid = data;
      for (let index = 0; index < data.length; index++) {
        let loanTypye = {
          'loanTypye': this.loantypeid
        }
        var dataResponse = Object.assign(loanTypye, data[index]);
        this.LoanNames.push(dataResponse);
      }
      if (this.LoanNames) {
        $("#" + loanName).kendoMultiColumnComboBox({
          dataTextField: "pVchapplicationid",
          height: 400,
          columns: [
            {
              field: "pVchapplicationid", title: "Application Id", width: 150
            },
            { field: "pApplicantname", title: "Applicant Name", width: 150 },
            { field: "pLoanname", title: "Loan Name", width: 150 },
          ],
          footerTemplate: 'Total #: instance.dataSource.total() # items found',
          filter: "contains",
          filterFields: ["pVchapplicationid", "pApplicantname", "pLoanname"],
          dataSource: this.LoanNames,
          select: this.selectApplicantId,
        });

      }
    })
  }
  //<-----after selecting loan type getting the data of appliaction id dropdown function ended--->

  //<-----getting recent transactions of selecting appliaction number (started)---->
  recenttransaction() {
    this.dates =[];
    this.loading = true;
    this._loaanreceiptServie.getTransactionById(this.loanreceiptAppliactionId).subscribe((data: any) => {
      this.loading = false;
      this.dataOfTransaction = data;
      for (let i = 0; i < this.dataOfTransaction.length; i++) {
        this.pInterest = this.dataOfTransaction[i].pInterest;
        this.pPrincipal = this.dataOfTransaction[i].pPrincipal;
        this.pBalance = this.pPrincipal ? Number((this.pPrincipal.toString()).replace(/,/g, "")) : 0
        this.transactions = this.dataOfTransaction[i].lstTransactions;
      }
      if (this.transactions && this.transactions.length > 0) {
        this.lastTransactionDate = this._commonService.formatDateFromDDMMYYYY(this.transactions[0].pReceiptdate);
        for (let i = 0; i < this.transactions.length; i++) {
          if((this.getparticularsdata.length == 0))   {  
                      
          this.dates.push(new Date(this._commonService.formatDateFromYYYYMMDD(this.transactions[i].pReceiptdate)))

          var maxDate=new Date(Math.max.apply(null,this.dates));  
          console.log(new Date(this._commonService.formatDateFromYYYYMMDD(this.transactions[i].pReceiptdate)).getTime(),new Date(maxDate).getTime());
                   
             if(new Date(this._commonService.formatDateFromYYYYMMDD(this.transactions[i].pReceiptdate)).getTime() == new Date(maxDate).getTime()){
               
                 this.installmentDate = this.transactions[i].pReceiptdate;
                 this.lastreceiptAmount = this.transactions[i].pReceiptamount;                               
               }           
           }    
          }    
        this.setDateConfig();
      }
    },
      (error) => {
        this.loading = false;
      });

  }
  //<-----getting recent transactions of selecting appliaction number (ended)---->

  //<-----getting loan details of selecting appliaction number (started)---->
  loanDetails() {
    console.log("loanDetails");

    this.loading = true;
    this._loaanreceiptServie.getLoanDeatilsInReceiptform(this.loanreceiptAppliactionId).subscribe((data: any) => {
      this.loading = false;
      this.dataOfLoan = data;
      if (this.pLoantype == data[0].pLoantype) {
        for (let i = 0; i < this.dataOfLoan.length; i++) {
          this.pApprovedamount = this.dataOfLoan[i].pApprovedamount;
          this.pDateofapplication = this._commonService.formatDateFromDDMMYYYY(this.dataOfLoan[i].pDateofapplication);
          this.pLoantypeloandetails = this.dataOfLoan[i].pLoantype;
          this.pPurposeofloan = this.dataOfLoan[i].pPurposeofloan;
          this.pAmountrequested = this.dataOfLoan[i].pAmountrequested;
          this.pTenureofloan = this.dataOfLoan[i].pTenureofloan;
          this.pRateofinterest = this.dataOfLoan[i].pRateofinterest;
          this.pLoanpayin = this.dataOfLoan[i].pLoanpayin;
          this.pInteresttype = this.dataOfLoan[i].pInteresttype;
          this.pEmiAmount = this.dataOfLoan[i].pEmiAmount;
          this.pLoanstatus = this.dataOfLoan[i].pLoanstatus;
          this.setDateConfig();
        }
      }
    },
      (error) => {
        this.loading = false;
      });
  }
  //<-----getting loan details of selecting appliaction number (ended)---->

  //<-----getting view particulars of selecting appliaction number (started)---->
  ViewParticulars() {
    this.loading = true;
    this._loaanreceiptServie.getInstallmentsViewById(this.loanreceiptAppliactionId, this.datePipe.transform(this.applicationdate, 'dd-MMM-yyyy').toString(), 'ASON').subscribe((data: any) => {
      this.loading = false;
      this.viewParticularsdataForcalcu = data;
      this.totalinstalldue = 0;
      this.totalpenality = 0;
      for (let index = 0; index < data.length; index++) {
        this.totalinstalldue = this.totalinstalldue + Number(data[index].pInstalmentdue);
        this.totalpenality = this.totalpenality + Number(data[index].pPenaltyreceivable);
      }
      this.totalpenality = Number(this.totalpenality.toFixed(2));
      this.penalityZeros = false;
      for (let index = 0; index < data.length; index++) {
        if (data[index].pPenaltyreceivable > 0) {
          this.penalityZeros = true;
          break
        }
      }
      for (let index = 0; index < data.length; index++) {
        data[index].pInstalmentamount = (Math.round(data[index].pInstalmentamount * 100) / 100).toFixed(2);
        data[index].pInstalmentdate = data[index].pInstalmentdate;
        data[index].pPrinciplereceivable = this._commonService.currencyformat(data[index].pPrinciplereceivable);
        data[index].pIntrestreceivable = this._commonService.currencyformat(data[index].pIntrestreceivable);
        data[index].pInstalmentdue = (Math.round(data[index].pInstalmentdue * 100) / 100).toFixed(2);
        data[index].pPenaltyreceivable = (Math.round(data[index].pPenaltyreceivable * 100) / 100).toFixed(2);
        data[index].pBalance = this._commonService.currencyformat(data[index].pBalance);
        data[index].pAmountadusted = (Math.round(data[index].pAmountadusted * 100) / 100).toFixed(2);
      };
      this.instalmentsView = data.filter(function (data) { return data["pParticularsname"] == "INSTALLMENT RECEIVABLE"; });
      this.PenalityView = data.filter(function (data) { return data["pParticularsname"] == "PENALTY RECEIVABLE"; });
    }, (error) => {
      this.loading = false;
    });
  }
  //<-----getting view particulars of selecting appliaction number (ended)---->

  //<-----after changed date geting called all api's for appliaction id (started)---->
  dateChnage(event) {
    if (event && this.loanreceiptAppliactionId) {
      this.applicationdate = event;
      this.totalinstalldue = 0;
      this.getParticulars();
      this.ViewParticulars();
    }
  }
  //<-----after changed date geting called all api's for appliaction id (ended)---->

  //<-----after changed appliaction id geting called all api's for appliaction id (started)---->
  changeLoanApplicationId() {
    this.resetData();
    this.disabledforButtons = false;
    this.BlurEventAllControll(this.receiptForm);
    this.getParticulars();
    this.loanDetails();
    this.recenttransaction();
    this.ViewParticulars();
    for (let i = 0; i < this.loandetailsOfApplicationid.length; i++) {
      if (this.loandetailsOfApplicationid[i].pVchapplicationid == this.loanreceiptAppliactionId) {
        this.pApplicantname = this.loandetailsOfApplicationid[i].pApplicantname;
        this.pLoanname = this.loandetailsOfApplicationid[i].pLoanname;
      }
    }
    for (let i = 0; i < this.LoanNames.length; i++) {
      if (this.LoanNames[i].pVchapplicationid == this.loanreceiptAppliactionId) {
        this.pSubledgerid = this.LoanNames[i].pAccountid;
        this.pContactid = this.LoanNames[i].pContactid;
        this.pConid = this.LoanNames[i].pConid;
        this.pContacttype = this.LoanNames[i].pContacttype;
      }
    }

  }
  //<-----after changed appliaction id geting called all api's for appliaction id (ended)---->

  //<-----getting particulars of selecting appliaction number (started)---->
  getParticulars() {
    this.loading = true;
    this._loaanreceiptServie.getParticularsById(this.loanreceiptAppliactionId, this.datePipe.transform(this.applicationdate, 'dd-MMM-yyyy').toString(), this.pFormname).subscribe((data: any) => {
      this.loading = false;
      this.getparticularsdata = data;    
      console.log(this.getparticularsdata.length,"kkkkk");
        
      if (data) {
        this.dataOfParticulars = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {
            pGsttype: data[i].pGsttype,
            pGstcaltype: data[i].pGstcaltype,
            pGstpercentage: data[i].pGstpercentage,
            pParticularstype: data[i].pParticularstype,
            pParticularsname: data[i].pParticularsname,
            pAmount: data[i].pAmount,
            waiver: null,
            receipt: null,
            balane: null
          }
          if (data[i].pParticularsname == 'INSTALMENT AMOUNT') {
            this.amount = data[i].pAmount
            this.pPrinciplereceivable = data[i].pPrinciplereceivable;
            this.pIntrestreceivable = data[i].pIntrestreceivable;
            this.installmentDues = data[i].pInstalmentdues;
            this.installmentDate = data[i].pLastreceiptdate;
            this.installmentAmount = data[i].pEmiamount;
            this.lastreceiptAmount = data[i].pLastreceiptamount;
          }
          this.dataOfParticulars.push(Object.assign(obj))

          if (this.dataOfParticulars[i].pParticularstype == 'CHARGES') {
            this.chargesForKendo = true;
          }
          this.calAmt(event, i, true);
        }
      }
      this.grandTotal();
    }, (error) => {
      this.loading = false;
    });
  }
  //<-----getting particulars of selecting appliaction number (ended)---->

  public gettypeofpaymentdata(): any {
    let data = this.modeoftransactionslist.filter(function (payment) {
      return payment.ptranstype != payment.ptypeofpayment;
    });
    return data;
  }

  //<----Getting charge names(dropdown) (started)---->
  chargeNamesData() {
    this._ChargemasterService.getChargeNames('ACTIVE').subscribe(json => {
      this.chargesAndFees = json
      if (this.addedChargesNames.length > 0) {
        for (let j = 0; j < this.addedChargesNames.length; j++) {
          for (let i = 0; i < this.chargesAndFees.length; i++) {
            if (this.addedChargesNames[j] == this.chargesAndFees[i].pChargename) {
              this.chargesAndFees.splice(i, 1);
            }
          }
        }
      }
      else {
        this.chargesAndFees = json;
      }
    });
  }
  //<----Getting charge names(dropdown) (ended)---->

  //<----calculating grand totals of data of particulars (started)------>
  grandTotal() {
    this.grandTotalAmountDue = 0;
    this.grandTotalAmountWavier = 0;
    this.grandTotalAmountReceipt = 0;
    this.grandTotalAmountbalance = 0;
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      this.grandTotalAmountDue = Number(this.grandTotalAmountDue) + (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0);
      this.grandTotalAmountDue = Number(this.grandTotalAmountDue.toFixed(2));
    }
    if (this.enteredAmount && this.pChargename && this.noaddbuttonforcharges) {
      this.grandTotalAmountDue = (this.grandTotalAmountDue ? Number((this.grandTotalAmountDue.toString()).replace(/,/g, "")) : 0) + (this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0);
      this.grandTotalAmountDue = Number(this.grandTotalAmountDue.toFixed(2))
    }
    this.grandTotalAmountDue = Number(this.grandTotalAmountDue.toFixed(2))
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      this.grandTotalAmountWavier = (this.grandTotalAmountWavier ? Number((this.grandTotalAmountWavier.toString()).replace(/,/g, "")) : 0) + (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0);
    }
    this.grandTotalAmountWavier = Number(this.grandTotalAmountWavier.toFixed(2))
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      this.grandTotalAmountReceipt = (this.grandTotalAmountReceipt ? Number((this.grandTotalAmountReceipt.toString()).replace(/,/g, "")) : 0) + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
    }
    if (this.enteredAmount && this.pChargename && this.noaddbuttonforcharges) {
      this.grandTotalAmountReceipt = (this.grandTotalAmountReceipt ? Number((this.grandTotalAmountReceipt.toString()).replace(/,/g, "")) : 0) + (this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0);
    }
    this.grandTotalAmountReceipt = Number(this.grandTotalAmountReceipt.toFixed(2))
    this.forReceiptValidarion = this.grandTotalAmountReceipt;
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      this.grandTotalAmountbalance = Number(this.grandTotalAmountbalance) + (this.dataOfParticulars[i].balance ? Number((this.dataOfParticulars[i].balance.toString()).replace(/,/g, "")) : 0);
      this.grandTotalAmountbalance = Number(this.grandTotalAmountbalance.toFixed(2))
    }
  }
  //<----calculating grand totals of data of particulars (ended)------>

  //<----calculating amount's fields of  data of particulars (started)------>
  calAmt(event, i, amountType) {
    this.penalityorcharges = 0;
    this.emiAmount = 0;

    this.advance = 0;
    this.forcheckingviewer = 0;
    this.forcheckingreceipt = 0;
    if (this.dataOfParticulars[i].pParticularsname == 'INSTALMENT AMOUNT') {
      if (this.dataOfParticulars[i].pParticularsname == 'INSTALMENT AMOUNT' && ((this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0) >= (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0))) {
        this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        this.dataOfParticulars[i].balance = Number(this.dataOfParticulars[i].balance.toFixed(2));
        this.emiAmount = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0);
        this.fixedemiAmount = this.emiAmount;
        this.advance = (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0);
        this.fixedAdvance = this.advance;
      }
      else {
        this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        this.dataOfParticulars[i].balance = Number(this.dataOfParticulars[i].balance.toFixed(2));
        this.advance = 0;
        this.fixedAdvance = this.advance;
        this.emiAmount = this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0;
        this.fixedemiAmount = this.emiAmount
      }
    }
    if ((this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0) == 0 && (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0)) {
      if ((this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) < (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0)) {
        this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
          this.dataOfParticulars[i].balance = this.dataOfParticulars[i].pAmount;
          this._commonService.showWarningMessage(this.dataOfParticulars[i].pParticularsname + " Amount Received should not be greater than Balance Due");
          this.dataOfParticulars[i].receipt = '';
        }
        this.emiAmount = this.fixedemiAmount;
        this.advance = this.fixedAdvance;
      }
      else {
        this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        this.dataOfParticulars[i].balance = Number(this.dataOfParticulars[i].balance.toFixed(2));
        this.emiAmount = this.fixedemiAmount;
        this.advance = this.fixedAdvance;
      }
    }
    if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
      if ((this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0)
        && (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0)) {
        if ((this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) >= (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0)) {
          this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0);
          this.dataOfParticulars[i].balance = Number(this.dataOfParticulars[i].balance.toFixed(2));
          this.emiAmount = this.fixedemiAmount;
          this.advance = this.fixedAdvance;
        }

        else {
          this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
          this._commonService.showWarningMessage(this.dataOfParticulars[i].pParticularsname + ' Waiver amount should not be greater than Amount Due');
          this.dataOfParticulars[i].waiver = '';
        }
        this.dataOfParticulars[i].balance = Number(this.dataOfParticulars[i].balance.toFixed(2));
      }
    }
    if ((this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0) &&
      (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0)
      && (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0)) {
      if ((this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0) <= (this.dataOfParticulars[i].balance ? Number((this.dataOfParticulars[i].balance.toString()).replace(/,/g, "")) : 0)) {
        this.dataOfParticulars[i].balance = (Number((this.dataOfParticulars[i].balance ? Number((this.dataOfParticulars[i].balance.toString()).replace(/,/g, "")) : 0).toFixed(2))) - (Number((this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0).toFixed(2)));
        this.dataOfParticulars[i].balance = Number(this.dataOfParticulars[i].balance.toFixed(2));
        if (this.dataOfParticulars[i].pParticularsname == 'INSTALMENT AMOUNT') {
          this.emiAmount = Number(this.dataOfParticulars[i].receipt);
          this.emiAmount = this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0;
          this.fixedemiAmount = this.emiAmount;
          this.advance = this.fixedAdvance;
        }
      }
      else {
        if (this.dataOfParticulars[i].pParticularsname == 'INSTALMENT AMOUNT') {
          this.dataOfParticulars[i].balance = 0;
          this.emiAmount = Number(this.dataOfParticulars[i].pAmount);
          this.emiAmount = this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0;
          this.fixedemiAmount = this.emiAmount;
          this.advance = this.fixedAdvance;
        }
        if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
          if (amountType == 'waiver') {
            if ((event.target.value ? Number(((event.target.value).toString()).replace(/,/g, "")) : 0) > ((this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0))) {
              this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
              console.log("this.emiAmount waiver", this.dataOfParticulars[i].balance);
              this._commonService.showWarningMessage(this.dataOfParticulars[i].pParticularsname + ' Waiver Amount should not be greater than Amount Due');
              this.dataOfParticulars[i].waiver = '';
            }
          }

          if (amountType == 'receipt') {
            if ((event.target.value ? Number(((event.target.value).toString()).replace(/,/g, "")) : 0) > ((this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0))) {
              this.dataOfParticulars[i].balance = (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0) - (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0);
              console.log("this.emiAmount receipt", this.dataOfParticulars[i].balance);
              this._commonService.showWarningMessage(this.dataOfParticulars[i].pParticularsname + ' Amount Received should not be greater than Balnace Due');
              this.dataOfParticulars[i].receipt = '';
            }
          }
        }
      }
    }
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
        this.penalityorcharges = Number(this.penalityorcharges) + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        this.advance = this.fixedAdvance;
        this.emiAmount = this.fixedemiAmount;
      }
    }
    if (this.enteredAmount && this.pChargename) {
      this.penalityorcharges = (this.penalityorcharges ? Number((this.penalityorcharges.toString()).replace(/,/g, "")) : 0) + (this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0);
    }
    if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
      if ((this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0) == 0 &&
        (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0) == 0) {
        this.dataOfParticulars[i].balance = this.dataOfParticulars[i].pAmount;
        this.advance = this.fixedAdvance;
        this.emiAmount = this.fixedemiAmount;


      }
    }
    this.grandTotal();
    this.receivedAmountcal();
  }
  //<----calculating grand totals of data of particulars (ended)------>
  //<----error message functions (started)---->
  showErrorMessage(errormsg: string) {
    this._commonService.showErrorMessage(errormsg);
  }
  showInfoMessage(errormsg: string) {
    this._commonService.showInfoMessage(errormsg);
  }
  //<----error message functions (ended)---->

  //<----function for selecting single charge (started)---->
  singleCharges(event) {
    this.enteredReceipt = this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0;
    if (this.enteredAmount && this.pChargename && this.noaddbuttonforcharges) {
      this.penalityorcharges = 0;
      this.penalityorcharges = (this.penalityorcharges ? Number((this.penalityorcharges.toString()).replace(/,/g, "")) : 0) + (this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0);
      for (let i = 0; i < this.dataOfParticulars.length; i++) {
        if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
          this.penalityorcharges = Number(this.penalityorcharges) + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        }
      }
      this.penalityorcharges = Number(this.penalityorcharges.toFixed(2));
    }
    else{
      this.penalityorcharges = 0;
      for (let i = 0; i < this.dataOfParticulars.length; i++) {
        if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
          this.penalityorcharges = Number(this.penalityorcharges) + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        }
      }
    }
    if (this.enteredAmount && this.pChargename && this.noaddbuttonforcharges) {
      this.chargesReceived = this.chargesReceived + this.enteredReceipt;
      this.chargesReceivble = this.chargesReceivble + this.enteredReceipt;
    }
    this.grandTotal();
  }
  //<----function for selecting single charge (ended)---->

  //<-----adding cherges to grid(data of particulars) (started)---->
  add(event) {
    this.noaddbuttonforcharges = false;
    this.penalityorcharges = 0;
    if (this.dataOfParticulars && this.dataOfParticulars.length > 0) {
      for (let i = 0; i < this.dataOfParticulars.length; i++) {
        if (this.pChargename == this.dataOfParticulars[i].pParticularsname) {
          this.addCharge = false;
          break;
        }
        else {
          this.addCharge = true;
        }
      }
    }
    else {
      this.addCharge = true;
    }
    if (this.pChargename && (this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0) != 0) {
      if (this.addCharge) {
        this.balance = 0;
        this.dataOfParticulars.push({
          pParticularstype: "CHARGES",
          pParticularsname: this.pChargename,
          pAmount: this.enteredAmount ? Number((this.enteredAmount.toString()).replace(/,/g, "")) : 0,
          waiver: 0,
          chargesAdded: true,
          receipt: this.enteredReceipt,
          deleteCharge: true,
          balance: 0
        })
        for (let i = 0; i < this.dataOfParticulars.length; i++) {
          if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
            this.penalityorcharges = Number(this.penalityorcharges) + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
          }
        }
        this.penalityorcharges = Number(this.penalityorcharges.toFixed(2));
        this.addedChargesNames.push(this.pChargename);
        this.pChargename = null;
        this.enteredAmount = null;
        this.enteredWaiver = null;
        this.enteredReceipt = null;
        this.valueOfBalnceDueOfCharge = null;
        this.chargeNamesData();
      }
      else {
        this._commonService.showWarningMessage('Charge name isalready exist');
        this.pChargename = null;
        this.enteredAmount = null;
        this.enteredWaiver = null;
        this.enteredReceipt = null;
        this.valueOfBalnceDueOfCharge = null;
      }
      this.grandTotal();
    }
    else {
      this._commonService.showWarningMessage('Charge name is mandatory/should not be zero');
    }
    this.receivedAmountcal();
  }
  //<-----adding cherges to grid(data of particulars) (ended)---->

  //<-----calculate charges and penality amount's from (data of particulars) (started)---->
  receivedAmountcal() {
    this.chargesReceivble = 0;
    this.penalityReceivble = 0;
    this.chargesReceived = 0;
    this.penalityReceived = 0;
    this.penalitywaived = 0;
    this.chargeswaived = 0;
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      if (this.dataOfParticulars[i].pParticularstype == 'CHARGES') {
        this.chargesReceivble = this.chargesReceivble + (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0);
        this.chargesReceived = this.chargesReceived + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        this.chargeswaived = this.chargeswaived + (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0);
      }
      if (this.dataOfParticulars[i].pParticularstype == 'PENAL INTEREST') {
        this.penalityReceivble = this.penalityReceivble + (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0);
        this.penalityReceived = this.penalityReceived + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
        this.penalitywaived = this.penalitywaived + (this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0);
      }
    }
  }
  //<-----calculate charges and penality amount's from (data of particulars) (ended)---->

  //<-----deleting cherges to grid(data of particulars) (started)---->
  deletecharge(index) {
    this.penalityorcharges = 0;
    for (let j = 0; j < this.addedChargesNames.length; j++) {
      if (this.dataOfParticulars[index].pParticularsname == this.addedChargesNames[j]) {
        this.addedChargesNames.splice(this.addedChargesNames.indexOf(this.dataOfParticulars[index].pParticularsname), 1);
      }
    }
    this.dataOfParticulars.splice(index, 1);
    this.chargeNamesData();
    this.grandTotal();
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      if (this.dataOfParticulars[i].pParticularsname != 'INSTALMENT AMOUNT') {
        this.penalityorcharges = Number(this.penalityorcharges) + (this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0);
      }
      if (this.addedChargesNames.length <= 0) {
        this.noaddbuttonforcharges = true;
      }
    }
  }
  //<-----deleting cherges to grid(data of particulars) (ended)---->

  //<-----validation for narration---->
  forNarration(event) {
    if (event.target.value == '') {
      this.forNarrationErrorValid = false;
    }
    else {
      this.forNarrationErrorValid = true;
    }
  }
  //<-----saving data to api(started)---->
  saveLoanReceipt() {
    this.zeroReceipt = []
    let isvalid = true;
    this.forNarrationError = true;
    let formatDate = 'dd-MM-yyyy';
    for (let i = 0; i < this.dataOfParticulars.length; i++) {
      if (((this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0) > 0) ||
        ((this.dataOfParticulars[i].waiver ? Number((this.dataOfParticulars[i].waiver.toString()).replace(/,/g, "")) : 0) == (this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0))) {
      }
      else {
        this.zeroReceipt.push(this.dataOfParticulars[i].pParticularsname);
      }
    }
    if (this.checkValidations(this.receiptForm, isvalid) && this.checkValidations(this.loandropForm, isvalid) && this.forNarrationErrorValid) {
      this.modeOfData = this.receiptForm.value;
      let lstSaveEmireceiptdetails = [];
      let emiReceipt = null;
      let noaddemireceipt = {
        pGsttype: null,
        pGstcaltype: null,
        pGstpercentage: 0,
        pParticularstype: "CHARGES",
        pParticularname: this.pChargename,
        pDetailsreceivabledate: new Date(this.receiptForm.value.pDattransdate),
        pDetailsreceivableamount: this.enteredAmount,
        pWaiveoffamount: 0,
        pDetailsreceivedamount: this.enteredAmount,
        pRefjvno: null,
      }
      if (this.noaddbuttonforcharges && this.pChargename && this.enteredAmount) {
        lstSaveEmireceiptdetails.push(noaddemireceipt)
      }
      for (let i = 0; i < this.dataOfParticulars.length; i++) {
        if (this.zeroReceipt && this.zeroReceipt.length > 0) {
          for (let j = 0; j < this.zeroReceipt.length; j++) {
            if (this.zeroReceipt[j] != this.dataOfParticulars[i].pParticularsname) {
              emiReceipt = {
                pGsttype: this.dataOfParticulars[i].pGsttype ? this.dataOfParticulars[i].pGsttype : null,
                pGstcaltype: this.dataOfParticulars[i].pGstcaltype ? this.dataOfParticulars[i].pGstcaltype : null,
                pGstpercentage: this.dataOfParticulars[i].pGstpercentage ? this.dataOfParticulars[i].pGstpercentage : 0,
                pParticularstype: this.dataOfParticulars[i].pParticularstype,
                pParticularname: this.dataOfParticulars[i].pParticularsname,
                pDetailsreceivabledate: new Date(this.receiptForm.value.pDattransdate),
                pDetailsreceivableamount: this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0,
                pWaiveoffamount: this.dataOfParticulars[i].waiver ? this.dataOfParticulars[i].waiver : 0,
                pDetailsreceivedamount: this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0,
                pRefjvno: null,
              }
              lstSaveEmireceiptdetails.push(emiReceipt)
            }
          }
        }
        else {
          emiReceipt = {
            pGsttype: this.dataOfParticulars[i].pGsttype ? this.dataOfParticulars[i].pGsttype : null,
            pGstcaltype: this.dataOfParticulars[i].pGstcaltype ? this.dataOfParticulars[i].pGstcaltype : null,
            pGstpercentage: this.dataOfParticulars[i].pGstpercentage ? this.dataOfParticulars[i].pGstpercentage : 0,
            pParticularstype: this.dataOfParticulars[i].pParticularstype,
            pParticularname: this.dataOfParticulars[i].pParticularsname,
            pDetailsreceivabledate: new Date(this.receiptForm.value.pDattransdate),
            pDetailsreceivableamount: this.dataOfParticulars[i].pAmount ? Number((this.dataOfParticulars[i].pAmount.toString()).replace(/,/g, "")) : 0,
            pWaiveoffamount: this.dataOfParticulars[i].waiver ? this.dataOfParticulars[i].waiver : 0,
            pDetailsreceivedamount: this.dataOfParticulars[i].receipt ? Number((this.dataOfParticulars[i].receipt.toString()).replace(/,/g, "")) : 0,
            pRefjvno: null,
          }
          lstSaveEmireceiptdetails.push(emiReceipt)
        }
      }
      let data = {
        createdby: this._commonService.pCreatedby,
        modifiedby: 0,
        pEmiid: 0,
        pSubledgerid: this.pSubledgerid,
        pLoanno: this.pLoanid,
        pContactid: this.pContactid,
        pLoanname: this.pLoanname,
        pApplicantname: this.pApplicantname,
        pConid: this.pConid,
        pContacttype: this.pContacttype,
        pApplicationid: Number(this.pApplicationid),
        pVchapplicationid: this.loanreceiptAppliactionId,
        pReceiptdate: new Date(this.receiptForm.value.pDattransdate),
        pPrincipalreceivable: this.pPrinciplereceivable ? this.pPrinciplereceivable : 0,
        pInterestreceivable: this.pIntrestreceivable ? this.pIntrestreceivable : 0,
        pInstalmentreceivable: this.amount ? this.amount : 0,
        pPenaltyreceivable: this.penalityReceivble ? Number((this.penalityReceivble.toString()).replace(/,/g, "")) : 0,
        pChargesreceived: this.chargesReceived ? Number((this.chargesReceived.toString()).replace(/,/g, "")) : 0,
        pPenaltywaiveoffamount: this.penalitywaived ? Number((this.penalitywaived.toString()).replace(/,/g, "")) : 0,
        pChargeswaiveoffamount: this.chargeswaived ? Number((this.chargeswaived.toString()).replace(/,/g, "")) : 0,
        pLoanadvanceamount: this.advance,
        pTotalreceived: this.grandTotalAmountReceipt ? Number((this.grandTotalAmountReceipt.toString()).replace(/,/g, "")) : 0,
        pModeofreceipt: this.Modeofpayment ? this.Modeofpayment : "CASH",
        pBank: this.receiptForm.value.pbankname,
        pBankid: 0,
        pDeposibankid: this.receiptForm.value.pdepositbankid ? this.receiptForm.value.pdepositbankid : 0,
        pTranstype: this.receiptForm.value.ptranstype,
        pBranch: this.receiptForm.value.pbranchname,
        pChequeno: this.receiptForm.value.pChequenumber,
        pTransdate: new Date(this.receiptForm.value.pchequedate),
        pChrclearstatus: null,
        pNarration: this.narration,
        pTypeofpaymentonline: this.receiptForm.value.ptypeofpayment ? this.receiptForm.value.ptypeofpayment : "CASH",
        pUpiid: null,
        pVchcardissuebank: this.receiptForm.value.pbankname,
        pVchcardnumber: this.receiptForm.value.pCardNumber,
        pVchcardtype: null,
        pVchcardholdername: null,
        pCreatedby: this._commonService.pCreatedby,
        pModifiedby: 0,
        pStatusname: this._commonService.pStatusname,
        ptypeofoperation: this._commonService.ptypeofoperation,
        pDattransdate: new Date(this.receiptForm.value.pDattransdate),
        pChargesreceivable: this.chargesReceivble ? Number((this.chargesReceivble.toString()).replace(/,/g, "")) : 0,
        pPrinciplereceived: 0,
        pIntrestreceived: 0,
        pInstallmentreceived: this.emiAmount ? Number((this.emiAmount.toString()).replace(/,/g, "")) : 0,
        pPenaltyreceived: this.penalityReceived ? Number((this.penalityReceived.toString()).replace(/,/g, "")) : 0,
        lstSaveEmireceiptdetails: lstSaveEmireceiptdetails,
        pParticularstype: this.pParticularstype,
        pFormname:this.pFormname

      }
      if (this.receiptForm.value.pmodofreceipt == 'BANK') {
        if (this.receiptForm.value.ptypeofpayment == 'Cheque') {
          data.pChrclearstatus = "N";
          data.pTransdate = new Date(this.receiptForm.value.pchequedate);
        }
        else {
          data.pChrclearstatus = "P";
          if(this.receiptForm.value.ptypeofpayment == 'Credit Card'|| this.receiptForm.value.ptypeofpayment == 'Debit Card' ){
            data.pTransdate =  new Date(this.receiptForm.value.pDattransdate)
          }
        }
      }
      else {
        data.pChrclearstatus = "Y"
      }
      if (Number((this.forReceiptValidarion.toString()).replace(/,/g, "")) > 0) {
        this.buttonName = "Processing";
        this.isLoading = true;
        this._loaanreceiptServie.saveLoanReceiptData(data).subscribe((data: any) => {
          if (data) {
            this.forNarrationErrorValid = false;
            this.buttonName = "Save";
            this.isLoading = false;
            this.forNarrationError = false;
            this.noaddbuttonforcharges = true;
            this.showInfoMessage("Saved Successfully");
            this.clearData();
            this.loandropForm = this.formbuilder.group({
              loanname: ['', Validators.required],
              loanapplication: ['', Validators.required]
            })
            this.refreshloanDataForSelectApplicant();
            this.LoanNames = [];
            this.instalmentsView = null;
            this.PenalityView = null;
            this.receiptForm.value.loanapplication = '';
            $("#" + this.dynamicLoanapplicationId).data("kendoMultiColumnComboBox").dataSource = [];
            let receipt = btoa(data.pReceiptId + ',' + 'Receipt Voucher');
            window.open('/#/GeneralReceiptReports?id=' + receipt);
            this.ngOnInit();
          }
          else {
            this.buttonName = "Save";
            this.isLoading = false;
          }
        },
          (error) => {
            this.buttonName = "Save";
            this.isLoading = false;
            this.forNarrationError = false;

            // this.showErrorMessage(error);
          });
      }
      else {
        this._commonService.showWarningMessage("Receipt amount should not be empty");

      }

    }
    else {
      this._commonService.showWarningMessage("Please enter details");
    }

  }
  //<-----saving data to api(ended)---->

  BankNameChange() {
    this.GetValidationByControl(this.receiptForm, 'pbankname', true);
  }
  ChequeNoChange() {
    this.GetValidationByControl(this.receiptForm, 'pChequenumber', true);
  }
  ChequeDateChange() {
    this.GetValidationByControl(this.receiptForm, 'pchequedate', true);
  }
  CardNoChange() {
    this.GetValidationByControl(this.receiptForm, 'pCardNumber', true);
  }
  openModal() {
    $('#Installment').modal('show')
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  //<----clear the data (started)---->
  clearData() {
    this.bankshowhide = false;
    this.noaddbuttonforcharges = true;
    this.receiptForm.controls.pmodofreceipt.setValue('CASH');

    this.loanreceiptAppliactionId = null;
    this.resetData();
    this.refreshloanDataForSelectApplicant();
    this.loandropForm = this.formbuilder.group({
      loanname: ['', Validators.required],
      loanapplication: ['', Validators.required]
    })
    this.BlurEventAllControll(this.loandropForm)
    this.receiptForm = this.formbuilder.group({
      pmodofreceipt: ['CASH'],
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
      pdepositbankname: [''],
      pRecordid: [0],
      pUpiname: [''],
      pUpiid: [''],

    });
    this.Paymenttype('CASH');
    this.BlurEventAllControll(this.receiptForm);
  }
  //<----clear the data (started)---->

  //<----reset the data (started)---->
  resetData() {
    this.getparticularsdata = [];
    this.dates = [];
    this.addedChargesNames = [];
    this.chargeNamesData();
    this.chargesReceivble = 0;
    this.penalityReceivble = 0;
    this.chargesReceived = 0;
    this.penalityReceived = 0;
    this.penalitywaived = 0;
    this.chargeswaived = 0;
    this.disabledforButtons = true;
    this.lastTransactionDate = null;
    this.dpConfig2.minDate = new Date();
    this.pChargename = null;
    this.enteredAmount = null;
    this.enteredWaiver = null;
    this.enteredReceipt = null;
    this.valueOfBalnceDueOfCharge = null;
    this.Gsttype = null;
    this.Gstcaltype = null;
    this.Gstpercentagetype = null;
    this.pPrincipal = 0;
    this.pInterest = 0;
    this.instalmentsView = [];
    this.transactions = [];
    this.dataOfParticulars = [];
    this.grandTotalAmountDue = 0;
    this.grandTotalAmountWavier = 0;
    this.grandTotalAmountReceipt = 0;
    this.grandTotalAmountbalance = 0;
    this.penalityorcharges = 0;
    this.emiAmount = 0;
    this.advance = 0;
    this.narration = null;
    this.installmentAmount = 0;
    this.installmentDate = null;
    this.installmentDues = 0;
    this.lastreceiptAmount = 0;
    this.totalinstalldue = 0;
    this.totalpenality = 0;
    this.pApprovedamount = 0;
    this.pApplicantname = null;
    this.pDateofapplication = null;
    this.pLoantypeloandetails = null;
    this.pLoanname = null;
    this.pPurposeofloan = null;
    this.pAmountrequested = null;
    this.pTenureofloan = null;
    this.pRateofinterest = null;
    this.pLoanpayin = null;
    this.pInteresttype = null;
    this.pEmiAmount = null;
  }
  //<----reset the data (ended)---->

  emiChart() {
    window.open('/#/EmiChartReport?id=' + btoa(this.loanreceiptAppliactionId));
  }

  //<----change the negative amount to positive(started)---->
  changeToPositive(data) {
    if (data) {
      let enteredData = Number(data.toString().replace(/,/g, ""));
      if (enteredData < 0) {
        return ("(" + (Math.abs(enteredData).toFixed(2)) + ")");
      }
      else {
        return enteredData;
      }
    }
    else {
      return 0;
    }
  }
  //<----change the negative amount to positive(ended)---->

  //<-----set min date based on requirement (started)---->
  setDateConfig() {
    if (this.pDateofapplication) {
      this.dpConfig.minDate = this.pDateofapplication;
      this.receiptForm.patchValue({
        pchequedate: new Date()
      })
    }
    if (this.lastTransactionDate) {
      this.dpConfig2.minDate = this.lastTransactionDate;
      this.receiptForm.patchValue({
        pDattransdate: new Date()
      })
      this.BlurEventAllControll(this.receiptForm);
      this.formValidationMessages.pDattransdate = '';
    }
    else {
      this.dpConfig2.minDate = this.pDateofapplication;
      this.receiptForm.patchValue({
        pDattransdate: new Date()
      })
      this.BlurEventAllControll(this.receiptForm);
      this.formValidationMessages.pDattransdate = '';
    }
  }
  //<-----set min date based on requirement (ended)---->

  selectCharge(event) {
    this.enteredAmount = null;
    this.enteredReceipt = null;
    this.penalityorcharges = 0;

  }
}

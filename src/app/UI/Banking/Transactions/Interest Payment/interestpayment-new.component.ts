import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../../Services/common.service';
import { ToastrService } from 'ngx-toastr';

import { debug } from 'util';
import { DatePipe, JsonPipe } from '@angular/common';
import { LienEntryService } from '../../../../Services/Banking/lien-entry.service';
import { Router } from '@angular/router';
import { AccountingTransactionsService } from '../../../../Services/Accounting/accounting-transactions.service';
import { RowArgs } from '@progress/kendo-angular-grid';



@Component({
  selector: 'app-interestpayment-new',
  templateUrl: './interestpayment-new.component.html',
  styles: []
})

export class InterestpaymentNewComponent implements OnInit {
    InterestPaymentForm: FormGroup;   
    showCheque: any;
    monthof: any;
    clickedRowItem: any;
    public total: number = 0;    
    public today: Date = new Date();
    paymenttype = 'SELF';
    schemeid: any;
    companyname: any;
    branchname: any;
    typevalue: any;
    showOnline: any;
    showdebitcard: any;
    showupi: any;
    showCompany: any;
    chequenumberslist: any;
    formValidationMessages: any;
    upinameslist: any;
    upiidlist: any;
    intrestpaymentlist: any;
    disablesavebutton = false;
    savebutton = "Save";
    public allSelectedModels:any=[]
    public SchemeDetails: any=[]
    public BranchDetails: any=[]
    public CompanyDetails: any = []
    public Showmembers: any = []
    public banklist: any[]
    public banklist1:any[]
    public debitcardlist: any[]
    public typeofpaymentlist: any[]
    InterestPaymentErrors: any
    intrestpaymentlistcolumnwiselist: any = []
    modeoftransactionslist: any;
    JSONdataItem: any = [];
    pintrestpaymentlist: any = [];
    public bankBalance: number = 0;
    public cashBalance: number = 0;
   
    public pageSize = 5;
    public skip = 0;
    public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    public interestpaymentdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    allRowsSelected: boolean;
    allStudentsSelected: boolean;


    
    constructor(private FB: FormBuilder, private _CommonService: CommonService, private _LienEntryService: LienEntryService, private datepipe: DatePipe, private _AccountingTransactionsService: AccountingTransactionsService, private router: Router, private toastr: ToastrService) 
  { 
        this.dpConfig.dateInputFormat = 'MM/YYYY'       
        this.dpConfig.maxDate = new Date();
        this.dpConfig.showWeekNumbers = false;

        this.interestpaymentdateConfig.dateInputFormat = "DD-MMM-YYYY";
        this.interestpaymentdateConfig.maxDate = new Date();
        this.interestpaymentdateConfig.showWeekNumbers = false;

        var allSelectedModels = [];

        
  }


    public onOpenCalendar(container) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }
  
    
  ngOnInit()
  {
      this.InterestPaymentForm = this.FB.group({
          ppaymentid: [''],
          pModeofreceipt: ['BANK'],
          ptranstype: ['CHEQUE'],
          padjustmenttype: ['SELF'],
          ppaymentdate: [''],
          ptotalpaidamount: [''],
          pCreatedby: [this._CommonService.pCreatedby],
         
          pnarration: ['', Validators.required],
          pbankid: ['', Validators.required],
          pbankname: [''],
          pbranchname: ['', Validators.required],
          pchequeno: ['',Validators.required],
          pbankidonline: ['', Validators.required],
          ptypeofpayment: ['', Validators.required],
          preferencenoonline: ['', Validators.required],
          pUpiname: ['', Validators.required],
          pUpiid: ['', Validators.required],
          pdebitcard: ['', Validators.required],
          pfinancialservice: ['', Validators.required],
          preferencenodcard: ['', Validators.required],
          pschemename: ['', Validators.required],
          pSchemeId: ['', Validators.required],

          pcompanyname: ['', Validators.required],
          pbranchnamemain: ['', Validators.required],
          pMonthOf: ['', Validators.required],
          pmodofPayment: [''],
         
          pIscheck: [''],
          pTotalpaymentamount: ['', Validators.required],
          pInterestpaymentDate: [this.today],
          pInterestpaymentid:[''],  
          pintrestpaymentlist: this.addpinterestpaymentsslistcontrols(),
          
      })
      this.showCheque = true;
      this.showOnline = false;
      this.showdebitcard = false;
      this.showCompany = false;
      //this.GetCompanydetails();     
      this.GetSchemedetails();
      this.getLoadData();
      this.IsFunctionRun();
      this.InterestPaymentErrors = {};
      this.intrestpaymentlistcolumnwiselist = {};
      this.BlurEventAllControll(this.InterestPaymentForm);


    }
       

    addpinterestpaymentsslistcontrols(): FormGroup {
        return this.FB.group({            
            pInterestpaymentid: [''],
            pMembername: [''],
            pFdaccountno: [''],
            pIntrestamount: [''],
            pTdsamount: [''],
            ptotalamount: [''],
            pdebitaccountid:[''],
            
        })
    }
    IsFunctionRun() {
        debugger;
        this._LienEntryService.RunInterestPaymentFunction().subscribe(json => {
          debugger;
            
        },
            (error) => {

                this._CommonService.showErrorMessage(error);
            });
    }
    getLoadData() {
        debugger;
        this._AccountingTransactionsService.GetReceiptsandPaymentsLoadingData('PAYMENT VOUCHER').subscribe(json => {
          debugger;
            //console.log(json)
            if (json != null) {

              console.log("cashbalance",json.cashbalance)
                this.banklist = json.banklist;
                this.banklist1 = json.banklist;
                this.modeoftransactionslist = json.modeofTransactionslist;
                this.debitcardlist = json.bankdebitcardslist;
              this.setBalances('BANK', json.bankbalance);
              this.setBalances('CASH', json.cashbalance);
                
                
            }
            this.typeofpaymentlist = this.gettypeofpaymentdata();
        },
            (error) => {

                this._CommonService.showErrorMessage(error);
            });
    }
    selectAllStudentsChange($event: any, dataItem, rowIndex) {
        debugger
        this.total = 0;
        if ($event.target.checked) {
            this.allStudentsSelected = true;
            for (let i = 0; i < this.Showmembers.length; i++) {
                this.Showmembers[i].add = true;
                this.total += (this.Showmembers[i].ptotalamount);
                //this.total += parseFloat(dataItem.ptotalamount);
                this.allSelectedModels.push(this.Showmembers[i]);
            }
        } else {
            this.allStudentsSelected = false;
            for (let i = 0; i < this.Showmembers.length; i++) {
                this.Showmembers[i].add = false;

                this.total = 0;
                this.allSelectedModels.splice(rowIndex, 1)
            }
        }
        this.InterestPaymentForm.controls.pTotalpaymentamount.setValue(this.total);

    }
  setBalances(balancetype, balanceamount) {
    debugger;
        let balancedetails;
        if (parseFloat(balanceamount) < 0) {
            balancedetails = this._CommonService.currencyformat(Math.abs(balanceamount)) + ' Cr';
        }
        else if (parseFloat(balanceamount) >= 0) {
            balancedetails = this._CommonService.currencyformat(balanceamount) + ' Dr';
        }
        if (balancetype == 'CASH')
            this.cashBalance = balancedetails;
        if (balancetype == 'BANK')
            this.bankBalance = balancedetails;
        
    }
   

   
   
    
    
    saveIntrestPayment() {
   
debugger;
        this.disablesavebutton = true;
        this.savebutton = 'Processing';
        let isValid = true;
        console.log(this.InterestPaymentForm.value)
        if (this.checkValidations(this.InterestPaymentForm, isValid)) {  
            let newdata = { pintrestpaymentlist:this.allSelectedModels };
            let Intrestpaymentdata = Object.assign(this.InterestPaymentForm.value, newdata);        
        let data = JSON.stringify(Intrestpaymentdata);
        debugger;
        this._LienEntryService.saveInterestPayment(data).subscribe(res => {
            debugger;
          if (res)
          {
                debugger
            console.log("result is", res['pvoucherid']);         
           this._CommonService.showInfoMessage("Saved Sucessfully")               
              window.open('/#/PaymentVoucherReports?id=' + btoa(res['pvoucherid'] + ',' + 'Payment Voucher'));
              this.clearInterestPayment();
              this.router.navigate(['/InterestpaymentView']);
                                    

                }

            },
                (error) => {
       
                    this._CommonService.showErrorMessage(error);
                    this.disablesavebutton = false;
                    this.savebutton = 'Save';
                });
        }
        else {
            this.disablesavebutton = false;
            this.savebutton = 'Save';
        }
    }   
    
    // Validation Methods ---------------
    checkValidations(group: FormGroup, isValid: boolean): boolean {
        debugger
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
                    this.InterestPaymentErrors[key] = '';
                    if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
                        let lablename;
                        lablename = (document.getElementById(key) as HTMLInputElement).title;
                        let errormessage;
                        for (const errorkey in formcontrol.errors) {
                            if (errorkey) {
                                errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                                this.InterestPaymentErrors[key] += errormessage + ' ';
                                isValid = false;
                            }
                        }
                    }
                }
            }
        }
        catch (e) {
            // this.showErrorMessage(e);
            // return false;
        }
        return isValid;
    }
    showErrorMessage(errormsg: string) {
        this._CommonService.showErrorMessage(errormsg);
    }
  BlurEventAllControll(fromgroup: FormGroup) {
    debugger;
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
            this.showErrorMessage(e);
            return false;
        }
    }
    // End Validation Methods --------------
            
    //---------Get Data wing---------------
    getBankBranchName(pbankid) {

        let data = this.banklist.filter(function (bank) {
            return bank.pbankid == pbankid;
        });
        this.InterestPaymentForm['controls']['pbranchname'].setValue(data[0].pbranchname);
    }
    GetBankDetailsbyId(pbankid) {
        debugger;
        this._AccountingTransactionsService.GetBankDetailsbyId(pbankid).subscribe(json => {
            debugger
            //console.log(json)
            //if (json != null) {
            console.log(json)
            this.upinameslist = json.bankupilist;
            this.chequenumberslist = json.chequeslist;

            //}
        },
            (error) => {

                this._CommonService.showErrorMessage(error);
            });
    }
    GetBranchDetailsIP($event: any) {
        debugger;
        this.companyname = $event.target.value;
        const typevalue = $event.target.value;
        this.intrestpaymentlist = [];
        this.Showmembers = [];
        this._LienEntryService.GetBranchDetailsIP(typevalue).subscribe(result => {
            debugger;
            this.BranchDetails = result;
        })
  }
  upiName_Change($event: any): void {

    debugger
    const districtid = $event.target.value;

    if (districtid && districtid != '') {
      const districtname = $event.target.options[$event.target.selectedIndex].text;
      let data1 = this.upinameslist.filter(x => x.pUpiname == districtname);
      this.upiidlist = data1;


    }
    else {
      this.upiidlist = [];
      this.InterestPaymentForm['controls']['pUpiid'].setValue('');
      //this.contactForm['controls']['pAddressControls']['controls']['pDistrict'].setValue('');
    }
    this.GetValidationByControl(this.InterestPaymentForm, 'pUpiname', true);
  }
  upid_change() {
    this.GetValidationByControl(this.InterestPaymentForm, 'pUpiid', true);

  }
    GetSchemedetails() {
        debugger;
        this._LienEntryService.GetSchemedetails().subscribe(result => {
            debugger;
            this.SchemeDetails = result;
            console.log(this.SchemeDetails)
        })
    }
    GetCompanydetails() {
        debugger;
        this._LienEntryService.GetCompanydetails().subscribe(result => {
            debugger;
            this.CompanyDetails = result;
            console.log(this.CompanyDetails)
        })
    }
    totalAmount: 0;
    clickselectforpayments($event: any, dataItem, rowIndex) {
        debugger;  
        
        if ($event.target.checked) {
            this.total += dataItem.ptotalamount;           
            
          this.allSelectedModels.push(dataItem);
            console.log(this.allSelectedModels)
        }
        else {
            if (this.total > parseFloat(dataItem.ptotalamount)) {
                this.total -= parseFloat(dataItem.ptotalamount);
            }
            else {
                this.total = parseFloat(dataItem.ptotalamount) - this.total;

            }

            this.allSelectedModels.splice(rowIndex, 1);
            console.log(this.allSelectedModels)

        }
        this.InterestPaymentForm.controls.pTotalpaymentamount.setValue(this.total);


    }
    GetShowmemberdetails() {
        debugger;
        let isValid = false;
        this.showbtnvalidation(this.paymenttype) 
            this.Showmembers.empty;
            debugger;
        this._LienEntryService.GetShowmemberdetails(this.schemeid, this.paymenttype, this.companyname, this.branchname, this.monthof).subscribe(result => {
                debugger;
                this.Showmembers = result;
                console.log(this.Showmembers)

            })

        
    }
    gettypeofpaymentdata(): any {
        debugger;
        let data = this.modeoftransactionslist.filter(function (payment) {
            return payment.ptranstype != payment.ptypeofpayment;
        });
        return data;
    } 
    //---------End Get DAta -------------


    ////---------Change Events wing
    //DebitCard_Change($event: any): void {
    //    debugger;
    //    const pbankid = $event.target.value;       
    //    if (pbankid && pbankid != '' && pbankid != 'Select') {
    //        const bankname = $event.target.options[$event.target.selectedIndex].text;           
    //        this.InterestPaymentForm['controls']['pbankname'].setValue(bankname);

    //    }
    //    else {

     
    //    }

        
    //}
    bankName_Change($event: any): void {
        debugger;
        const pbankid = $event.target.value;
        this.upinameslist = [];
        this.chequenumberslist = [];
        //this.InterestPaymentForm['controls']['pchequeno'].setValue('');
        //this.InterestPaymentForm['controls']['pUpiname'].setValue('');
        //this.InterestPaymentForm['controls']['pUpiid'].setValue('');
        if (pbankid && pbankid != '' && pbankid != 'Select') {
            const bankname = $event.target.options[$event.target.selectedIndex].text;
            this.GetBankDetailsbyId(pbankid);
            this.getBankBranchName(pbankid);
            this.InterestPaymentForm['controls']['pbankname'].setValue(bankname);

        }
        else {

            //this.InterestPaymentForm['controls']['pbankname'].setValue('');
        }

        //this.GetValidationByControl(this.InterestPaymentForm, 'pbankname', true);
       // this.formValidationMessages['pchequeno'] = '';
    }
    chequenumber_Change() {

        this.GetValidationByControl(this.InterestPaymentForm, 'pchequeno', true);
    }
    debitCard_Change() {
      debugger;
      let data = this.getbankname(this.InterestPaymentForm.controls.pdebitcard.value);
        this.InterestPaymentForm['controls']['pbankname'].setValue(data.pbankname);
      this.InterestPaymentForm['controls']['pbankid'].setValue(data.pbankid);
      this.InterestPaymentForm['controls']['pfinancialservice'].setValue(data.pbankname);
      this.GetValidationByControl(this.InterestPaymentForm, 'pdebitcard', true);
    }
    getbankname(cardnumber) {
        try {
            let data = this.debitcardlist.filter(function (debit) {
                return debit.pCardNumber == cardnumber;
            })[0];
            this.getBankBranchName(data.pbankid);
            return data;
        } catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
    DateChange($event: any) {
        debugger;
        this.monthof = this.datepipe.transform($event, 'MMM-yyyy');
    }
    gridUserSelectionChange(gridUser, selection) {
        debugger;
        // let selectedData = gridUser.data.data[selection.index];
        const selectedData = selection.selectedRows[0].dataItem;
        console.log(selectedData);
    }
    adjustmentTypeChange($event: any) {
        debugger;
        const typevalue = $event.target.value;
        this.paymenttype = $event.target.value;
        this.CompanyDetails = [];
        this.BranchDetails = [];
        this.intrestpaymentlist = [];
        this.Showmembers = [];
        if (typevalue == "ADJUSTMENT") {
            this.showCompany = true;
            this.GetCompanydetails();

        }
        else {
            this.showCompany = false;

        }
        this.clearadjustmenttypechange();
        this.showbtnvalidation(typevalue);

    }
    shemename_change($event: any) {
        debugger;
        this.intrestpaymentlist = [];
        this.Showmembers = [];
        this.schemeid = $event.target.value;

    }
    branchNameChange($event: any) {
        debugger;

        this.intrestpaymentlist = [];
        this.Showmembers = [];
        this.branchname = $event.target.value;

    }
     //---------End Change Events wing--------------------------
   
    transofPaymentChange(type) {
        debugger;
          
        if (type == "CHEQUE") {         
            this.showCheque = true;
            this.showOnline = false;
            this.showdebitcard = false;
                     
        }
        else if (type == "ONLINE") {
            this.showOnline = true;
            this.showCheque = false;
            this.showdebitcard = false;

        
        }
        else if (type == "DEBIT CARD") {
            this.showdebitcard = true;
            this.showCheque = false;
            this.showOnline = false;
                                 
        }
        else {
            this.showdebitcard = false;
            this.showCheque = false;
            this.showOnline = false;
        }
        this.modeofpaymentvalidation(type);
        this.clearmodeofpaymentDetails();   
       
    }
    typeofPaymentChange() {
        debugger;
        let UpinameControl = <FormGroup>this.InterestPaymentForm['controls']['pUpiname'];
        let UpiidControl = <FormGroup>this.InterestPaymentForm['controls']['pUpiid'];
        if (this.InterestPaymentForm.controls.ptypeofpayment.value == 'UPI') {
            this.showupi = true;
            UpinameControl.setValidators(Validators.required);
            UpiidControl.setValidators(Validators.required);
        }
        else {
            this.showupi = false;
            UpinameControl.clearValidators();
            UpiidControl.clearValidators();
        }
        UpinameControl.updateValueAndValidity();
        UpiidControl.updateValueAndValidity();
        this.GetValidationByControl(this.InterestPaymentForm, 'ptypeofpayment', true);
    }
    //---------Validations and Clear wing--------------------------
    showbtnvalidation(type)
    {
        debugger
        let pInterestpaymentDate = <FormGroup>this.InterestPaymentForm['controls']['pInterestpaymentDate'];
        let pSchemeId = <FormGroup>this.InterestPaymentForm['controls']['pSchemeId'];
        let padjustmenttype = <FormGroup>this.InterestPaymentForm['controls']['padjustmenttype'];
        let pcompanyname = <FormGroup>this.InterestPaymentForm['controls']['pcompanyname'];
        let pbranchnamemain = <FormGroup>this.InterestPaymentForm['controls']['pbranchnamemain'];
        let pMonthOf = <FormGroup>this.InterestPaymentForm['controls']['pMonthOf'];
                
        if (type == 'SELF') {
            pInterestpaymentDate.setValidators(Validators.required)
            pSchemeId.setValidators(Validators.required)
            padjustmenttype.setValidators(Validators.required)
            pMonthOf.setValidators(Validators.required)


        }
        else if (type == 'ADJUSTMENT') {
            pInterestpaymentDate.setValidators(Validators.required)
            pSchemeId.setValidators(Validators.required)
            padjustmenttype.setValidators(Validators.required)
            pMonthOf.setValidators(Validators.required)
            pcompanyname.setValidators(Validators.required)
            pbranchnamemain.setValidators(Validators.required)


        }
        else {
            pInterestpaymentDate.clearValidators()
            pSchemeId.clearValidators()
            padjustmenttype.clearValidators()
            pMonthOf.clearValidators()
            pcompanyname.clearValidators()
            pbranchnamemain.clearValidators()
        }
        

        pInterestpaymentDate.updateValueAndValidity()
        pSchemeId.updateValueAndValidity();
        padjustmenttype.updateValueAndValidity();
        pMonthOf.updateValueAndValidity();
        pcompanyname.updateValueAndValidity();
        pbranchnamemain.updateValueAndValidity();
       
    }
    modeofpaymentvalidation(type) {
        debugger
        this.InterestPaymentErrors = {}
        let pbankid = <FormGroup>this.InterestPaymentForm['controls']['pbankid'];
        let pbranchname = <FormGroup>this.InterestPaymentForm['controls']['pbranchname'];
        let pchequeno = <FormGroup>this.InterestPaymentForm['controls']['pchequeno'];
       // let pbankidonline = <FormGroup>this.InterestPaymentForm['controls']['pbankid'];
        let ptypeofpayment = <FormGroup>this.InterestPaymentForm['controls']['ptypeofpayment'];
        const ptypeofpayment1 = <FormGroup>this.InterestPaymentForm['controls']['ptypeofpayment'];

        let preferencenoonline = <FormGroup>this.InterestPaymentForm['controls']['preferencenoonline'];
        let pUpiname = <FormGroup>this.InterestPaymentForm['controls']['pUpiname'];
        let pUpiid = <FormGroup>this.InterestPaymentForm['controls']['pUpiid'];
        let pdebitcard = <FormGroup>this.InterestPaymentForm['controls']['pdebitcard'];
        let pfinancialservice = <FormGroup>this.InterestPaymentForm['controls']['pfinancialservice'];
        let preferencenodcard = <FormGroup>this.InterestPaymentForm['controls']['preferencenodcard'];
        let pTotalpaymentamount = <FormGroup>this.InterestPaymentForm['controls']['pTotalpaymentamount'];

        pTotalpaymentamount.setValidators(Validators.required)

        if (type == 'CHEQUE') {
            pbankid.setValidators(Validators.required)
            pbranchname.setValidators(Validators.required)
            pchequeno.setValidators(Validators.required)

            ptypeofpayment.clearValidators()
            preferencenoonline.clearValidators()

            pdebitcard.clearValidators()
            pfinancialservice.clearValidators()
            preferencenodcard.clearValidators()

        }
        else if (type == 'ONLINE') {
            pbankid.setValidators(Validators.required)
            ptypeofpayment.setValidators(Validators.required)
            preferencenoonline.setValidators(Validators.required)


            if (this.showupi) {
                pUpiname.setValidators(Validators.required);
                pUpiid.setValidators(Validators.required);
            }
            else {
                pUpiname.clearValidators();
                pUpiid.clearValidators();
            }
           
            pbranchname.clearValidators()
            pchequeno.clearValidators()

            pdebitcard.clearValidators()
            pfinancialservice.clearValidators()
            preferencenodcard.clearValidators()

        }
        else if (type == 'DEBIT CARD') {
            pdebitcard.setValidators(Validators.required)
            pfinancialservice.setValidators(Validators.required)
            preferencenodcard.setValidators(Validators.required)

            pbankid.clearValidators()
            pbranchname.clearValidators()
            pchequeno.clearValidators()

            ptypeofpayment.clearValidators()
            preferencenoonline.clearValidators()

        }        

        pbankid.updateValueAndValidity()
        pbranchname.updateValueAndValidity()
        pchequeno.updateValueAndValidity()

        pbankid.updateValueAndValidity()
        ptypeofpayment.updateValueAndValidity()
        preferencenoonline.updateValueAndValidity()

        pdebitcard.updateValueAndValidity()
        pfinancialservice.updateValueAndValidity()
        preferencenodcard.updateValueAndValidity()

        

    }
    clearadjustmenttypechange() {
        this.InterestPaymentForm.patchValue({
            pcompanyname: '',
            pbranchnamemain: '',
        })
        this.InterestPaymentErrors = {}
    }
    clearInterestPayment() {

        try {
            this.intrestpaymentlist = [];
            this.InterestPaymentForm.reset();
            this.InterestPaymentForm['controls']['ptranstype'].setValue('CHEQUE');
            this.InterestPaymentForm['controls']['pModeofreceipt'].setValue('BANK');
            this.InterestPaymentForm['controls']['padjustmenttype'].setValue('SELF');
            this.clearmodeofpaymentDetails();
            this.clearInterestPaymentDetails();
            let date = new Date();
            this.InterestPaymentForm['controls']['pInterestpaymentDate'].setValue(date);
            this.InterestPaymentForm['controls']['pTotalpaymentamount'].setValue('');
            this.formValidationMessages = {};
            this.pintrestpaymentlist = {};
            this.InterestPaymentErrors = {};
            this.disablesavebutton = false;
            this.savebutton = "Save";
            this.transofPaymentChange('CHEQUE');
            this.Showmembers=[]
            this.total = 0;

        } catch (e) {
            this._CommonService.showErrorMessage(e);
        }
    }
    clearInterestPaymentDetails() {

        const formControl = <FormGroup>this.InterestPaymentForm['controls']['pintrestpaymentlist'];
        formControl.reset();

        this.InterestPaymentForm['controls']['pintrestpaymentlist']['controls']['pMembername'].setValue(false);
        this.InterestPaymentForm['controls']['pintrestpaymentlist']['controls']['pFdaccountno'].setValue(false);
        this.InterestPaymentForm['controls']['pintrestpaymentlist']['controls']['pInterestpaymentid'].setValue(false);
        this.InterestPaymentForm['controls']['pintrestpaymentlist']['controls']['pIntrestamount'].setValue(null);
        this.InterestPaymentForm['controls']['pintrestpaymentlist']['controls']['pTdsamount'].setValue(null);
        this.InterestPaymentForm['controls']['pintrestpaymentlist']['controls']['ptotalamount'].setValue(null);
        
        this.formValidationMessages = {};

    }
    clearmodeofpaymentDetails() {
        debugger
        this.chequenumberslist = [];
        this.InterestPaymentForm['controls']['pbankid'].setValue('');
        this.InterestPaymentForm['controls']['pbankname'].setValue('');
        this.InterestPaymentForm['controls']['pbranchname'].setValue('');
        this.InterestPaymentForm['controls']['pchequeno'].setValue('');
       // this.InterestPaymentForm['controls']['pbanknameonline'].setValue('');
        this.InterestPaymentForm['controls']['ptypeofpayment'].setValue('');
        this.InterestPaymentForm['controls']['preferencenoonline'].setValue('');
        this.InterestPaymentForm['controls']['pUpiname'].setValue('');

        this.InterestPaymentForm['controls']['pUpiid'].setValue('');
        this.InterestPaymentForm['controls']['pdebitcard'].setValue('');
        this.InterestPaymentForm['controls']['pfinancialservice'].setValue('');
        this.InterestPaymentForm['controls']['preferencenodcard'].setValue('');
       
    
        this.InterestPaymentErrors = {};

    }
    //---------End Validations--------------------------
    back()
    {
        this.router.navigate(['/InterestpaymentView']);
    }
}

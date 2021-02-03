import { Component, OnInit, NgZone } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';
import { SavingtranscationService } from 'src/app/Services/Banking/savingtranscation.service';
import { debug, log, isNullOrUndefined } from 'util';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CoJointmemberService } from 'src/app/Services/Common/co-jointmember.service';

declare let $: any
@Component({
  selector: 'app-savings-transactions-new',
  
  templateUrl: './savings-transactions-new.component.html',
  styles: []
})
export class SavingsTransactionsNewComponent implements OnInit {
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  SavingTranscationForm: FormGroup
  constructor(private _fb: FormBuilder, private router:Router,private zone: NgZone,private _commonservice: CommonService, private _loanmasterservice: LoansmasterService, private savingtranscationservice: SavingtranscationService,private ActRoute: ActivatedRoute,private _CoJointmemberService:CoJointmemberService) {
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY'
    this.dpConfig.maxDate = new Date();
    this.dpConfig.showWeekNumbers = false;
    window['CallingFunctionOutsideMemberData'] = {
      zone: this.zone,
      componentFn: (value) => this.MemberChange(value),
      component: this,
    };
    window['CallingFunctionToHideCard'] = {
      zone: this.zone,
      componentFn: () => this.HideCard(),
      component: this,
    };
  }
  SelectType: any;
  contactType: any;
  Applicanttype: any;
  SavingConfigid: any;
  SavingCode: any;
  MinAmount: any;
  Minmaintainbalance:any;
  SavingPayin: any;
  IntrestPayout: any;
  buttontype: any;
  Issavingpayinapplicable: any;
  MaxDepositAmount:any;
  MinDepositAmount: any;
  SavingTranscationErrorMessages: any;
  SavingAccountid: any;
  SelectedMembertypeid: any;
  selectedMemberdetails: any;

  membertypedetails: any = [];
  memberdetails: any = [];
  ApplicantTypes: any = [];
  ContactDetails: any = [];
  SavingAccDetails: any = [];

  Showdepositamount: boolean = false;
  ShowAccountConfigDetails: boolean = false;
  forMemberNameErrorMsg: boolean = false;
  notEditable: boolean = false;
  public loading = false;
 
 
  ngOnInit() {
    debugger;
    this.SavingTranscationErrorMessages = {}
    this.Showdepositamount = false;

    this.SelectType = 'Individual';
    this.contactType = "Individual";

    this.GetMemberTypeDetails();
    this.getApplicantTypes("Individual");
    this.FormGroup();
   
    this.BlurEventAllControll(this.SavingTranscationForm);
    this.SavingTranscationForm.controls.pContacttype.setValue('Individual');
    if (this.ActRoute.snapshot.params['id']) {
      debugger;
      this.buttontype = this.savingtranscationservice.GetButtonClickType();
       if (this.buttontype == "Edit") {
        this.BindData()
        this.notEditable = true;
       }
    }
    else{
        this.savingtranscationservice.SetButtonClickType('');
    }
  }

  FormGroup() {
    this.SavingTranscationForm = this._fb.group
      ({
        pTransdate: [new Date()],
        pSavingaccountid: [0],
        pSavingaccountno: [''],
        pMembertype: [''],
        pApplicanttype: [null, [Validators.required]],
        pContacttype: [''],
        pMembername: [''],
        pMembercode:[''],
        pMemberid: [''],
        pSavingaccname: [''],
        pSavingconfigid: [null, [Validators.required]],
        pMembertypeid: [null, [Validators.required]],
        pInterestpayout: [''],
        pContactid: [''],
        pContactreferenceid: [''],
        pSavingsamount: [''],
        pSavingsamountpayin: [''],
        pIsjointapplicable: [false],
        pIsreferralapplicable: [false],
        ptypeofoperation: ['CREATE'],
        pCreatedby: [this._commonservice.pCreatedby],

      })
  }
  public GetMemberTypeDetails() {
    this._commonservice.Getmemberdetails().subscribe(json => {
      this.membertypedetails = json;
    });
  }
  GetContactDetails(MemberID) {
    debugger
    if (MemberID && MemberID != undefined && MemberID != '') {
      this.savingtranscationservice.GetContactDetails(MemberID).subscribe(json => {
        debugger
        this.ContactDetails = json
        this.SavingTranscationForm.controls.pContactid.setValue(this.ContactDetails.pContactid);
        this.SavingTranscationForm.controls.pContactreferenceid.setValue(this.ContactDetails.pContactreferenceid);
      })
    }

  }
  GetMemberDetails(memebertypeid, contactType) {
    debugger
    if (memebertypeid && memebertypeid != undefined && memebertypeid != '') {
      this.savingtranscationservice.GetMemberDetails(memebertypeid, contactType).subscribe(json => {
        debugger
        this.memberdetails = json
        console.log(contactType);
        $("#MemberData").kendoMultiColumnComboBox({
          dataTextField: "pMembername",
          dataValueField: "pMemberid",
          height: 400,
          columns: [
            { field: "pMembername", title: "Member Name", width: 200},
            { field: "pMembercode", title: "Member code", width: 200 },
            { field: "pContacttype", title: "Contact type", width: 200 },

          ],
          filter: "contains",
          filterFields: ["pMembername", "pMembercode", "pContacttype"],
          dataSource: this.memberdetails,
          select: this.SelectMemberData,
         change: this.CancelClick
        });

      })
    }

  }
  SelectMemberData(e) {
    debugger
    if (e.dataItem) {
      var dataItem = e.dataItem;
      window['CallingFunctionOutsideMemberData'].componentFn(dataItem)

    }
  }
  CancelClick() {
    window['CallingFunctionToHideCard'].componentFn()
  }
  HideCard() {
    
    if (this.SavingTranscationForm.controls['pMemberid'].value) {
      this.SavingTranscationForm.controls['pMemberid'].setValue('');
      this.SavingTranscationForm.controls['pMembername'].setValue('');
      this.SavingTranscationErrorMessages.pMemberid = '';
    }
  }
  getApplicantTypes(type) {

    if (type && type != undefined && type != '') {
      this._loanmasterservice.GetApplicanttypes(type, 0).subscribe(json => {
        if (json) {
          this.ApplicantTypes = json
        }
      })
    }
  }
  MemberTypeChange(event) {
    debugger;
    if (event != undefined && event != "" && event != null) {
      this.SelectedMembertypeid = event.pmembertypeid;
      this.SavingTranscationForm.controls.pMembertype.setValue(event.pmembertype);
      let ApplicantType = this.SavingTranscationForm.controls.pApplicanttype.value;
      this.SavingTranscationForm.controls.pMemberid.setValue('');
     this.GetMemberDetails(this.SelectedMembertypeid, this.contactType)
      this.GetSavingAccountDetails(this.SelectedMembertypeid, ApplicantType);
      var multicolumncombobox: any;
      multicolumncombobox = $("#MemberData").data("kendoMultiColumnComboBox");
      if (multicolumncombobox)
        multicolumncombobox.value("");
    }
    

  }
  MemberChange(event) {
    debugger;
    if (event != undefined && event != "" && event != null) {
     
      this.forMemberNameErrorMsg = false;
      if (this.CheckMemberDuplicates(event.pMemberid)) {
        this.selectedMemberdetails = event;
        this.SavingTranscationForm.controls.pMembercode.setValue(event.pMembercode);
        this.SavingTranscationForm.controls.pMembername.setValue(event.pMembername);
       this.SavingTranscationForm.controls.pMemberid.setValue(event.pMemberid);
       this._CoJointmemberService._setfdMembercode(event.pMembercode,event.pMemberid)

        this.GetContactDetails(event.pMemberid)
      }
    }

  }
  CheckMemberDuplicates(Memberid): boolean {
    
    let isValid: boolean = true;

    let errormsg = "";
    this.SavingAccountid = 0;
    this.savingtranscationservice.CheckMemberDuplicates(Memberid, this.SavingAccountid).subscribe(count => {
      debugger;
      if (!count) {
        isValid = true;
      }
      else {
        errormsg = "Member Already Exists";
        var multicolumncombobox: any;
        multicolumncombobox = $("#MemberData").data("kendoMultiColumnComboBox");
        if (multicolumncombobox) {
          multicolumncombobox.value("")
          this._commonservice.showWarningMessage(errormsg);
          this.SavingTranscationForm.controls.pMemberid.setValue('');
          this.SavingTranscationForm.controls.pMembername.setValue('');
          this.selectedMemberdetails = [];
          isValid = false;
        }
       
        
      }
    })
    return isValid;
  }
  SelectTypeChange(type) {
    debugger
    this.contactType = type
  
    this.GetMemberDetails(this.SelectedMembertypeid, this.contactType)
    this.selectedMemberdetails = [];
    this.SavingTranscationForm.controls.pMemberid.setValue('');
    this.SavingTranscationForm.controls.pMembername.setValue('');
    var multicolumncombobox: any;
    multicolumncombobox = $("#MemberData").data("kendoMultiColumnComboBox");
    if (multicolumncombobox)
      multicolumncombobox.value("");
  }
  GetSavingAccountDetails(Membertypeid, Applicanttype) {
    debugger
    this.savingtranscationservice.GetSavingAccountDetails(Membertypeid, Applicanttype).subscribe(json => {
      this.SavingAccDetails = json
    })
  }
  changedepositamount(event)
  {
   debugger;
  
   if(event.target.value!="")
   {
     this.SavingTranscationErrorMessages.pSavingsamount=null;
     let DepositAmount = parseFloat(event.target.value.toString().replace(/,/g, ""));
     if (DepositAmount > this.MaxDepositAmount || DepositAmount<this.MinDepositAmount)
    {
      this._commonservice.showWarningMessage("The Amount Should be in between " + this.MinDepositAmount + "&" + this.MaxDepositAmount);
      this.SavingTranscationForm.controls.pSavingsamount.setValue('');
    }
   }
   else{
     this.SavingTranscationErrorMessages.pSavingsamount='Deposit Amount Required';
   }
   
  }
  SavingAccChange(event) {
    debugger;
    if (event != undefined) {
      this.SavingTranscationErrorMessages.pSavingconfigid = '';
      if (this.SelectedMembertypeid != undefined) {
        this.SavingTranscationForm.controls.pSavingaccname.setValue(event.pSavingaccname);
        
          this.savingtranscationservice.GetSavingAccountConfigDetails(event.pSavingconfigid, this.SelectedMembertypeid, this.Applicanttype).subscribe(json => {
          debugger
          let Configdetails = json[0];
          this.ShowAccountConfigDetails = true;
          this.SavingCode = Configdetails.pSavingaccnamecode;
          this.SavingPayin = Configdetails.pSavingspayinmode;
          this.IntrestPayout = Configdetails.pInterestpayout;
          this.MinAmount = Configdetails.pMinopenamount;
          this.Minmaintainbalance=Configdetails.pMinmaintainbalance;
          this.MaxDepositAmount = Configdetails.pSavingmaxdepositamount;
          this.MinDepositAmount = Configdetails.pSavingmindepositamount;
          this.Issavingpayinapplicable = Configdetails.pIssavingspayinapplicable;
          this.SavingTranscationForm.controls.pInterestpayout.setValue(this.IntrestPayout); 
          if (this.Issavingpayinapplicable == true) {
              this.SavingTranscationForm.controls.pSavingsamount.setValidators(Validators.required);
              this.SavingTranscationForm.controls.pSavingsamount.updateValueAndValidity();
            //  this.BlurEventAllControll(this.SavingTranscationForm)
              this.Showdepositamount = true
            }
            else{
              this.SavingTranscationForm.controls.pSavingsamount.clearValidators();
              this.SavingTranscationForm.controls.pSavingsamount.updateValueAndValidity();
          //    this.BlurEventAllControll(this.SavingTranscationForm)
              this.Showdepositamount = false;
            }
          

        })
      }
    }

  }
  ApplicanttypeChange(event)
  {
    debugger;
    if (event != undefined && event != "" && event != null) {
      this.Applicanttype = event.pApplicanttype     
      let Membertypeid = this.SavingTranscationForm.controls.pMembertypeid.value;
      this.GetSavingAccountDetails(Membertypeid, this.Applicanttype);
      
    }
  }
  //NextTabClick() {
  //  debugger;
  //  let isValid: boolean = true;
  //  if (this.selectedMemberdetails) {
  //    this.SavingTranscationForm.controls.pMembercode.setValue(this.selectedMemberdetails.pMembercode);
  //    this.SavingTranscationForm.controls.pMembername.setValue(this.selectedMemberdetails.pMembername);
  //    this.SavingTranscationForm.controls.pMemberid.setValue(this.selectedMemberdetails.pMemberid);
  //  }
  //  let memberid = this.SavingTranscationForm.controls['pMemberid'].value;
  //  if (this.checkValidations(this.SavingTranscationForm, isValid)) {
  //    if (memberid == '' ||memberid == null ||memberid == undefined) {
  //      this.forMemberNameErrorMsg = true;
  //    }
  //    else {
  //      this.SavingTranscationForm.controls.pSavingconfigid.setValidators(Validators.required);
  //      this.SavingTranscationForm.controls.pSavingconfigid.updateValueAndValidity();
  //      this.BlurEventAllControll(this.SavingTranscationForm);
  //      let str = "savings-ac"
  //      $('.nav-item a[href="#' + str + '"]').tab('show');
  //    }
  //  }
    
  //}
  SaveForm() {
    debugger;
    this.loading = true;
    let isValid: boolean = true;
    if (this.selectedMemberdetails) {
      this.SavingTranscationForm.controls.pMembercode.setValue(this.selectedMemberdetails.pMembercode);
      this.SavingTranscationForm.controls.pMembername.setValue(this.selectedMemberdetails.pMembername);
      this.SavingTranscationForm.controls.pMemberid.setValue(this.selectedMemberdetails.pMemberid);
    }
    
    if (this.checkValidations(this.SavingTranscationForm, isValid)) {
      let memberid = this.SavingTranscationForm.controls['pMemberid'].value;
      if (memberid == '' || memberid == null || memberid == undefined) {
        this.forMemberNameErrorMsg = true;
      }
      else {
        if(this.SavingTranscationForm.controls.pTransdate.value!=null){
          let transactiondate=this.SavingTranscationForm.controls.pTransdate.value.toISOString();
          this.SavingTranscationForm.controls.pTransdate.setValue(transactiondate);
        }
      this.forMemberNameErrorMsg = false;
      let formdata = (this.SavingTranscationForm.getRawValue())
      let jsondata = JSON.stringify(formdata);
      this.savingtranscationservice.SaveSavingAccountTransaction(jsondata).subscribe(res => {
        debugger;
        // this.loading = false;
        if (res) {
          let resdata={accountId:res['pSavingaccountid'],accountNo:res['pSavingaccountno']};
          this._CoJointmemberService._SetShareAccountdata(resdata);
          let SavingAccounttransdetails = null;
          // this.loading = false;
          SavingAccounttransdetails = Object.assign(this.ContactDetails, res);
          this.savingtranscationservice.SetAccountNoAndId(SavingAccounttransdetails);
          this.loading = false;
          let str = "add-joint-member"
          $('.nav-item a[href="#' + str + '"]').tab('show');
        }
      }, err => {
        // this.loading = false;
        this._commonservice.showErrorMessage("Error while saving")
        this.loading = false;
      });
    }
    }
    else{
      this.loading = false;
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
          this.SavingTranscationErrorMessages[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {

            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {

                let lablename;

                lablename = (document.getElementById(key) as HTMLInputElement).title;
                errormessage = this._commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.SavingTranscationErrorMessages[key] += errormessage + ' ';
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

  BindData() {
    debugger;
    let EditData = this.savingtranscationservice.GetSavingTransactionDetailsForEdit();
  //  let savingTransData = EditData[0].savingAccountTransactionlist;
    this.GetSavingAccountDetails(EditData.pMembertypeid, EditData.pApplicanttype);
    this.GetContactDetails(EditData.pMemberid)
    this.GetMemberDetails(EditData.pMembertypeid, EditData.pContacttype)
    this.savingtranscationservice.SetAccountNoAndId(EditData);
    this.SelectType = EditData.pContacttype;
    this._CoJointmemberService._setfdMembercode(EditData.pSavingaccountno,EditData.pSavingaccountid);


    this.SavingTranscationForm.patchValue({
      ptypeofoperation: "UPDATE",
      pSavingaccountid: EditData.pSavingaccountid,
      pSavingaccountno: EditData.pSavingaccountno,
      pTransdate: this._commonservice.formatDateFromDDMMYYYY(EditData.pTransdate),
      pMembertype: EditData.pMembertype,
      pApplicanttype: EditData.pApplicanttype,
      pContacttype: EditData.pContacttype,
      pMembername: EditData.pMembername,
      pMembercode: EditData.pMembercode,
      pMemberid: EditData.pMemberid,
      pSavingaccname: EditData.pSavingaccname,
      pSavingconfigid: EditData.pSavingconfigid,
      pMembertypeid: EditData.pMembertypeid,
      pInterestpayout: EditData.pInterestpayout,
      pContactid: EditData.pContactid,
      pContactreferenceid: EditData.pContactreferenceid,
      pSavingsamount: EditData.pSavingsamount
    
    });
    debugger;
  
    this.SelectedMembertypeid = EditData.pMembertypeid;
    this.contactType = EditData.pContacttype;
    this.Applicanttype = EditData.pApplicanttype;
    let savingaccobj = ({ pSavingaccname: EditData.pSavingaccname, pSavingconfigid: EditData.pSavingconfigid })
    this.SavingAccChange(savingaccobj);
    
     
        
          
  }

  back(){
    debugger;
    this.router.navigate(['/SavingsTransactionsView']);
  }
}

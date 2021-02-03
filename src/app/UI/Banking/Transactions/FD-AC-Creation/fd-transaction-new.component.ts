import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FdRdServiceService } from 'src/app/Services/Banking/fd-rd-service.service';
import { FdRdTransactionsService } from 'src/app/Services/Banking/Transactions/fd-rd-transactions.service';
import { CommonService } from 'src/app/Services/common.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { SavingtranscationService } from 'src/app/Services/Banking/savingtranscation.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { log, debug } from 'util';
import { NomineedetailsComponent } from './nomineedetails.component';
import { CoJointmemberService } from 'src/app/Services/Common/co-jointmember.service';
import { RdTransactionsService } from 'src/app/Services/Banking/Transactions/rd-transactions.service';
declare let $: any

@Component({
  selector: 'app-fd-transaction-new',
  templateUrl: './fd-transaction-new.component.html',
  styles: []
})
export class FdTransactionNewComponent implements OnInit {

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public depositdateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  @ViewChild(NomineedetailsComponent, { static: false }) nomineeDetails: NomineedetailsComponent
  public maturitydateConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  interestvalidation: number;
  ratepersquareyard: any;
  ratesquareyard: number;
  constructor(private _route: ActivatedRoute, private _fb: FormBuilder, private datePipe: DatePipe, private zone: NgZone, private _fdrdttranscationservice: FdRdTransactionsService, private commonservice: CommonService, private savingtranscationservice: SavingtranscationService, private router: Router, private _CoJointmemberService: CoJointmemberService, private _rdttranscationservice: RdTransactionsService) {
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY'
    this.dpConfig.maxDate = new Date();
    this.dpConfig.showWeekNumbers = false;

    this.depositdateConfig.dateInputFormat = 'DD/MM/YYYY'
    //this.depositdateConfig.maxDate = new Date();
    this.depositdateConfig.showWeekNumbers = false;

    this.maturitydateConfig.dateInputFormat = 'DD/MM/YYYY'
    this.maturitydateConfig.maxDate = new Date();
    this.maturitydateConfig.showWeekNumbers = false;

    // window['CallingFunctionOutsideMemberData'] = {
    //   zone: this.zone,
    //   componentFn: (value) => this.MemberChanges(value),
    //   component: this,
    // };
    // window['CallingFunctionToHideCard'] = {
    //   zone: this.zone,
    //   componentFn: () => this.HideCard(),
    //   component: this,
    // };
  }

  status = false;
  disablevalueper100: boolean = false;
  FdTranscationform: FormGroup;
  SelectType: any;
  FdtranscationErrors: any;
  contactType: any;
  showcard: boolean = false;
  showgrid: boolean;
  Fdconfigid: any;
  MaturityAmnt: any;
  IntrestAmount: any;
  Fdname: any;
  Memberid: any;
  Businessentitystatus: boolean = false;
  tenuremodelist: any = []
  Contactid: any;
  tenureontable: boolean = false;
  depositamount: any;
  Caltype: any;
  Intrestpayout: any;
  MemberidSave: any;
  Showmaturityamountforintrest: boolean = false;
  ShowIntrestamountforintrest: boolean = false;
  Intrestrate = 0
  contactrefid: any;
  showIntrestcompounding: boolean;
  calculatedepositamount: any;
  showintrestrate: boolean;
  showvalueper100: boolean
  Showmaturityamount: boolean;
  Nomineedetails: any = []
  ShowIntrestamount: boolean;
  DepositAmountBaseconintrest: boolean = false;
  DepositAmountBasedontable: boolean = false
  Matrityamountontable: any;
  memberdetails: any = [];
  FdDetailsRecordid: any;
  FdNameandCode: any;
  FdCalculationmode: any;
  TenureMode: any;
  Tenure: any;
  Investmentperiodfrom: any;
  Investmentperiodto: any;
  IntrestrateFrom: any;
  Totalnooffromdays: any;
  Totalnooftodays: any;
  Membercode: any;
  IntrestrateTo: any;
  MaxDepositAmount: any;
  depositamountontable: any;
  intrestamountontable: any;
  MinDepositAmount: any;
  Valueper100: any;
  membertypedetails: any = [];
  Tenuremodedetails: any = [];
  DepositAmountdetails: any;
  FdSchemes: any = [];
  Multiplesof: any;
  FdAccountId: any;
  FdaccountNo: any;
  Datatobind: any;
  FdSchemeDetails: any = []
  griddata: any = []
  Branchdetails: any = []
  Applicanttype: any;
  showchit = false;
  showcalculate: boolean = false;
  showtenureonintrest: boolean = false
  buttontype: any;
  IntrestCompounding: any;
  maturitydate: any
  SelectedMembertype: any;
  ApplicantTypes: any = [];
  Intrestratedisable: boolean;
  DateLockStatus: boolean = true;
  formattedData: any;
  ngOnInit() {

    this.SelectType = 'Contact';
    this.contactType = "Individual";
    this._fdrdttranscationservice.setcontacttype(this.contactType);

    this.FormGroup();
    this.FdTranscationform.controls.pEntitytype.setValue("Individual")
    this.FdtranscationErrors = {}
    this.buttontype = this._fdrdttranscationservice.Newstatus();
    this.maturitydate = true;
    this.showgrid = false;
    this.Intrestratedisable = false

    //this.showchit=true
    this.GetApplicanttypes(this.contactType);
    //this.ngOnInit()
    //this.GetMemberDetails(this.contactType,"")
    this.GetBranchstatus()
    this.GetDateLockStatus();
    this.BlurEventAllControll(this.FdTranscationform)
    if (this._route.snapshot.params['id']) {
      if (this.buttontype == "edit") {

        this.griddata = [];
        this.Fdname = "";
        this.Datatobind = [];
        this.GetDetailsToBind()
      }
    }



  }
  GetDateLockStatus() {
    debugger;
    this.commonservice.GetDateLockStatus().subscribe(json => {
      debugger;
      this.DateLockStatus = json ? false : true;
    })
  }
  FormGroup() {
    this.FdTranscationform = this._fb.group({
      pTransdate: [new Date(), Validators.required],
      pMemberType: [''],
      pContactid: [''],
      pContactrefid: [''],
      pSquareyard: [''],
      pMembertypeId: ['', Validators.required],
      pApplicantType: [null, Validators.required],
      pContacttype: [''],
      pEntitytype: [''],
      pMemberName: [''],
      pMemberCode: [''],
      pCaltype: [''],
      pMemberId: [null, Validators.required],
      pFdConfigId: [null, Validators.required],
      pFdname: [''],
      pFdcode: [''],
      fdtranscationradio: [''],
      fdtranscationradio1: [''],
      pFdnameCode: [''],
      pFdAccountNo: ['0'],
      pFdAccountId: ['0'],
      pInterestRate: [0, Validators.required],
      pFdCalculationmode: [''],
      pInterestPayOut: [null, Validators.required],
      pInterestType: [''],
      pInterestTenureMode: ['', Validators.required],
      pInterestTenure: ['', Validators.required],
      pChitbranchId: ['0'],
      pChitbranchname: [''],
      pDepositAmount: ['', Validators.required],
      pMaturityAmount: [0],
      pInterestAmount: [0],
      pMaturityDate: [new Date()],
      pDepositDate: [new Date()],
      pIsAutoRenew: [false],
      pIsinterestDepositinBank: [false],
      pIsRenewOnlyPrincipleandInterest: [false],
      pIsRenewOnlyPrinciple: [false],
      pIsinterestDepositinSaving: [false],
      pIsJointMembersapplicable: [false],
      pIsReferralsapplicable: [false],
      pIsNomineesapplicable: [false],
      pCreatedby: this.commonservice.pCreatedby,
      pTypeofOperation: ['CREATE']
    })

  }
  SelectTypeChange(type) {
    debugger
    this.contactType = type;
    // this.FdTranscationform.controls.pMemberType.setValue("");
    this._fdrdttranscationservice.setcontacttype(this.contactType);
    // this._fdrdttranscationservice.setcontacttype(this.contactType);

    if (this.contactType == "Individual") {
      this.Businessentitystatus = false
    }
    else {
      this.Businessentitystatus = true;
    }
    this.FdTranscationform.controls.pMemberId.setValue(null)
    this.FdTranscationform.controls.pApplicantType.setValue("");
    this.clearfields();
    this.FdTranscationform.controls.pFdConfigId.setValue("")
    this.FdtranscationErrors = {}
    this.GetMemberDetails(this.contactType, this.SelectedMembertype)
    this.GetApplicanttypes(this.contactType);

  }
  Radiobuttontype(type) {
    debugger
    // this.FdTranscationform.controls.pIsinterestDepositinSaving.setValue(false)
    // this.FdTranscationform.controls.pIsinterestDepositinBank.setValue(false)    
    // this.FdTranscationform.controls.pIsRenewOnlyPrincipleandInterest.setValue(false) 
    // this.FdTranscationform.controls.pIsRenewOnlyPrinciple.setValue(false)
    // this.FdTranscationform.controls.pIsAutoRenew.setValue(false)   
    if (type == 'Savings A/C') {
      this.FdTranscationform.controls.pIsinterestDepositinSaving.setValue(true)
      this.FdTranscationform.controls.fdtranscationradio.setValue(type)
    }
    else if (type == "Bank A/C") {
      this.FdTranscationform.controls.pIsinterestDepositinBank.setValue(true)
      this.FdTranscationform.controls.fdtranscationradio.setValue(type)
    }
    else if (type == "Renew Principal and interest") {
      this.FdTranscationform.controls.pIsRenewOnlyPrincipleandInterest.setValue(true)
      this.FdTranscationform.controls.fdtranscationradio1.setValue(type)
    }
    else if (type == "Renew Prinicipal only") {
      this.FdTranscationform.controls.pIsRenewOnlyPrinciple.setValue(true)
      this.FdTranscationform.controls.fdtranscationradio1.setValue(type)
    }
    else if (type == "Do not renew") {
      this.FdTranscationform.controls.pIsAutoRenew.setValue(true)
      this.FdTranscationform.controls.fdtranscationradio1.setValue(type)
    }
  }
  GetDetailsToBind() {
    debugger
    this.Datatobind = this._rdttranscationservice.GetDetailsForEdit()
    console.log(this.Datatobind);
    this._CoJointmemberService._setfdMembercode(this.Datatobind.pMemberCode, this.Datatobind.pMemberId);
    this.FdTranscationform.controls.pSquareyard.setValue(this.Datatobind.pSquareyard)
    // this.ratepersquareyard=this.Datatobind.pSquareyard
    this.FdTranscationform.controls.pTransdate.setValue(this.commonservice.formatDateFromDDMMYYYY(this.Datatobind.pTransDate))
    this.FdTranscationform.controls.pContacttype.setValue(this.Datatobind.pContacttype)
    this.FdTranscationform.controls.pEntitytype.setValue(this.Datatobind.pContacttype == "Individual" ? this.Businessentitystatus = false : this.Businessentitystatus = true)
    this.FdTranscationform.controls.pEntitytype.setValue(this.Datatobind.pContacttype == "Individual" ? "Individual" : "BusinessEntity")
    this.FdTranscationform.controls.pMemberType.setValue(this.Datatobind.pMemberType)
    this.FdTranscationform.controls.pMembertypeId.setValue(this.Datatobind.pMembertypeId)
    this.FdTranscationform.controls.pApplicantType.setValue(this.Datatobind.pApplicantType)
    //this.commonservice.getFormatDate(this.Datatobind.pDepositDate)
    this.FdTranscationform.controls.pDepositDate.setValue(this.commonservice.formatDateFromDDMMYYYY(this.Datatobind.pDepositDate))
    this.FdTranscationform.controls.pMaturityDate.setValue(this.commonservice.formatDateFromDDMMYYYY(this.Datatobind.pMaturityDate))
    this.FdTranscationform.controls.pTypeofOperation.setValue("UPDATE")
    this.SelectedMembertype = this.Datatobind.pMemberType
    this.Applicanttype = this.Datatobind.pApplicantType
    this.Fdconfigid = this.Datatobind.pFdConfigId;
    this.Fdname = this.Datatobind.pFdname;
    this.FdCalculationmode = this.Datatobind.pFdCalculationmode
    this.Contactid = this.Datatobind.pContactid
    this.contactrefid = this.Datatobind.pContactrefid;
    this.contactType = this.Datatobind.pContacttype
    this.FdTranscationform.controls.pCreatedby.setValue(this.commonservice.pCreatedby)
    this.GetMemberDetails(this.Datatobind.pContacttype, this.Datatobind.pMemberType)
    this.GetFdSchemes(this.Applicanttype, this.SelectedMembertype)
    this.Fdschemechange(this.Datatobind.Fdconfigid)
    this.GetDataBasedOnTenureFn(this.Datatobind.pApplicantType, this.Datatobind.pMemberType, this.Datatobind.pFdConfigId, this.Datatobind.pFdname, this.Datatobind.pInterestTenure, this.Datatobind.pInterestTenureMode, this.Datatobind.pDepositAmount)

    this.FdTranscationform.controls.pFdConfigId.setValue(this.Datatobind.pFdConfigId)
    this.FdTranscationform.controls.pFdname.setValue(this.Datatobind.pFdname)
    this.FdTranscationform.controls.pFdcode.setValue(this.Datatobind.pFdcode)
    this.FdTranscationform.controls.pFdCalculationmode.setValue(this.Datatobind.pFdCalculationmode)
    this.FdTranscationform.controls.pFdAccountNo.setValue(this.Datatobind.pFdAccountNo)
    this.FdTranscationform.controls.pChitbranchId.setValue(this.Datatobind.pChitbranchId)
    this.FdTranscationform.controls.pChitbranchname.setValue('')
    this.FdTranscationform.controls.pFdAccountId.setValue(this.Datatobind.pFdAccountId)
    this.FdTranscationform.controls.pFdnameCode.setValue(this.Datatobind.pFdnameCode)
    this.FdTranscationform.controls.pContactid.setValue(this.Datatobind.pContactid)
    this.FdTranscationform.controls.pContactrefid.setValue(this.Datatobind.pContactrefid)
    this.FdTranscationform.controls.pInterestType.setValue(this.Datatobind.pInterestType)
    this.MemberidSave = this.Datatobind.pMemberId
    this.FdTranscationform.controls.pMemberId.setValue(this.Datatobind.pMemberId)
    this.FdTranscationform.controls.pMemberCode.setValue(this.Datatobind.pMemberCode)
    this.FdTranscationform.controls.pMemberName.setValue(this.Datatobind.pMemberName)
    this.FdTranscationform.controls.pInterestPayOut.setValue(this.Datatobind.pInterestPayOut)
    this._fdrdttranscationservice._setfdMembercode(this.Datatobind.pMemberCode, this.Datatobind.pMemberId)
    this.Intrestpayout = this.Datatobind.pInterestPayOut;



    if (this.Datatobind.pFdCalculationmode == 'Interest rate') {
      this.showtenureonintrest = true;
      this.DepositAmountBaseconintrest = true;
      this.Caltype = this.Datatobind.pCaltype;
      this.FdTranscationform.controls.pCaltype.setValue(this.Datatobind.pCaltype)

      this.FdTranscationform.controls.pSquareyard.setValue(this.Datatobind.pSquareyard)
      this.FdTranscationform.controls.pDepositAmount.setValue(this.commonservice.currencyformat(this.Datatobind.pDepositAmount))
      this.depositamount = this.commonservice.removeCommasForEntredNumber(this.Datatobind.pDepositAmount)
      this.GetTenureModes(this.Datatobind.pFdname, this.Datatobind.pApplicantType)
      this.GetTotalDetails(this.Datatobind.pFdname, this.Datatobind.pApplicantType)
      this.showgrid = true;
      this._fdrdttranscationservice._setcommisiontype(this.Datatobind.pReferralcommisiontype, this.Datatobind.pCommisionValue)

      this.FdTranscationform.controls.pInterestTenureMode.setValue(this.Datatobind.pInterestTenureMode)
      this.FdTranscationform.controls.pInterestTenure.setValue(this.Datatobind.pInterestTenure)
      this.Showmaturityamountforintrest = true
      this.ShowIntrestamountforintrest = true
      this.FdTranscationform.controls.pMaturityAmount.setValue(this.Datatobind.pMaturityAmount)
      // this.showintrestrate=true;
      if (this.Datatobind.pCaltype == "Value Per 100") {
        this.Intrestratedisable = true;
        this.showvalueper100 = true;
        this.showintrestrate = false
      }
      else {
        this.Intrestratedisable = false;
        this.showvalueper100 = false;
        this.showintrestrate = true;
      }
      this.FdTranscationform.controls.pInterestRate.setValue(this.Datatobind.pInterestRate)
      this.MaturityAmnt = this.Datatobind.pMaturityAmount
      this.IntrestAmount = this.Datatobind.pInterestAmount
      this.FdTranscationform.controls.pInterestAmount.setValue(this.Datatobind.pInterestAmount)
      this.Datatobind.pIsAutoRenew == true ? this.Radiobuttontype('Do not renew') : '';
      this.Datatobind.pIsRenewOnlyPrinciple == true ? this.Radiobuttontype('Renew Prinicipal only') : '';
      this.Datatobind.pIsRenewOnlyPrincipleandInterest == true ? this.Radiobuttontype('Renew Principal and interest') : '';
      this.Datatobind.pIsinterestDepositinBank == true ? this.Radiobuttontype('Bank A/C') : '';
      this.Datatobind.pIsinterestDepositinSaving == true ? this.Radiobuttontype('Savings A/C') : '';
    }
    else {
      debugger
      this.tenureontable = true;
      this.DepositAmountBasedontable = true;
      //this.FdTranscationform.controls.pDepositAmount.setValue(this.Datatobind.pDepositAmount)
      this.FdTranscationform.controls.pInterestTenureMode.setValue(this.Datatobind.pInterestTenureMode)
      this.FdTranscationform.controls.pInterestTenure.setValue(this.Datatobind.pInterestTenure)
      this.TenureMode = this.Datatobind.pInterestTenureMode;
      this.Tenure = this.Datatobind.pInterestTenure;
      this.TenureMode = this.Datatobind.pInterestTenureMode;
      this.Tenuremodechanges(this.Datatobind.pInterestTenureMode)
      this.Tenurechanges(this.Datatobind.pInterestTenure)
      this.showintrestrate = false;
      this.Showmaturityamount = true;
      this.ShowIntrestamount = true;
      this.intrestamountontable = this.Datatobind.pInterestAmount
      this.Matrityamountontable = this.Datatobind.pMaturityAmount
      this.depositamountontable = parseInt(this.Datatobind.pDepositAmount);
      this.FdTranscationform.controls.pMaturityAmount.setValue(this.Datatobind.pMaturityAmount)
      this.FdTranscationform.controls.pInterestAmount.setValue(this.Datatobind.pInterestAmount)
      this._fdrdttranscationservice.GetDepositAmount(this.Fdname, this.Fdconfigid, this.TenureMode, this.Tenure, this.SelectedMembertype)
      this.FdTranscationform.controls.pDepositAmount.setValue(this.Datatobind.pDepositAmount)
      this.Datatobind.pIsAutoRenew == true ? this.Radiobuttontype('Do not renew') : '';
      this.Datatobind.pIsRenewOnlyPrinciple == true ? this.Radiobuttontype('Renew Prinicipal only') : '';
      this.Datatobind.pIsRenewOnlyPrincipleandInterest == true ? this.Radiobuttontype('Renew Principal and interest') : '';
      this.Datatobind.pIsinterestDepositinBank == true ? this.Radiobuttontype('Bank A/C') : '';
      this.Datatobind.pIsinterestDepositinSaving == true ? this.Radiobuttontype('Savings A/C') : '';

    }

    this.formattedData = this.FdTranscationform.value;
  }
  GetintrestAmount() {
    debugger
    let isvalid = true
    let tenuremode = this.TenureMode.toUpperCase()
    let tenure = parseInt(this.Tenure)
    let intrestpayout = this.Intrestpayout.toUpperCase()
    let depositamount = parseInt(this.depositamount)
    let intrestcompunding = this.IntrestCompounding.toUpperCase()
    this._fdrdttranscationservice.GetIntrestAmount(tenuremode, tenure, depositamount,
      intrestpayout, intrestcompunding, this.Intrestrate, this.Caltype).subscribe(res => {
        debugger
        this.Showmaturityamountforintrest = true;
        this.ShowIntrestamountforintrest = true;
        this.FdTranscationform.controls.pMaturityAmount.setValue(res[0].pMatueritytAmount)
        this.MaturityAmnt = res[0].pMatueritytAmount
        this.IntrestAmount = res[0].pInterestamount
        this.FdTranscationform.controls.pInterestAmount.setValue(res[0].pInterestamount)
        isvalid = true;
      })
    return isvalid
  }
  GetApplicanttypes(type) {
    debugger
    this._fdrdttranscationservice.GetapplicantTypes(this.contactType).subscribe(json => {
      debugger;
      this.membertypedetails = json['_FIMembertypeDTOList'];


      this.ApplicantTypes = json['_FIApplicantTypeDTO'];



      // this.FdTranscationform.controls.pMembertypeId.setValue(this.membertypedetails[0].pMembertypeId)
      // let obj = ({pMemberType: this.membertypedetails[0].pMemberType })
      // this.MemberTypeChange(obj)


    })
  }
  GetTotalDetails(Fdname, applicantype) {
    debugger
    this._fdrdttranscationservice.GetTotalDetails(Fdname, applicantype, this.SelectedMembertype).subscribe(json => {
      debugger

      this.griddata = json;

      this.showgrid = true
    })
  }
  GetBranchdetails() {

    this._fdrdttranscationservice.Getbranchdetails().subscribe(res => {
      debugger
      this.Branchdetails = res
    })

  }
  GetBranchstatus() {
    debugger
    this._fdrdttranscationservice.Getbranchstatus().subscribe(json => {
      debugger
      if (json) {
        this.showchit = true
        this.GetBranchdetails()
      }
    })
  }
  MemberTypeChange(event) {
    debugger
    // this.FdTranscationform.controls.pMemberName.setValue("")
    if (event != undefined) {
      this.FdTranscationform.controls.pMemberId.setValue("");
      this.FdTranscationform.controls.pApplicantType.setValue("");
      this.FdTranscationform.controls.pFdConfigId.setValue("")
      this.memberdetails = [];
      this.clearFdschemechange()
      this.SelectedMembertype = event.pMemberType
      //this.FdTranscationform.controls.pMemberName.setValue(event.pMemberName)
      this.FdTranscationform.controls.pMemberType.setValue(event.pMemberType)
      this.GetMemberDetails(this.contactType, this.SelectedMembertype)
      //   this.FdTranscationform.controls.pFdConfigId.setValue("")
      // this.GetFdSchemes(this.Applicanttype, this.SelectedMembertype)
      //this.FdTranscationform.controls.pFdConfigId.setValue("")

      // var multicolumncombobox: any;
      // multicolumncombobox = $("#MemberData").data("kendoMultiColumnComboBox");
      // if (multicolumncombobox)
      //   multicolumncombobox.value("");
      // this.GetDataBasedOnTenure()
    }
    else {
      this.GetMemberDetails(this.contactType, "")
    }

  }
  MemberChanges(event) {
    debugger
    //console.log(event.pMemberId);
    if (event != undefined) {
      this.FdTranscationform.controls.pApplicantType.setValue("");
      this.FdTranscationform.controls.pFdConfigId.setValue("")
      this.clearFdschemechange()
      this.Memberid = event.pMemberId;
      this.Membercode = event.pMemberCode;
      this.Contactid = event.pContactid;
      this.contactrefid = event.pContactrefid;
      //this._CoJointmemberService._setfdMembercode(event.pMemberCode, event.pMemberId)

      //this.FdtranscationErrors.pMemberId=''
      let data = ({ pMemberId: event.pMemberId, pMemberCode: event.pMemberCode, pMemberName: event.pMemberName })
      this._fdrdttranscationservice._setfdMembercode(event.pMemberCode, event.pMemberId)
      this.GetContactDetails(data)
      // this.FdTranscationform.controls.pFdConfigId.setValue("")

    }
  }
  GetContactDetails(event) {
    debugger
    if (event.pMemberId && event.pMemberId != undefined && event.pMemberId != '') {
      this.savingtranscationservice.GetContactDetails(event.pMemberId).subscribe(json => {
        debugger
        // this.ContactDetails = json;
        this.MemberidSave = event.pMemberId;
        this.FdTranscationform.controls.pMemberId.setValue(event.pMemberId)
        this.FdTranscationform.controls.pMemberCode.setValue(event.pMemberCode)
        this.FdTranscationform.controls.pMemberName.setValue(event.pMemberName)
        this.FdTranscationform.controls.pContactid.setValue(json['pContactid']);
        this.FdTranscationform.controls.pContactrefid.setValue(json['pContactreferenceid']);
      })
    }

  }
  ApplicanttypeChange(event) {
    debugger
    if (event != undefined) {
      this.Applicanttype = event.pApplicantType
      this.FdTranscationform.controls.pFdConfigId.setValue("")
      this.clearFdschemechange()
      this.GetFdSchemes(this.Applicanttype, this.SelectedMembertype)
      this.GetDataBasedOnTenure()
    }
  }
  clearfields() {
    this.TenureMode = "";
    this.Tenure = ""
    this.FdTranscationform.controls.pInterestTenure.setValue("");
    this.FdTranscationform.controls.pInterestTenureMode.setValue("")
    this.ShowIntrestamountforintrest = false;
    this.Showmaturityamountforintrest = false;
    this.FdTranscationform.controls.pDepositAmount.setValue("");
    this.FdTranscationform.controls.pInterestPayOut.setValue("");
    this.FdTranscationform.controls.pInterestRate.setValue(0)
    this.MaturityAmnt = "";
    this.showintrestrate = false;
    this.showvalueper100 = false;
    this.IntrestAmount = "";
    this.Matrityamountontable = "";
    this.intrestamountontable = "";
    this.FdtranscationErrors = {}
  }
  GetMemberDetails(contacttype, membertype) {
    debugger
    if (membertype != "") {
      this._fdrdttranscationservice.GetMembersForFd(this.contactType, this.SelectedMembertype).subscribe(json => {
        debugger
        //console.log("Member details",json);
        this.memberdetails = json;
        $("#MemberData").kendoMultiColumnComboBox({
          dataTextField: "pMemberName",
          dataValueField: "pMemberId",
          height: 400,
          columns: [
            { field: "pMemberName", title: "Member", width: 200 },
            { field: "pMemberCode", title: "Member code", width: 200 },
            { field: "pContactnumber", title: "Contact No.", width: 200 },

          ],
          filter: "contains",
          filterFields: ["pMemberName", "pMemberId", "pContactnumber"],
          dataSource: this.memberdetails,
          select: this.SelectMemberData,
          change: this.CancelClick
        });

      })
    }
    else {
      this.memberdetails = ""
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
    debugger
    window['CallingFunctionToHideCard'].componentFn()
  }
  HideCard() {
    debugger
    if (this.FdTranscationform.controls['pMemberId'].value) {
      this.FdTranscationform.controls['pMemberId'].setValue('');
      this.FdTranscationform.controls['pMemberName'].setValue('');
      this.FdtranscationErrors = '';
    }
  }
  GetFdSchemes(Applicanttype, membertype) {
    debugger
    if (Applicanttype != undefined || membertype != undefined) {
      this._fdrdttranscationservice.GetFdSchemes(this.Applicanttype, this.SelectedMembertype).subscribe(json => {
        debugger
        this.FdSchemes = json
        //console.log("fdschemename",json);



      })
    }

  }
  Fdschemechange(event) {
    debugger;
    if (event != undefined) {
      this.clearFdschemechange();
      this.FdNameandCode = event.pFdnameCode
      this.FdCalculationmode = event.pFdCalculationmode;
      //this.FdTranscationform.controls.pFdConfigId.setValue(event.pFdConfigId)
      this.Fdconfigid = event.pFdConfigId;
      this.Fdname = event.pFdname;

      this.FdTranscationform.controls.pFdname.setValue(event.pFdname)
      this.FdTranscationform.controls.pFdcode.setValue(event.pFdcode)
      this.FdTranscationform.controls.pFdnameCode.setValue(event.pFdnameCode)
      this.FdTranscationform.controls.pFdCalculationmode.setValue(event.pFdCalculationmode);
      //this.clearfields()
      if (this.FdCalculationmode == "TABLE") {
        this.tenureontable = true;
        this.DepositAmountBasedontable = true;
        this.DepositAmountBaseconintrest = false;

        this.showtenureonintrest = false;
        this.showintrestrate = false;
        this.showcalculate = false;
        this.IntrestCompounding = false;
        this.GetTotalDetails(this.Fdname, this.Applicanttype)

      }
      else {
        this.GetDataBasedOnTenure()
        this.tenureontable = false;
        this.showtenureonintrest = true;
        this.DepositAmountBasedontable = false;
        this.DepositAmountBaseconintrest = true;
        // this.showintrestrate=true;
        // this.showcalculate = true;
        this.GetTotalDetails(this.Fdname, this.Applicanttype)
        this.GetTenureModes(this.Fdname, this.Applicanttype)

      }
    }

  }
  Tenuremodechanges(event) {
    debugger
    this.buttontype == "edit"
    this.TenureMode = this.buttontype == "edit" ? event : event.target.value

    if (this.FdCalculationmode == "TABLE") {
      this._fdrdttranscationservice.GetTenureDetails(this.Fdname, this.Fdconfigid, this.TenureMode, this.SelectedMembertype).subscribe(json => {
        debugger
        this.Tenuremodedetails = json
      })
      //this.GetDataBasedOnTenure()

    }
    else {
      if (this.TenureMode != undefined && this.Tenure != "" && this.TenureMode != "" && this.Tenure != undefined) {
        // this.CalculationforTenure(this.TenureMode, this.Tenure)
        // this.FdTranscationform.controls.pInterestPayOut.setValue("");
        // this.FdtranscationErrors={}
        //this.GetTenureAndIntrestRate();
        this.GetDataBasedOnTenure()
        this.calculateMaturityDate()
        this.showcard = true
      }
    }

  }
  GetTenureAndIntrestRate() {
    debugger
    if (this.TenureMode != "" && this.Tenure != "" && this.TenureMode != undefined && this.Tenure != undefined && this.FdCalculationmode != "TABLE") {
      this._fdrdttranscationservice.GetTenureAndIntrestRate(this.Fdname, this.depositamount, this.Tenure, this.TenureMode, this.Intrestpayout, this.SelectedMembertype).subscribe(res => {
        debugger;

        this.Caltype = res['pCaltype']
        //commisiontype:res['pReferralcommisiontype'],commisionvalue:res['pReferralCommisionvalue']}
        this._fdrdttranscationservice._setcommisiontype(res['pReferralcommisiontype'], res['pReferralCommisionvalue'])
        this.FdTranscationform.controls.pCaltype.setValue(res['pCaltype'])
        if (res['pTenureCount'] != 0) {
          if (res['pMinInterestRate'] && res['pMaxInterestRate'] != 0) {
            this.showintrestrate = true;
            this.showcalculate = true;
            this.showvalueper100 = false;
            this.Intrestratedisable = false;
            this.IntrestrateFrom = res['pMinInterestRate'];
            this.ratepersquareyard = res['pRatePerSquareYard']
            this.Intrestrate = this.IntrestrateFrom;
            this.FdTranscationform.controls.pInterestRate.setValue(this.IntrestrateFrom)
            this.IntrestrateTo = res['pMaxInterestRate'];
            if (this.interestvalidation != 0 && this.interestvalidation != undefined && this.interestvalidation != null) {
              this.callintrestratevalidation();
            }
          }
          else {

            this.Intrestratedisable = true;
            this.showcalculate = true;
            this.ratepersquareyard = res['pRatePerSquareYard']
            this.Intrestrate = res['pValuefor100']
            this.FdTranscationform.controls.pInterestRate.setValue(res['pValuefor100'])
            this.showvalueper100 = true;
            this.showintrestrate = false;
          }




          this.GetDataBasedOnTenure()


        }
        else {
          this.commonservice.showWarningMessage("Enter valid tenure");
          this.FdTranscationform.controls.pInterestTenure.setValue("");
          this.FdTranscationform.controls.pInterestTenureMode.setValue("");
          this.FdTranscationform.controls.pInterestRate.setValue(0)
          this.TenureMode = "";
          this.Tenure = "";

          this.FdTranscationform.controls.pInterestPayOut.setValue("")
        }
      })
    }

  }

  Tenurechanges(event) {
    debugger
    //this.DepositAmountdetails=[]
    this.buttontype == "edit"
    this.Tenure = this.buttontype == "edit" ? event : event.target.value
    if (this.FdCalculationmode == "TABLE") {
      this._fdrdttranscationservice.GetDepositAmount(this.Fdname, this.Fdconfigid, this.TenureMode, this.Tenure, this.SelectedMembertype).subscribe(json => {
        debugger
        this.DepositAmountdetails = json;
        this.DepositAmountBasedontable = true;
        if (this.buttontype == "new") {
          this.FdTranscationform.controls.pDepositAmount.setValue('')
        }
        else {

        }
        this.calculateMaturityDate()

      })

      //this.GetDataBasedOnTenure()

    }
    else {
      if (this.TenureMode != undefined && this.Tenure != "" && this.TenureMode != "") {
        // this.CalculationforTenure(this.TenureMode, this.Tenure);
        // this.GetDataBasedOnTenure()
        this.showcard = true;
        // this.FdTranscationform.controls.pInterestPayOut.setValue("")
        // this.FdtranscationErrors={}
        this.calculateMaturityDate()
        //this.GetTenureAndIntrestRate()
        this.GetDataBasedOnTenure()

      }
    }

  }
  GetTenureModes(Fdname, Applicanttype) {
    debugger
    this._fdrdttranscationservice.GetTenureModesnames(Fdname, Applicanttype, this.SelectedMembertype).subscribe(json => {
      this.tenuremodelist = json
    })
  }
  GetDataBasedOnTenureFn(ApplicantType, MemberType, FdconfigID, Fdname, Tenure, TenureMode, Depositamount) {
    debugger
    this._fdrdttranscationservice.GetDataBasedOnTenure(ApplicantType, MemberType, FdconfigID, Fdname, Tenure, TenureMode, Depositamount).subscribe(json => {
      if (this.FdCalculationmode != null) {
        if (this.FdCalculationmode == "TABLE") {
          debugger
          this.showIntrestcompounding = false

          this.Showmaturityamountforintrest = false;
          this.ShowIntrestamountforintrest = false;
          this.Showmaturityamount = true;
          this.ShowIntrestamount = true;
          this.DepositAmountBasedontable = true
          this.DepositAmountBaseconintrest = false;

          // this.FdTranscationform.controls.pInterestTenureMode.setValue(json['pInterestTenureMode'])
          // this._fdrdttranscationservice.GetTenureDetails(this.FdTranscationform.controls.pFdname, this.Fdconfigid)
          // this.FdTranscationform.controls.pInterestTenure.setValue(json['pInterestTenure'])
          this.FdSchemeDetails = json['fdInterestPayoutList']
          //this.FdTranscationform.controls.pDepositAmount.setValue(json['pDepositAmount'])
          //  this.FdTranscationform.controls.pMaturityAmount.setValue(json['pMaturityAmount'])
          //  this.FdTranscationform.controls.pInterestAmount.setValue(json['pInterestAmount'])
          this.FdTranscationform.controls.pInterestRate.setValue(0)

        }
        else {
          if (json['fdInterestPayoutList'] != null) {
            this.FdSchemeDetails = json['fdInterestPayoutList'];
            this.showIntrestcompounding = true;
            this.Showmaturityamount = false;
            this.ShowIntrestamount = false;
            this.showcalculate = true;
            if (this.Datatobind.pCaltype == "Value Per 100") {
              this.Intrestratedisable = true;
              this.showvalueper100 = true;
              this.showintrestrate = false
            }
            else {
              this.Intrestratedisable = false;
              this.showvalueper100 = false;
              this.showintrestrate = true;
            }
            this.Multiplesof = json['pMultiplesof']
            this.IntrestCompounding = json['pInterestType']

            //this.FdTranscationform.controls.pDepositAmount.setValue(0)
            this.FdTranscationform.controls.pMaturityAmount.setValue(0)
            this.Investmentperiodfrom = json['pInvestmentPeriodFrom']
            this.CalculationforInvestmentperiodfrom(this.Investmentperiodfrom)
            this.Investmentperiodto = json['pInvestmentPeriodTo']
            this.CalculationforInvestmentperiodTo(this.Investmentperiodto)
            this.IntrestrateFrom = json['pInterestRateFrom'];
            this.IntrestrateTo = json['pInterestRateTo'];
            this.MaxDepositAmount = json['pMaxdepositAmount']
            this.MinDepositAmount = json['pMinDepositAmount']
            //this.CalculationforIntrestRateFrom(this.IntrestrateFrom)
            this.Valueper100 = json['pInterestOrValueForHundred']
            this.FdTranscationform.controls.pInterestType.setValue(json['pInterestType'])

          }
          else {
            this.FdSchemeDetails = "";
            this.commonservice.showErrorMessage("Enter Valid Tenure");
            this.clearfields()
          }


          // this.FdTranscationform.controls.pInterestPayOut.setValue(json['pInterestPayOut'])
        }
      }

    })
  }
  GetDataBasedOnTenure() {
    debugger
    if (this.Applicanttype != undefined && this.SelectedMembertype != undefined && this.Fdconfigid != undefined &&
      this.Fdname != undefined && this.Tenure != undefined && this.Tenure != "" && this.TenureMode != "" && this.TenureMode != undefined && this.depositamount != undefined) {
      debugger
      this._fdrdttranscationservice.GetDataBasedOnTenure(this.Applicanttype, this.SelectedMembertype, this.Fdconfigid,
        this.Fdname, this.Tenure, this.TenureMode, this.depositamount).subscribe(json => {
          if (this.FdCalculationmode != null) {
            if (this.FdCalculationmode == "TABLE") {
              this.showIntrestcompounding = false

              this.Showmaturityamountforintrest = false;
              this.ShowIntrestamountforintrest = false;
              this.Showmaturityamount = true;
              this.ShowIntrestamount = true;
              this.DepositAmountBasedontable = true
              this.DepositAmountBaseconintrest = false;

              // this.FdTranscationform.controls.pInterestTenureMode.setValue(json['pInterestTenureMode'])
              // this._fdrdttranscationservice.GetTenureDetails(this.FdTranscationform.controls.pFdname, this.Fdconfigid)
              // this.FdTranscationform.controls.pInterestTenure.setValue(json['pInterestTenure'])
              this.FdSchemeDetails = json['fdInterestPayoutList']
              //this.FdTranscationform.controls.pDepositAmount.setValue(json['pDepositAmount'])
              //  this.FdTranscationform.controls.pMaturityAmount.setValue(json['pMaturityAmount'])
              //  this.FdTranscationform.controls.pInterestAmount.setValue(json['pInterestAmount'])
              this.FdTranscationform.controls.pInterestRate.setValue(0)

            }
            else {
              if (json['fdInterestPayoutList'] != null) {
                this.FdSchemeDetails = json['fdInterestPayoutList'];
                this.showIntrestcompounding = true;

                this.Showmaturityamount = false;
                this.ShowIntrestamount = false;

                this.Multiplesof = json['pMultiplesof']
                this.IntrestCompounding = json['pInterestType']

                //this.FdTranscationform.controls.pDepositAmount.setValue(0)
                this.FdTranscationform.controls.pMaturityAmount.setValue(0)
                this.Investmentperiodfrom = json['pInvestmentPeriodFrom']
                this.CalculationforInvestmentperiodfrom(this.Investmentperiodfrom)
                this.Investmentperiodto = json['pInvestmentPeriodTo']
                this.CalculationforInvestmentperiodTo(this.Investmentperiodto)
                this.IntrestrateFrom = json['pInterestRateFrom'];
                this.IntrestrateTo = json['pInterestRateTo'];
                this.MaxDepositAmount = json['pMaxdepositAmount']
                this.MinDepositAmount = json['pMinDepositAmount']
                //this.CalculationforIntrestRateFrom(this.IntrestrateFrom)
                this.Valueper100 = json['pInterestOrValueForHundred']
                this.FdTranscationform.controls.pInterestType.setValue(json['pInterestType'])

              }
              else {
                this.FdSchemeDetails = "";
                this.commonservice.showErrorMessage("Enter Valid Tenure");
                this.clearfields()
              }


              // this.FdTranscationform.controls.pInterestPayOut.setValue(json['pInterestPayOut'])
            }
          }

        })

    }

  }

  Depositchanges(event) {
    debugger
    this.depositamount = this.commonservice.removeCommasForEntredNumber(event.target.value)
    this.GetDataBasedOnTenure()
    this.TenureMode = "";
    this.Tenure = "";
    this.FdTranscationform.controls.pInterestTenure.setValue("");
    this.FdTranscationform.controls.pInterestTenureMode.setValue("");
    this.FdTranscationform.controls.pInterestRate.setValue(0);
    this.FdTranscationform.controls.pInterestPayOut.setValue("");
    this.IntrestAmount = "";
    this.MaturityAmnt = "";
    this.intrestamountontable = "";
    this.Matrityamountontable = "";
    // if(this.FdCalculationmode=='TABLE')
    // {

    // }
    // else
    // {
    //   if(this.Multiplesof!=0)
    //   {
    //     this.calculatedepositamount= this.depositamount%this.Multiplesof  
    //   if (this.depositamount >= this.MinDepositAmount &&  this.depositamount <= this.MaxDepositAmount)
    //  {
    //   this.CalculationForDepositAmount(this.calculatedepositamount)

    //   }
    //   else{
    //     this.commonservice.showWarningMessage("Deposit Amount is in between " + this.MinDepositAmount + "&" + this.MaxDepositAmount)
    //     this.FdTranscationform.controls.pDepositAmount.setValue("")
    //   }
    //   }
    //   else{
    //     if (this.depositamount < this.MinDepositAmount ||  this.depositamount > this.MaxDepositAmount)
    //     {
    //       this.commonservice.showWarningMessage("Deposit Amount is in between " + this.MinDepositAmount + "&" + this.MaxDepositAmount)   
    //       this.FdTranscationform.controls.pDepositAmount.setValue("")   
    //      }
    //   }
    // }
    this.FdtranscationErrors = {}

    this.GetDepositCount()
  }
  GetDepositCount() {
    debugger
    this._fdrdttranscationservice.GetDepositCount(this.Fdname, this.depositamount, this.SelectedMembertype).subscribe(res => {
      let count = res
      if (!count) {
        this.commonservice.showWarningMessage("Enter Valid Amount");
        this.FdTranscationform.controls.pDepositAmount.setValue("");
        this.depositamount = ""
      }
    })
  }
  CalculationForDepositAmount(depositamount) {
    if (this.calculatedepositamount != 0) {
      this.commonservice.showWarningMessage("Deposit Amount is Multiples of" + this.MinDepositAmount + "&" + this.MaxDepositAmount)
      this.FdTranscationform.controls.pDepositAmount.setValue("")
    }

  }
  CalculationforTenure(tenuremode, tenure) {
    debugger;

    if (this.Totalnooffromdays != undefined || this.Totalnooftodays != undefined) {
      if (tenuremode == "Months") {
        let DaysinMonths = Number(tenure * 30)
        if (DaysinMonths < this.Totalnooffromdays || DaysinMonths > this.Totalnooftodays) {
          this.commonservice.showWarningMessage("No of Days in between " + this.Totalnooffromdays + "&" + this.Totalnooftodays)
          this.FdTranscationform.controls.pInterestTenureMode.setValue("")
        }
      }
      else if (tenuremode == "Years") {
        let DaysinYears = Number(tenure * 365)
        if (DaysinYears < this.Totalnooffromdays || DaysinYears > this.Totalnooftodays) {
          this.commonservice.showWarningMessage("No of Days in between " + this.Totalnooffromdays + "&" + this.Totalnooftodays)
          this.FdTranscationform.controls.pInterestTenureMode.setValue("")
        }
      }
      else if (tenuremode == "Days") {
        let Days = Number(tenure);
        if (Days < this.Totalnooffromdays || Days > this.Totalnooftodays) {
          this.commonservice.showWarningMessage("No of Days in between " + this.Totalnooffromdays + "&" + this.Totalnooftodays)
          this.FdTranscationform.controls.pInterestTenureMode.setValue("")
        }
      }
    }


  }
  DepositDatechanges() {
    debugger;

    this.calculateMaturityDate()
  }
  CalculationforInvestmentperiodfrom(Investmentperiodfrom) {
    debugger
    if (Investmentperiodfrom != 0 && Investmentperiodfrom != null) {
      let a = Investmentperiodfrom.split(' ')
      let Noofdaysinyears = (a[0].slice(0, -1)) * 365
      let Noofdaysinmonths = (a[0].slice(0, -1)) * 30
      let Noofdays = Number((a[0].slice(0, -1)))
      this.Totalnooffromdays = Noofdaysinyears + Noofdaysinmonths + Noofdays
    }
    else {

    }

  }
  CalculationforInvestmentperiodTo(InvestmentperiodTo) {
    debugger
    if (InvestmentperiodTo != 0 && InvestmentperiodTo != null) {
      let a = InvestmentperiodTo.split(' ')
      let Noofdaysinyears = (a[0].slice(0, -1)) * 365
      let Noofdaysinmonths = (a[0].slice(0, -1)) * 30
      let Noofdays = Number((a[0].slice(0, -1)))
      this.Totalnooftodays = Noofdaysinyears + Noofdaysinmonths + Noofdays
    }

  }
  calculateMaturityDate() {
    debugger
    let tenuremode = this.FdTranscationform.controls.pInterestTenureMode.value;
    let tenure = this.FdTranscationform.controls.pInterestTenure.value;
    let depositdate = this.FdTranscationform.controls.pDepositDate.value;
    var maturityDate = new Date(depositdate);
    if (tenuremode == 'Days') {
      maturityDate.setDate(depositdate.getDate() + Number(tenure));
      this.FdTranscationform.controls.pMaturityDate.setValue(maturityDate);
    } else if (tenuremode == 'Months') {
      maturityDate.setMonth((depositdate.getMonth()) + Number(tenure));
      // maturityDate.setDate(maturityDate.getDate()-1);
      this.FdTranscationform.controls.pMaturityDate.setValue(maturityDate);
    } else {
      maturityDate.setFullYear(depositdate.getFullYear() + Number(tenure));
      // maturityDate.setDate(maturityDate.getDate()-1);
      this.FdTranscationform.controls.pMaturityDate.setValue(maturityDate);
    }
  }
  NextTabClick() {

    let str = "fd-ac"
    $('.nav-item a[href="#' + str + '"]').tab('show');
  }
  Intrestpayoutchanges(event) {
    debugger
    if (event != undefined) {
      this.Intrestpayout = event.pInterestPayOut;

      //this.Showmaturityamountforintrest=true;
      this.GetTenureAndIntrestRate()
    }
    //this.ShowIntrestamountforintrest=true;
  }
  Intrestratechanges(event) {
    debugger
    if (event != undefined) {
      this.GetintrestAmount();

      this.GetTenureAndIntrestRate()

      this.Intrestrate = this.commonservice.removeCommasForEntredNumber(event.target.value);
      this.interestvalidation = this.Intrestrate
      // if(this.IntrestrateFrom >0 && this.IntrestrateTo>0)
      // {
      //   if(event.target.value  < this.IntrestrateFrom || event.target.value > this.IntrestrateTo)
      //   {
      //     this.commonservice.showWarningMessage("Intrest rate is in between" + this.IntrestrateFrom + "&" + this.IntrestrateTo)
      //     this.FdTranscationform.controls.pInterestRate.setValue("")
      //   }
      // }
      this.GetDataBasedOnTenure()
    }
  }
  callintrestratevalidation() {
    debugger
    if (this.IntrestrateFrom > 0 && this.IntrestrateTo > 0) {
      if (this.interestvalidation < this.IntrestrateFrom || this.interestvalidation > this.IntrestrateTo) {
        this.commonservice.showWarningMessage("Enter valid Interest Rate")
        this.FdTranscationform.controls.pInterestRate.setValue(0)
      }
      else {
        this.FdTranscationform.controls.pInterestRate.setValue(this.interestvalidation);
        this.Intrestrate = this.interestvalidation
      }
    }

  }
  chitbranchchanges(event) {
    debugger;
    if (event != undefined) {
      this.FdTranscationform.controls.pChitbranchId.setValue(event.pBranchId)
    }
    //this.FdTranscationform.controls.pChitbranchname.setValue(event.pBranchname)
  }
  DepositAmountontablechanges(event) {
    debugger
    this.depositamountontable = parseInt(event.target.value)
    this.depositamount = parseInt(event.target.value)
    this.callintrestAmount()


  }
  callintrestAmount() {
    this._fdrdttranscationservice.InterestamountsofTable(this.Fdname, this.Fdconfigid, this.TenureMode, this.Tenure, this.depositamountontable, this.SelectedMembertype).subscribe
      (json => {
        this.intrestamountontable = parseInt(json[0].pInterestAmount)
        debugger
        if (this.intrestamountontable > 0) {
          this.ShowIntrestamount = true;
          this.ShowIntrestamountforintrest = false;
          this.FdTranscationform.controls.pInterestAmount.setValue(json[0].pInterestAmount)
          this.CallMaturityAmount()
        }
      })
  }
  CallMaturityAmount() {
    debugger
    this._fdrdttranscationservice.MaturityamountsofTable(this.Fdname, this.Fdconfigid, this.TenureMode, this.Tenure, this.depositamountontable, this.intrestamountontable, this.SelectedMembertype).subscribe
      (json => {
        debugger
        this.Matrityamountontable = parseInt(json[0].pMaturityAmount)
        if (this.Matrityamountontable > 0) {
          this.Showmaturityamount = true;
          this.Showmaturityamountforintrest = false;

          this.FdTranscationform.controls.pMaturityAmount.setValue(json[0].pMaturityAmount)
          this.CallIntrestPayout()
        }

      })
  }
  CallIntrestPayout() {
    debugger
    this._fdrdttranscationservice.PayoutsofTable(this.Fdname, this.Fdconfigid, this.TenureMode, this.Tenure, this.depositamountontable, this.intrestamountontable, this.Matrityamountontable).subscribe(json => {
      this.FdSchemeDetails = json
    })
  }
  checkValidations(group: FormGroup, isValid: boolean): boolean {
    debugger
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
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.FdtranscationErrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this.commonservice.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.FdtranscationErrors[key] += errormessage + ' ';
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
    this.commonservice.showErrorMessage(errormsg);
  }
  BlurEventAllControll(fromgroup: FormGroup) {
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

  SaveForm() {
    this.status = true;
    this.FdTranscationform.controls.pMemberId.setValue(this.MemberidSave)
    debugger
    let isValid = true;
    let data = JSON.stringify(this.FdTranscationform.value)
    if (this.checkValidations(this.FdTranscationform, isValid)) {
      debugger
      this.FdTranscationform.controls.pContacttype.setValue(this.contactType)
      //if(this.buttontype=="edit")
      //{
      //  debugger

      //  this.FdTranscationform.controls.pTransdate.setValue(this.datePipe.transform(this.FdTranscationform.controls.pTransdate.value, "yyyy/dd/MM"))
      //  this.FdTranscationform.controls.pDepositDate.setValue(this.datePipe.transform(this.FdTranscationform.controls.pDepositDate.value, "yyyy/dd/MM"))
      //  this.FdTranscationform.controls.pMaturityDate.setValue(this.datePipe.transform(this.FdTranscationform.controls.pMaturityDate.value,"yyyy/dd/MM"))
      //}
      //if(this.FdTranscationform.controls.pMaturityAmount)
      if (this.FdTranscationform.controls.pMaturityAmount.value == 0) {

        let tenuremode
        let tenure
        let depositamount
        let intrestpayout = this.Intrestpayout.toUpperCase()

        let intrestcompunding;
        if (this.buttontype == 'edit') {
          depositamount = this.Datatobind.pDepositAmount
          tenuremode = this.Datatobind.pInterestTenureMode;
          tenure = parseInt(this.Datatobind.pInterestTenure);
          intrestcompunding = this.Datatobind.pInterestType.toUpperCase();
        } else {
          depositamount = parseInt(this.depositamount)
          tenuremode = this.TenureMode.toUpperCase()
          tenure = parseInt(this.Tenure)
          intrestcompunding = this.IntrestCompounding.toUpperCase();
        }


        // let tenuremode = this.TenureMode.toUpperCase()
        // let tenure = parseInt(this.Tenure)
        // let intrestpayout = this.Intrestpayout.toUpperCase()
        // let depositamount = parseInt(this.depositamount)
        // let intrestcompunding = this.IntrestCompounding.toUpperCase()
        this._fdrdttranscationservice.GetIntrestAmount(tenuremode, tenure, depositamount,
          intrestpayout, intrestcompunding, this.Intrestrate, this.Caltype).subscribe(res => {

            //this.Showmaturityamountforintrest=true;
            //this.ShowIntrestamountforintrest=true;
            this.FdTranscationform.controls.pMaturityAmount.setValue(res[0].pMatueritytAmount)
            this.MaturityAmnt = res[0].pMatueritytAmount
            this.IntrestAmount = res[0].pInterestamount
            this.FdTranscationform.controls.pInterestAmount.setValue(res[0].pInterestamount)
            this.Save()

          })

      }
      else {
        this.Save()

      }

      //this.FdTranscationform.controls.pMemberId.setValue(this.Memberid)
      //this.FdTranscationform.controls.pFdConfigId.setValue(this.Fdconfigid)
    }
  }
  calculateRatePerSqaureYard() {
    debugger;

    if (this.ratepersquareyard != 0 && this.ratepersquareyard != undefined) {
      this.ratesquareyard = this.depositamount / this.ratepersquareyard;
      this.FdTranscationform.controls.pSquareyard.setValue(this.ratesquareyard);

    }

  }
  Save() {


    this.calculateRatePerSqaureYard()

    let data = JSON.stringify(this.FdTranscationform.value)

    // console.log("Get data", JSON.stringify(this.formattedData));
    // if (Object.entries(this.FdTranscationform.value).toString() === Object.entries(this.formattedData).toString()) {
    //   console.log("Changes not made");
    // }

    this._fdrdttranscationservice.SetBusinessEntityStatus(this.Businessentitystatus)
    this._fdrdttranscationservice.SaveFDMemberandSchemeData(data).subscribe(json => {
      debugger;
      //$('.nav-item a').removeClass('disableTabs');
      // let str = "add-joint-member"
      // $('.nav-item a[href="#' + str + '"]').tab('show');

      let resdata = { accountId: json['pFdAccountId'], accountNo: json['pFdaccountNo'] };
      this._CoJointmemberService._SetShareAccountdata(resdata);

      // this._CoJointmemberService._SetShareAccountdata(json);

      this._CoJointmemberService._setfdMembercode(this.Membercode, this.Memberid)
      let str = "add-joint-member"
      $('.nav-item a[href="#' + str + '"]').tab('show');

      this.GetApplicanttypes(this.contactType);
      this.contactType = "Individual"
      this.FdTranscationform.controls.pEntitytype.setValue("Individual")
      this.clearform();
      if (this.buttontype == "edit") {
        this.Membercode = this.FdTranscationform.controls.pMemberCode.value;
        this.Memberid = this.Datatobind.pMemberId
        this.FdTranscationform.controls.pIsJointMembersapplicable.setValue(this.Datatobind.pIsJointMembersapplicable);
        this.FdTranscationform.controls.pIsReferralsapplicable.setValue(this.Datatobind.pIsReferralsapplicable);
        this.FdTranscationform.controls.pIsNomineesapplicable.setValue(this.Datatobind.pIsNomineesapplicable);
        this._rdttranscationservice._Seteditdata(this.griddata)
      }
      this.showgrid = false;
      // this.griddata=[]
      this._fdrdttranscationservice._Setgriddata(this.griddata)
      this._CoJointmemberService._setfdMembercode(this.Membercode, this.Memberid)
      this.FdaccountNo = json['pFdaccountNo']
      this.FdAccountId = json['pFdAccountId']
      // this._fdrdttranscationservice._SetDataForJointMember(this.Applicanttype, this.FdAccountId, this.FdaccountNo, this.Contactid, this.contactrefid)

      // this._fdrdttranscationservice.GetFDMemberNomineeDetails(this.Membercode).subscribe(json => {
      //   debugger

      //   this.Nomineedetails = json;
      //   this._fdrdttranscationservice._GetNomineeDetails();
      //   this._fdrdttranscationservice.jointMember.next(this.Nomineedetails);


      // })
      this.showIntrestcompounding = false;
      this.showintrestrate = false;
      this.showvalueper100 = false
      this.FdSchemeDetails = ""
      this.DepositAmountBaseconintrest = false
      this.Showmaturityamount = false;

      this.Multiplesof = ""
      this.IntrestCompounding = ""
    })

  }


  back() {
    debugger;
    this.router.navigate(['/FdTransactionView']);
    // this.nomineeDetails.nomineeList=[];

  }

  clearFdschemechange() {
    this.FdTranscationform.controls.pDepositAmount.setValue('');
    this.tenureontable = false;
    this.FdTranscationform.controls.pInterestTenureMode.setValue('');
    this.FdTranscationform.controls.pInterestTenure.setValue('');
    this.Tenuremodedetails = [];
    this.showtenureonintrest = false;
    this.FdTranscationform.controls.pInterestTenureMode.setValue('');
    this.tenuremodelist = [];
    this.DepositAmountBasedontable = false;
    this.FdTranscationform.controls.pDepositAmount.setValue('');
    this.DepositAmountdetails = [];
    this.FdTranscationform.controls.pInterestPayOut.setValue('');
    this.FdSchemeDetails = [];
    this.showintrestrate = false;
    this.FdTranscationform.controls.pInterestRate.setValue(0);
    this.showvalueper100 = false;
    this.showcalculate = false;
    this.ShowIntrestamount = false;
    this.intrestamountontable = 0;
    this.Showmaturityamount = false
    this.Matrityamountontable = 0;
    this.ShowIntrestamountforintrest = false;
    this.IntrestAmount = 0;
    this.Showmaturityamountforintrest = false;
    this.MaturityAmnt = 0;
    this.FdTranscationform.controls.pMaturityDate.setValue(new Date());
    this.FdTranscationform.controls.pDepositDate.setValue(new Date());
    this.TenureMode = "";
    this.Tenure = "";
    this.IntrestAmount = "";
    this.MaturityAmnt = "";
    this.intrestamountontable = "";
    this.Matrityamountontable = "";
    this.FdtranscationErrors = {};
  }
  clearform() {
    this.FormGroup();
    this.buttontype = "new";

    this.FdTranscationform.controls.pMemberId.setValue(null)
    this.IntrestAmount = "";
    this.MaturityAmnt = "";
    this.intrestamountontable = "";
    this.Matrityamountontable = "";
    this.showcalculate = false;
    this.ShowIntrestamount = false;
    this.showintrestrate = false;
    this.showvalueper100 = false;
    this.Memberid = "";
    this.MemberidSave = ""
    this.Intrestratedisable = false
    this.Showmaturityamount = false;
    this.showtenureonintrest = false;
    this.Showmaturityamountforintrest = false;
    this.ShowIntrestamountforintrest = false;
    this.griddata = [];
    this.showgrid = true;
    this.Fdname = "";
    this._fdrdttranscationservice.Newformstatus("new")
    this.ngOnInit()



  }

}

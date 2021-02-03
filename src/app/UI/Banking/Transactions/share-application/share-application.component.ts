import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/Services/Transaction/transaction.service';
import { CommonService } from 'src/app/Services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FdRdServiceService } from 'src/app/Services/Banking/fd-rd-service.service';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { FdRdTransactionsService } from 'src/app/Services/Banking/Transactions/fd-rd-transactions.service';
import { ShareapplicationService } from 'src/app/Services/Banking/shareapplication.service';
import { CoJointmemberService } from 'src/app/Services/Common/co-jointmember.service'
import { from } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-share-application',
  templateUrl: './share-application.component.html',
  styles: []
})
export class ShareApplicationComponent implements OnInit {

  /**
  * Bs Date picker initiliazation
  */
  public pdateofbirthConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private transactionService: TransactionService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private _fdrdservice: FdRdServiceService,
    private _loanmasterservice: LoansmasterService,
    private _CoJointmemberService: CoJointmemberService,
    private _FIIndividualService: FIIndividualService,
    private datepipe: DatePipe,
    private router: Router, private _ShareapplicationService: ShareapplicationService) {
    this.pdateofbirthConfig.containerClass = 'theme-dark-blue';
    this.pdateofbirthConfig.dateInputFormat = 'DD/MM/YYYY';
    this.pdateofbirthConfig.maxDate = new Date();
    this.pdateofbirthConfig.showWeekNumbers = false;
  }
  shareAppForm: FormGroup;
  selectedShareCapitalConfigId: any;
  selectedShareCapitalName: any;
  memberTypeId: any
  memberType: any;
  shareAppErrorMessage: any;
  memberTypeDetails: any;
  shareCapitalNames: any;
  allSearchMembers: any;
  faceValueofShare: any;
  toatlFaceValueofShare: any;
  applicantTypes: any;
  applicantTypeId: any;
  applicantType: any;
  public Sharconfigdetails: any = [];
  public Maxshare: any;
  public Minshare: any;
  public searchMemberId: any;
  public searchMemberName: any;
  public loading = false;
  ngOnInit() {

    /**
     * Error message object initialization
     */
    this.shareAppErrorMessage = {};

    this.shareAppForm = this.formBuilder.group({
      pshareapplicationid: 0,
      pShareAccountNo: [''],
      pismemberfeeapplicable: [true, Validators.required],
      pmembertypeid: ['', Validators.required],
      pmembertype: [''],
      pmemberid: [''],
      pmembername: [''],
      pmembercode: [''],
      pcontactid: [''],
      pApplicanttype: ['', Validators.required],
      pshareconfigid: ['', Validators.required],

      preferenceno: 0,
      pfacevalue: 0,
      pnoofsharesissued: ['', Validators.required],
      pdistinctivefrom: 0,
      pdistinctiveto: 0,
      ptotalamount: 0,
      pTransdate: [new Date()],
      psharedate: [new Date()],
      pshareissuedate: [new Date()],
      pprintstatus: ['N'],
      psharestatus: ['N'],
      pCreatedby: [this.commonService.pCreatedby],
      pShareName: [''],
    });
    /**
     * Form initialization of share App form (end).
     */
    this.cleadata();
    this.Membershipfeeapplicable('true');

  }

  /////////masthn

  /**
   *Membershipfeeapplicable
   */
  Membershipfeeapplicable(click) {
    debugger
    click = (click == "true");
    //    this.shareAppForm.controls.pismemberfeeapplicable.setValue(click);
    this.cleadata();
    this.transactionService.getMemberTypeDetailsList().subscribe(json => {
      if (json) {
        this.memberTypeDetails = json;
        this.memberTypeDetails = this.memberTypeDetails.filter(itm => itm.pismembershipfeeapplicable == click);
      }
    });
   
  }

  /**
     * Member type changing here
     */
  memberTypeChange(event) {
    debugger
    if (event) {
      this.memberTypeId = Number(event.pmembertypeid);
      this.memberType = event.pmembertype;
      this.shareAppForm.controls.pmembertypeid.setValue(event.pmembertypeid);
      this.shareAppForm.controls.pmembertype.setValue(event.pmembertype);
      this.shareAppErrorMessage.pmembertype = '';
      this.shareAppForm.controls['pmembercode'].setValue('');
      this.shareAppForm.controls['pcontactid'].setValue('');
      this.shareAppForm.controls['pmembername'].setValue('');
      this.shareAppForm.controls.pApplicanttype.setValue('');
      this.shareAppForm.controls.pshareconfigid.setValue('');
      this.shareAppForm.controls.pShareName.setValue('');
      this.selectedShareCapitalName='';
      this.Minshare='';
      this.Maxshare='';
      this.faceValueofShare='';
      this.shareCapitalNames=[];
      this.shareAppForm.controls.ptotalamount.setValue('');
      this.shareAppForm.controls.pnoofsharesissued.setValue('');

      let ismemberfeeapplicable = this.shareAppForm.value.pismemberfeeapplicable;
      this.getAllInsuranceSearchMembers(this.memberType, ismemberfeeapplicable);
      this.getApplicantTypes('Individual');

    }
  }
  /**
   * Member type changing here and calling (end).
   */


  /**
     *  search member (start).
     */
  getAllInsuranceSearchMembers(Membertype, Receipttype) {
    debugger;
    this._ShareapplicationService.GetMembers(Membertype, Receipttype).subscribe(json => {
      if (json) {
        this.allSearchMembers = json;


      }
    });

  }
  /**
 * Search member changing here 
 */
  MemberChanges(event) {
    debugger
    if (event) {
      this.searchMemberId = event.pMemberId;
      this.searchMemberName = event.pMemberName;
      this.shareAppForm.controls.pmembercode.setValue(event.pMemberCode);
      this.shareAppForm.controls.pcontactid.setValue(event.pContactid);
      this._CoJointmemberService._setfdMembercode(event.pMemberCode, event.pMemberId)
    }
  }
  /**
   *Search member changing here and calling (end). 
   */

  /**
    * Applicant Types api to get all applicants (start).
    */
  getApplicantTypes(type) {

    if (type && type != undefined && type != '') {
      this._loanmasterservice.GetApplicanttypes(type, 0).subscribe(json => {
        if (json) {
          this.applicantTypes = json;
        }
      })
    }

  }
  /**
   * Applicant Types api to get all applicants (end).
   */
  /**
     * Applicant type changing
     */
  applicantTypeChange(event) {
    debugger
    if (event) {
      this.applicantTypeId = Number(event.target.value);
      this.applicantType = event.target.options[event.target.selectedIndex].text;
      this.shareAppForm.controls.pApplicanttype.setValue(this.applicantType);
      this.getShareNames(this.memberType, this.applicantType);

    }
  }
  /**
   * Applicant type changing here and calling (end).
   */


  getShareNames(Membertype, Applicanttype) {
    debugger
    this.shareCapitalNames = [];
    this.shareAppForm.controls.ptotalamount.setValue('');
    try {
      this._ShareapplicationService.getShareNames(Membertype, Applicanttype).subscribe(res => {
        if (res) {
          this.shareCapitalNames = res;
        }
      });
    } catch (error) {
      this.showErrorMessage(error);
    }
  }
  /**
     * Share capital name changing
     */
  shareCapitalNameChange(event) {
    if (event) {
      this.shareAppForm.controls.pnoofsharesissued.setValue('');
      this.shareAppForm.controls.ptotalamount.setValue('');
      this.selectedShareCapitalConfigId = Number(event.target.value);
      this.selectedShareCapitalName = event.target.options[event.target.selectedIndex].text;
      this.shareAppForm.controls.pshareconfigid.setValue(this.selectedShareCapitalConfigId);
      this.shareAppForm.controls.pShareName.setValue(this.selectedShareCapitalName);
      this.getSharconfigdetails(this.selectedShareCapitalConfigId, this.applicantType);
    }
  }
  getSharconfigdetails(shareconfigid, Applicanttype) {
    debugger
    try {
      this._ShareapplicationService.getSharconfigdetails(shareconfigid, Applicanttype).subscribe(res => {
        if (res) {
          this.Sharconfigdetails = res;
          this.faceValueofShare = this.Sharconfigdetails[0]['pFacevalue'];
          this.shareAppForm.controls.pfacevalue.setValue(this.faceValueofShare);
          this.Maxshare = this.Sharconfigdetails[0]['pMaxshare'];
          this.Minshare = this.Sharconfigdetails[0]['pMinshare'];
        }
      });
    } catch (error) {
      this.showErrorMessage(error);
    }
  }

  /**
  * Calculation of Toatl face value of Share (start).
  * Multiplication of face value of share and no. of shares issued.
  */
  calculateToatlFaceValueofShare() {
    debugger;
    let pnoofsharesissued = this.shareAppForm.value.pnoofsharesissued ? Number(this.shareAppForm.value.pnoofsharesissued.replace(/,/g, "")) : 1;
    this.shareAppForm.controls.pnoofsharesissued.setValue(pnoofsharesissued);
    if (this.Minshare > pnoofsharesissued || this.Maxshare < pnoofsharesissued) {
      this.commonService.showWarningMessage('Shares must be between ' + this.Minshare + ' - ' + this.Maxshare);
      this.shareAppForm.controls.pnoofsharesissued.setValue('');
      this.shareAppForm.controls.ptotalamount.setValue('');
      this.toatlFaceValueofShare = '';
      return;
    }
    this.toatlFaceValueofShare = this.faceValueofShare * pnoofsharesissued;
    let TotalAmount = this.toatlFaceValueofShare < 0 ? '(' + this.commonService.currencyformat(Math.abs(this.toatlFaceValueofShare)) + ')' : this.commonService.currencyformat(this.toatlFaceValueofShare);

    this.shareAppForm.controls.ptotalamount.setValue(TotalAmount);
    this.shareAppForm.controls.pnoofsharesissued.setValue(pnoofsharesissued);
  }

  /**
   * Api to save the share app data with appropriate DTO structure (start).
   */
  saveShareApplication() {
    debugger
    this.loading = true;
    let isValid = true;
    if (this.checkValidations(this.shareAppForm, isValid)) {

      if (this.searchMemberId == '') {
        this.loading = false;
        this.commonService.showErrorMessage("Select Member");
        return;
      }
      else {
        this.shareAppForm.controls.pmemberid.setValue(this.searchMemberId);
        this.shareAppForm.controls.pmembername.setValue(this.searchMemberName);
        this.shareAppForm.controls.ptotalamount.setValue(this.toatlFaceValueofShare);
        let formdata = '';
        formdata = this.shareAppForm.value;
        let jsondata = JSON.stringify(formdata);
        this._ShareapplicationService.SaveShareApplication(jsondata).subscribe(res => {
          this.commonService.showInfoMessage('Saved Successfully');
          let resdata = { accountId: res['pshareapplicationid'], accountNo: res['pShareAccountNo'] };
          this._CoJointmemberService._SetShareAccountdata(resdata);
          let str = "add-joint-member"
          $('.nav-item a[href="#' + str + '"]').tab('show');
        });

      }

    }
    else {
      this.loading = false;
    }

  }

  /**
   * Api to save the share app data with appropriate DTO structure (end).
   */
  cleadata() {
    this.allSearchMembers = [];
    this.memberTypeId = '';
    this.memberType = '';
    this.searchMemberId = '';
    this.applicantTypes = [];
    this.shareCapitalNames = [];
    this.memberTypeDetails=[];
    this.shareAppForm.controls.pmembertype.setValue('');
    this.shareAppForm.controls.pmembername.setValue('');
    this.shareAppForm.controls.pmembertypeid.setValue('');
    
    this.shareAppForm.controls.pApplicanttype.setValue('');
    this.shareAppForm.controls.pShareName.setValue('');
    this.shareAppForm.controls.pnoofsharesissued.setValue('');
    this.shareAppForm.controls.ptotalamount.setValue('');
    this.shareAppForm.controls.preferenceno.setValue('');
    this.memberType = '';
    this.searchMemberName = '';
    this.applicantType = '';
    this.selectedShareCapitalName = '';
    this.Maxshare = '';
    this.Minshare = '';
    this.toatlFaceValueofShare = '';
    this.faceValueofShare = '';
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
          this.shareAppErrorMessage[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;

            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this.commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.shareAppErrorMessage[key] += errormessage + ' ';
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
  /**
   * Share capital name changing here and calling (end).
   */
  showErrorMessage(errormsg: string) {
    this.commonService.showErrorMessage(errormsg);
  }
  showInfoMessage(errormsg: string) {
    this.commonService.showInfoMessage(errormsg);
  }

  back() {
    debugger;
    this.router.navigate(['/ShareApplication']);
  }
}

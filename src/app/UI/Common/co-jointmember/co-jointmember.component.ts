import { Component, OnInit, ViewChild, Input, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { CoJointmemberService } from 'src/app/Services/Common/co-jointmember.service'
import { NomineedetailsComponent } from '../../Banking/Transactions/FD-AC-Creation/nomineedetails.component';
import { ActivatedRoute } from '@angular/router';
import { RdTransactionsService } from 'src/app/Services/Banking/Transactions/rd-transactions.service';
declare let $: any
@Component({
  selector: 'app-co-jointmember',
  templateUrl: './co-jointmember.component.html',
  styleUrls: []
})
export class CoJointmemberComponent implements OnInit {
  @Input() jointmemberdata: any;
  @ViewChild(NomineedetailsComponent, { static: false }) nomineeDetails: NomineedetailsComponent
  gridsum: any;
  accounttype: any;
  ShowJointmembersvalidation: boolean = false;;
  AddNomineevalidation: any;
  showNominee = false;
  nomineeDetailsEditData: any;
  JointMemberErrorMessages: any = {}
  MembersandContactDetailsList: any = []
  ShowJointmembers: boolean = false;
  jointMembervalidation: boolean = false;
  MemberDetailsListAll: any = [];
  Data: any = [];
  editdata: any = [];
  ShowSaveClearbuttons: boolean = true;
  newlist = []
  nomineeList: any;
  constructor(private _fb: FormBuilder, private _commonservice: CommonService,
    private _CoJointmemberService: CoJointmemberService, private _route: ActivatedRoute, private _rdtranscationservice: RdTransactionsService) {
      debugger
      
     }
  JointMemberAndNomineeForm: FormGroup;
  ngOnInit() {
    debugger;
    this.FormGroup();

    this.accounttype = this.jointmemberdata.accounttype;
    this.JointMemberAndNomineeForm.controls.paccounttype.setValue(this.accounttype);
    this.ShowJointmembersvalidation = this.jointmemberdata.AddJointMembervalidation;
    if (this.ShowJointmembersvalidation == true) {
      this.ShowJointmembers = true;
      this.GetMembers();
      this.jointMembervalidation = true
      this.JointMemberAndNomineeForm.controls.pIsjointapplicableorNot.setValue(true)
    } else {
      this.ShowJointmembers = false;
      this.jointMembervalidation = false
      this.JointMemberAndNomineeForm.controls.pIsjointapplicableorNot.setValue(false)
    }
    this.AddNomineevalidation = this.jointmemberdata.AddNomineevalidation;
    if (this.AddNomineevalidation == true) {
      this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(true)
      this.showNominee = true;
    } else {
      this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(false)
      this.showNominee = false;
    }
    this._rdtranscationservice.getMemberNomineeDetails().subscribe(message => { this.newlist = message; });
    console.log('2nd tab nominee',this.newlist);
    if (this._route.snapshot.params['id']) {
      this.Editdata();
    }
  }
  Editdata() {
    debugger
    this.editdata = this._rdtranscationservice.GetDetailsForEdit();
    this.JointMemberAndNomineeForm.controls.pTypeofOperation.setValue("UPDATE");
    this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(this.editdata.pIsNomineesapplicable)
    if (this.editdata.jointMembersandContactDetailsList.length > 0) {
      // this.ShowJointmemberstable=true;
      this.ShowJointmembers = true;
      this.MembersandContactDetailsList = this.editdata.jointMembersandContactDetailsList
      this.JointMemberAndNomineeForm.controls.precordid.setValue(this.editdata['jointMembersandContactDetailsList'].precordid)
      this.JointMemberAndNomineeForm.controls.pIsjointapplicableorNot.setValue(this.editdata.pIsJointMembersapplicable)
      this.GetMembers();
    }
    else {
      this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(false)
      //this.ShowJointmemberstable=false;
      this.ShowJointmembers = false;
      this.MembersandContactDetailsList = []
    }
    if (this.editdata.memberNomineeDetailsList.length > 0) {
      this.showNominee = true;
      this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(true)
      this.showNominee = true;
      // this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(this.editdata.pIsNomineesapplicable)
      //this.editdata.memberNomineeDetailsList = this.editdata.memberNomineeDetailsList.filter(itm => itm.pisprimarynominee = itm.pisprimarynominee.toString());
      this.newlist.push(this.editdata.memberNomineeDetailsList);
      this.nomineeDetailsEditData = this.editdata.memberNomineeDetailsList;
      // this.nomineeDetails.nomineeList.push(this.editdata.memberNomineeDetailsList)
      // let primary=this.nomineeDetails.nomineeList.filter(data=>data.pisprimarynominee=="true")
      // this.nomineeDetails.checkedlist=primary

    }
    //this.formatteddata=this.JointMemberAndNomineeForm.value

  }
  FormGroup() {
    this.JointMemberAndNomineeForm = this._fb.group
      ({
        precordid: [0],
        paccounttype: [''],
        pAccountId: [''],
        paccountNo: [''],
        pCreatedby: [this._commonservice.pCreatedby],
        pIsjointapplicableorNot: false,
        pMemberId: [''],
        pIsNomineesApplicableorNot: false,
        pTypeofOperation: ['CREATE'],
      })
  }

  JointMemberchange(event) {
    debugger
    if (event.target.checked) {
      this.ShowJointmembers = true;
      this.GetMembers();
      this.jointMembervalidation = true
      this.JointMemberAndNomineeForm.controls.pIsjointapplicableorNot.setValue(true)
    }
    else {
      this.jointMembervalidation = false;
      this.ShowJointmembers = false;
      this.MembersandContactDetailsList = []
    }
  }

  GetMembers() {
    debugger
    let a = this._CoJointmemberService._Getcontacttype();
    this._CoJointmemberService.GetJointMembers(a['membercode'], a['Contacttype']).subscribe(result => {
      this.MemberDetailsListAll = result
    })

  }
  MemberChange(event) {

    console.log("event", event)
    if (event != undefined && event != "" && event != null)
     {
      this.Data = {
        pMemberName: event.pContactName, pMemberCode: event.pMemberReferenceId, pMemberId: event.pMembertypeId,
        pContactid: event.pContactId, pContactrefid: event.pContactReferenceId, pContacttype: event.pContacttype, pContactnumber: event.pContactNo, pTypeofOperation: 'CREATE', precordid: 0
      }
    }

  }
  AddJointMembers() {
    debugger
    let isValid: boolean = true;
    // if(this.checkValidations(this.JointMemberAndNomineeForm,isValid))
    // {
    let membeid = this.Data['pMemberId'];
    const Checkexistcount = this.MembersandContactDetailsList.filter(s => s.pMemberId == membeid).length;
    if (Checkexistcount == 0) {

      this.MembersandContactDetailsList.push(this.Data);

      this.JointMemberAndNomineeForm.controls.pMemberId.setValue('');

    }
    else {
      this._commonservice.showWarningMessage("Member already exists in grid.")
    }
    // }
    //     return isValid


  }
  removeHandler(event) {
    this.MembersandContactDetailsList.splice(event.rowIndex, 1);
  }
  Nomineechange(event) {
    debugger;
    if (event.target.checked) {
      this.showNominee = true;
      this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(true);

    }
    else {
      this.showNominee = false
      //   this.nomineeDetails.showpercentage=false
      //  this.nomineeDetails.nomineeList.length=0
      this.JointMemberAndNomineeForm.controls.pIsNomineesApplicableorNot.setValue(false);

    }
  }

  NextTabclick() {
    debugger;


    let Membercodedata = this._CoJointmemberService._GetShareAccountdata();
    this.JointMemberAndNomineeForm.controls.pAccountId.setValue(Membercodedata['accountId']);
    this.JointMemberAndNomineeForm.controls.paccountNo.setValue(Membercodedata['accountNo']);
    this.nomineeList = '';
    this.nomineeList = this._CoJointmemberService._GetnomineeList();

    if (this.ShowJointmembers == true && this.MembersandContactDetailsList.length == 0) {
      this._commonservice.showWarningMessage("Add Joint Member");
      return;
    }
    let nomineeListempty = this.isEmpty(this.nomineeList);
    if (this.showNominee == true && nomineeListempty == true) {
      this._commonservice.showWarningMessage("Add Nominee Details");
      return;
    }


    if (this.showNominee == true) {
      if (this.validatepercentage()) {
        if (this.checkcount()) {
          this.Save()
        }
      }
    }else{
      this.Save()
    }




    // this.loading = true;




  }

  Save() {
    debugger

    // let Membercodedata = this._CoJointmemberService._GetShareAccountdata();
    // this.JointMemberAndNomineeForm.controls.pAccountId.setValue(Membercodedata['pRdAccountId']);
    // this.JointMemberAndNomineeForm.controls.paccountNo.setValue(Membercodedata['pRdaccountNo']);
    // this.nomineeList = '';
    // this.nomineeList = this._CoJointmemberService._GetnomineeList();

    // if (this.ShowJointmembers == true && this.MembersandContactDetailsList.length == 0) {
    //   this._commonservice.showWarningMessage("Add Member");
    //   return;
    // }
    let nomineeListempty = this.isEmpty(this.nomineeList);
    // if (this.showNominee == true && nomineeListempty == true) {
    //   this._commonservice.showWarningMessage("Add Nominee");
    //   return;
    // }
    let nominedetails = { nomineeDetailsList: this.nomineeList }
    if (nomineeListempty == true) {
      nominedetails = { nomineeDetailsList: [] }
    }
    let MembersandContactDetailsList = { jointDetailsList: this.MembersandContactDetailsList };
    let data = JSON.stringify(Object.assign(this.JointMemberAndNomineeForm.value, MembersandContactDetailsList, nominedetails));
    this._CoJointmemberService.SaveJointMember(data).subscribe(json => {
      if (json) {
        let str = "refferral"
        $('.nav-item a[href="#' + str + '"]').tab('show');

      }
    })
  }
  isEmpty(obj) {
    return !obj || !Object.keys(obj).some(x => obj[x] !== void 0);
  }

  validatepercentage() {

    debugger;
    let isValid = true;
    if (this.nomineeList.length > 0) {
      let gridsum = 0;
      this.gridsum = this.nomineeList.reduce((sum, item) => sum + parseFloat(item.pPercentage), 0);
      if (this.gridsum == 0 || this.gridsum < 100) {
        isValid = false;
        this._commonservice.showWarningMessage("Enter Valid Percentage")
      }
      else if (this.gridsum > 100) {
        isValid = false;
        this._commonservice.showWarningMessage("Enter Valid Percentage")
      }

    }
    return isValid
  }
  checkcount() {
    debugger
    let isValid = true
    //console.log("nomineelist",this.nomineeDetails.nomineeList)
    let count = this.nomineeList.filter(data => data.pPercentage == 0).length
    if (count != 0 && this.gridsum > 100) {

      this._commonservice.showWarningMessage("Enter valid percentage");
      // this.nomineeDetails.nomineeList[0].pPercentage.setValue("")
      isValid = false
    }
    else {
      isValid = true
    }
    return isValid

  }
}
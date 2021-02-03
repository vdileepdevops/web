import { Component, OnInit, Output, ViewChild, EventEmitter, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray, MinLengthValidator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { GroupService } from 'src/app/Services/Common/group.service';
import { CommonService } from 'src/app/Services/common.service';
import { Router, NavigationEnd } from '@angular/router';
import { TagListComponent } from '@progress/kendo-angular-dropdowns';
@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styles: []
})

export class GroupCreationComponent implements OnInit {
  @ViewChild(ContactSelectComponent, { static: false }) ContactSelectComponentData: ContactSelectComponent;
  public disableRoleintheGroup: boolean;
  public checkvalue: boolean;
  public CreateGroupform: FormGroup;
  public tempFrom: FormGroup;
  public submitted = false;
  public CreateGroupformArrayview: any = [];
  public CreateGroupformArray: any = [];
  public view: [];
  public rolename: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 100
  };
  public isNew: boolean;
  public ShowContactBusiness: Boolean
  public ApplicantData: any;
  public gContactId: any;
  public gApplicantname: any;
  public gContactreferenceid: any;
  public gContacttype: any;
  public gApplicanttype: any;
  public gApplicantConfigStatus: any;
  public GetContactPersonDataArray: any = [];
  public roleInTheGroupData: any = [];
  public gBusinessEntitycontactNo: any;
  public GroupcreationValidationErrors: any;
  public groupDetails: any;
  public editArraydata: any;
  public editedIds: any;
  public control: any = [];
  previousUrl: string;

  constructor(private fb: FormBuilder, private toaster: ToastrService, private _FIIndividualService: FIIndividualService, private _GroupService: GroupService, private _commonService: CommonService, private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
        //this.previousUrl = e['url'];
        //console.log('prev:', this.previousUrl);
      });
  }

  ngOnInit() {
    
    // check group head selected or not
    this.checkvalue = false;
    this.GroupcreationValidationErrors = {}
    this.disableRoleintheGroup = false;
    this.ApplicantData = {};
    this.ShowContactBusiness = false;
    this.CreateGroupform = this.fb.group({
      createdby: [0],
      modifiedby: [0],
      pGroupID: [0],
      pGroupType: ['', Validators.required],
      pGroupName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      pGroupCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      pMembersCount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1), Validators.max(99)]],
      pGroupSeries: [0],
      pGroupNo: [''],
      pGroupMembersRole: [''],
      pContactNo: [''],
      pTransactionType: [''],
      pCreatedby: [0],
      pModifiedby: [0],
      pCreateddate: [''],
      pModifieddate: [''],
      pStatusid: [''],
      pStatusname: [''],
      pEffectfromdate: [''],
      pEffecttodate: [''],
      ptypeofoperation: [''],
      pGrouproleID: ['', Validators.required],
      pListGroupDetails: this.fb.array([])
    });
    this.BlurEventAllControll(this.CreateGroupform);
    /** Get Group Role Inthe Group */
    this.getGroupService();

    /**Edit Form */
    this.editedIds = this._GroupService.GetGroupRowEditClick();
    if (this.editedIds != undefined) {
      this._GroupService.editData(this.editedIds).subscribe(res => {
        this.editArraydata = res;
        for (let i = 0; i < res['pListGroupDetails'].length; i++) {
          this.control = <FormArray>this.CreateGroupform.controls['pListGroupDetails'];
          this.control.push(this.getUnit());
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactID"].setValue(res['pListGroupDetails'][i].pContactID);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactName"].setValue(res['pListGroupDetails'][i].pContactName);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactRefId"].setValue(res['pListGroupDetails'][i].pContactRefId);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactNo"].setValue(res['pListGroupDetails'][i].pContactNo);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pMemberId"].setValue(res['pListGroupDetails'][i].pMemberId);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pGrouproleID"].setValue(res['pListGroupDetails'][i].pGrouproleID);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pRoleInGroup"].setValue(res['pListGroupDetails'][i].pRoleInGroup);
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pTypeofOperation"].setValue('update');
          this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pRecordId"].setValue(res['pListGroupDetails'][i].pRecordId);
        }
        this.CreateGroupformArrayview = this.CreateGroupform.value.pListGroupDetails;
        this.CreateGroupform.controls.pGroupCode.setValue(res['pGroupCode']);
        this.CreateGroupform.controls.pGroupName.setValue(res['pGroupName']);
        this.CreateGroupform.controls.pMembersCount.setValue(res['pMembersCount']);
        this.CreateGroupform.controls.pGroupType.setValue(res['pGroupType']);
        this.CreateGroupform.controls.ptypeofoperation.setValue('update');
      },
        (error) => {
          this.showErrorMessage(error);
        });
    }
  }
  private getUnit() {

    return this.fb.group({
      pContactID: [''],
      pContactName: [''],
      pContactRefId: [''],
      pMemberId: [0],
      pContactNo: [''],
      pGrouproleID: [''],
      pRoleInGroup: [''],
      pTypeofOperation: [''],
      pRecordId: [0]
    });

  }

  ngAfterViewInit() {
    this.ContactSelectComponentData.refreshContactSelectComponent();
  }

  showErrorMessage(errormsg: string) {
    this._commonService.showErrorMessage(errormsg);
  }

  showInfoMessage(errormsg: string) {
    this._commonService.showInfoMessage(errormsg);
  }

  //----------------VALIDATION----------------------- //
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
          this.checkValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          this.GroupcreationValidationErrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.GroupcreationValidationErrors[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      this.showErrorMessage(e);
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

  //----------------VALIDATION----------------------- //

  /** Get Group Role Inthe Group */
  public getGroupService() {

    this._GroupService.GetRoles().subscribe(res => {
      this.roleInTheGroupData = res;
    },
      (error) => {
        this.showErrorMessage(error);
      });
  }


  get f() { return this.CreateGroupform.controls; }

  /**
   * 
   * Get  Contact Person Data
   */

  public GetContactPersonData(data) {
    if (data) {
      this.gContactId = data.pContactId;
      this.gApplicantname = data.pContactName;
      this.gContactreferenceid = data.pReferenceId;
      this.gBusinessEntitycontactNo = data.pBusinessEntitycontactNo;
      this.gApplicantConfigStatus = 'NO';
      this._FIIndividualService.getApplicantandOthersData.emit();
    }
  }
  /**
   * Temporary Create Group Save 
   */
  public submitCreateGroupform() {
    
    let isValid = true;

    if (this.checkValidations(this.CreateGroupform, isValid)) {

      if (this.gContactId == '' || this.gContactId == undefined) {
        this.toaster.info('Please select contact...!');
        return;
      }

      let abc = this.CreateGroupform.value.pListGroupDetails.filter(
        m => m.pTypeofOperation == '' || m.pTypeofOperation != 'Delete'
      );
      if (this.CreateGroupform.controls.pMembersCount.value <= abc.length) {
        this.toaster.info('Enter below of Member Count ...!');
        return;
      }

      if (this.CreateGroupform.value.pListGroupDetails != '') {
        if (abc.find(ob => ob['pContactRefId'] === this.gContactreferenceid)) {
          this.toaster.info('Contact name alraedy exists...!');
          return;
        }
      }


      let pGrouproleIDs = this.CreateGroupform.controls.pGrouproleID.value;
      let role = this.roleInTheGroupData.find(function (element) {
        return element['pGroupRoleId'] == pGrouproleIDs;
      });

      this.rolename = role['pGroupRoleName'];
      if (this.CreateGroupform.controls.pGrouproleID.value == 2) {
        this.checkvalue = true;
        if (abc.find(ob => ob['pRoleInGroup'] === 'Group Head / Lead')) {
          this.toaster.info('Group Head / Lead alredy selected...!');
          return;
        }
      }
      this.control = <FormArray>this.CreateGroupform.controls['pListGroupDetails'];
      this.control.push(this.getUnit());
      let i = this.CreateGroupform.controls['pListGroupDetails']["controls"].length - 1;
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactID"].setValue(this.gContactId);
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactName"].setValue(this.gApplicantname);
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactRefId"].setValue(this.gContactreferenceid);
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pContactNo"].setValue(this.gBusinessEntitycontactNo);
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pMemberId"].setValue(0);
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pGrouproleID"].setValue(pGrouproleIDs);
      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pRoleInGroup"].setValue(this.rolename);
      if(this.CreateGroupform.controls.ptypeofoperation.value == 'update'){
        this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pTypeofOperation"].setValue('create');
      }

      if(this.CreateGroupform.controls.ptypeofoperation.value == ''){
        this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pTypeofOperation"].setValue('');
      }

      this.CreateGroupform.controls['pListGroupDetails']["controls"][i]["controls"]["pRecordId"].setValue(0);
      this.CreateGroupformArrayview = abc;
      this.ngAfterViewInit();
      this.submitted = false;
      this.CreateGroupform.controls.pGrouproleID.setValue("");
    }
  }
  public saveGroupArray() {
    
    
    if (this.CreateGroupform.value.pListGroupDetails.find(ob => ob['pGrouproleID'] === '2')) {
      this.checkvalue == true;
    }
    if (this.checkvalue == false) {
      this.toaster.info('Please select Group Head / Lead...!');
      return;
    }

    let abc = this.CreateGroupform.value.pListGroupDetails.filter(
      m => m.pTypeofOperation == '' || m.pTypeofOperation != 'Delete'
    );
    let pMembersCount = this.CreateGroupform.controls.pMembersCount.value;
    let pListGroupDetails = abc.length;
    if (pMembersCount != pListGroupDetails) {
      this.toaster.info('please enter Members Count  equals to group member details...!');
      return;
    }
    if (this.CreateGroupform.controls.ptypeofoperation.value == 'update') {
      let savedata = JSON.stringify(this.CreateGroupform.value);
      this._GroupService.updateDeleteGroupConfig(savedata).subscribe(json => {
        if (json == true) {
          alert('ok');
        }
      });
    }
    if (this.CreateGroupform.controls.ptypeofoperation.value == '') {
      let saveGroupJsonData = JSON.stringify(this.CreateGroupform.value);
      this._GroupService.saveGroupConfig(saveGroupJsonData).subscribe(json => {
        if (json == true) {
          this._GroupService.GetallGroupDetails().subscribe(res => {
            this.groupDetails = res;
            this.CreateGroupformArrayview = [];
            this.checkvalue == false
            let url = "/GroupView"
            this.router.navigate([url]);
          },
            (error) => {
              this.showErrorMessage(error);
            });
        }
      });
    }

  }
  public removeHandler({ dataItem }) {
    
    let pGroupID = this.editArraydata.pGroupID;
    let pRecordId = dataItem.pRecordId;

    let pTypeofOperation = dataItem.pTypeofOperation;
    if (pTypeofOperation == '') {
      const index = this.CreateGroupform.value.pListGroupDetails.indexOf(dataItem, 0);
      if (index > -1) {
        this.CreateGroupform.value.pListGroupDetails.splice(index, 1);
      }
    }
    if (pTypeofOperation == 'update') {
      dataItem.pTypeofOperation = 'Delete';
      this.CreateGroupform.value.pListGroupDetails = this.CreateGroupform.value.pListGroupDetails.filter(
        m => m.pTypeofOperation == '' || m.pTypeofOperation != 'Delete'
      );
    }
    // const i = this.CreateGroupformArrayview.indexOf(dataItem, 0);
    // if (i > -1) {
    //   this.CreateGroupformArrayview.splice(i, 1);
    // }

    // const index = this.CreateGroupform.value.pListGroupDetails.indexOf(dataItem, 0);
    // if (index > -1) {
    //   this.CreateGroupform.value.pListGroupDetails.splice(index, 1);
    // }
  }
}
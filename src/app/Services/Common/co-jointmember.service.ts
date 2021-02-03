import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
@Injectable({
  providedIn: 'root'
})
export class CoJointmemberService {
  Membercode: any;
  Memeberid: any
  memberdetails = {}
  contacttype:any;
  details = {}
  ShareAccountdata = {}
  nomineeList={}
   constructor(private _commonService: CommonService) { }
  _setfdMembercode(MemberCode, Memeberid) {
    debugger
    this.Membercode = MemberCode;
    this.Memeberid = Memeberid
    this.memberdetails = { MemberCode: this.Membercode, Memeberid: this.Memeberid }
  }
  _GetfdMembercode() {
    debugger
     return this.memberdetails;
  }
  _SetContacttype(Contacttype) {
    this.contacttype = Contacttype
  }
  _Getcontacttype() {
    debugger
    this.details = { membercode: this.Membercode, Contacttype: 'Individual' }
    return this.details
  }
  _GetfdMemebercode() {
    return this.Membercode;
  }
  _SetShareAccountdata(data) {
    debugger
    this.ShareAccountdata =data;
  }
  _GetShareAccountdata() {
    debugger
    return this.ShareAccountdata
  }
  _SetnomineeList(data) {
    debugger
    this.nomineeList =data;
  }
  _GetnomineeList() {
    debugger
    return this.nomineeList;
  }
  SaveJointMember(data) {
    return this._commonService.callPostAPI('/Banking/SaveshareJointMembersandNomineeData', data);
  }
  GetJointMembers(membercode, Contacttype) {
    const params = new HttpParams().set('membercode', membercode).set('Contacttype', Contacttype);
    return this._commonService.callGetAPI('/Banking/Masters/GetallJointMembers', params, 'Yes')
  }
}

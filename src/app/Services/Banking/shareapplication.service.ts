import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ShareapplicationService {
  commisiondata = {}

  constructor(private _commonService: CommonService) { }
  GetMembers(Membertype, Receipttype) {
    debugger
    const params = new HttpParams().set('Membertype', Membertype).set('Receipttype', Receipttype)
    return this._commonService.callGetAPI('/Banking/Transactions/ShareApplication/GetshareMembers', params, 'Yes')

  }
  getShareNames(Membertype, Applicanttype) {
    try {
      const params = new HttpParams().set('Membertype', Membertype).set('Applicanttype', Applicanttype);
      return this._commonService.callGetAPI('/Banking/Transactions/ShareApplication/GetShareNames', params, 'YES');
    } catch (error) {
      this._commonService.showErrorMessage(error);
    }
  }
  getSharconfigdetails(shareconfigid, Applicanttype) {
    try {
      const params = new HttpParams().set('shareconfigid', shareconfigid).set('Applicanttype', Applicanttype);
      return this._commonService.callGetAPI('/Banking/Transactions/ShareApplication/GetSharconfigdetails', params, 'YES');
    } catch (error) {
      this._commonService.showErrorMessage(error);
    }
  }
  SaveShareApplication(data) {
    try {
   
      return this._commonService.callPostAPI('/Banking/Transactions/ShareApplication/SaveShareApplication', data);
    } catch (error) {
      this._commonService.showErrorMessage(error);
    }
  }
  getShareApplicationViewDetails() {
    try {
      return this._commonService.callGetAPI('/Banking/Transactions/ShareApplication/GetShareApplicationViewDetails', '', 'NO');
    } catch (error) {
      this._commonService.showErrorMessage(error);
    }
  }
  SaveRDReferralData(data) {
    try {
      return this._commonService.callPostAPI('/Banking/SaveReferralData', data);
    }
    catch (e) {
      this._commonService.showErrorMessage(e);
    }
  }
  
  DeleteShareDetails(ShareApplicationId) {
    try {
      const params = new HttpParams().set('ShareApplicationId', ShareApplicationId);
      return this._commonService.callPostAPI('/Banking/Transactions/ShareApplication/DeleteShareDetails?'+params, 'YES');
    }
    catch (e) {
      this._commonService.showErrorMessage(e);
    }
  }
  _setcommisiontype(data) {
    debugger
    this.commisiondata =data;
  }
  _GetCommisiontype() {
    debugger
    return this.commisiondata
  }
  SaveJointMember(data) {
    return this._commonService.callPostAPI('/Banking/SaveshareJointMembersandNomineeData', data);
  }
}

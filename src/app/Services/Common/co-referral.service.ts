import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CoReferralService {

  constructor(private commonService: CommonService) { }
  getReferralDetails() {
    try {
      
      return this.commonService.callGetAPI('/Settings/ReferralAdvocate/getReferralDetails', '', 'NO');
    } catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }
  getallEmployeeDetails() {
    try {
      return this.commonService.callGetAPI('/Settings/Employee/GetallEmployeeDetails', '', 'NO');
    } catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }
  SaveReferralData(data) {
    try {
      return this.commonService.callPostAPI('/Banking/SaveReferralData', data);
    }
    catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment"
import { Subject } from 'rxjs'
import { Observable } from 'rxjs/Rx'
import { CommonService } from '../../common.service';

@Injectable({
  providedIn: 'root'
})
export class ReferralAgentMasterService {
  TitleinLoanCreationSelect: any

  constructor(private _http: HttpClient, private _CommonService: CommonService) { }

  SetSelectTitileRefferalCreation(title) {
    this.TitleinLoanCreationSelect = title
  }

  savereferraldata(data): Observable<any> {

    try {
      if (data.ptypeofoperation == 'CREATE') {
        let savedata = JSON.stringify(data)
        return this._CommonService.callPostAPI('/Settings/ReferralAdvocate/saveReferral', savedata);
      }
      if (data.ptypeofoperation == 'UPDATE') {
        let updatedata = JSON.stringify(data)
        return this._CommonService.callPostAPI('/Settings/ReferralAdvocate/UpdatedReferral', updatedata);
      }
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  DeleteReferralDetail(data): Observable<any> {

    try {
      return this._CommonService.callPostAPI('/Settings/ReferralAdvocate/DeleteReferralAgent', data);
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  checkContactIndividual(contactdata, refdata): Observable<any> {
    try {
      const params = new HttpParams().set("ContactId", contactdata).set("RefId", refdata);
      return this._CommonService.callGetAPI('/Settings/ReferralAdvocate/CheckContactDuplicate', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  getReferralDetails(loanTypeId): Observable<any> {
    const params = new HttpParams().set('Type', loanTypeId.toString());
    return this._CommonService.callGetAPI('/Settings/ReferralAdvocate/getReferralAgentDetails', params, 'YES')
  }

  getViewReferralDetails(referralid): Observable<any> {
    const params = new HttpParams().set('Refid', referralid.toString());
    return this._CommonService.callGetAPI('/Settings/ReferralAdvocate/ViewReferralAgentDetails', params, 'YES')
  }
}

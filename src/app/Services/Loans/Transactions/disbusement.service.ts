import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { Observable } from 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class DisbusementService {

    constructor(private http: HttpClient, private _CommonService: CommonService) { }

    GetDisbursementViewData(): Observable<any> {
     
        return this._CommonService.callGetAPI('/loans/Transactions/Disbursement/GetDisbursementViewData', '', 'NO');
    }
    GetApprovedApplicationsByID(pvchapplicationid): Observable<any> {
        const params = new HttpParams().set('vchapplicationid', pvchapplicationid);
        return this._CommonService.callGetAPI('/loans/Transactions/Disbursement/GetApprovedApplicationsByID', params, 'YES');
    }
    SaveLoanDisbursement(data) {
        return this._CommonService.callPostAPI('/loans/Transactions/Disbursement/SaveLoanDisbursement', data)
  }
  GetEmiChartReport(pvchapplicationid) {
    const params = new HttpParams().set('vchapplicationid', pvchapplicationid);
    return this._CommonService.callGetAPI('/loans/Transactions/Disbursement/GetEmiChartReport', params, 'YES');
  }
  GetEmiChartViewData(): Observable<any> {
    return this._CommonService.callGetAPI('/loans/Transactions/Disbursement/GetEmiChartView', '', 'NO');
  }
}

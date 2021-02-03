import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BrStatementService {

  constructor(private http: HttpClient, private _CommonService: CommonService) { }

  GetBrStatementReportbyDates(fromdate,pBankAccountId): Observable<any> {
    try {
      
      const params = new HttpParams().set('fromdate', fromdate).set('_pBankAccountId', pBankAccountId);
      return this._CommonService.callGetAPI('/Accounting/AccountingReports/GetBrs', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralReceiptService {

  constructor(private http: HttpClient, private _CommonService: CommonService) { }

  GetGeneralReceiptbyId(ReceiptId): Observable<any> {
    try {
      const params = new HttpParams().set('ReceiptId', ReceiptId);
      return this._CommonService.callGetAPI('/Accounting/AccountingTransactions/GetgeneralreceiptReportData', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }
}

import { Injectable } from '@angular/core';
import { CommonService } from '../../common.service';
import { Subject, Observable } from 'rxjs'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberReceiptService {

  constructor(private _CommonService: CommonService) { }

  GetMembersForFd(Contacttype, MemberType): Observable<any> {
    debugger
    const params = new HttpParams().set('Contacttype', Contacttype).set('MemberType', MemberType)
    return this._CommonService.callGetAPI('/Banking/Transactions/SDReceipt/GetMembers', params, 'YES')

  }
  GetReceiptsandPaymentsLoadingData(formname): Observable<any> {
        const params = new HttpParams().set('formname', formname);
        return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetReceiptsandPaymentsLoadingData', params, 'YES');
    }
    SaveMemberReceipt(data): Observable<any> {
        return this._CommonService.callPostAPI('/Banking/Transactions/SDReceipt/SaveMemberReceipt',data);
    }
    GetMemberReceiptDetails(FromDate,Todate): Observable<any> {
    debugger
    const params = new HttpParams().set('FromDate', FromDate).set('Todate', Todate)
    return this._CommonService.callGetAPI('/Banking/Transactions/SDReceipt/GetMemberReceiptView', params, 'YES')

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class AccountingTransactionsService {

    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    });
    constructor(private http: HttpClient, private _CommonService: CommonService) { }
  
    GetPaymentVoucherExistingData(): Observable<any> {
        return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetPaymentVoucherExistingData', '', 'NO');
    }
   

    GetGeneralReceiptExistingData(): Observable<any> {
        return this._CommonService.callGetAPI('/Accounting/AccountingTransactions/GetGeneralReceiptsData', '', 'NO');
    }

    GetReceiptsandPaymentsLoadingData(formname): Observable<any> {
        const params = new HttpParams().set('formname', formname);
        return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetReceiptsandPaymentsLoadingData', params, 'YES');
    }
    GetBankDetailsbyId(pbankid): Observable<any>
    {
        debugger
        const params = new HttpParams().set('pbankid', pbankid);
        return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetBankDetailsbyId', params, 'YES');
    }
    GetSubLedgerData(pledgerid): Observable<any> {
        const params = new HttpParams().set('pledgerid', pledgerid);
        return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetSubLedgerData', params, 'YES');
    }
    getPartyDetailsbyid(ppartyid): Observable<any> {
        const params = new HttpParams().set('ppartyid', ppartyid);
        return this._CommonService.callGetAPI('/accounting/accountingtransactions/getPartyDetailsbyid', params, 'YES');
    }

    GetBanksList(): Observable<any> {
        return this._CommonService.callGetAPI('/Accounting/AccountingTransactions/GetBankntList', '', 'NO')
      }

    GetChequesOnHandData(bankid): Observable<any>{
        const params = new HttpParams().set('_BankId', bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetChequesOnHandData', params, 'YES')  
      }

    SaveChequesOnHand(data){
        return this._CommonService.callPostAPI('/Accounting/ChequesOnHand/SaveChequesOnHand', data)
    }

    DataFromBrsDatesChequesOnHand(frombrsdate, tobrsdate,bankid){
        const params = new HttpParams().set('BrsFromDate', frombrsdate).set('BrsTodate',tobrsdate).set('_BankId',bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetChequesOnHandData_New', params, 'YES');
    }

    GetBankBalance(bankid){
        const params = new HttpParams().set('_recordid', bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetBankBalance', '', 'NO');
    }

    GetChequesIssuedData(bankid): Observable<any>{
        const params = new HttpParams().set('_BankId', bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetChequesIssued', params, 'YES')  
    }

    DataFromBrsDatesChequesIssued(frombrsdate, tobrsdate,bankid){
        const params = new HttpParams().set('BrsFromDate', frombrsdate).set('BrsTodate',tobrsdate).set('_BankId',bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetIssuedCancelledCheques_New', params, 'YES');
    }

    SaveChequesIssued(data){
        return this._CommonService.callPostAPI('/Accounting/ChequesOnHand/SaveChequesIssued', data)
    }

    GetChequesInBankData(bankid): Observable<any>{
        const params = new HttpParams().set('depositedBankid', bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetChequesInBankData', params, 'YES')  
    }

    SaveChequesInBank(data){
        return this._CommonService.callPostAPI('/Accounting/ChequesOnHand/SaveChequesInBank', data)
    }

    DataFromBrsDatesChequesInBank(frombrsdate, tobrsdate,bankid){
        const params = new HttpParams().set('BrsFromDate', frombrsdate).set('BrsTodate',tobrsdate).set('depositedBankid',bankid);
        return this._CommonService.callGetAPI('/Accounting/ChequesOnHand/GetClearedReturnedCheques_New', params, 'YES');
    }
    
    savePaymentVoucher(data) {
        return this._CommonService.callPostAPI('/accounting/accountingtransactions/SavePaymentVoucher', data)
    }

    saveGeneralReceipt(data) {
        return this._CommonService.callPostAPI('/Accounting/AccountingTransactions/SaveGeneralReceipt', data)
  }
  saveJournalVoucher(data) {
    return this._CommonService.callPostAPI('/accounting/accountingtransactions/SaveJournalVoucher', data)
  }
  GetJournalVoucherData(): Observable<any> {
    return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetJournalVoucherData', '', 'NO');
  }
  UnusedhequeCancel(data) {
    return this._CommonService.callPostAPI('/Accounting/AccountingReports/UnusedhequeCancel', data)
  }
  getGstPercentages() {
    return this._CommonService.callGetAPI('/accounting/accountingtransactions/GetGstPercentages', '', 'NO')
  }
  getTDSsectiondetails(): Observable<any> {
    try {
      return this._CommonService.callGetAPI('/accounting/accountingtransactions/getTdsSectionNo', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
}

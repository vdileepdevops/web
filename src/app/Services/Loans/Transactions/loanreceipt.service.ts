import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoanreceiptService { 

  constructor(private _CommonService: CommonService) { }
  getReceiptViewData(receiptToDate, receiptFromDate,formname){
    const params = new HttpParams().set('fromdate', receiptToDate).set('todate', receiptFromDate).set('formname', formname);
    return this._CommonService.callGetAPI('/loans/Transactions/Receipts/Viewtodayreceipts', params, 'YES')

  }
  getTransactionById(loanid){
    const params=new HttpParams().set('loanid',loanid);
    return this._CommonService.callGetAPI('/loans/Transactions/Receipts/GetTransactions', params, 'YES')

  }
  getInstallmentsViewById(loanid,receiptdate,duestype){

    const params=new HttpParams().set('loanid',loanid).set('transdate', receiptdate).set('todate',receiptdate).set('duestype', duestype);
    return this._CommonService.callGetAPI('/loans/Transactions/Receipts/ViewParticularsDetails', params, 'YES')
  }
  getParticularsById(loanId,receiptdate,formname){
    const params = new HttpParams().set('loanid', loanId).set('transdate', receiptdate).set('formname',formname);
    return this._CommonService.callGetAPI('/loans/Transactions/Receipts/GetParticulars', params,'YES')
  }
  getLoanDeatilsInReceiptform(loanId){
    const params=new HttpParams().set('loanid',loanId);
    return this._CommonService.callGetAPI('/loans/Transactions/Receipts/GetLoandetails', params,'YES')
  }
  saveLoanReceiptData(data){
    return this._CommonService.callPostAPI('/loans/Transactions/Receipts/SaveEmiReceipt',data)

}
getReceiptApplicationId(loantype,Formname): Observable<any>{
  const params = new HttpParams().set('loanname', loantype.toString()).set('formname',Formname);
  return this._CommonService.callGetAPI('/loans/Transactions/Receipts/GetApplicantionid', params, 'YES')
}
}

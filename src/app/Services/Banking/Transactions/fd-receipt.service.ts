import { Injectable } from '@angular/core';
import { CommonService } from '../../common.service';
import { Subject, Observable } from 'rxjs'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FdReceiptService {

  constructor(private _commonService: CommonService) { }

  GetMemberDetails(MemberType, BranchName) {
    const parms = new HttpParams().set('MemberType', MemberType).set('BranchName', BranchName);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetMemberDetails', parms, 'Yes');
  }

  GetFdDetails(Membercode, ChitBranch) {
    const parms = new HttpParams().set('Membercode', Membercode).set('ChitBranch', ChitBranch);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetFdDetails', parms, 'Yes');
  }
  GetFdDetailsById(FdAccountNo) {
    const parms = new HttpParams().set('FdAccountNo', FdAccountNo);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetFdDetailsByid', parms, 'Yes');
  }
  GetTransactionslist(FdAccountNo) {
    const parms = new HttpParams().set('FdAccountNo', FdAccountNo);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetTransactionslist', parms, 'Yes');
  }
  GetFDReceiptDetails(FromDate, Todate) {
    const parms = new HttpParams().set('FromDate', FromDate).set('Todate', Todate);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetFDReceiptDetails', parms, 'Yes');
  }
  SaveFdReceiptForm(data) {
    return this._commonService.callPostAPI('/Banking/Transactions/FdReceipt/SaveFdReceipt', data);
  }
  GetSchemeNames() {
    return this._commonService.callGetAPI('/Banking/Masters/SelfAdjustment/GetSchemeType', '', 'NO')
  }
  GetFDBranchDetails() {
    // const parms = new HttpParams().set('FdAccountNo', FdAccountNo);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetFDBranchDetails', '', 'No');
  }
  GetFDReceiptBranchDetails() {
    // const parms = new HttpParams().set('FdAccountNo', FdAccountNo);
    return this._commonService.callGetAPI('/Banking/Transactions/FdReceipt/GetFDReceiptBranchDetails', '', 'No');
  }
}

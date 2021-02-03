import { Injectable } from '@angular/core';
import { CommonService } from '../../common.service';
import { Subject, Observable } from 'rxjs'
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaturityPaymentService {
  ButtonClickType: any;
  MaturityPayment: any;
  constructor(private _commonService: CommonService) { }

  GetDepositIds(BranchName, MaturityType, Schemeid) {
    const parms = new HttpParams().set("BranchName", BranchName).set("MaturityType", MaturityType).set("Schemeid", Schemeid);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetDepositIds', parms, 'Yes');
  }
  GetPreMaturityDetails(FDAccountno, Date,type) {
    const parms = new HttpParams().set("FDAccountno", FDAccountno).set("Date", Date).set("type",type);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetPreMaturityDetails', parms, 'Yes');
  }
  GetSchemeNames() {
    return this._commonService.callGetAPI('/Banking/Masters/SelfAdjustment/GetSchemeType', '', 'NO')
  }
  GetMaturityBondView() {
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetMaturityBondView', '', 'NO')
  }
  SaveMaturityBond(data) {
    return this._commonService.callPostAPI('/Banking/Transactions/MaturityPayment/SaveMaturitybond', data)
  }
  GetSchemeNamesNew(BranchName, MaturityType) {
    const parms = new HttpParams().set("BranchName", BranchName).set("MaturityType", MaturityType);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetSchemeType', parms, 'Yes')
  }
  GetMaturityBranchDetails(MaturityType) {
    const parms = new HttpParams().set("MaturityType", MaturityType);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetMaturityBranchDetails', parms, 'Yes')
  }
  GetMaturityMembers(PaymentType) {
    const parms = new HttpParams().set("PaymentType", PaymentType);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetMaturityMembers', parms, 'Yes')
  }
  GetMaturityFdDetails(PaymentType, Memberid, Date) {
    const parms = new HttpParams().set("PaymentType", PaymentType).set("Memberid", Memberid).set("Date", Date);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetMaturityFdDetails', parms, 'Yes')
  }
  GetMaturityPaymentDetailsView() {
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetMaturityPaymentView', '', 'NO')
  }
  SaveMaturityPayment(data) {
    return this._commonService.callPostAPI('/Banking/Transactions/MaturityPayment/SaveMaturityPayment', data)
  }
  GetFdTransactionDetails(FdAccountNo) {
    const parms = new HttpParams().set("FdAccountNo", FdAccountNo);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetFdTransactionDetails', parms, 'Yes')
  }
  SaveMaturityRenewal(data) {
    return this._commonService.callPostAPI('/Banking/Transactions/MaturityPayment/SaveMaturityRenewal', data)
  }
  GetLienDetails(FdAccountNo) {
    const parms = new HttpParams().set("FdAccountNo", FdAccountNo);
    return this._commonService.callGetAPI('/Banking/Transactions/MaturityPayment/GetLienDetails', parms, 'Yes');
  }
  SetButtonClickType(type) {
    debugger
    this.ButtonClickType = type
  }
  GetButtonClickType() {
    return this.ButtonClickType
  }
  SetMaturityPayment(data) {
    this.MaturityPayment = data;
  }
  GetMaturityPayment() {
    return this.MaturityPayment
  }
}

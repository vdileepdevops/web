import { Injectable, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  Telecerification: any;
  Documentverification: any;
  Fieldverification: any;
  returnFormData: any;

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });


  constructor(private commonService: CommonService) { }

  _addDataToVerification(Data, FormName) {
    
    if (FormName == "Televerification") { this.Telecerification = Data }
    if (FormName == "DocumentVerification") { this.Documentverification = Data }
    if (FormName == "FieldVerification") { this.Fieldverification = Data }

  }


  _getDatafromVerification(FormName) {
    
    if (FormName == "Televerification") { this.returnFormData = this.Telecerification  }
    if (FormName == "DocumentVerification") { this.returnFormData = this.Documentverification }
    if (FormName == "FieldVerification") { this.returnFormData = this.Fieldverification }

    return this.returnFormData;
  }


  GetVerificationdetails(Id) {
    const params = new HttpParams().set('strapplicationid', Id);
    return this.commonService.callGetAPI('/loans/Transactions/Verification/GetVerificationDetails', params, 'YES');

  }
  GetFieldverificationdetails(Id) {
    const params = new HttpParams().set('strapplicationid', Id);
    return this.commonService.callGetAPI('/loans/Transactions/Verification/GetFieldVerificationDetails', params, 'YES');

  }
  GetFiDocumentsToVerify(Id) {
    const params = new HttpParams().set('strapplicationid', Id);
    return this.commonService.callGetAPI('/loans/Transactions/Firstinformation/GetFiDocumentlDetails', params, 'YES');

  }

  GetAllApplicantVerificationDetails(): Observable<any> {
    try {
      return this.commonService.callGetAPI('/loans/Transactions/Verification/GetAllApplicantVerificationDetails', '', 'NO');
    }
    catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }
  GetEmployees(): Observable<any> {
    try {
      return this.commonService.callGetAPI('/Settings/Employee/GetallEmployeeDetails', '', 'NO');
    }
    catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }

  SaveTeleVerification(data): Observable<any> {

    try {
  
      return this.commonService.callPostAPI('/loans/Transactions/Verification/SaveVerificationDetails', data);
    }
    catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }
  SaveFieldVerification(data): Observable<any> {

    try {

      return this.commonService.callPostAPI('/loans/Transactions/Verification/Savefieldverification', data);
    }
    catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }

  SaveDocumentVerification(data): Observable<any> {

    try {

      return this.commonService.callPostAPI('/loans/Transactions/Verification/SaveFIVerificationDetails', data);
    }
    catch (e) {
      this.commonService.showErrorMessage(e);
    }
  }
}

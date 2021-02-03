import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TdsreportService {

  constructor(private commonservice: CommonService) 
  { }
  GetTdsReport(FromDate,ToDate,SectionName)
  {
    const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate).set('SectionName', SectionName);
    return this.commonservice.callGetAPI('/TDS/GetTdsReportDetails', params, 'Yes')
  }
  GetChallanaDetails(FromDate,ToDate,SectionName,CompanyType,PanType)
  {
    const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate).
    set('SectionName', SectionName).set('CompanyType', CompanyType).set('PanType', PanType);
    return this.commonservice.callGetAPI('/TDS/Challana/GetChallanaDetails', params, 'Yes')
  }
  SaveChallanaEntry(data)
  {
    return this.commonservice.callPostAPI('/TDS/Challana/SaveChallanaEntry', data);
  }
  GetChallanaNumbers()
  {
    return this.commonservice.callGetAPI('/TDS/Challana/GetChallanaNumbers','','No')
  }
  GetChallanaPaymentNumbers()
  {
    return this.commonservice.callGetAPI('/TDS/Challana/GetChallanaPaymentNumbers','','No')
  }
  GetChallanaPaymentDetails(ChallanaNO)
  {
    const params = new HttpParams().set('ChallanaNO', ChallanaNO);
    return this.commonservice.callGetAPI('/TDS/Challana/GetChallanaEntryDetails', params, 'Yes')
  }
  SaveChallanaPayment(data)
  {
    return this.commonservice.callPostAPI('/TDS/Challana/SaveChallanaPayment', data);
  }
  GetCinEntryData(ChallanaNO)
  {
    const params = new HttpParams().set('ChallanaNO', ChallanaNO);
    return this.commonservice.callGetAPI('/TDS/Challana/GetChallanaPaymentDetails', params, 'Yes')
  }
  SaveCinEntry(data)
  {
    return this.commonservice.callPostAPI('/TDS/Challana/SaveCinEntry', data);
  }
  GetGridByChallanaNo(ChallanaNO)
  {
    const params = new HttpParams().set('ChallanaNO', ChallanaNO);
    return this.commonservice.callGetAPI('/TDS/Challana/GetCinEntryReportByChallanaNo', params, 'Yes')
  }
  GetCinEntryReportsBetweenDates(FromDate,ToDate)
  {
    const params = new HttpParams().set('FromDate', FromDate).set('ToDate', ToDate);
    return this.commonservice.callGetAPI('/TDS/Challana/GetCinEntryReportsBetweenDates', params, 'Yes')
  }
  GetCinEntryChallanaNumbers()
  {
    return this.commonservice.callGetAPI('/TDS/Challana/GetCinEntryChallanaNumbers','','No')
  }
  GetChallanaPaymentReport(ChallanaNO)
  {
    const params = new HttpParams().set('ChallanaNO', ChallanaNO);
    return this.commonservice.callGetAPI('/TDS/Challana/GetChallanaPaymentReport', params, 'Yes')
  }
}

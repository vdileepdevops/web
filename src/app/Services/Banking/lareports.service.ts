import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class LAReportsService {

    Data: any;
    ButtonClickType: any;
    ShowData: any = [];

    constructor(private commonservice: CommonService) { }

    ShowInterestPaymentReport() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowInterestPaymentReport', '', 'No');
    }
    ShowInterestTrendShemeAndDatewiseDetails(schemename, maturitydate) {
        const params = new HttpParams().set('schemename', schemename).set('maturitydate', maturitydate);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowInterestTrendShemeAndDatewiseDetails', params, 'Yes');
    }
    ShowInterestTrendGrandTotalDatewiseDetails(maturitydate) {
        const params = new HttpParams().set('maturitydate', maturitydate);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowInterestTrendGrandTotalDatewiseDetails', params, 'Yes');
    }

    ShowMaturityTrendGridHeader() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowMaturityTrendGridHeader', '', 'No');
    }
    ShowMaturityTrendReport() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowMaturityTrendReport', '', 'No');
    }
    ShowShemeAndDatewiseDetails(schemename, maturitydate) {
        const params = new HttpParams().set('schemename', schemename).set('maturitydate', maturitydate);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowShemeAndDatewiseDetails', params, 'Yes');
    }
    PrintMaturityTrendDetails(maturitydate)
    {
        const params = new HttpParams().set('maturitydate', maturitydate);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/PrintMaturityTrendDetailsReport', params, 'Yes');
    }
    PrintInterestPaymentTrendDetails(maturitydate)
    {
        const params = new HttpParams().set('maturitydate', maturitydate);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/PrintInterestTrendDetailsReport', params, 'Yes');
    }
    ShowGrandTotalDatewiseDetails(maturitydate) {
        const params = new HttpParams().set('maturitydate', maturitydate);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowGrandTotalDatewiseDetails', params, 'Yes');
    }
    SaveMaturityIntimationReport(data1) {
        debugger;     
        return this.commonservice.callPostAPI('/Banking/Report/LAReports/SaveMaturityIntimationReport', data1)
        
    }
    GetMemberEnquiryDetailsReport(FdAccountNo)
    {
        const params = new HttpParams().set('FdAccountNo', FdAccountNo);
        return this.commonservice.callGetAPI('/Banking/Report/MemberEnquiry/GetMemberEnquiryDetailsReport', params, 'Yes');
    }
    GetMaturityIntimationLetter(fdaccountno) {
        const params = new HttpParams().set('fdaccountno', fdaccountno);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetMaturityIntimationLetter', params, 'Yes')
    }
    GetShowmaturityReport(schemeid, branchname, frommonthof, tomonthof) {
        debugger

        const params = new HttpParams().set('schemeid', schemeid).set('branchname', branchname).set('fromdate', frommonthof).set('todate', tomonthof);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowMaturityIntimationReport', params, 'Yes')


    }
  

    GetLeanreleaseReport(branchname, frommonthof, tomonthof) {
        debugger;
        const params = new HttpParams().set('branchname', branchname).set('fromdate', frommonthof).set('todate', tomonthof);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowLienReleaseReport', params, 'Yes')

    }
    GetLienBranchDetails() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetLienbrnach', '', 'No');
    }
    GetmaturityBranchDetails(schemeid) {
        const params = new HttpParams().set('schemeid', schemeid);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetMaturitybrnach', params, 'Yes');
    }
    GetMaturityscheme() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetMaturityscheme', '', 'No');
    }
    GetInterestreportscheme() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetInterestreportscheme', '', 'No');
    }
    GetBranchDetailsIP(companyname) {
        const params = new HttpParams().set('companyname', companyname);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetSelfAdjustmentbrnach', params, 'Yes')

    }
    GetCompanydetails() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetSelfAdjustmentcompany', '', 'No')

    }

    GetselfadjustmentReport(paymenttype, companyname, branchname, frommonthof, tomonthof) {
        debugger;
        const params = new HttpParams().set('paymenttype', paymenttype).set('companyname', companyname).set('branchname', branchname).set('fromdate', frommonthof).set('todate', tomonthof);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowSelfAdjustmentReport', params, 'Yes')

    }
    ShowPrematurityReport(frommonthof, tomonthof, type, pdatecheked) {
        const params = new HttpParams().set('fromdate', frommonthof).set('todate', tomonthof).set('type', type).set('pdatecheked', pdatecheked);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowPreMaturityReport', params, 'Yes')

    }
    ShowmemberreceiptReport(membername, frommonthof, tomonthof, pdatecheked) {
        const params = new HttpParams().set('memberid', membername).set('fromdate', frommonthof).set('todate', tomonthof).set('pdatecheked', pdatecheked);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/ShowMemberwiseReceiptsReport', params, 'Yes')

    }
    GetMemberdetails() {
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetMemberName', '', 'No');
    }

    GetAccnodetails(paymenttype, companyname, branchname, schemeid) {
   
        const params = new HttpParams().set('paymenttype', paymenttype).set('companyname', companyname).set('branchname', branchname).set('schemeid', schemeid);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetInterestreportfdaccountnos', params, 'Yes');
    }
    GetCashFlowSummary(date,months)
    {
        const params = new HttpParams().set('date', date).set('months', months);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetCashFlowSummary', params, 'Yes');
    }
    GetCashFlowDetails(Asonmonth,month)
    {
        const params = new HttpParams().set('Asonmonth', Asonmonth).set('month', month);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetCashFlowDetails', params, 'Yes');
    }
    GetCashFlowPerticularsDetails(perticulars,Asonmonth)
    {
        debugger
        const params = new HttpParams().set('perticulars', perticulars).set('Asonmonth', Asonmonth);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetCashFlowPerticularsDetails', params, 'Yes');
    }
    GetAgentPointsSummary(Rfrommonthof, Rtomonthof,Cfrommonthof ,Ctomonthof ) {
   
        const params = new HttpParams().set('receiptfromdate', Rfrommonthof).set('receipttodate', Rtomonthof).set('chequefromdate', Cfrommonthof).set('chequetodate',Ctomonthof);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetAgentPointsSummary', params, 'Yes');
    }
    GetAgentPointsDetails(Agentname) {
        const params = new HttpParams().set('Agentname', Agentname)
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetAgentPointsDetails', params, 'Yes');
       
    }

    GetTargetdetailsReport(Rfrommonthof, Rtomonthof,Cfrommonthof ,Ctomonthof ) {
   
        const params = new HttpParams().set('receiptfromdate', Rfrommonthof).set('receipttodate', Rtomonthof).set('chequefromdate', Cfrommonthof).set('chequetodate',Ctomonthof);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetTargetReportSummary', params, 'Yes');
    }
    ShowtargetDetails(Branchtye) {
        const params = new HttpParams().set('branch', Branchtye)
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetTargetReportDetails', params, 'Yes');
       
    }
    GetApplicationFormDetails(FdAccountNo)
    {
        const params = new HttpParams().set('FdAccountNo', FdAccountNo);
        return this.commonservice.callGetAPI('/Banking/Report/LAReports/GetApplicationFormDetails', params, 'Yes');
    }


 
   





}

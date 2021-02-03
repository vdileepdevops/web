import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormArray } from '@angular/forms';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Observable } from 'rxjs/Rx'
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import appsettings from '../../assets/appsettings.json';
import { mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { DatePipe, formatDate } from '@angular/common';
import { debug } from 'util';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
@Injectable({
    providedIn: 'root'
})
export class CommonService {
    //apiURL = appsettings[0].ApiHostUrl;
    FiTab1Details: any
    //BankData: any;
    private ActiveTabName = new Subject<any>()
    private FiTab1Data = new Subject<any>();
    private BankData = new Subject<any>();
    private BankUpdate = new Subject<any>();
    private KYCData = new Subject<any>();
    private KYCUpdate = new Subject<any>();
    private TDSData = new Subject<any>();
    private TDSUpdate = new Subject<any>();
    private ContactData = new Subject<any>();
    private ContactUpdate = new Subject<any>();
    private UpdateContactData = new Subject<any>();
    public ReferralViewData: any;
    public ReferralId: any;
    public GeneralReceiptView = new Subject<any>();
    public PaymentView = new Subject<any>();
    public UserRightsView = new Subject<any>();
    public reportLableName: any;
    // private dataSource = new BehaviorSubject({});
    // data = this.dataSource.asObservable();
    // FiTab1Details: any
    // private FiTab1Data = new Subject<any>()
    ValidationErrorMessages = {}
    errormessages: any
    datevalue: any;
    year: any;
    month: any;
    day: any;
    newDate: any;

    pCreatedby: any;
    pStatusname = 'ACTIVE';
    ptypeofoperation = 'CREATE';
    comapnydetails: any;

    private ValidationStatus = new Subject<any>()
    _validationStatus: any;

    pageSize = 10;
    public extractData(res: Response) {

        let body = res;
        return body;
    }

    public handleError(error: Response | any) {
        debugger
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    showErrorMessage(errormsg: string) {
        debugger
        this.toastr.error(errormsg, "Error!");
    }
    showErrorMessageForLessTime(errormsg: string) {
        debugger
        this.toastr.error(errormsg, "Error!", { timeOut: 2500 });
    }
    showInfoMessage(errormsg: string) {

        this.toastr.success(errormsg, "Success!");
    }
    constructor(private datepipe: DatePipe, private http: HttpClient, private toastr: ToastrService) {

        this._validationStatus = false;
        let Urc = sessionStorage.getItem("Urc");
        if (Urc == null) {

            this.pCreatedby = 0;

        }
        else {
            this.pCreatedby = JSON.parse(sessionStorage.getItem("Urc"))["pUserID"];
        }

        this.comapnydetails = JSON.parse(sessionStorage.getItem("companydetails"));

        //if (this.comapnydata == null) {
        //    this.pCompanyName = '';
        //    this.pAddress1 = '';
        //    this.pAddress2 = '';
        //    this.pcity = '';
        //    this.pCountry = '';
        //    this.pState = '';
        //    this.pDistrict ='';
        //    this.pPincode ='';
        //    this.pCinNo = '';
        //    this.pGstinNo = '';
        //    this.pBranchname = '';
        //}
        //else {
        //    this.pCompanyName = this.comapnydata['pCompanyName'];
        //    this.pAddress1 = this.comapnydata['pAddress1'];
        //    this.pAddress2 = this.comapnydata['pAddress2'];
        //    this.pcity = this.comapnydata['pcity'];
        //    this.pCountry = this.comapnydata['pCountry'];
        //    this.pState = this.comapnydata['pState'];
        //    this.pDistrict = this.comapnydata['pDistrict'];
        //    this.pPincode = this.comapnydata['pPincode'];
        //    this.pCinNo = this.comapnydata['pCinNo'];
        //    this.pGstinNo = this.comapnydata['pGstinNo'];
        //    this.pBranchname = this.comapnydata['pBranchname'];
        //}
        // 
        //this.apiURL = appsettings.ApiHostUrl;
    }

    _setCompanyDetails() {

        this.comapnydetails = JSON.parse(sessionStorage.getItem("companydetails"));
    }

    _setPcreatedby() {

        this.pCreatedby = JSON.parse(sessionStorage.getItem("Urc"))["pUserID"];
    }
    GetBankList() {
        try {
          return this.callGetAPI('/Accounting/Masters/GetBAnkDetails', ' ', 'NO');
        }
        catch (e) {
          this.showErrorMessage(e);
        }
  }
  GetBankNames() {
    try {
      return this.callGetAPI('/Accounting/Masters/GetBankNames', ' ', 'NO');
    }
    catch (e) {
      this.showErrorMessage(e);
    }
  }
    getValidationMessage(formcontrol: AbstractControl, errorkey: string, lablename: string, key: string, skipKey: string): string {
        let errormessage;
        //else if
        if (errorkey == 'required')
            errormessage = lablename + ' Required';
        if (errorkey == 'email' || errorkey == 'pattern')
            errormessage = 'Invalid ' + lablename;
        if (errorkey == 'minlength') {

            let length = formcontrol.errors[errorkey].requiredLength;
            errormessage = lablename + ' Must Have ' + length + ' Digits';
        }
        if (errorkey == 'maxlength' && key != skipKey) {

            let length = formcontrol.errors[errorkey].requiredLength;
            errormessage = lablename + ' Must Have ' + length + ' Digits';
        }
        if (errorkey == 'maxlength' && key == skipKey) {

            //let length = formcontrol.errors[errorkey].requiredLength;
            errormessage = 'Invalid ' + lablename;
        }

        return errormessage;
    }

    formatDateFromDDMMYYYY(value: any): Date | null {

        value = value.substr(0, 10);
        if (value != '' && value != null) {
            if (value.indexOf('/') > -1) {
                this.datevalue = value.split('/');
            }
            if (value.indexOf('-') > -1) {
                this.datevalue = value.split('-');
            }
            if (value.indexOf(' ') > -1) {
                this.datevalue = value.split(' ');
            }
            //console.log("this.datevalue : ", this.datevalue);

            this.day = Number(this.datevalue[0]);
            this.month = Number(this.datevalue[1]) - 1;
            this.year = Number(this.datevalue[2]);

            this.newDate = new Date(this.year, this.month, this.day);
            //console.log("this.newDate : ", this.newDate);

            return this.newDate;
        } else {
            return null
        }

    }
    formatDateFromYYYYMMDD(value: any): Date | null {

        value = value.substr(0, 10);
        if (value != '' && value != null) {
            if (value.indexOf('/') > -1) {
                this.datevalue = value.split('/');
            }
            if (value.indexOf('-') > -1) {
                this.datevalue = value.split('-');
            }
            if (value.indexOf(' ') > -1) {
                this.datevalue = value.split(' ');
            }

            this.day = Number(this.datevalue[2]);
            this.month = Number(this.datevalue[1]) - 1;
            this.year = Number(this.datevalue[0]);

            this.newDate = new Date(this.year, this.month, this.day);
            return this.newDate;
        } else {
            return null
        }

    }
    formatDateFromMMDDYYYY(value: any): Date | null {
        //undefined should be provide
        value = value.substr(0, 10);
        if (value != '' && value != null) {
            if (value.indexOf('/') > -1) {
                this.datevalue = value.split('/');
            }
            if (value.indexOf('-') > -1) {
                this.datevalue = value.split('-');
            }
            if (value.indexOf(' ') > -1) {
                this.datevalue = value.split(' ');
            }

            this.day = Number(this.datevalue[1]);
            this.month = Number(this.datevalue[0]) - 1;
            this.year = Number(this.datevalue[2]);

            this.newDate = new Date(this.year, this.month, this.day);
            return this.newDate;
        } else {
            return null
        }

    }
    getFormatDate(dateData: any): string | null {
        let data = this.datepipe.transform(dateData, 'dd/MM/yyyy');
        return data;
    }
    callGetAPI(apiPath, params, parameterStatus) {
        //let data = environment.apiURL;
        //if (parameterStatus.toUpperCase() == 'YES')
        //  return this.http.get(environment.apiURL + apiPath, { params }).map(this.extractData).catch(this.handleError);
        //else
        //  return this.http.get(environment.apiURL + apiPath).map(this.extractData).catch(this.handleError);
        let urldata = environment.apiURL;
        if (parameterStatus.toUpperCase() == 'YES')

            return this.http.get(urldata).pipe(
                mergeMap(json => this.http.get(json[0]['ApiHostUrl'] + apiPath, { params }).map(this.extractData).catch(this.handleError)));
        else
            return this.http.get(urldata).pipe(
                mergeMap(json => this.http.get(json[0]['ApiHostUrl'] + apiPath).map(this.extractData).catch(this.handleError)));

    }

    callPostAPI(apiPath, data) {

        let urldata = environment.apiURL;
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        httpHeaders.append('Access-Control-Allow-Origin', '/*');
        //httpHeaders.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


        let options = {
            headers: httpHeaders
        };
        //console.log("data : ", data);

        //return this.http.post(environment.apiURL + apiPath, data, options).map(this.extractData).catch(this.handleError);
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + apiPath, data, options).map(this.extractData).catch(this.handleError)));

    }

    //Not used(Repeated)
    callPostAPIMultipleParameters(apiPath) {
        let urldata = environment.apiURL;
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        httpHeaders.append('Access-Control-Allow-Origin', '/*');
        // httpHeaders.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

        let options = {
            headers: httpHeaders
        };
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + apiPath, options).map(this.extractData).catch(this.handleError)));

    }


    public currencyformat(value) {
        //
        if (value == null) { value = 0; }
        else {
            value = parseFloat(value.toString().replace(/,/g, ""));
        }
        let withNegativeData: any;
        var result: any;
        //let currencyformat= this.cookieservice.get("savedformat")
        let currencyformat = "India"
        if (currencyformat == "India") {
            if (value < 0) {
                let stringData = value.toString();
                withNegativeData = stringData.substring(1, stringData.length);
                result = withNegativeData.toString().split('.');
            }
            else if (value >= 0) {
                result = value.toString().split('.');
            }
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
                output += "." + result[1];
            }
            if (value >= 0) {
                return output
            }
            else if (value < 0) {
                output = '-' + '' + output;
                return output
            }
            // } 
        }
        else {
            // this.symbol = this.cookieservice.get("symbolofcurrency")
            var result = value.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
                output += "." + result[1];
            }
            //return this.symbol+"  "+output
        }

    }
    public functiontoRemoveCommas(value) {
        let a = value.split(',')
        let b = a.join('')
        let c = b
        return c;
    }
    public removeCommasInAmount(value) {
        if (isNullOrEmptyString(value))
            value = 0;
        return parseFloat(value.toString().replace(/,/g, ""))
        // let a = value.split(',')
        // let b = a.join('')
        // let c = b
        // return c;
    }

    GetContactDetails(contacttype: string) {

        const params = new HttpParams().set('contactType', contacttype)
        return this.callGetAPI('/Banking/Masters/FIMember/getContactDetails', params, 'YES')
        //   let httpHeaders = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Cache-Control': 'no-cache'
        //   })
        //   let HttpParams = { 'contactType': contacttype }
        //   let options = {
        //     headers: httpHeaders,
        //     params: HttpParams
        //   };  
        // return this.http.get('http://192.168.2.164:9999/api/Settings/ReferralAdvocate/getContactDetails',options)
    }

    GetContactDetailsbyId(ContactId) {

        const params = new HttpParams().set('ContactId', ContactId)
        return this.callGetAPI('/Settings/ReferralAdvocate/GetContactDetailsbyId', params, 'YES')
    }
    ConvertImagepathtobase64(path) {
        const params = new HttpParams().set('strPath', path)
        return this.callGetAPI('/loans/masters/contactmaster/ConvertImagepathtobase64', params, 'YES')
    }

    SetFiTab1Data(data) {
        this.FiTab1Details = data
    }
    GetFiTab1Data() {
        return this.FiTab1Details
    }
    _SetFiTab1Data(data) {
        this.FiTab1Data.next(data)
    }
    _GetFiTab1Data(): Observable<any> {
        return this.FiTab1Data.asObservable();
    }

    _SetBankUpdate(data) {
        this.BankUpdate.next(data);
    }
    _GetBankUpdate(): Observable<any> {
        return this.BankUpdate.asObservable();
    }
    _SetBankData(data) {
        this.BankData.next(data);
    }
    _GetBankData(): Observable<any> {
        return this.BankData.asObservable();
    }
    /////mahesh m
    CheckValidationStatus(status) {
        this.ValidationStatus.next(status)
    }
    GetValidationStatus(): Observable<any> {
        return this.ValidationStatus
    }


    _setValidationStatus(data: any) {

        this._validationStatus = data
    }
    _getValidationStatus() {
        return this._validationStatus;
    }

    _checkValidationsBetweenComponents() {
        this.ValidationStatus.next();
    }
    _CheckValidationStatus(): Observable<any> {
        return this.ValidationStatus.asObservable();
    }
    /////
    _SetKYCData(data) {
        this.KYCData.next(data);
    }
    _GetKYCData(): Observable<any> {
        return this.KYCData.asObservable();
    }
    _SetKYCUpdate(data) {
        this.KYCUpdate.next(data);
    }
    _GetKYCUpdate(): Observable<any> {
        return this.KYCUpdate.asObservable();
    }
    _SetTDSData(data) {
        this.TDSData.next(data);
    }
    _GetTDSData(): Observable<any> {
        return this.TDSData.asObservable();
    }

    _SetTDSUpdate(data) {
        this.TDSUpdate.next(data);
    }
    _GetTDSUpdate(): Observable<any> {
        return this.TDSUpdate.asObservable();
    }

    _SetContactData(data) {
        this.ContactData.next(data);
    }
    _GetContactData(): Observable<any> {
        return this.ContactData.asObservable();
    }
    _SetContactUpdate(data) {
        this.ContactUpdate.next(data);
    }
    _GetContactUpdate(): Observable<any> {
        return this.ContactUpdate.asObservable();
    }

    _SetReferralViewData(data) {
        this.ReferralViewData = data;
    }
    _GetReferralViewData() {
        return this.ReferralViewData;
    }


    _SetGeneralReceiptView(data) {
        this.GeneralReceiptView = data
        // this.GeneralReceiptView.next(data);
    }
    _GetGeneralReceiptView() {
        return this.GeneralReceiptView
    }

    _SetPaymentView(data) {
        this.PaymentView = data
    }
    _GetPaymentView() {
        return this.PaymentView
    }


    _SetReferralid(data) {
        this.ReferralId = data;
    }
    _GetReferralid() {
        return this.ReferralId;
    }

    fileUpload(data) {
        let urldata = environment.apiURL;
        return this.http.get(urldata).pipe(
            mergeMap(json => this.http.post(json[0]['ApiHostUrl'] + '/loans/masters/contact/MultiFileUpload', data).map(this.extractData).catch(this.handleError)));
    }

    GetImage(strPath)
    {
        const params = new HttpParams().set('strPath', strPath)
        return this.callGetAPI('/loans/masters/contactmasterNew/ConvertImagepathtobase64', params, 'YES')
    }
    GetContactDetailsforKYC(ContactId) {

        const params = new HttpParams().set('pContactId', ContactId)
        return this.callGetAPI('/Settings/getDocumentstoreDetails', params, 'YES')
    }
    GetDateLockStatus() {
        return this.callGetAPI('/Settings/GetDateLockStatus', '', 'NO')
    }
    removeCommasForEntredNumber(enteredNumber) {
        return parseFloat(enteredNumber.toString().replace(/,/g, ""))
    }

    showWarningMessage(message) {
        this.toastr.warning(message, 'Warning!');
    }
    GetCollectionReport(fromDate, toDate, recordid, fieldname, fieldtype): Observable<any> {
        try {
            const params = new HttpParams().set('fromDate', fromDate).set('toDate', toDate).set('recordid', recordid).set('fieldname', fieldname).set('fieldtype', fieldtype);
            return this.callGetAPI('/CollectionReport/api/Loans/Reports/GetColletionsummary', params, 'YES');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }
    _SetUserrightsView(data) {
        this.UserRightsView = data
        // this.GeneralReceiptView.next(data);
    }
    _GetUserrightsView() {
        return this.UserRightsView
    }


    GetCollectiondetails(fromDate, toDate, applicationid): Observable<any> {
        try {
            const params = new HttpParams().set('fromDate', fromDate).set('toDate', toDate).set('Applicationid', applicationid)
            return this.callGetAPI('/CollectionReport/api/Loans/Reports/GetColletiondetails', params, 'YES');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }


    _setReportLableName(data) {

        this.reportLableName = data;
    }
    _getReportLableName() {

        return this.reportLableName;
    }

    Getmemberdetails(): Observable<any> {
        try {
            return this.callGetAPI('/Banking/Masters/MemberType/GetMemberDetails', '', 'NO');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }
    Getsharememberdetails(): Observable<any> {
        try {
            return this.callGetAPI('/Banking/Masters/MemberType/GetShareMemberTypeDetails', '', 'NO');
        }
        catch (e) {
            this.showErrorMessage(e);
        }
    }
    ageCalculatorYYYYMMDD(fromDate, Todate): string {
        let Currentage = "";
        if (!isNullOrEmptyString(fromDate) && !isNullOrEmptyString(Todate)) {
            let start = new Date(fromDate);
            let end = new Date(Todate)

            let b_day = start.getDate();
            let b_month = start.getMonth() + 1;
            let b_year = start.getFullYear();

            let c_day = end.getDate();
            let c_month = end.getMonth() + 1;
            let c_year = end.getFullYear();

            if (b_day > c_day) {
                c_day = c_day + this.daysInMonth(c_month - 1, c_year);
                c_month = c_month - 1;
            }
            if (b_month > c_month) {
                c_year = c_year - 1;
                c_month = c_month + 12;
            }

            let calculated_date = c_day - b_day;
            let calculated_month = c_month - b_month;
            let calculated_year = c_year - b_year;

            Currentage = calculated_year + " Year  " + calculated_month + "  Months " + calculated_date + "  Days";

        }
        return Currentage;
    }
    daysInMonth(month, year) {
        if (month < 0)
            return 31;
        return new Date(year, month, 0).getDate();
    }
    ageCalculation(DOB): Number {


        let age;
        let dob = DOB;
        if (dob != '' && dob != null) {
            let currentdate = Date.now();
            //let agedate = new Date(dob);
            let agedate = new Date(dob).getTime();
            let timeDiff = Math.abs(currentdate - agedate);
            if (timeDiff.toString() != 'NaN')
                age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
            else
                age = 0;
        }
        else {
            age = 0;
        }
        return age;

    }
    _downloadReportsPdf(reportName, gridData, gridheaders, colWidthHeight, pagetype) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);

                        //if (betweenorason == "Between") {

                        //    doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        //}
                        //else {

                        //    doc.text('As On  : ' + tomonthof + '', 15, 52);
                        //}

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);

                        //if (betweenorason == "Between") {

                        //    doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        //}
                        //else {

                        //    doc.text('As On  : ' + tomonthof + '', 15, 52);
                        //}
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 57);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }

    _downloadReportsPdf1(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 57);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }
    _downloadReportsPdf11(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof, schemetype, paymenttype, companyname, branchname, type, accountno) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);
                       // doc.text('Scheme:' + schemeid + '', 20, 52);
                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);
                        if (schemetype=="undefined") {
                            //  doc.text('Scheme Id :' + schemeid + '', 15, 45);
                        }
                        else {
                            doc.text('Scheme :' + schemetype + '', 15, 45);
                        }

                        doc.text('Payment Type :' + paymenttype + '', 15, 59);
                        doc.text('Advance Account Number :' + accountno + '', 235, 54);
                        doc.text('Type :' + type + '', 235, 45);
                       
                        doc.text('Company :' + companyname + '', 15, 50);
                       
                        
                        doc.text('Branch :' + branchname + '', 235, 50);
                      
                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 54);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 54);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 59);



                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }


    _downloadReportsPdfpromotedsalary(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof, agentname, type) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);


                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);
                        if (agentname == "undefined") {

                        }
                        else {
                            doc.text('Agent Name : ' + agentname + '', 14, 58);
                        }
                        doc.text('Type  :' + type + '', 236, 58);
                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 52);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }

    _downloadReportsPdfmemberwisereceipt(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof, membernameid) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);
                        if (membernameid == "undefined") {

                        }
                        else {
                            doc.text('Member Name : ' + membernameid + '', 14, 58);
                        }

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 57);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }


    _downloadReportsPdfmaturityintimation(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof, schemetype, branchname) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);
                        if (schemetype == "undefined") {

                        }
                        else {
                            doc.text('Scheme Name : ' + schemetype + '', 15, 58);
                        }
                        doc.text('Branch Name  :' + branchname + '', 235, 59);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 53);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }
    _downloadReportsPdflienrelease(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof, branchname) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);

                        doc.text('Branch Name  :' + branchname + '', 15, 58);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 57);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }

    _downloadReportsPdfselfadjustment(reportName, gridData, gridheaders, colWidthHeight, pagetype, betweenorason, frommonthof, tomonthof,paymenttype,companyname, branchname) {
        debugger;
        //let Companyreportdetails = this._getCompanyDetails();
        let comapnydata = this.comapnydetails;
        //console.log("company data",this.comapnydata)
        // this.pCompanyName = this.comapnydata['pCompanyName'];
        // this.pAddress1 = this.comapnydata['pAddress1'];
        // this.pAddress2 = this.comapnydata['pAddresspCinNo2'];
        // this.pcity = this.comapnydata['pcity'];
        // this.pCountry = this.comapnydata['pCountry'];
        // this.pState = this.comapnydata['pState'];
        // this.pDistrict = this.comapnydata['pDistrict'];
        // this.pPincode = this.comapnydata['pPincode'];
        // this.pCinNo = this.comapnydata['pCinNo'];
        // this.pGstinNo = this.comapnydata['pGstinNo'];
        // this.pBranchname = this.comapnydata['pBranchname'];
        //let doc = new jsPDF('a4')
        // var doc = new jsPDF();
        //let doc = new jsPDF('lanscape');
        // if(pagetype=="a4")
        // {
        //     let doc = new jsPDF('a4')
        // }
        // else{

        // }
        let doc = new jsPDF(pagetype);
        let totalPagesExp = '{total_pages_count_string}'
        let today = formatDate(new Date(), 'dd-MM-yyyy', 'en-IN');
        //let Easy_chit_Img = this.Easy_chit_Img;

        doc.autoTable({
            columns: gridheaders,
            body: gridData,
            theme: 'grid',//'striped'|'grid'|'plain'|'css' = 'striped'
            //headStyles: { fillColor: [231, 76, 60] }, // Red
            styles: {
                cellWidth: 'wrap',
                rowPageBreak: 'avoid',
                overflow: 'linebreak'
            },

            // Override the default above for the text column
            columnStyles: colWidthHeight,
            startY: 60,
            showHead: 'everyPage',//|'everyPage'|'never' = 'firstPage''
            showFoot: 'lastPage',
            didDrawPage: function (data) {

                let pageSize = doc.internal.pageSize;
                let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
                let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // Header
                doc.setFontStyle('normal');
                if (doc.internal.getNumberOfPages() == 1) {
                    debugger;
                    doc.setFontSize(15);
                    if (pagetype == "a4") {
                        // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 60, 27);
                        doc.setFontSize(14);
                        doc.text(reportName, 85, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 65, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 75, 37);

                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 52);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 52);
                        }

                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    }



                    //a3



                    // if (pagetype == "a1") {
                    //     // doc.addImage(Easy_chit_Img, 'JPEG', 85, 5, 30, 15)
                    //      doc.setTextColor('black');
                    //      doc.text(comapnydata.pCompanyName, 100, 27);
                    //      doc.setFontSize(14);
                    //      doc.text(reportName, 85, 45);
                    //      doc.setFontSize(10);
                    //      doc.text(comapnydata.pAddress1+ "," + comapnydata.pAddress2, 65, 32, 0, 0,'left');
                    //      doc.text('CIN : ' + comapnydata.pCinNo+ '', 75, 37);

                    //      //if (betweenorason == "Between") {

                    //      //    doc.text('Between  : ' + fromdate + '  And  ' + todate + ' ', 15, 52);
                    //      //}
                    //      //else {

                    //      //    doc.text('As On  : ' + fromdate + '', 15, 52);
                    //      //}

                    //      doc.text('Printed On : ' + today + '', 15, 57);
                    //      doc.text('Branch : ' + comapnydata.pBranchname + '', 147, 57);




                    //  }
                    if (pagetype == "landscape") {
                        //doc.addImage(Easy_chit_Img, 'JPEG', 125, 5, 30, 15)
                        doc.setTextColor('black');
                        doc.text(comapnydata.pCompanyName, 100, 27);

                        doc.setFontSize(14);
                        doc.text(reportName, 125, 45);
                        doc.setFontSize(10);
                        doc.text(comapnydata.pAddress1 + "," + comapnydata.pAddress2, 108, 32, 0, 0, 'left');
                        doc.text('CIN : ' + comapnydata.pCinNo + '', 118, 37);
                        doc.text('Type : ' + paymenttype + '', 15, 55);
                        if(paymenttype=="ADJUSTMENT"){
                        doc.text('Company Name : ' + companyname + '',15,59);                   
                        doc.text('Branch Name  :' + branchname + '', 236, 58);
                        }
                        if (betweenorason == "Between") {

                            doc.text('Between  : ' + frommonthof + '  And  ' + tomonthof + ' ', 15, 49);
                        }
                        else {

                            doc.text('As On  : ' + tomonthof + '', 15, 49);
                        }
                        // doc.text('Printed On : ' + today + '', 15, 57);
                        doc.text('Branch : ' + comapnydata.pBranchname + '', 235, 53);


                    }

                }
                else {

                    data.settings.margin.top = 20;
                    data.settings.margin.bottom = 15;
                }
                debugger;
                var pageCount = doc.internal.getNumberOfPages();
                if (doc.internal.getNumberOfPages() == totalPagesExp) {
                    debugger;

                }
                // Footer
                let page = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    debugger;
                    page = page + ' of ' + totalPagesExp
                }
                doc.setFontSize(10);
                doc.text('Printed On : ' + today + '', data.settings.margin.left, pageHeight - 5);
                // doc.text(today, data.settings.margin.left, pageHeight - 5);
                //doc.text(officeCd, pageWidth / 2, pageHeight - 5, 'center');
                doc.text(page, pageWidth - data.settings.margin.right - 10, pageHeight - 5);
            }
        });
        if (typeof doc.putTotalPages === 'function') {
            debugger;
            doc.putTotalPages(totalPagesExp);

        }
        doc.save('' + reportName + '.pdf');

    }


    _getGroupingGridExportData(griddata, groupdcol, isgroupedcolDate) {
        debugger;

        let a = [];
        let keys = [];
        for (var i = 0; i < griddata.length; i++) {
            let Jsongroupcol;
            if (isgroupedcolDate == true) {
                Jsongroupcol = formatDate(griddata[i][groupdcol], 'dd-MM-yyyy', 'en-IN');
            }
            else {
                Jsongroupcol = griddata[i][groupdcol];
            }
            if (!a[Jsongroupcol]) {

                keys.push(Jsongroupcol);
                let k = { ...griddata[i] }
                a[Jsongroupcol] = [k];

            }
            a[Jsongroupcol].push(griddata[i]);

        }

        let final = [];
        for (var j = 0; j < keys.length; j++) {

            let keypair = a[keys[j]]
            for (var k = 0; k < keypair.length; k++) {
                let groupcolHead

                if (k == 0) {
                    if (isgroupedcolDate == true) {
                        groupcolHead = formatDate(keypair[k][groupdcol], 'dd-MM-yyyy', 'en-IN');
                    }
                    else {
                        groupcolHead = keypair[k][groupdcol];
                    }
                    keypair[k]["group"] = {
                        content: '' + groupcolHead + '',
                        colSpan: 15,
                        styles: { halign: 'left', fillColor: "#e6f7ff" },
                    };
                }
                final.push(keypair[k])
            }
        }

        return final;
    }
}


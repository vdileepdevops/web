import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { debug } from 'util';
import { DatePipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
import { LienEntryService } from '../../../Services/Banking/lien-entry.service';
import { CommonService } from '../../../Services/common.service';
import { formatDate } from "@angular/common";
import { Page } from 'src/app/UI/Common/Paging/page';
import {PageCriteria} from'src/app/Models/Loans/Masters/pagecriteria'
@Component({
    selector: 'app-promote-salary-report',
    templateUrl: './promote-salary-report.component.html',
    styles: []
})
export class PromoteSalaryReportComponent implements OnInit {
    PromoterSalaryForm: FormGroup;
    @ViewChild('myTable',{static:false})
    // exportAsConfig: ExportAsConfig = {

    //     type: 'pdf', // the type you want to download
    //     //type: 'xls',
    //     elementId: 'promotersalarylist', // the id of html/table element
    //     options: {
    //         //jsPDF: {
    //         orientation: 'potrait'
    //         //},
    //         //margin: {
    //         //    top: '10',
    //         //    bottom: '10'
    //         //},

    //         //pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    //     }
    // }
    config: any = [];
    comapnydata: any;
    frommonthof: any;
    public today: Date = new Date();
    tomonthof: any;
    frommonthof1: any;
    tomonthof1: any;
    agentid = 0;
    agentname="undefined";

    toUpperCase: any;
    pDatetype: ['ASON'];
    public savebutton = 'Show';
    displaytodate = "As On";
    public loading = false;
    public isLoading = false;
    validation = false;
    pdatecheked = "ASON";
    type = "ALL";
    public betweenorason = "As On";
    


    showFrommonth: any;
    showTomonth: any;
    selecteddate = true;
    formValidationMessages: any;
    //promotersalarylist: any;
    gridData: any = [];
    public ShowAgentnames: any = []

    public selectedvalues: any = []
    PromoterSalaryErrors: any
    date: any;
    doc: any;
    fromdate: any;
    todate: any;
    table: any;
    returndata: any[];
    promotersalarylist: any;
    JSONdataItem: any = [];
    commencementgridPage = new Page();
    startindex: any;
    endindex: any
    pageCriteria: PageCriteria;
    public dpFromConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    public dpToConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    

    constructor(private FB: FormBuilder, private _LienEntryService: LienEntryService, private _CommonService: CommonService, private datepipe: DatePipe, private router: Router, private exportAsService: ExportAsService) {

        // this.dpFromConfig.dateInputFormat = 'DD-MMM-YYYY'
        this.dpFromConfig.dateInputFormat = 'MMM-YYYY'
        this.dpFromConfig.maxDate = new Date();
        this.dpFromConfig.showWeekNumbers = false;

        // this.dpToConfig.dateInputFormat = 'DD-MMM-YYYY'
        this.dpToConfig.dateInputFormat = 'MMM-YYYY'
        this.dpToConfig.maxDate = new Date();
        this.dpToConfig.showWeekNumbers = false;
        this.pageCriteria = new PageCriteria();

    }
    
    
    ngOnInit() {
      //  this.setPageModel();
        this.PromoterSalaryForm = this.FB.group({
            pagentname: [''],
            pagentid: ['0'],
            ptype: ['ALL'],
            pDatetype: ['ASON'],
            pFromMonthOf: [this.today],
            pToMonthOf: [this.today],
            pmodofDate: [''],


        })
        this.commencementgridPage.pageNumber = 0
        this.commencementgridPage.size =2;
        this.startindex = 0;
        this.endindex = this.commencementgridPage.size;
        this.commencementgridPage.totalElements = 2;
        this.PromoterSalaryErrors = {};
        this.DatetypeChange('ASON');
        //this.BlurEventAllControll(this.PromoterSalaryForm);
        this.validation = false;
        this.date = new Date();
        this.GetAgentDetails();
       
        this.frommonthof = new Date();
        this.tomonthof = new Date();
        // this.fromdate = this.datepipe.transform(this.frommonthof, "yyyy-MM-dd");
        // this.todate = this.datepipe.transform(this.tomonthof, "yyyy-MM-dd");
        this.fromdate = this.datepipe.transform(this.frommonthof, "yyyy-MM");
        this.todate = this.datepipe.transform(this.tomonthof, "yyyy-MM");
        this.frommonthof1 = this.datepipe.transform(this.frommonthof, "MMM-yyyy");
        this.tomonthof1 = this.datepipe.transform(this.tomonthof, "MMM-yyyy");
        this.PromoterSalaryForm['controls']['pToMonthOf'].setValue(this.date);

    }
    getVoucherno(row) {
        debugger;
        window.open('/#/PaymentVoucherReports?id=' + btoa(row.pvoucherno + ',' + 'Payment Voucher'));

    }
    setPageModel() {
        debugger
        this.pageCriteria.pageSize = this._CommonService.pageSize
        this.pageCriteria.offset = 0;
        this.pageCriteria.pageNumber = 1;
        this.pageCriteria.footerPageHeight = 50;
      }
    GetAgentDetails() {
        debugger;
        this._LienEntryService.GetAgentDetails().subscribe(result => {
            debugger;
            if (result) {
                this.ShowAgentnames = result;

            }
        })
    }
    //export() {
    //    debugger;
    //    // download the file using old school javascript method
    //    this.exportAsService.save(this.exportAsConfig, 'PromoterSalary').subscribe(() => {
    //        // save started
    //    });
    //    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    //    this.exportAsService.get(this.config).subscribe(content => {
    //        console.log(content);
    //    });

    //}
    pdf() {
        debugger;
        let temp;
        let rows = [];
        let type;
        let gridheaders;
        let reportname = "Promoter Salary ";
       
        gridheaders = ["Member Name","Advance Account No.","Agent Name", "Commission Amount", "TDS Amount", "Paid Amount", "Voucher No.", "Payment Date", "Mode of Payment", "Bank Name", "Bank Branch Name", "Cheque No."];
       

        let colWidthHeight = {
           // paccountname: { cellWidth: 'auto' }, ledger: { cellWidth: 'auto' }, popeningbal: { cellWidth: 'auto' }, pdebitamount: { cellWidth: 'auto' }, pcreditamount: { cellWidth: 'auto' }, pclosingbal: { cellWidth: 'auto' }
           0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 'auto' }, 3: { cellWidth: 'auto',halign: 'right'  }, 4: { cellWidth: 'auto',halign: 'right' }, 5: { cellWidth: 'auto',halign: 'right'}, 6: { cellWidth: 'auto' }, 7: { cellWidth: 'auto'  },8: { cellWidth: 'auto'  },9: { cellWidth: 'auto' },10: { cellWidth: 'auto' },11: { cellWidth: 'auto' },12: { cellWidth: 'auto' }
        }

        let data = "true"
        if (data == "true") {
            this.returndata = this._CommonService._getGroupingGridExportData(this.promotersalarylist, "pPaymentstatus", false)
        }
        else {
            this.returndata = this.promotersalarylist
        }
        this.returndata.forEach(element => {
            let Paymentdate;
            let paymentdate1 = element.ppaymentdate;
            // if (paymentdate1 !== null) {
            //     let DateFormat3 = this._CommonService.formatDateFromYYYYMMDD(paymentdate1);
            //     Paymentdate = this.datepipe.transform(DateFormat3, 'dd-MM-yyyy')
            // }
            Paymentdate=paymentdate1;
            let TDSamount = this._CommonService.currencyformat(parseFloat(element.pTdsamount).toFixed(2));
            let Totalamount = this._CommonService.currencyformat(parseFloat(element.ptotalamount).toFixed(2));
            let Commissionamount = this._CommonService.currencyformat(parseFloat(element.pCommissionamount).toFixed(2));
           
            if (element.group !== undefined) {
                temp = [element.group, element.pMembername, element.pSchemeAccountno,element.pAgentname, Commissionamount, TDSamount,Totalamount, element.pvoucherno, Paymentdate, element.pmodeofpayment, element.ppaybankname, element.ppaybankbranchname, element.ppaychequeno];
            }
            else {
                temp = [element.pMembername, element.pSchemeAccountno,element.pAgentname,Commissionamount, TDSamount,Totalamount, element.pvoucherno, Paymentdate, element.pmodeofpayment, element.ppaybankname, element.ppaybankbranchname, element.ppaychequeno];
            }
    


            rows.push(temp);
    });
        // pass Type of Sheet Ex : a4 or lanscspe  
        debugger;

        // this.frommonthof = this.datepipe.transform(this.frommonthof, "MMM-yyyy");
        // this.tomonthof = this.datepipe.transform(this.tomonthof, "MMM-yyyy");
       this._CommonService._downloadReportsPdfpromotedsalary(reportname, rows, gridheaders, colWidthHeight, "landscape",this.betweenorason, this.frommonthof, this.tomonthof,this.agentname, this.type);



    }



agentnamechange($event) {
    debugger;
    this.agentid = $event.target.value;
    this.agentname=$event.target.options[$event.target.selectedIndex].text;
    this.promotersalarylist = [];

}
 public onOpenCalendar(container) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }
GetShowAgentdetails() {
    debugger;
    if (this.showbtnvalidation) {
        this.promotersalarylist = [];
        debugger;
        // this.frommonthof = this.datepipe.transform(this.frommonthof, "yyyy-MM-dd");
        // this.tomonthof = this.datepipe.transform(this.tomonthof, "yyyy-MM-dd");
        this.frommonthof = this.datepipe.transform(this.frommonthof, "MMM-yyyy");
       this.tomonthof = this.datepipe.transform(this.tomonthof, "MMM-yyyy");
        this._LienEntryService.ShowPromoterSalaryReport(this.agentid, this.frommonthof, this.tomonthof, this.type, this.pdatecheked).subscribe(result => {
            debugger;
            this.promotersalarylist = result;
            this.pageCriteria.totalrows = this.promotersalarylist.length;
            if (this.promotersalarylist.length < this.pageCriteria.pageSize) {
              this.pageCriteria.currentPageRows = this.promotersalarylist.length;
            }
            else {
              this.pageCriteria.currentPageRows = this.pageCriteria.pageSize;
            }
        })

    }


}
onFooterPageChange(event): void {
    this.pageCriteria.offset = event.page - 1;
    if (this.pageCriteria.totalrows < event.page * this.pageCriteria.pageSize) {
      this.pageCriteria.currentPageRows = this.pageCriteria.totalrows % this.pageCriteria.pageSize;
    }
    else {
      this.pageCriteria.currentPageRows = this.pageCriteria.pageSize;
    }
  }
showbtnvalidation() {
    debugger
    let pagentid = <FormGroup>this.PromoterSalaryForm['controls']['pagentid'];
    let pFromMonthOf = <FormGroup>this.PromoterSalaryForm['controls']['pFromMonthOf'];
    let pToMonthOf = <FormGroup>this.PromoterSalaryForm['controls']['pToMonthOf'];
    let ptype = <FormGroup>this.PromoterSalaryForm['controls']['ptype'];

    pagentid.setValidators(Validators.required)
    ptype.setValidators(Validators.required)
    pToMonthOf.setValidators(Validators.required)
    if (this.pdatecheked == 'BETWEEN') {
        pFromMonthOf.setValidators(Validators.required)
    }
    pFromMonthOf.updateValueAndValidity();
    pToMonthOf.updateValueAndValidity();
    ptype.updateValueAndValidity();
    pagentid.updateValueAndValidity();


}
toggleExpandGroup(group) {
    debugger;
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
}

onDetailToggle(event) {
    console.log('Detail Toggled', event);
}
DatetypeChange(type) {
    debugger;

    if (type == "ASON") {
        this.PromoterSalaryForm['controls']['pToMonthOf'].setValue(this.date);
        this.showFrommonth = false;
        this.showTomonth = true;
        this.displaytodate = "As On"
        this.pdatecheked = "ASON";
        this.betweenorason="As On";
    }
    else if (type == "BETWEEN") {
        this.PromoterSalaryForm['controls']['pFromMonthOf'].setValue(this.date);
        this.PromoterSalaryForm['controls']['pToMonthOf'].setValue(this.date);
        this.showFrommonth = true;
        this.showTomonth = true;
        this.displaytodate = "To Month";
        this.pdatecheked = "BETWEEN";
        this.betweenorason="Between";
    }
    else {
        this.showFrommonth = false;
        this.showTomonth = false;
        this.displaytodate = "Month Of";

    }
    //this.datechangevalidations(type);
    //this.cleardatechange();

}
FromDateChange($event: any) {
    debugger;
    this.gridData = [];
    this.frommonthof = $event;
    this.promotersalarylist = [];
    //this.fromdate = this.datepipe.transform(this.frommonthof, "yyyy-MM-dd");
    this.fromdate = this.datepipe.transform(this.frommonthof, "yyyy-MM");
    this.frommonthof1 = this.datepipe.transform(this.frommonthof, "MMM-yyyy");
    if (this.tomonthof != [] || this.tomonthof == null || this.tomonthof == '') {
        this.validatedates();
    }

}
ToDateChange($event: any) {
    debugger;
    this.gridData = [];
    this.promotersalarylist = [];
    this.tomonthof = $event;
    //this.todate = this.datepipe.transform(this.tomonthof, "yyyy-MM-dd");
    this.todate = this.datepipe.transform(this.tomonthof, "yyyy-MM");
    this.tomonthof1 = this.datepipe.transform(this.tomonthof, "MMM-yyyy");
    if (this.frommonthof != [] || this.frommonthof == null || this.frommonthof == '') {
        this.validatedates();
    }

}
validatedates() {

    if (this.fromdate > this.todate) {
        this.validation = true
    }
    else {
        this.validation = false;
    }

}

TypeChange($event: any) {
    debugger;
    this.gridData = [];
    this.promotersalarylist = [];
    this.type = $event.target.value;
}
clearPromoterSalary() {

    try {
        this.promotersalarylist = [];
        this.PromoterSalaryForm.reset();
        this.PromoterSalaryForm['controls']['pagentid'].setValue('ALL');
        this.PromoterSalaryForm['controls']['pDatetype'].setValue('ASON');
        this.PromoterSalaryForm['controls']['ptype'].setValue('ALL');

        this.formValidationMessages = {};
        this.PromoterSalaryErrors = {};


    } catch (e) {
        this._CommonService.showErrorMessage(e);
    }
}

// Validation Methods ---------------
checkValidations(group: FormGroup, isValid: boolean): boolean {
    debugger
    try {

        Object.keys(group.controls).forEach((key: string) => {

            isValid = this.GetValidationByControl(group, key, isValid);
        })

    }
    catch (e) {
        return false;
    }
    return isValid;
}
GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean {

    try {
        let formcontrol;
        formcontrol = formGroup.get(key);
        if (formcontrol) {
            if (formcontrol instanceof FormGroup) {
                this.checkValidations(formcontrol, isValid)
            }
            else if (formcontrol.validator) {
                this.PromoterSalaryErrors[key] = '';
                if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
                    let lablename;
                    lablename = (document.getElementById(key) as HTMLInputElement).title;
                    let errormessage;
                    for (const errorkey in formcontrol.errors) {
                        if (errorkey) {
                            errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                            this.PromoterSalaryErrors[key] += errormessage + ' ';
                            isValid = false;
                        }
                    }
                }
            }
        }
    }
    catch (e) {
        // this.showErrorMessage(e);
        // return false;
    }
    return isValid;
}
showErrorMessage(errormsg: string) {
    this._CommonService.showErrorMessage(errormsg);
}
BlurEventAllControll(fromgroup: FormGroup) {
    try {
        Object.keys(fromgroup.controls).forEach((key: string) => {
            this.setBlurEvent(fromgroup, key);
        })
    }
    catch (e) {
        this.showErrorMessage(e);
        return false;
    }
}
setBlurEvent(fromgroup: FormGroup, key: string) {
    try {
        let formcontrol;
        formcontrol = fromgroup.get(key);
        if (formcontrol) {
            if (formcontrol instanceof FormGroup) {
                this.BlurEventAllControll(formcontrol)
            }
            else {
                if (formcontrol.validator)
                    fromgroup.get(key).valueChanges.subscribe((data) => { this.GetValidationByControl(fromgroup, key, true) })
            }
        }
    }
    catch (e) {
        this.showErrorMessage(e);
        return false;
    }
}
    // End Validation Methods --------------

}

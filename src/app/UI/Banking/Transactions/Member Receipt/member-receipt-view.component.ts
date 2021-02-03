import { Component,ViewChild, OnInit, NgZone, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
import { MemberReceiptService } from 'src/app/Services/Banking/Transactions/member-receipt.service';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined, debug } from 'util';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { State, GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';
import { FdReceiptService } from 'src/app/Services/Banking/Transactions/fd-receipt.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
declare let $: any


@Component({
  selector: 'app-member-receipt-view',
  templateUrl: './member-receipt-view.component.html',
  styles: []
})
export class MemberReceiptViewComponent implements OnInit {

  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  MemberREceiptViewForm: FormGroup
  MemberREceiptDEtailsList: any;
  GridList: any;
  InputFdAccountNo: any;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dppConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public isLoading = false;
  public ShowDates: boolean = false;
  public ShowSearch: boolean = true;
  savebutton = "Show"
  constructor(private fb: FormBuilder, private _MemberReceiptService: MemberReceiptService, private datepipe: DatePipe) {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig.maxDate = new Date();
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY'


    this.dppConfig.containerClass = 'theme-dark-blue';
    this.dppConfig.showWeekNumbers = false;
    this.dppConfig.maxDate = new Date();
    this.dppConfig.dateInputFormat = 'DD/MM/YYYY'
  }

  ngOnInit() {
    debugger;
    this.MemberREceiptViewForm = this.fb.group
      ({
        pFromDate: [new Date()],
        pTodate: [new Date()],
       
      })
    this.BindData();
  }

  BindData() {
    this.isLoading = false;
    this.savebutton = 'Show';
    let Fromdate = this.datepipe.transform(this.MemberREceiptViewForm.controls.pFromDate.value, "yyyy-MM-dd");
    let Todate = this.datepipe.transform(this.MemberREceiptViewForm.controls.pTodate.value, "yyyy-MM-dd");;
    this._MemberReceiptService.GetMemberReceiptDetails(Fromdate, Todate).subscribe(res => {
      debugger;
      this.isLoading = false;
      this.savebutton = 'Show';
      this.MemberREceiptDEtailsList = res;
      this.GridList = this.MemberREceiptDEtailsList;

    });
  }
  checkingfrommdate() {
    this.dppConfig.minDate = this.MemberREceiptViewForm.controls.pFromDate.value
  }
  checkdatevalidation() {
    this.dpConfig.maxDate = this.MemberREceiptViewForm.controls.pTodate.value
  }
  checkox(event) {
    if (event.target.checked) {
      this.ShowDates = true;
      this.ShowSearch = false;
    }
    else {
      this.ShowDates = false;
      this.ShowSearch = true;
      this.MemberREceiptViewForm.controls.pFromDate.setValue(new Date());
      this.MemberREceiptViewForm.controls.pTodate.setValue(new Date());
      this.BindData();
    }
  }
  public SearchRecord(inputValue: string): void {
    this.MemberREceiptDEtailsList = process(this.GridList, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pMembername',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pMembercode',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'ptotalpaidamount',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pFdaccountno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pReceiptdate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pDueamount',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pReceivedAmount',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pModeOfReceipt',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pReceiptno',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
  getReceipt(DataItem) {
    console.log(event)
    window.open('/#/GeneralReceiptReports?id=' + btoa(DataItem.preceiptno + ',' + 'Receipt Voucher'));
  }

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { SelfAdjustmentService } from 'src/app/Services/Banking/Transactions/self-adjustment.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { FdTranscationDetailsComponent } from '../FD-AC-Creation/fd-transcation-details.component';
declare let $: any
@Component({
  selector: 'app-self-or-adjustment-view',
  templateUrl: './self-or-adjustment-view.component.html',
  styles: []
})
export class SelfOrAdjustmentViewComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(FdTranscationDetailsComponent, { static: true }) fdTranscationDetailsComponent: FdTranscationDetailsComponent;
  constructor(private _selfadjustmentservice: SelfAdjustmentService, private datePipe: DatePipe, private router: Router) { }
  gridData: any = []
  gridview: any = [];
  Editdetails: any;
  hidegridcolumn: boolean = false;
  ngOnInit() {
    this.GetViewdata()
  }
  GetViewdata() {
    this._selfadjustmentservice.GetSelfOrAdjustment().subscribe(res => {

      this.gridData = res
      this.gridview = this.gridData;
      console.log("self adjustment form", this.gridData)
    //   if (this.gridview.length > 0) {
    //     this.gridview = this.gridview.filter(x => x.pTransdate = this.datePipe.transform(x.pTransdate, "dd-MMM-yyyy"));
    //     let c = this.gridview.filter(x => x.pPaymenttype == "Adjustment").length;
    //     if (c >= 0) {
    //       this.hidegridcolumn = false
    //     }
    //     else {
    //       this.hidegridcolumn = true
    //     }
    //   }

     })
  }
  Newform() {
    // this.newform="new";
    this._selfadjustmentservice.Newformstatus("new")
  }
  editHandler(event) {
    debugger

    this._selfadjustmentservice.GetDetailsForEdit(event.dataItem.pMemberid, event.dataItem.pFdaccountid).subscribe(res => {
      this.Editdetails = res;
      console.log("edit details", res);
      this.router.navigateByUrl('/SelfOrAdjustmentNew');
      this._selfadjustmentservice.Newformstatus("edit")
      this._selfadjustmentservice._SetEditDetails(this.Editdetails)

    })

  }
  GetAccountDetails(DataItem) {
    debugger;
    
    this.fdTranscationDetailsComponent.BindData(DataItem.pFdAccountno);
    $('#add-detail').modal('show');
  }
  onFilter(inputValue: string) {

    this.gridview = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pPaymenttype',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pFdAccountno',
            operator: 'contains',
            value: inputValue
          }, {
            field: 'pCompnayname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pChitpersonname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pMemberName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pBranchname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pBankaccountno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pBankname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pIfsccode',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
  
}

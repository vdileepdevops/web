import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Page } from 'src/app/UI/Common/Paging/page';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { MaturityPaymentService } from '../../../../Services/Banking/Transactions/maturity-payment.service';
import { FdTranscationDetailsComponent } from '../FD-AC-Creation/fd-transcation-details.component';
declare let $: any
@Component({
  selector: 'app-maturity-bond-view',
  templateUrl: './maturity-bond-view.component.html',
  styles: []
})
export class MaturityBondViewComponent implements OnInit {
  @ViewChild(FdTranscationDetailsComponent, { static: true }) fdTranscationDetailsComponent: FdTranscationDetailsComponent;
  public MaturityBondList; any;
  constructor(private _MaturityPaymentService: MaturityPaymentService, private router: Router, private datePipe: DatePipe, private _commonservice: CommonService) { }
  commencementgridPage = new Page();
  startindex: any;
  endindex: any;
  public columns: Array<object>;
  public ColumnMode = ColumnMode;
  public griddata: any=[]
  public temp: any=[];
  ngOnInit()
   {
    this.commencementgridPage.pageNumber = 0
    this.commencementgridPage.size = 10;
    this.startindex = 0;
    this.endindex = this.commencementgridPage.size;
    this.commencementgridPage.totalElements = 5;
    this.BindData();
    this.columns = [
      { prop: 'pMembername' },
      { prop: 'pFdaccountno' },
      { prop: 'pFdname' },
      { prop: 'pTransdate'},
      { prop: 'pDepositamount'}

    ];

  }
  BindData() {
    this._MaturityPaymentService.GetMaturityBondView().subscribe(res => {
      this.MaturityBondList = res;
      this.griddata = this.temp =   this.MaturityBondList;
      //  if (this.LienGridlist.length>0){
      //    this.LienGridlist = this.LienGridlist.filter(x => x.pLiendate =this.datePipe.transform(x.pLiendate, "dd-MMM-yyyy"));
      //}
    });
  }
  NewButtonClick(type) {
    debugger
    this._MaturityPaymentService.SetButtonClickType(type)
  }
  GetAccountDetails(DataItem) {
    debugger;

    this.fdTranscationDetailsComponent.BindData(DataItem.pFdaccountno);
    $('#add-detail').modal('show');
  }
  updateFilter(event) {
    debugger;
    let val = event.currentTarget.value;
    const value = val.toString().toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    this.griddata = this.temp.filter(item => {
      for (let i = 0; i < count; i++) {
        let datagrid = item[keys[i]].toString().toLowerCase().indexOf(value)
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
          debugger
          return true;
        }
      }
    });
  }

}

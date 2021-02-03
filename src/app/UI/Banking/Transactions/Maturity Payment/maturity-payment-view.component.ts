import { Component, OnInit, ViewChild } from '@angular/core';
import { MaturityPaymentService } from '../../../../Services/Banking/Transactions/maturity-payment.service';
import { Router } from '@angular/router';
import { Page } from 'src/app/UI/Common/Paging/page'
import { FdTranscationDetailsComponent } from '../FD-AC-Creation/fd-transcation-details.component';
declare let $: any
@Component({
  selector: 'app-maturity-payment-view',
  templateUrl: './maturity-payment-view.component.html',
  styles: []
})
export class MaturityPaymentViewComponent implements OnInit {
  @ViewChild(FdTranscationDetailsComponent, { static: true }) fdTranscationDetailsComponent: FdTranscationDetailsComponent;
  GridList: any;
  constructor(private _MaturityPaymentService: MaturityPaymentService, private router: Router) { }
  commencementgridPage = new Page();
  startindex: any;
  endindex: any
  ngOnInit() {
    debugger;
    this.commencementgridPage.pageNumber = 0
    this.commencementgridPage.size = 10;
    this.startindex = 0;
    this.endindex = this.commencementgridPage.size;
    this.commencementgridPage.totalElements = 5;
    this.BindData();
  }
  BindData() {
    this._MaturityPaymentService.GetMaturityPaymentDetailsView().subscribe(res => {
      this.GridList = res;
    });
  }
  GetAccountDetails(DataItem) {
    debugger;

    this.fdTranscationDetailsComponent.BindData(DataItem.pFdaccountno);
    $('#add-detail').modal('show');
  }
}

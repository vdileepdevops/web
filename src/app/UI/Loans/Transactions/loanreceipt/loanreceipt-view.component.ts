import { Component, OnInit, ViewChild } from '@angular/core';
import { LoanreceiptService } from 'src/app/Services/Loans/Transactions/loanreceipt.service';
import { DatePipe } from '@angular/common';
import { State, GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';


@Component({
  selector: 'app-loanreceipt-view',
  templateUrl: './loanreceipt-view.component.html',
  styles: []
})
export class LoanreceiptViewComponent implements OnInit {
  loanReceiptData=[];
  gridView =[];
  loangrid:any =[];
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  constructor(private _loaanreceiptServie:LoanreceiptService , public datePipe: DatePipe) { }

  ngOnInit() {
    this.getLoanReceiptViewData();

  }
  getLoanReceiptViewData(){
    //  let date = this.datePipe.transform(new Date(), 'MM/dd/yyyy').toString();

      let date  = this.datePipe.transform(new Date(), 'dd-MMM-yyyy').toString();
    this._loaanreceiptServie.getReceiptViewData(date, date,'RECEIPT').subscribe((data:any) => {
      this.loangrid = data;
      this.loanReceiptData=this.loangrid;
      for (let i = 0; i < this.loanReceiptData.length; i++) {        
        this.loanReceiptData[i].pReceiptdate = this.loanReceiptData[i].pReceiptdate;  
      }
      
      //console.log(data,"data");
      
      //console.log(" this.loanReceiptData", this.loanReceiptData);
    })
    
  }
  public removeHandler({ dataItem }) {
    //console.log("dataItem",dataItem);
    
    let receipt = btoa(dataItem.pReceiptno);
    window.open('/#/GeneralReceiptReports?id=' + receipt);
    //this.router.navigate(['/GeneralReceiptReports', receipt]);
    //this._commonService._SetGeneralReceiptView(receipt)
  }
  public onFilter(inputValue: string): void {
    this.loanReceiptData = process(this.loangrid, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pReceiptdate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pReceiptno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pLoanno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pCustomername',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pModeofreceipt',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pBankname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pChequeno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pTotalreceived',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pNarration',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

}

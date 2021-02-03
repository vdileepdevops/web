import { Component, OnInit, ViewChild } from '@angular/core';
import { FdRdTransactionsService } from 'src/app/Services/Banking/Transactions/fd-rd-transactions.service';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { RdTransactionsService } from 'src/app/Services/Banking/Transactions/rd-transactions.service';
declare let $: any
@Component({
  selector: 'app-fd-transaction-view',
  templateUrl: './fd-transaction-view.component.html',
  styles: []
})
export class FdTransactionViewComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  constructor(private _fdrdtranscationservice:FdRdTransactionsService,private _commonservice:CommonService,private router:Router, private _rdtranscationservice:RdTransactionsService) { }
  gridview:any=[];
  Editdata:any;
  gridData:any=[]
  public mySelection: string[] = [];
  public pageSize = 5;
  public skip = 0;
  pCreatedby=this._commonservice.pCreatedby
  ngOnInit() 
  {
    this.Editdata=[];
    this.Getfddata()
  }
  Getfddata()
  {

    debugger;
    this._fdrdtranscationservice.GetFdTransactionData().subscribe(json => {
      debugger;
      this.gridData = json
      this.gridview = this.gridData

      console.log(this.gridview)
   })
  }
  removeHandler(event)
  {
   
    this._fdrdtranscationservice.DeleteFdTranscation(event.dataItem.pFdaccountNo,this.pCreatedby).subscribe(res=>
      {
        debugger
      if(res)
      {
        this.Getfddata()
        this._commonservice.showInfoMessage("Deleted Sucessfully")
      }
    })

  }
  editHandler(event)
  {
    debugger
   // this.router.navigateByUrl('/MaturityRenewal')
    this._fdrdtranscationservice.Newformstatus("edit")
    
     this._fdrdtranscationservice.GetFdTransactionDetailsforEdit(event.dataItem.pFdaccountNo,event.dataItem.pFdAccountId).subscribe(res=>{
      this.Editdata=[];
       this.Editdata=res;
       var paarams=event.dataItem.pFdaccountNo+","+event.dataItem.pFdAccountId;
       var myparams = btoa(paarams);
       this.router.navigate(['/FdTransactionNew', { id: myparams }]);
       this._rdtranscationservice.SetDetailsForEdit(this.Editdata)
       //this.fdtr.SetDetailsForEdit(this.Editdata)
       //this.router.navigateByUrl('/FdTransactionNew')
     })
    
  }
  Newform() {
    // this.newform="new";
    this._fdrdtranscationservice.Newformstatus("new")
  }
  onFilter(inputValue: string) {

    this.gridview = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pMemberType',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pApplicantType',
            operator: 'contains',
            value: inputValue
          }, {
            field: 'pFdname',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pMemberName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pDepositDate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pMaturityDate',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}

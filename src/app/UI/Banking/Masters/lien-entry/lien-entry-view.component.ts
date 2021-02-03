import { Component, OnInit, ViewChild } from '@angular/core';
import { LienEntryService } from 'src/app/Services/Banking/lien-entry.service';
import { CommonService } from 'src/app/Services/common.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FdTranscationDetailsComponent } from '../../Transactions/FD-AC-Creation/fd-transcation-details.component';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
declare let $: any
@Component({
  selector: 'app-lien-entry-view',
  templateUrl: './lien-entry-view.component.html',
  styles: []
})
export class LienEntryViewComponent implements OnInit
 {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  @ViewChild(FdTranscationDetailsComponent, { static: true }) fdTranscationDetailsComponent: FdTranscationDetailsComponent;
  LienGridlist: any;
  LienDataForEdit: any;
  constructor(private router: Router,private datePipe: DatePipe,private _LienEntryService: LienEntryService,private _commonservice: CommonService) { }
  gridview:any;
  ngOnInit() {
    this.BindData();
  }
  NewButtonClick(type) {
    debugger
    this._LienEntryService.SetButtonClickType(type)
  }
BindData(){
this._LienEntryService.GetLienMaingridView().subscribe(res=>{
  this.LienGridlist=res;
 // this.gridData = json
      this.gridview = this.LienGridlist
//  if (this.LienGridlist.length>0){
//    this.LienGridlist = this.LienGridlist.filter(x => x.pLiendate =this.datePipe.transform(x.pLiendate, "dd-MMM-yyyy"));
//}
});
  }
  datatableclickedit(event) {
    debugger;
    let LienId = event.dataItem.pLienid;
    this._LienEntryService.SetButtonClickType('Edit')
    this._LienEntryService.GetLienEntryData(LienId).subscribe(json => {
      debugger;
      if (json) {

        this.LienDataForEdit = json;
        this._LienEntryService.SetLienEntryDataForEdit(this.LienDataForEdit);
        var myparams = btoa(LienId);
        this.router.navigate(['/LienEntryNew', { id: myparams }]);
       // this.router.navigateByUrl('/LienEntryNew')
      }
    });
  }
  GetAccountDetails(DataItem) {
    debugger;

    this.fdTranscationDetailsComponent.BindData(DataItem.pFdaccountno);
    $('#add-detail').modal('show');
  }
  removeHandler(event) {
    debugger;
    let data = event.dataItem
    let LienId = data.pLienid;

    this._LienEntryService.DeleteLienEntry(LienId).subscribe(json => {
      debugger;
      if (json) {
        this.BindData();
      }


    })
  }
  onFilter(inputValue: string) {
   debugger
    this.gridview = process(this.LienGridlist, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pLiendate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pMembername',
            operator: 'contains',
            value: inputValue
          }, {
            field: 'pDepositdate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pFdaccountno',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pDepositamount',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pLienamount',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pCompanybranch',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pLienadjuestto',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}

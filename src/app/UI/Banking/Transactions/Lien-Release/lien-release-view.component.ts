import { Component, OnInit, ViewChild } from '@angular/core';
import { LienEntryService } from 'src/app/Services/Banking/lien-entry.service';
import { CommonService } from 'src/app/Services/common.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FdTranscationDetailsComponent } from '../../Transactions/FD-AC-Creation/fd-transcation-details.component';
declare let $: any
@Component({
  selector: 'app-lien-release-view',
  templateUrl: './lien-release-view.component.html',
  styles: []
})
export class LienReleaseViewComponent implements OnInit {
  @ViewChild(FdTranscationDetailsComponent, { static: true }) fdTranscationDetailsComponent: FdTranscationDetailsComponent;
  LienGridlist: any;
  LienDataForEdit: any;
  constructor(private router: Router, private datePipe: DatePipe, private _LienEntryService: LienEntryService, private _commonservice: CommonService) { }

  ngOnInit() {
    this.BindData();
  }
  NewButtonClick(type) {
    debugger
    this._LienEntryService.SetButtonClickType(type)
  }
  GetAccountDetails(DataItem) {
    debugger;

    this.fdTranscationDetailsComponent.BindData(DataItem.pFdaccountno);
    $('#add-detail').modal('show');
  }
  BindData() {
    debugger;
    this._LienEntryService.GetLienReleaseMaingridView().subscribe(res => {
      debugger;
      if (res) 
      {
        console.log("lien release data is",res)
        let data = res;
        this.LienGridlist = data["lienReleaselist"];
        if (this.LienGridlist.length > 0) {
          this.LienGridlist = this.LienGridlist.filter(x => x.pLienrealsedate = this.datePipe.transform(x.pLienrealsedate, "dd/MMM/yyyy"));
        }
      }
      
    });
  }
  removeHandler(event) {
    debugger;
    let data = event.dataItem
    let LienId = data.pLienid;

    this._LienEntryService.DeleteLienRelease(LienId).subscribe(json => {
      debugger;
      if (json) {
        this.BindData();
      }


    })
  }
}

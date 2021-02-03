import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import {ShareapplicationService } from 'src/app/Services/Banking/shareapplication.service';

@Component({
  selector: 'app-share-app-view',
  templateUrl: './share-app-view.component.html'
})
export class ShareAppViewComponent implements OnInit {

  constructor(private _ShareapplicationService:ShareapplicationService,private commonService: CommonService) { }

  public gridData = [];
  public gridView = [];
  public mySelection: string[] = [];
  public pageSize = 10;
  public skip = 0;
  public headerCells: any = {
    textAlign: 'center'
  };

  shareApplicationGridDetails: any = [];

  ngOnInit() {
    this.getShareAppExistingDetails();
  }

  getShareAppExistingDetails() {
    try {
      debugger
      this.gridView = [];
      this.shareApplicationGridDetails = [];
      this._ShareapplicationService.getShareApplicationViewDetails().subscribe(res => {
        if (res) {
          this.shareApplicationGridDetails = res;
          this.gridView = this.shareApplicationGridDetails;
        }
      });
    } catch (error) {
      this.commonService.showErrorMessage(error);
    }
  }

  editHandler(dataItem) {

  }

  removeHandler({ dataItem }) {
     debugger
    try {
      if (dataItem.pshareapplicationid) {
        this._ShareapplicationService.DeleteShareDetails(dataItem.pshareapplicationid).subscribe(res => {
          if (true) {
            this.getShareAppExistingDetails();
            this.commonService.showInfoMessage('Deleted...');
          }else{
            this.commonService.showErrorMessage('Not Deleted...');
          }
        });
      }
    } catch (error) {
      this.commonService.showErrorMessage(error);
    }
   }

}

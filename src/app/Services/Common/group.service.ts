import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public GroupviewEditData: any;

  constructor(private http: HttpClient, private _CommonService: CommonService) { }

  GetallGroupDetails(): Observable<any> {

    try {
      return this._CommonService.callGetAPI('/Settings/GroupCreation/GetallGroupDetails', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  GetRoles(): Observable<any> {

    try {
      return this._CommonService.callGetAPI('/Settings/GroupCreation/GetRoles', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  saveGroupConfig(data): Observable<any> {

    try {
      return this._CommonService.callPostAPI('/Settings/GroupCreation/saveGroupConfig', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  updateDeleteGroupConfig(data): Observable<any> {

    try {
      return this._CommonService.callPostAPI('/Settings/GroupCreation/UpdateGroupDetails', data);

    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  public SetGroupRowEditClick(data) {
    this.GroupviewEditData = data
  }
  public GetGroupRowEditClick() {
    return this.GroupviewEditData
  }
  public editData(data) {
    try {
      const params = new HttpParams().set('groupID', data);
      return this._CommonService.callGetAPI('/Settings/GroupCreation/GetGroupMembersDetailsOnId', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

}

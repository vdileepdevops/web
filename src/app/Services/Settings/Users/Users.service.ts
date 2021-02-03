import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import { CommonService } from '../../common.service';
import { User } from 'src/app/Services/Settings/Users/_helpers/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  UserDet: any;
  UserRoles: any;

  constructor(private router: Router, private http: HttpClient, private _CommonService: CommonService) { }

  GetUsers(): Observable<any> {

    try {
      return this._CommonService.callGetAPI('/Settings/Users/UserAccess/GetAllEmployees', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  GetUserForms(User): Observable<any> {

    try {
      const params = new HttpParams().set('UserName', User)
      return this._CommonService.callGetAPI('/Settings/Users/UserRights/GetUserRightsBasedonUserName', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

  _getRoles() {

    return sessionStorage.getItem('Urc');
  }
  _getUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
  GetRoles(): Observable<any> {

    try {
      return this._CommonService.callGetAPI('/Settings/Users/UserRights/GetRoles', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  _getUserForms(user, designation) {
    
    try {
      const params = new HttpParams()
      params.append('Type', user)
      params.append('UserOrDesignation', designation)
      let httpParams = new HttpParams().set('Type', user).set('UserOrDesignation', designation);
      return this._CommonService.callGetAPI('/Settings/Users/UserRights/GetUserRights', httpParams, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
 CheckUserName(User): Observable<any> {

    try {
      const params = new HttpParams().set('UserName', User)
      return this._CommonService.callGetAPI('/Settings/Users/UserAccess/CheckUserName', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
 CheckContactId(User): Observable<any> {

    try {
      const params = new HttpParams().set('Contactrefid', User)
      return this._CommonService.callGetAPI('/Settings/Users/UserAccess/CheckUsercontactRefID', params, 'YES')
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  SaveRegistaration(Data: any) {


    try {
      return this._CommonService.callPostAPI('/Settings/Users/UserAccess/SaveUserAccess', Data);
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }
  UpdatePass(User, pass) {


    try {
      return this._CommonService.callPostAPI('/Settings/Users/UserAccess/ChangePassword?Username=' + User + '&password=' + pass + '', "");
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }

  }
  _loginUser(Data: any) {
    
    try {
      return this._CommonService.callPostAPI('/login', Data);
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }


  }
  _VerifyOTP(Data: any) {

    try {
      return this._CommonService.callPostAPI('/VerifyOtp', Data);
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }


  }
  _logout() {
    sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('Urc');
      sessionStorage.removeItem('companydetails');
    this.router.navigate(['/']);
  }
  SelectUser() {
    try {
      return this._CommonService.callGetAPI('/Settings/Users/UserRights/GetUsers', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  GetNavigation(Type, UserOrDesignation) {
    try {
      const params = new HttpParams().set('Type', Type).set('UserOrDesignation', UserOrDesignation);
      return this._CommonService.callGetAPI('/Settings/Users/UserRights/GetUserRights', params, 'YES');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  SaveNavigation(Type, UserOrDesignation, data) {
    try {
      const params = new HttpParams().set('Type', Type).set('UserOrDesignation', UserOrDesignation).set('UserRightsFunctionsDTO', data);
      let Url = '/Settings/Users/UserRights/SaveUserRight?Type=' + Type + '&UserOrDesignation=' + UserOrDesignation + ''
      return this._CommonService.callPostAPI(Url, data);
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  Selectuserview(){
    try {
      return this._CommonService.callGetAPI('/Settings/Users/UserAccess/GetUserView', '', 'NO');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }


  Resetpassword(UserName){
    try {
      let Url = '/Settings/Users/UserAccess/ResetPassword?Username=' + UserName
      return this._CommonService.callPostAPI(Url,'');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }
  Status(userid,status){
    try {
      let Url = '/Settings/Users/UserAccess/UserActiveInactive?Userid=' + userid +'&Status='+status;
      return this._CommonService.callPostAPI(Url,'');
    }
    catch (e) {
      this._CommonService.showErrorMessage(e);
    }
  }

}

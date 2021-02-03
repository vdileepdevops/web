import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../Services/common.service';
import { UsersService } from '../../../Services/Settings/Users/Users.service';
import { MenuModulesService } from '../../../Services/Settings/menu-modules.service';
import { GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { type } from 'os';
@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styles: []
})
export class UserRightsComponent implements OnInit {
  public groups: GroupDescriptor[] = [{ field: 'pmodulename' }, { field: 'psubmodulename' }];
  constructor(private _CommonService: CommonService, private _UsersService: UsersService, private _MenuModulesService: MenuModulesService, private toastr: ToastrService) { }
  loading = false;
  Navigationdata: any;
  Navigationtempdata: any;
  Employeesdata: any;
  Rolesdata: any;
  Designationsview = false;
  Usersview = false;
  UserOrDesignation: any;
  Type: any;
  Userdata: any;
  errormessage: any;
  checkboxview = false;
  Selectdata: any;
  ngOnInit() {
    
    let selectuser = this._CommonService._GetUserrightsView();
    let UserName = selectuser['UserName'];
    this.Selectdata = '';
    this.Designationsview = true;
    this.UserOrDesignation = '';
    this.errormessage = "Select Designation";
    this.GetRoles();
    this.GetAllEmployees();
    if (UserName == undefined) {
      this.GetNavigation('', '');
      this.Type = 'Designation';
    }
    else {
      this.Type = selectuser['Type'];
      if (this.Type == 'Designation') {
        this.UserOrDesignation = UserName;
        this.Selectdata = UserName;
        this.Designationsview = true;
        this.Usersview = false;
      }
      if (this.Type == 'User') {
        this.UserOrDesignation = UserName;
        this.Selectdata = UserName;
        this.Usersview = true;
        this.Designationsview = false;
      }
      this.GetNavigation(this.Type, UserName);
    }

  }
  GetRoles() {
    this._UsersService.GetRoles().subscribe(data => {
      this.Rolesdata = data;
    });
  }
  GetAllEmployees() {
    this._UsersService.SelectUser().subscribe(data => {
      this.Userdata = data;
    });
  }
  GetNavigation(Type, UserOrDesignation) {
    
    this.loading = true;
    this._UsersService.GetNavigation(Type, UserOrDesignation).subscribe(data => {
      this.Navigationdata = data['functionsDTOList'];
      this.Navigationtempdata = this.Navigationdata;
      this.loading = false;

    });
  }

  DesignationClick() {

    this.UserOrDesignation = '';
    this.Type = 'Designation';
    this.errormessage = "Select Designation";
    this.Designationsview = true;
    this.Usersview = false;
    this.GetNavigation('', '');
  }
  UsersClick() {
    this.UserOrDesignation = '';
    this.Type = 'User';
    this.errormessage = "Select Users";
    this.Usersview = true;
    this.Designationsview = false;
    this.GetNavigation('', '');
  }

  SelectDesignation(designationdata: any) {
    this.UserOrDesignation = designationdata.target.value;
    this.Type = 'Designation';
    this.GetNavigation(this.Type, this.UserOrDesignation);
  }
  SelectUser(Userdata: any) {
    debugger;
    this.UserOrDesignation = Userdata.target.value;
    this.Type = 'User';
    this.GetNavigation(this.Type, this.UserOrDesignation);
  
  }
  clickaview(data: any) {
    let view = data.pIsviewpermission;
    if (view == false) {
      data.pIsviewpermission = true;
    }
    else {
      data.pIsviewpermission = false;
      data.pIscreatepermission = false;
      data.pIsupdatepermission = false;
      data.pIsdeletepermission = false;
    }
  }

  clickacreate(data: any) {
    let view = data.pIscreatepermission;
    if (view == false) {
      data.pIsviewpermission = true;
      data.pIscreatepermission = true;
    }
    else {
      data.pIscreatepermission = false;
    }
  }

  clickaupdate(data: any) {
    let view = data.pIsupdatepermission;
    if (view == false) {
      data.pIsviewpermission = true;
      data.pIsupdatepermission = true;
    }
    else {
      data.pIsupdatepermission = false;
    }
  }

  Clickadelete(data: any) {
    let view = data.pIsdeletepermission;
    if (view == false) {
      data.pIsviewpermission = true;
      data.pIsdeletepermission = true;
    }
    else {
      data.pIsdeletepermission = false;
    }
  }

  Addpermissions() {
    
    if (this.UserOrDesignation != '') {
      this.onFilter('');
      let count = this.Navigationdata.filter(proj => proj.pIsviewpermission === true).length;
      if (count != 0) {
        let pCreateby = this._CommonService.pCreatedby;
       
        let functionsDTOList = this.Navigationdata;
        let data = { "pCreateby": pCreateby, functionsDTOList };

        this._UsersService.SaveNavigation(this.Type, this.UserOrDesignation, data).subscribe(data => {
          this.Designationsview = true;
          this.Usersview = false;
        
          this.Selectdata = '';
          this.errormessage = "Select Designation";
          this.GetRoles();
          this.GetAllEmployees();
          this.GetNavigation('', '');
          let user = JSON.parse(sessionStorage.getItem('currentUser'));
          this.toastr.success("Saved Successfully", "Success");

if(user.pUserName==this.UserOrDesignation){
  this.UserFormssessionupdate();
  location.reload()
}  
this.UserOrDesignation = '';
this.Type = 'Designation';
        
        });
      }
      else {
        this.toastr.info("Please select permission", "Info");
      }


    }
    else {
      this.toastr.info(this.errormessage, "Info");
    }


  }
UserFormssessionupdate(){

debugger;

    this._UsersService._getUserForms(this.Type, this.UserOrDesignation).subscribe(data => {
      sessionStorage.setItem('Urc', JSON.stringify(data));
      this._CommonService._setPcreatedby();
     });
   

}
  onFilter(inputValue: string) {
    this.Navigationdata = process(this.Navigationtempdata, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'pmodulename',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'psubmodulename',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'pFunctionName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
  }

}

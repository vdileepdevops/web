import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { UsersService } from 'src/app/Services/Settings/Users/Users.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDetailsService } from '../../../../Services/Common/company-details.service';


@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styles: []
})
export class UserLoginComponent implements OnInit {

    LoginForm: FormGroup;
  submitted = false;
  showotp: boolean = false;
  showlogin: boolean = true;
  OtpAuthentication: boolean = false;
  UserId: any;
    constructor(private _commonService: CommonService, private router: Router, private _UsersService: UsersService, private _route: ActivatedRoute, private toastr: ToastrService, private _CompanyDetailsService: CompanyDetailsService) {

    }

    ngOnInit() {

        this.LoginForm = new FormGroup({
          pUserName: new FormControl('', Validators.required),
          pPassword: new FormControl('', Validators.required),
          pOtp: new FormControl('')

        });

    }

    loginclick() {


        this.submitted = true;
        if (this.LoginForm.valid) {
            
            let Logindata = this.LoginForm.value;
            let jsondata = JSON.stringify(this.LoginForm.value);
          this._UsersService._loginUser(Logindata).subscribe(data => {
            debugger;
            sessionStorage.setItem('currentUser', JSON.stringify(data));
             this.OtpAuthentication = data["pOtpAuthentication"];
            this.UserId = data["pUserID"];
            if (!this.OtpAuthentication) {
              this.showotp = false;
              this.showlogin = true;
              this._CompanyDetailsService.GetCompanyData().subscribe(json => {

                sessionStorage.setItem('companydetails', JSON.stringify(json));
                this._commonService._setCompanyDetails();
                this.router.navigate(['/Dashboard'])
              }, (error) => {

                this._commonService.showErrorMessage(error);
              });
            }
            else {
              this.showotp = true;
              this.showlogin = false;
            }
               



            }, error => {
                
                this.toastr.error("Invalid Credentials", "Error")
            });
        }

    }
  VerifyOTP() {

    debugger;
    this.submitted = true;
    let status: any;
    if (this.LoginForm.valid) {

      let Logindata = this.LoginForm.value;
      let jsondata = JSON.stringify(this.LoginForm.value);
      this._UsersService._VerifyOTP(Logindata).subscribe(data => {
        debugger;
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.OtpAuthentication = data["pOtpAuthentication"];
        this.UserId = data["pUserID"];
        status = data["pStatus"];
        if (status == "True") {
          this.showotp = false;
         // this.showlogin = true;
          this._CompanyDetailsService.GetCompanyData().subscribe(json => {

            sessionStorage.setItem('companydetails', JSON.stringify(json));
            this._commonService._setCompanyDetails();
            this.router.navigate(['/Dashboard'])
          }, (error) => {

            this._commonService.showErrorMessage(error);
          });
        }
        else {
          this._commonService.showWarningMessage(data["pMessage"]);
        }




      }, error => {

        this.toastr.error("Invalid Credentials", "Error")
      });
    }

  }
}

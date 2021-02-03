import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';
import {  DefaultProfileImageService} from 'src/app/Services/Loans/Masters/default-profile-image.service';
import { CommonService } from 'src/app/Services/common.service';
import { Router, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/Services/Settings/Users/Users.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../Services/Settings/Users/_helpers/must-match.validator';
import { Subscription } from 'rxjs';
declare let $: any
export let browserRefresh = false;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',
  styles: []
})
export class NavigationComponent implements OnInit, OnDestroy {
  public TitleData: string = "";
  public loading = false;
  FormTitleData: any
  headerTitle: any
  modeldatalinks: any
  preActiveLink: any
  UsersForms: any;
  UserName: any;
  ChangePassWordForm: FormGroup;
  submitted = false;
  MenuName: any;
  SubMenuName: any;
  UrlName: any;
  subscription: Subscription;
  LoginUser: any;
  Imagepath: any;
  userFilter: any = { pFunctionName: '' };
  constructor(private _DefaultProfileImageService: DefaultProfileImageService,private _CommonService: CommonService, private formBuilder: FormBuilder, private _loanmasterservice: LoansmasterService, private router: Router, private _CookieService: CookieService, private _userService: UsersService, private toastr: ToastrService) {
    

    browserRefresh = !this.router.navigated;
    if (browserRefresh == true) {

      this.router.navigate(['/Dashboard']);
      this.SubMenuName = 'Home';
      this.UrlName = "Dashboard"
    }


  }
  ngOnInit() {
    

    //this.MenuName = "Dashboard";
    this.SubMenuName = 'Home';
    this.UrlName = "Dashboard"
    this.ChangePassWordForm = this.formBuilder.group({
      email: [''],
      activeflag: ['Y'],
      userpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('userpassword', 'confirmPassword')
    });
    var prev_act_id = $('a.main-active').attr('id');
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.loading = true;
    
    this._userService.GetUserForms(user.pUserName).subscribe(data => {
      this.UsersForms = data.moduleDTOList;
      this.UserName = data.pUserName;
      this.LoginUser = data.pName;
      //,
      if (data.pImage != null) {
        this.Imagepath = "data:image/jpeg;base64," + data.pImage[0]
      }
      else {
        this.Imagepath = this._DefaultProfileImageService.GetdefaultImage();

      }
     
      let usertype = "";
      let userRole = "";
      if (data.pDesignation == "USER") {
        usertype = 'User'
        userRole = data.pUserName;
      }
      else {
        usertype = 'Designation'
        userRole = data.pDesignation;
      }
      this._userService._getUserForms(usertype, userRole).subscribe(data => {
        
        sessionStorage.setItem('Urc', JSON.stringify(data));
        this._CommonService._setPcreatedby();
        this.loading = false;
      });

    });
    //menu expand and collapse

    $('.btn-expand-collapse').click(function (e) {

      $('.wrapper').toggleClass('collapsed');
    });
    $('.btn-xs-toggle').click(function (e) {

      $('.wrapper').toggleClass('display-content');
    });


  }

  Urlclick(formname, submenu, menuname) {

    this.MenuName = menuname;
    this.SubMenuName = submenu
    this.UrlName = formname
  }
  Signout() {
    this._userService._logout();
  }
  ngOnDestroy() {
  }

  ActivateDash() {

    var prev_act_id = $('a.main-active').attr('id');
    $('#' + prev_act_id + '').removeClass('main-active');
    $('#a').addClass("main-active");
    this.MenuName = '';
    this.SubMenuName = 'Home';
    this.UrlName = "Dashboard"

  }


  contactclick() {
    debugger;
    this.MenuName = 'Contact';
    this.SubMenuName = 'Contact Configuration';
    this.UrlName = "Contact"

  }


  Menuclick($event, menu) {
    //menuFunction
    
    var sub_parent = $(".nav-sub-parent > a");
    var sub_menu = $('.nav-sub-menu');


    sub_menu.removeClass('nav-open');
    var that = $($event.currentTarget); //cache when you can
    var parent_menu = that.parents('.menu');
    var menu_index = parent_menu.index();
    var current_item = that.next('.nav-sub-menu');
    $('.wrapper').removeClass('collapsed');
    //console.log(parent_menu);
    parent_menu.addClass('nav-l1-open');
    current_item.addClass('nav-open');
    var prev_act_id = $('a.main-active').attr('id');
    $('#' + prev_act_id + '').removeClass('main-active');
    $('#' + $event.currentTarget.id + '').addClass("main-active");

    var sub_back = $('.nav-left-back');
    sub_back.click(function () {
      var that = $(this);
      var menuIndex = that.parent().index();
      var currentItem = that.parent('.nav-sub-menu');
      var parent_menu = that.parents('.menu');
      currentItem.removeClass('nav-open');
      parent_menu.removeClass('nav-l1-open');
    });

    // Add minus icon for collapse element which is open by default
    $(".collapse").each(function () {
      $(".collapse").removeClass("show");
      $(this).prev(".card-header").find(".fa").addClass("fa-plus").removeClass("fa-minus");
    });


    // $(".card-header").on('click', function () {
    //   $(".card>a.collapse").removeClass("show");
    //   $(".fa").removeClass("fa-minus");
    //   $(".fa").addClass("fa-plus");
    // });
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function () {
      
      $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function () {
      
      $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });



    // navigation add end////////////////////////////////////////////








  }
  get f() { return this.ChangePassWordForm.controls; }
  openpop() {
    $('#ChangePassmodel').modal('show');
  }
  trackByFn(index, item) {

    return index; // or item.id
  }
  ChangePassWord() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ChangePassWordForm.valid) {
      var ep = this.ChangePassWordForm.controls.userpassword.value
      var cp = this.ChangePassWordForm.controls.confirmPassword.value

      this._userService.UpdatePass(this.UserName, cp).subscribe(data => {

        this.submitted = false;
        //this.toastr.success("")
        $('#ChangePassmodel').modal('hide');
        this._userService._logout();

      });

    }

  }
}

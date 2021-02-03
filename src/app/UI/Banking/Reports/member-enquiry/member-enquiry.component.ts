import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MembrEnquiryService } from 'src/app/Services/Banking/membr-enquiry.service';
import { DefaultProfileImageService } from 'src/app/Services/Loans/Masters/default-profile-image.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { isNullOrEmptyString } from '@progress/kendo-angular-grid/dist/es2015/utils';
declare let $: any;
@Component({
  selector: 'app-member-enquiry',
  templateUrl: './member-enquiry.component.html',
  styleUrls: ['./member-enquiry.component.css']
})
export class MemberEnquiryComponent implements OnInit {
  memberid: any;
  fdaccountno: any;

  constructor(private _fb:FormBuilder, private _defaultimage: DefaultProfileImageService,private memberenquiryservice:MembrEnquiryService) { }
  MemberEnquiryform: FormGroup;
  memberdetails:any=[];
  showdetails:boolean=false
  Bankdetails:any=[]
  Transcationdetails:any=[]
  Memberid:any;
  MemberCode:any;
  Fathername:any;
  Address:any;
  Contactdetails:any;
  croppedImage:any;
  ngOnInit()
 {
   this.showdetails=false;
   this.MemberEnquiryform=this._fb.group({
    pMembercode:new FormControl(''),
    pMembername:new FormControl(null)
   })
   this.croppedImage = this._defaultimage.GetdefaultImage();
    this.Getmembers();
    $(document).ready(function () {
      // Add minus icon for collapse element which is open by default
      //$(".collapse.show").each(function () {
      //  $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
      //});

      // Toggle plus minus icon on show hide of collapse element
      //$(".collapse").on('show.bs.collapse', function () {
      //  $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
      //}).on('hide.bs.collapse', function () {
      //  $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
      //});

    });
  }
  Getmembers()
  {
    
     this.memberenquiryservice.GetMemberDetailsList().subscribe(json=>{
       this.memberdetails=json;
       console.log("members list",this.memberdetails)
     })
  }
  print(dataItem)
  {
    console.log("dataItem",dataItem)
    this.fdaccountno=btoa(dataItem.pFdaccountno)
    window.open('/#/MemberEnquirydetails?id='+this.fdaccountno)
  }
  MemberChanges(event)
  {
    debugger
    if(event!=null && event!=undefined)
    {
      this.showdetails=true
      this.MemberCode=event.pMembercode;
      this.Address=event.pAddress;
      this.Contactdetails=event.pMobileno;
      this.memberid=event.pMemberid;
      this.Fathername=event.pFathername;
      
      this.GetMemberTransactions()
    }
  
  }
  customSearchFn(term: string, item: any) {
    debugger;
    console.log(item)
    term = term.toLowerCase();
    if (isNullOrEmptyString(item.pMobileno)) {
      return item.pMembername.toLowerCase().indexOf(term) > -1 || item.pMembercode.toLowerCase().indexOf(term) > -1 ;
    }
    else {
      return item.pMembername.toLowerCase().indexOf(term) > -1 || item.pMembercode.toLowerCase().indexOf(term) > -1 || item.pMobileno.toString().toLowerCase().indexOf(term) > -1;
    }
    
  }
  GetMemberTransactions()
  {
    debugger
       this.memberenquiryservice.GetMemberTransactions(this.memberid).subscribe(json=>{
           console.log("transcation details",json);
           this.Bankdetails=json[0].lstMemberBankDetails;
           this.Transcationdetails=json[0].lstMemberTransactionDetails;
           if (json[0].pImage)
           this.croppedImage = "data:image/png;base64," + json[0].pImage;
         else
           this.croppedImage = this._defaultimage.GetdefaultImage();
       })

  }
}

import { Component, OnInit } from '@angular/core';
import { LAReportsService } from 'src/app/Services/Banking/lareports.service';
import { ActivatedRoute } from '@angular/router';
import { DefaultProfileImageService } from 'src/app/Services/Loans/Masters/default-profile-image.service';

@Component({
  selector: 'app-member-enquiry-details',
  templateUrl: './member-enquiry-details.component.html',
  styles: [
    
  ]
})
export class MemberEnquiryDetailsComponent implements OnInit {

  membername: any;
  membercode: any;
  contactno: any;
  address: any;
  fathername: any;
  bankdetails:any=[]
  fdaccountno: any;
  advanceamount: any;
  advancedate: any;
  calculationmode: any;
  interestpayout: any;
  paidamount: any;
  receivedamount: any;
  schemename: any;
  tenure: any;
  maturitydate: any;
  transcationdate: any;
  interestrate: any;
  interestpayable: any;
  pendingchequeamount: any;
  maturityamount: any;
  applicanttype: any;
  branchname: any;
  interesttype: any;
  contacttype: any;
  constructor(private _LAReportsService:LAReportsService,private _defaultimage: DefaultProfileImageService,private activatedroute: ActivatedRoute) { }
  Detailsdata:any=[]
  liendetails:any=[]
  transcationdetails:any=[]
  Nomineedata:any=[]
  Receiptdata:any=[]
  promotersalarygrid:any=[]
  Interestpaymentdata:any=[]
  memberpaymentgrid:any=[]
  membermaturitybond:any=[]
  croppedImage:any;
  ngOnInit() 
  {
    let routeParams = atob(this.activatedroute.snapshot.queryParamMap.get('id')); 
      console.log("routeParams",routeParams);
      this.croppedImage = this._defaultimage.GetdefaultImage();

    this._LAReportsService.GetMemberEnquiryDetailsReport(routeParams).subscribe(result => {
      debugger;
      console.log("print grid",result)
      this.Detailsdata = result;
      if (result[0].pContactImagePath)
      {
        this.croppedImage = "data:image/png;base64," +result[0].pContactImagePath;
      }
      
    else
    {
      this.croppedImage = this._defaultimage.GetdefaultImage();
    }
     
     this.membername=this.Detailsdata[0].lstMemberDetails[0].pMembername
     this.membercode=this.Detailsdata[0].lstMemberDetails[0].pMembercode
     this.contactno=this.Detailsdata[0].lstMemberDetails[0].pMobileno
     this.address=this.Detailsdata[0].lstMemberDetails[0].pAddress
     this.fathername=this.Detailsdata[0].lstMemberDetails[0].pFathername
      this.bankdetails=this.Detailsdata[0].lstMemberBankDetails
      this.Nomineedata=this.Detailsdata[0].lstMemberNomieeDetails
      this.Receiptdata=this.Detailsdata[0].lstMemberReceiptDetails
      this.liendetails=this.Detailsdata[0].lstMemberLientDetails
      this.memberpaymentgrid=this.Detailsdata[0].lstMemberMaturityPaymentsDetails
      this.membermaturitybond=this.Detailsdata[0].lstMemberMaturityBondDetails
      this.Interestpaymentdata=this.Detailsdata[0].lstMemberInterestPaymentDetails
      this.promotersalarygrid=this.Detailsdata[0].lstMemberPromoterSalarytDetails
      this.transcationdetails=this.Detailsdata[0].lstMemberTransactionDetails
      this.fdaccountno=this.Detailsdata[0].lstMemberTransactionDetails[0].pFdaccountno
      this.advanceamount=this.Detailsdata[0].lstMemberTransactionDetails[0].pDepositamount
      this.advancedate=this.Detailsdata[0].lstMemberTransactionDetails[0].pDepositdate
 
      this.calculationmode=this.Detailsdata[0].lstMemberTransactionDetails[0].pFdcalculationmode
      this.interestpayout=this.Detailsdata[0].lstMemberTransactionDetails[0].pInterestpayout
      this.paidamount=this.Detailsdata[0].lstMemberTransactionDetails[0].pPaidamount
      this.receivedamount=this.Detailsdata[0].lstMemberTransactionDetails[0].pReceivedamount
      this.schemename=this.Detailsdata[0].lstMemberTransactionDetails[0].pSchemename
      this.tenure=this.Detailsdata[0].lstMemberTransactionDetails[0].pTenure
      this.maturitydate=this.Detailsdata[0].lstMemberTransactionDetails[0].pMaturitydate
      this.transcationdate=this.Detailsdata[0].lstMemberTransactionDetails[0].pTransactiondate
      this.interestrate=this.Detailsdata[0].lstMemberTransactionDetails[0].pInterestrate
      this.interestpayable=this.Detailsdata[0].lstMemberTransactionDetails[0].pInterestpayable
      this.pendingchequeamount=this.Detailsdata[0].lstMemberTransactionDetails[0].pPendingchequeamount
      this.maturityamount=this.Detailsdata[0].lstMemberTransactionDetails[0].pMaturityamount
      this.applicanttype=this.Detailsdata[0].lstMemberTransactionDetails[0].pApplicanttype
      this.branchname=this.Detailsdata[0].lstMemberTransactionDetails[0].pChitbranchname
      this.interesttype=this.Detailsdata[0].lstMemberTransactionDetails[0].pInteresttype
      this.contacttype=this.Detailsdata[0].lstMemberTransactionDetails[0].pContacttype
      
  })
  }
  getReceipt(DataItem) {
    console.log(event)
    window.open('/#/GeneralReceiptReports?id=' + btoa(DataItem.pReceiptno + ',' + 'General Receipt'));
  }
}

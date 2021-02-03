import { Component, OnInit, NgZone  } from '@angular/core';
import { FIIndividualService } from 'src/app/Services/Loans/Transactions/fiindividual.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { SavingtranscationService } from 'src/app/Services/Banking/savingtranscation.service';
import { Router } from '@angular/router';
import { RdTransactionsService } from 'src/app/Services/Banking/Transactions/rd-transactions.service';
import {ShareapplicationService } from 'src/app/Services/Banking/shareapplication.service';
declare let $: any
@Component({
  selector: 'app-sp-referral',
  templateUrl: './sp-referral.component.html',
  styleUrls: []
})
export class SpReferralComponent implements OnInit {
  
  constructor(private fiIndividualService: FIIndividualService, private _fb: FormBuilder, private _commonService: CommonService, private savingtranscationservice: SavingtranscationService, private zone: NgZone, private router: Router,private _rdtranscationservice:RdTransactionsService, private _ShareapplicationService:ShareapplicationService) { }
  referralAgents: any;
  referralAgentsList:any
  allEmployeeDetails: any;
  referralForm: any;
  editdata:any;
  referralTypeErrorMessage={}
  employeeReferenceId: any;
  agentReferenceId: any;
  firsttabdata:any=[]
  loading: boolean = false;
  buttontype:any;
  ShowReferral: boolean = false;
  ShowSaveClearbuttons: boolean = true;
  ngOnInit()
  {
    debugger;
   this.FormGroup();
   this.getReferralAgentDetails();
  this.getallEmployeeDetails();
  this.buttontype = this._rdtranscationservice.Newstatus();
  if(this.buttontype=="edit")
  {
    debugger
   this.EditData()
  }
  this.BlurEventAllControll(this.referralForm)
 
 }
 FormGroup() {
   this.referralForm = this._fb.group({
    paccounttype: ['share',Validators.required],
    pAccountId: ['',Validators.required],
    paccountNo: ['',Validators.required],
    pReferralname: ['',Validators.required],
    pEmployeeidId: ['',Validators.required],
     pRdAccountId:[0],
     pRdaccountNo:[0],
     pReferralId: ['',Validators.required],
     pCommisionValue:[0],
     pAdvocateName: [''],
     pReferralCode: [''],
     pContactId: [''],
     pSalesPersonName: ['',Validators.required],
     pIsReferralsapplicable: [false],
     pTypeofOperation: ['CREATE'],
     pCommissionType:[''],
     pCreatedby: [this._commonService.pCreatedby]

   });
 }
 getReferralAgentDetails() {
  
   debugger
     let type = 'ALL'
     //this.loading = true;
   this.fiIndividualService.getReferralDetails().subscribe(response => {
     
    
     if (response != null) {
       
       this.referralAgents = response;
       
       }

   });
   
 }

 EditData()
 {
   debugger
    this.editdata=this._rdtranscationservice.GetDetailsForEdit()
   console.log("editdetails for refferal",this.editdata);
   if(this.editdata.pIsReferralsapplicable==true)
   {
     this.referralForm.controls.pIsReferralsapplicable.setValue(this.editdata.pIsReferralsapplicable)
     this.ShowReferral=true;
     this.getReferralAgentDetails()
     this.referralForm.controls.pAdvocateName.setValue(this.editdata.pAdvocateName)
     this.referralForm.controls.pSalesPersonName.setValue(this.editdata.pSalesPersonName)
     this.referralForm.controls.pReferralId.setValue(parseInt( this.editdata.pReferralId))
     this.referralForm.controls.pCommisionValue.setValue(this.editdata.pCommisionValue)    
     this.referralForm.controls.pCreatedby.setValue(this._commonService.pCreatedby)
     this.referralForm.controls.pTypeofOperation.setValue("UPDATE")
     this.referralForm.controls.pRdAccountId.setValue(this.editdata.pRdAccountId)
     this.referralForm.controls.pRdaccountNo.setValue(this.editdata.pRdaccountNo)
     this.referralForm.controls.pReferralCode.setValue(this.editdata.pReferralCode)
     this.referralForm.controls.pContactId.setValue(this.editdata.pReferralContactId)
   }
   else{
     this.referralForm.controls.pIsReferralsapplicable.setValue(this.editdata.pIsReferralsapplicable)
     this.ShowReferral=false;
    
   }
   
    
 }
 getallEmployeeDetails() {
   try {
     this.fiIndividualService.getallEmployeeDetails().subscribe(response => {
       if (response != null) {
         this.allEmployeeDetails = response;
       }

     });
   } catch (error) {
     
     
   }
 }
 referralAgentDetails(data) 
 {
  
   if(data!=undefined)
   {
     this.referralForm.controls.pAdvocateName.setValue(data.pAdvocateName);
     this.referralForm.controls.pReferralCode.setValue(data.pReferralCode);
     this.referralForm.controls.pContactId.setValue(data.pContactId);
    
   }
  
   //this.referralForm.controls.pReferralId.setValue(data.pReferralId)
 }
 employeeDetails(data) 
 {
   if(data!=undefined)
   {
     this.employeeReferenceId = data.pContactRefNo;
     this.referralForm.controls.pSalesPersonName.setValue(data.pEmployeeName);
   
   }
  
   
 }
 RefferalApplicable() 
 {
   debugger
   let Isreferral = this.referralForm.controls.pIsReferralsapplicable.value;
   if (Isreferral) {
     this.ShowReferral = true;
    this.referralForm.controls.pReferralId.setValidators(Validators.required)
    this.referralForm.controls.pSalesPersonName.setValidators(Validators.required)

   }
   else {
     this.ShowReferral = false;
   }
 }
 GetDataForJointMember()
 {
   
   let a= this._rdtranscationservice._GetDataForJointMember();
   this.referralForm.controls.pRdAccountId.setValue(a['RdAccountId'])
   this.referralForm.controls.pRdaccountNo.setValue(a['Rdaccountno'])
   console.log('2nd tab datata',a);
 }
 checkValidations(group: FormGroup, isValid: boolean): boolean 
 {
   debugger
   try {
     Object.keys(group.controls).forEach((key: string) => {
       isValid = this.GetValidationByControl(group, key, isValid);
     })
   }
   catch (e) {
     this.showErrorMessage(e);
     return false;
   }
   return isValid;
 }
 GetValidationByControl(formGroup: FormGroup, key: string, isValid: boolean): boolean 
 {
   debugger
   try {
     let formcontrol;
     formcontrol = formGroup.get(key);
     if (formcontrol) {
       if (formcontrol instanceof FormGroup) {
         this.checkValidations(formcontrol, isValid)
       }
       else if (formcontrol.validator) {
         this.referralTypeErrorMessage[key] = '';
         if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
           let lablename;
           lablename = (document.getElementById(key) as HTMLInputElement).title;
           let errormessage;
           for (const errorkey in formcontrol.errors) {
             if (errorkey) {
               errormessage = this._commonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
               this.referralTypeErrorMessage[key] += errormessage + ' ';
               isValid = false;
             }
           }
         }
       }
     }
   }
   catch (e) {
     this.showErrorMessage(e);
     return false;
   }
   return isValid;
 }
 showErrorMessage(errormsg: string) {
   this._commonService.showErrorMessage(errormsg);
 }
 BlurEventAllControll(fromgroup: FormGroup) {
   try {
     Object.keys(fromgroup.controls).forEach((key: string) => {
       this.setBlurEvent(fromgroup, key);
     })
   }
   catch (e) {
     this.showErrorMessage(e);
     return false;
   }
 }
 setBlurEvent(fromgroup: FormGroup, key: string) {
   try {
     let formcontrol;
     formcontrol = fromgroup.get(key);
     if (formcontrol) {
       if (formcontrol instanceof FormGroup) {
         this.BlurEventAllControll(formcontrol)
       }
       else {
         if (formcontrol.validator)
           fromgroup.get(key).valueChanges.subscribe((data) => { this.GetValidationByControl(fromgroup, key, true) })
       }
     }
   }
   catch (e) {
     this.showErrorMessage(e);
     return false;
   }
 }
 
 SaveReferral()
 {
   debugger
   let isValid = true;
   this.GetDataForJointMember()
   if(this.ShowReferral==true)
   {
     
     
       if(this.checkValidations(this.referralForm,isValid))  
       {
         this.savingtheform()       
       } 
       
     
     else{
       if(this.checkValidations(this.referralForm,isValid))  
       {
         this.savingtheform()       
       } 
     }       
   }
   else
   {
     this.referralForm.controls.pReferralId.setValue(0);
     this.savingtheform()   
   }
 
 }
 savingtheform()
 {
  this._commonService.showInfoMessage("Saved successfully");
  this.router.navigate(['/ShareApplication']);
  //  debugger
  //   let commisiondata=this._ShareapplicationService._GetCommisiontype()
  //   console.log(commisiondata)
  //  debugger
  //  this.referralForm.controls.pCommisionValue.setValue(commisiondata['commissionvalue']);
  //  this.referralForm.controls.pCommissionType.setValue(commisiondata['commissiontype']);
  //  this.referralForm.controls.pAccountId.setValue(commisiondata['commissionvalue']);
  //  this.referralForm.controls.paccountNo.setValue(commisiondata['commissionvalue']);
  //  this.referralForm.controls.pReferralname.setValue(commisiondata['commissionvalue']);
  //  this.referralForm.controls.pEmployeeidId.setValue(commisiondata['commissionvalue']);
  
  //  let data=JSON.stringify(this.referralForm.value)
  //  console.log(data)
  //  // if(this.buttontype=="edit")
  //  // {
     
  //  //   this.referralForm.controls.pTypeofOperation.setValue("UPDATE")
  //  // }
  //  // else{
  //  //   this.referralForm.controls.pTypeofOperation.setValue("CREATE")
  //  // }
  //  this._ShareapplicationService.SaveRDReferralData(data).subscribe(json=>{
  //    if(json)
  //    {
      
  //      this._commonService.showInfoMessage("Saved successfully");
  //      this.router.navigate(['/ShareApplication']);
  //     //  this.FormGroup();
     
  //     //  this.ShowReferral=false;
  //     //  let str = "selectmember"
  //     //  $('.nav-item a[href="#' + str + '"]').tab('show'); 
     

  //    }
  //  })
 }
 clear()
 {
   debugger
   this.referralForm.reset();
   this.referralForm.controls.pAdvocateName.setValue("")
   this.referralForm.controls.pSalesPersonName.setValue("")
   this.referralForm.controls.pRdAccountId.setValue(0)
   this.referralForm.controls.pRdaccountNo.setValue(0)
   this.FormGroup();
   console.log(this.referralForm.value);
   this.buttontype= this._rdtranscationservice.Newformstatus("new")
   this.ShowReferral=false;
 }
}

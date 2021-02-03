import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { DataBindingDirective, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-rdloanandfacility',
  templateUrl: './rdloanandfacility.component.html',
  styles: []
})
export class RdloanandfacilityComponent implements OnInit {
  Rdloanfacilityform:FormGroup;
 // @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;;
  constructor(private fb:FormBuilder,private _CommonService:CommonService) { }
  days:any;
  isloanfacilityaplicable=false
  isloanage=false
  islockin=false;
  islockintest=false;
  islatefeeapplicable=false;
  percentagefrom: any;
  percentageto: any;
  Griddata:any=[];
  forFixed:boolean = false;
  forPercentage:boolean = false;
  RdLoanfacilityerrors:any;
  ermsg:any;
  ngOnInit() 
  {
    this.isloanfacilityaplicable = false
    this.isloanage = false
    this.islockin = false;
    this.RdLoanfacilityerrors={};
    this.islatefeeapplicable=false;
    this.forFixed = true;
    this.forPercentage = false;
    this.islockintest=false;
    this.Griddata = [];
    this.Rdloanfacilityform = this.fb.group({
      precordid: 0,
      pIsloanfacilityapplicable: false,
      pEligiblepercentage: 0,
      pIsloanageperiod: false,
      pAgeperiod: 0,
      pAgeperiodtype: [''],
      pIsprematuretylockingperiod: false,
      pPrematuretyageperiod: 0,
      pPrematuretyageperiodtype: [''],
      pIslatefeepayble: false,
      pLatefeepaybletype: ['comfixed'],
      pLatefeepayblevalue: 0,
      pLatefeeapplicablefrom: 0,
      pLatefeeapplicabletype: [''],
      pTypeofOperation:['CREATE'] ,
      pCreatedby: [this._CommonService.pCreatedby],
      "_RecurringDepositPrematurityInterestPercentages": new FormGroup
      ({
        "pRecordid": new FormControl('0'),
        "pminprematuritypercentage": new FormControl(''),
        "pmaxprematuritypercentage": new FormControl(''),
        "pPercentage": new FormControl(''),
        "pprematurityperiodtype": new FormControl(''),
        "pTypeofOperation": new FormControl('CREATE')
      })
    })
    this.BlurEventAllControll(this.Rdloanfacilityform);
  }
  ValidateGridData()
  {
    debugger
    let isValid=true;
    if(this.Griddata.length==0)
    {

    }
    let from;
    let to;
    if (this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.value.pminprematuritypercentage != null)
    from =this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.value.pminprematuritypercentage;
    if (this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.value.pmaxprematuritypercentage != null)
    to =this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.value.pmaxprematuritypercentage;

    // let Applicanttype = this.chequemanagementform.controls.pApplicanttype.value;


    let data = this.Griddata;
    if(from!=0 || to!=0)
    {
      if (data != null) {
        if (data.length >= 0) {
  
  
          for (let i = 0; i < data.length; i++) {
  
            let fromdays;
            let todays;
            if (data[i].pminprematuritypercentage != null)
            fromdays =(data[i].pminprematuritypercentage);
            if (data[i].pmaxprematuritypercentage != null)
            todays = (data[i].pmaxprematuritypercentage);
  
  
  
            if (this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.value.pprematurityperiodtype == data[i].pprematurityperiodtype)
             {
  
              if (parseFloat(from) >= parseFloat(fromdays) && parseFloat(from) <= parseFloat(todays)) {
                //this.showErrorMessage('Given range already exists');
               
                isValid = false;
                this.ermsg="Tenure Already Exists"
                break;
              }
              if (parseFloat(to) >= parseFloat(fromdays) && parseFloat(to) <= parseFloat(todays)) {
                //this.showErrorMessage('Given range already exists');
                isValid = false;
                this.ermsg="Tenure Already Exists"
                break;
              }
              if (parseFloat(from) <= parseFloat(fromdays) && parseFloat(to) >= parseFloat(todays)) {
                //this.showErrorMessage('Given range already exists');
                isValid = false;
                this.ermsg="Tenure Already Exists"
                break;
              }
              if (parseFloat(from) >= parseFloat(fromdays) && parseFloat(to) <= parseFloat(todays)) {
                //this.showErrorMessage('Given range already exists');
                isValid = false;
                this.ermsg="Tenure Already Exists"
                break;
              }
  
         
            }
            else
            {
              this.ermsg="You Must Select Same Tenure Mode";
              
              isValid=false;
            }
  
          }
        }
  
      }
    }
   
    return isValid
  }
  pPrematuretyageperiod_Change(event){
    debugger;
    let ageperiod=parseFloat(event.target.value);
    if(ageperiod==0 || ageperiod== null){
       this.Rdloanfacilityform.controls.pPrematuretyageperiod.setValue('');
    }
  }
  prematuretypeselected(event)
  {
   debugger
   this.days=event.target.value
  }
  Validaations(type){
    const Lanfacilitycontrols = <FormGroup>this.Rdloanfacilityform.controls['_RecurringDepositPrematurityInterestPercentages'];
    if(type=='ADD'){
      Lanfacilitycontrols.controls.pminprematuritypercentage.setValidators(Validators.required)
      Lanfacilitycontrols.controls.pmaxprematuritypercentage.setValidators(Validators.required)
      Lanfacilitycontrols.controls.pPercentage.setValidators(Validators.required)
      Lanfacilitycontrols.controls.pprematurityperiodtype.setValidators(Validators.required)

    }
    else{
      Lanfacilitycontrols.controls.pminprematuritypercentage.clearValidators();
      Lanfacilitycontrols.controls.pmaxprematuritypercentage.clearValidators();
      Lanfacilitycontrols.controls.pPercentage.clearValidators();
      Lanfacilitycontrols.controls.pprematurityperiodtype.clearValidators();
    }
     Lanfacilitycontrols.controls.pminprematuritypercentage.updateValueAndValidity();
      Lanfacilitycontrols.controls.pmaxprematuritypercentage.updateValueAndValidity();
      Lanfacilitycontrols.controls.pPercentage.updateValueAndValidity();
      Lanfacilitycontrols.controls.pprematurityperiodtype.updateValueAndValidity();
      this.BlurEventAllControll(Lanfacilitycontrols);
  }
  Addtogrid()
  {
    debugger
    let isValid=true;
    let isloanfacilityValid = true;
    const Lanfacilitycontrols = <FormGroup>this.Rdloanfacilityform.controls['_RecurringDepositPrematurityInterestPercentages'];
    this.Validaations('ADD');
    isloanfacilityValid = this.checkValidations(Lanfacilitycontrols, isloanfacilityValid);
    if(isloanfacilityValid)
    {
      if(this.ValidateGridData())
      {
       this.Griddata.push(this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.value)
       this.Rdloanfacilityform['controls']['_RecurringDepositPrematurityInterestPercentages']['controls']['pminprematuritypercentage'].setValue("")
       this.Rdloanfacilityform['controls']['_RecurringDepositPrematurityInterestPercentages']['controls']['pmaxprematuritypercentage'].setValue("")
       this.Rdloanfacilityform['controls']['_RecurringDepositPrematurityInterestPercentages']['controls']['pPercentage'].setValue("")
       this.Rdloanfacilityform['controls']['_RecurringDepositPrematurityInterestPercentages']['controls']['pprematurityperiodtype'].setValue("");
        this.Validaations('REMOVE');
       this.RdLoanfacilityerrors={}
      }
      else{
           this._CommonService.showErrorMessage(this.ermsg)
          
      }
      
    }
     
    this.percentageto="";
    this.percentagefrom=""
     console.log(this.Rdloanfacilityform.value);
     
  }
  Frompercentage(event)
  {
    debugger
    this.percentagefrom=parseInt(event.target.value);
    if(this.percentageto!="")
    {
      if(this.percentageto<this.percentagefrom)
      {
        this._CommonService.showWarningMessage("To should not be less than From");
        this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages['controls'].pminprematuritypercentage.setValue("")
      }
    }
   
  }
  Topercentage(event)
  {
    debugger
    this.percentageto=parseInt(event.target.value)
    if(this.percentagefrom!="")
    {
      if(this.percentageto<this.percentagefrom)
      {
        this._CommonService.showWarningMessage("To should not be less than From");
        this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages['controls'].pmaxprematuritypercentage.setValue("")
      }
    }
   
  }
  Loanfacility(event)
  {
    this.Rdloanfacilityform.patchValue({
      pEligiblepercentage: '',
      pAgeperiodtype:'',
      pAgeperiod:'',
    })
     this.RdLoanfacilityerrors.pEligiblepercentage='';
    this.RdLoanfacilityerrors.pAgeperiodtype='';
    this.RdLoanfacilityerrors.pAgeperiod='';
    if(event.target.checked)
    {
      this.isloanfacilityaplicable=true;
       this.Rdloanfacilityform.controls.pEligiblepercentage.setValidators(Validators.required);
      this.Rdloanfacilityform.controls.pAgeperiodtype.setValidators(Validators.required);
      this.Rdloanfacilityform.controls.pAgeperiod.setValidators(Validators.required);

      this.Rdloanfacilityform.controls.pEligiblepercentage.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pAgeperiodtype.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pAgeperiod.updateValueAndValidity();

    }
    else{
      this.isloanfacilityaplicable=false;
       this.Rdloanfacilityform.controls.pEligiblepercentage.clearValidators();
      this.Rdloanfacilityform.controls.pAgeperiodtype.clearValidators();
      this.Rdloanfacilityform.controls.pAgeperiod.clearValidators();

      this.Rdloanfacilityform.controls.pEligiblepercentage.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pAgeperiodtype.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pAgeperiod.updateValueAndValidity();
    }
     this.BlurEventAllControll(this.Rdloanfacilityform);
  }
  Loanageperiod(event)
  {
    this.Rdloanfacilityform.patchValue({
      pAgeperiod: ''
    })
    if(event.target.checked)
    {
      this.isloanage=true
    }
    else{
      this.isloanage=false
    }
  }
  Lockinperiod(event)
  {
    this.Rdloanfacilityform.patchValue({
      pPrematuretyageperiod: '',
      pPrematuretyageperiodtype:'',
    })
     this.Rdloanfacilityform.controls._RecurringDepositPrematurityInterestPercentages.patchValue({
      pminprematuritypercentage:'',
      pmaxprematuritypercentage:'',
      pprematurityperiodtype:'',
      pPercentage:''
    })
     
    this.Griddata=[];
    if(event.target.checked)
    {
      this.islockin=true;
      this.islockintest=true;
      this.Rdloanfacilityform.controls.pPrematuretyageperiod.setValidators(Validators.required);
      this.Rdloanfacilityform.controls.pPrematuretyageperiodtype.setValidators(Validators.required);
      // this.Rdloanfacilityform.controls.pminprematuritypercentage.setValidators(Validators.required);
      // this.Rdloanfacilityform.controls.pmaxprematuritypercentage.setValidators(Validators.required);
      // this.Rdloanfacilityform.controls.pPercentage.setValidators(Validators.required);

      this.Rdloanfacilityform.controls.pPrematuretyageperiod.updateValueAndValidity();
       this.Rdloanfacilityform.controls.pPrematuretyageperiodtype.updateValueAndValidity();
      //   this.Rdloanfacilityform.controls.pminprematuritypercentage.updateValueAndValidity();
      // this.Rdloanfacilityform.controls.pmaxprematuritypercentage.updateValueAndValidity();
      // this.Rdloanfacilityform.controls.pPercentage.updateValueAndValidity();
    }
    else{
      this.islockin=false;
      this.islockintest=false;
      this.Rdloanfacilityform.controls.pPrematuretyageperiod.clearValidators();
      this.Rdloanfacilityform.controls.pPrematuretyageperiodtype.clearValidators();
      // this.Rdloanfacilityform.controls.pminprematuritypercentage.clearValidators();
      // this.Rdloanfacilityform.controls.pmaxprematuritypercentage.clearValidators();
      // this.Rdloanfacilityform.controls.pPercentage.clearValidators();

      this.Rdloanfacilityform.controls.pPrematuretyageperiod.updateValueAndValidity();
       this.Rdloanfacilityform.controls.pPrematuretyageperiodtype.updateValueAndValidity();
      //   this.Rdloanfacilityform.controls.pminprematuritypercentage.updateValueAndValidity();
      // this.Rdloanfacilityform.controls.pmaxprematuritypercentage.updateValueAndValidity();
      // this.Rdloanfacilityform.controls.pPercentage.updateValueAndValidity();
    }
     this.BlurEventAllControll(this.Rdloanfacilityform);
  }
  Latefeeapplicable(event)
  {
    this.forFixed=true;
    this.forPercentage=false;
    this.Rdloanfacilityform.patchValue({
      pLatefeepaybletype: 'comfixed',
      pLatefeepayblevalue: '',
      pLatefeeapplicabletype:'',
      pLatefeeapplicablefrom:''
    })
    this.RdLoanfacilityerrors.pLatefeepayblevalue='';
    this.RdLoanfacilityerrors.pLatefeeapplicablefrom='';
    this.RdLoanfacilityerrors.pLatefeeapplicabletype='';
    if(event.target.checked)
    {
      this.islatefeeapplicable=true;
      this.Rdloanfacilityform.controls.pLatefeepayblevalue.setValidators(Validators.required);
      this.Rdloanfacilityform.controls.pLatefeeapplicablefrom.setValidators(Validators.required);
      this.Rdloanfacilityform.controls.pLatefeeapplicabletype.setValidators(Validators.required);

      this.Rdloanfacilityform.controls.pLatefeepayblevalue.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pLatefeeapplicablefrom.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pLatefeeapplicabletype.updateValueAndValidity();
    }
    else{
      this.islatefeeapplicable=false;
      this.Rdloanfacilityform.controls.pLatefeepayblevalue.clearValidators();
      this.Rdloanfacilityform.controls.pLatefeeapplicablefrom.clearValidators();
      this.Rdloanfacilityform.controls.pLatefeeapplicabletype.clearValidators();

      this.Rdloanfacilityform.controls.pLatefeepayblevalue.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pLatefeeapplicablefrom.updateValueAndValidity();
      this.Rdloanfacilityform.controls.pLatefeeapplicabletype.updateValueAndValidity();
    }
     this.BlurEventAllControll(this.Rdloanfacilityform);
  }

  latefeePayablechange(type) {
    
    if(type == 'fixed') {
      this.forFixed = true;
      this.forPercentage = false;
      this.Rdloanfacilityform.patchValue({
        pLatefeepayblevalue: ''
      })
    }
    else {
      this.forFixed = false;
      this.forPercentage = true;
      this.Rdloanfacilityform.patchValue({
        pLatefeepayblevalue: ''
      })
    }
     this.RdLoanfacilityerrors.pLatefeepayblevalue='';
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
          this.RdLoanfacilityerrors[key] = '';
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;
            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                errormessage = this._CommonService.getValidationMessage(formcontrol, errorkey, lablename, key, '');
                this.RdLoanfacilityerrors[key] += errormessage + ' ';
                isValid = false;
              }
            }
          }
        }
      }
    }
    catch (e) {
      // this.showErrorMessage(e);
      // return false;
    }
    return isValid;
  }
  showErrorMessage(errormsg: string) {
    this._CommonService.showErrorMessage(errormsg);
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
  removeHandler(event) {
    this.Griddata.splice(event.rowIndex, 1);
  }
}

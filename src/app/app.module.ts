import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { ExportAsModule } from 'ngx-export-as';


// import { AccountingModule } from '../app/UI/accounting/accounting.module'

import { NumbersonlyDirective } from './Directives/numbersonly.directive';
import { NumbersWithZeroDirective } from './Directives/nuberswithzero.directive';
import { AddressformatDirective } from './Directives/addressformat.directive';
import { CharactersonlyDirective } from './Directives/charactersonly.directive';
import { EmailpatternDirective } from './Directives/emailpattern.directive';
import { MycurrencyFormatterDirective } from './Directives/mycurrency-formatter.directive';
import { NewlineDirective } from './Directives/newline.directive';
import { TitlecasewordDirective } from './Directives/titlecaseword.directive';
import { EmailFormatDirective } from './Directives/emailformat.directive';
import { EnterpriseNameFormatDirective } from './Directives/enterprisenameformat';
import {ThreeDigitNumberDirective} from './Directives/ThreeDigitNumber.directive,'
import { TwoDigitDecimaNumberDirective } from './Directives/two-digit-decima-number.directive';
import { ThreeDigitDecimaNumberDirective } from './Directives/three-digit-decima-number.directive';
import { InitCapDirective } from './Directives/InitCap.directive';


import { AppComponent } from './app.component';
import { FilterPipeModule } from 'ngx-filter-pipe'

import { DashboardComponent } from './UI/Home/dashboard.component';
import { NavigationComponent } from './UI/Home/navigation.component';

import { ChargesMasterComponent } from './UI/Loans/Masters/charges/charges-master.component';
import { ChargeconfigurationViewComponent } from './UI/Loans/Masters/charges/chargeconfiguration-view.component';
import { ChargeconfigurationMasterComponent } from './UI/Loans/Masters/charges/chargeconfiguration-master.component';

import { ContactComponent } from './UI/Loans/Masters/contact-old/contact.component';
import { ContactViewComponent } from './UI/Loans/Masters/contact-old/contact-view.component';
import { ContactIndividualComponent } from './UI/Loans/Masters/contact-old/contact-individual.component';
import { ContactBusinessComponent } from './UI/Loans/Masters/contact-old/contact-business.component';

import { DocumentsComponent } from './UI/Loans/Masters/documents/documents.component';
import { LoansComponent } from './UI/Loans/Masters/loans/loans.component';
import { LoansCreationComponent } from './UI/Loans/Masters/loans/loans-creation.component';

import { SchemeViewComponent } from './UI/Loans/Masters/scheme/scheme-view.component';
import { SchemeMasterComponent } from './UI/Loans/Masters/scheme/scheme-master.component';


import { LoansnamecodeComponent } from './UI/Loans/Masters/loans/loansnamecode.component';
import { LoansinstallmentduedateComponent } from './UI/Loans/Masters/loans/loansinstallmentduedate.component';
import { LoansconfigurationComponent } from './UI/Loans/Masters/loans/loansconfiguration.component';
import { LoanspenalinterestComponent } from './UI/Loans/Masters/loans/loanspenalinterest.component';
import { LoansidentificationdocumentsComponent } from './UI/Loans/Masters/loans/loansidentificationdocuments.component';
import { LoansreferralcommissionComponent } from './UI/Loans/Masters/loans/loansreferralcommission.component';
import { PhotouploadComponent } from './UI/Loans/Masters/contact-old/photoupload.component';


import { CookieService } from 'ngx-cookie-service';

import { PreclosureMasterComponent } from './UI/Loans/Masters/preclosure/preclosure-master.component';
import { PreclosureViewComponent } from './UI/Loans/Masters/preclosure/preclosure-view.component';

import { FiViewComponent } from './UI/Loans/Transactions/FIIndividual/fi-view.component';
import { FiMasterComponent } from './UI/Loans/Transactions/FIIndividual/fi-master.component';
import { FiContacttypeComponent } from './UI/Loans/Transactions/FIIndividual/fi-contacttype.component';
import { FiLoandetailsComponent } from './UI/Loans/Transactions/FIIndividual/fi-loandetails.component';
import { FiApplicantsandothersComponent } from './UI/Loans/Transactions/FIIndividual/fi-applicantsandothers.component';
import { FiKycandidentificationComponent } from './UI/Loans/Transactions/FIIndividual/fi-kycandidentification.component';
import { FiPersonaldetailsComponent } from './UI/Loans/Transactions/FIIndividual/fi-personaldetails.component';
import { FiSecurityandcollateralComponent } from './UI/Loans/Transactions/FIIndividual/fi-securityandcollateral.component';
import { FiExistingloansComponent } from './UI/Loans/Transactions/FIIndividual/fi-existingloans.component';
import { FiReferencesComponent } from './UI/Loans/Transactions/FIIndividual/fi-references.component';
import { FiReferralComponent } from './UI/Loans/Transactions/FIIndividual/fi-referral.component';
import { BusinessloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/businessloan.component';
import { ConsumerloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/consumerloan.component';
import { EducationloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/educationloan.component';
import { GoldloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/goldloan.component';
import { HomeloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/homeloan.component';
import { LoanagainstdepositsloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/loanagainstdepositsloan.component';
import { LoanagainstpropertyloanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/loanagainstpropertyloan.component';
import { PersonalLoanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/personal-loan.component';
import { VehicleLoanComponent } from './UI/Loans/Transactions/FIIndividual/Loans/vehicle-loan.component';
import { ReferralAgentViewComponent } from './UI/Settings/Referral-Agent/referral-agent-view.component';
import { ReferralAgentMasterComponent } from './UI/Settings/Referral-Agent/referral-agent-master.component';
import { AdvocateLawyerMasterComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-master.component';
import { AdvocateLawyerViewComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-view.component';
import { EmployeeViewComponent } from './UI/Settings/Employee/employee-view.component';
import { EmployeeMasterComponent } from './UI/Settings/Employee/employee-master.component';

import { MycurrencypipePipe } from './Pipes/mycurrencypipe.pipe';
import { FiLoanspecficComponent } from './UI/Loans/Transactions/FIIndividual/fi-loanspecfic.component';
//import { ReferralAgentContactComponent } from './UI/Settings/Referral-Agent/referral-agent-contact.component';
//import { ReferralAgentKycdocumentsComponent } from './UI/Settings/Referral-Agent/referral-agent-kycdocuments.component';
//import { ReferralAgentBankdetailsComponent } from './UI/Settings/Referral-Agent/referral-agent-bankdetails.component';
//import { ReferralAgentTdsdetailsComponent } from './UI/Settings/Referral-Agent/referral-agent-tdsdetails.component';
// import { AdvocateLawyerTdsdetailsComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-tdsdetails.component';
// import { AdvocateLawyerBankdetailsComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-bankdetails.component';
// import { AdvocateLawyerKycdocumentsComponent } from './UI/Settings/Advocate-Lawyer/advocate-lawyer-kycdocuments.component';
// import { AdvocateSelectComponent } from './UI/Settings/Advocate-Lawyer/advocate-select.component';

import { PartyViewComponent } from './UI/Settings/contact-party/party-view.component';
import { PartyMasterComponent } from './UI/Settings/contact-party/party-master.component';
// import { PartyBankdetailsComponent } from './UI/Settings/contact-party/party-bankdetails.component';
// import { PartyKycdocumentsComponent } from './UI/Settings/contact-party/party-kycdocuments.component';
// import { PartySelectComponent } from './UI/Settings/contact-party/party-select.component';
// import { PartyTdsdetailsComponent } from './UI/Settings/contact-party/party-tdsdetails.component';





import { KYCDocumentsComponent } from './UI/Common/kycdocuments/kycdocuments.component';
import { BankdetailsComponent } from './UI/Common/bankdetails/bankdetails.component';
import { TDSDetailsComponent } from './UI/Common/tdsdetails/tdsdetails.component';
import { RoundecimalDirective } from './Directives/roundecimal.directive';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { GroupViewComponent } from './UI/Common/group-view/group-view.component';
import { GroupCreationComponent } from './UI/Common/group-creation/group-creation.component';
import { ContactSelectComponent } from './UI/Common/contact-select/contact-select.component';

import { FiPersonaldetailsEmploymentComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-employment.component';
import { FiPersonaldetailsBusinessComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-business.component';
import { FiPersonaldetailsFinancialperformanceComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-financialperformance.component';

import { FiPersonaldetailsFamilyComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-family.component';
import { FiPersonaldetailsNomineeComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-nominee.component';

import { FiPersonaldetailsIncomeComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-income.component';
import { FiPersonaldetailsOtherincomeComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-otherincome.component';
import { FiPersonaldetailsEducationComponent } from './UI/Loans/Transactions/FIIndividual/PersonalDetails/fi-personaldetails-education.component';

import { PersonalDetailsComponent } from './UI/Common/personal-details/personal-details.component';
import { FamilyDetailsComponent } from './UI/Common/family-details/family-details.component';
import { EmployeeDetailsComponent } from './UI/Common/employee-details/employee-details.component';
import { ValidationMessageComponent } from './UI/Common/validation-message/validation-message.component';
import { AddressComponent } from './UI/Common/address/address.component';
import { ButtonDoubleClickDirective } from './Directives/button-double-click.directive';
import { AlphaNumericDirective } from './Directives/alpha-numeric.directive';
import { AlphanumericcharsonlyDirective } from './Directives/alphanumericcharsonly.directive';
import { appAlphanumericwithSpecialCharactersDirective } from './Directives/AlphaNumericWithSpecialCharacters.directive';
import { PropertyDetailsComponent } from './UI/Common/property-details/property-details.component';
import { MovablePropertyDetailsComponent } from './UI/Common/movable-property-details/movable-property-details.component';
import { TimeMaskDirective } from './Directives/time-mask.directive'

///
import { ChequemanagementViewComponent } from '../app/UI/accounting/masters/Chequemanagement/chequemanagement-view.component';
import { ChequemanagementMasterComponent } from '../app/UI/accounting/masters/Chequemanagement/chequemanagement-master.component';
import { AccountsMasterComponent } from '../app/UI/accounting/masters/Accounts/accounts-master.component';
import { AccountsViewComponent } from '../app/UI/accounting/masters/Accounts/accounts-view.component';
import { BankViewComponent } from '../app/UI/accounting/masters/Bankinformation/bank-view.component';
import { BankMasterComponent } from '../app/UI/accounting/masters/Bankinformation/bank-master.component';

import { GeneralreceiptViewComponent } from '../app/UI/accounting/Transactions/Generalreceipt/generalreceipt-view.component';
import { GeneralreceiptNewComponent } from '../app/UI/accounting/Transactions/Generalreceipt/generalreceipt-new.component';
import { PaymentvoucherViewComponent } from '../app/UI/accounting/Transactions/Paymentvoucher/paymentvoucher-view.component';
import { PaymentvoucherNewComponent } from '../app/UI/accounting/Transactions/Paymentvoucher/paymentvoucher-new.component';
import { JournalvoucherNewComponent } from '../app/UI/accounting/Transactions/Journalvoucher/journalvoucher-new.component';
import { JournalvoucherViewComponent } from '../app/UI/accounting/Transactions/Journalvoucher/journalvoucher-view.component';

import { ChequesonhandNewComponent } from '../app/UI/accounting/Transactions/Chequesonhand/chequesonhand-new.component';
import { ChequesissuedNewComponent } from '../app/UI/accounting/Transactions/Chequesissued/chequesissued-new.component';
import { ChequesinbankNewComponent } from '../app/UI/accounting/Transactions/Chequesinbank/chequesinbank-new.component';
import { VerificationNewComponent } from './UI/Loans/Transactions/Verification/verification-new.component';
import { VerificationViewComponent } from './UI/Loans/Transactions/Verification/verification-view.component';
import { AprovalViewComponent } from './UI/Loans/Transactions/Aproval/aproval-view.component';
import { AprovalNewComponent } from './UI/Loans/Transactions/Aproval/aproval-new.component';
import { DisbursementNewComponent } from './UI/Loans/Transactions/Disbursement/disbursement-new.component';
import { DisbursementViewComponent } from './UI/Loans/Transactions/Disbursement/disbursement-view.component';
import { DeliveryorderNewComponent } from './UI/Loans/Reports/Deliveryorder/deliveryorder-new.component';
import { AcknowledgementsNewComponent } from './UI/Loans/Reports/Acknowledgements/acknowledgements-new.component';
import { TeleVrificationComponent } from './UI/Loans/Transactions/Verification/tele-vrification.component';
import { AddressVerificationComponent } from './UI/Loans/Transactions/Verification/address-verification.component';
import { DocumentVerificationComponent } from './UI/Loans/Transactions/Verification/document-verification.component';
import { IfsccodevalidatorDirective } from './Directives/ifsccodevalidator.directive';
import { SanctionLetterComponent } from './UI/Loans/Reports/sanction-letter/sanction-letter.component';
//import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ContextMenuModule } from 'ngx-contextmenu';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { DisburementLetterComponent } from './UI/Loans/Reports/disburement-letter/disburement-letter.component';
import { LoanreceiptViewComponent } from './UI/Loans/Transactions/loanreceipt/loanreceipt-view.component';
import { LoanreceiptNewComponent } from './UI/Loans/Transactions/loanreceipt/loanreceipt-new.component';

import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { AddMenuComponent } from './UI/Settings/add-menu/add-menu.component';
import { UserRightsComponent } from './UI/Settings/user-rights/user-rights.component';


import { GeneralReceiptReportsComponent } from './UI/accounting/reports/general-receipt-reports.component';
import { PaymentVoucherReportsComponent } from './UI/accounting/./reports/payment-voucher-reports.component';
import { NumberToWordsPipe } from './Pipes/number-to-words.pipe';
import { UsersviewComponent } from './UI/Settings/Users/usersview/usersview.component';
import { UsersregistrationComponent } from './UI/Settings/Users/usersregistration/usersregistration.component';
import { CashBookComponent } from './UI/accounting/reports/cash-book.component';
import { BankBookComponent } from './UI/accounting/reports/bank-book.component';
import { UppercaseDirective } from './Directives/uppercase.directive';

import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './UI/Settings/Users/user-login/user-login.component';
import { JwtInterceptor } from './Services/Settings/Users/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './Services/Settings/Users/_helpers/error.interceptor';
import { AuthGuard } from './Services/Settings/Users/_helpers/auth.guard';
import { AccountLedgerComponent } from './UI/accounting/reports/account-ledger.component';
import { DayBookComponent } from './UI/accounting/reports/day-book.component';
import { PartyLedgerComponent } from './UI/accounting/reports/party-ledger.component';
import { CollectionsReportComponent } from './UI/Loans/Reports/collections-report/collections-report.component';
import { BankReconStatmentComponent } from './UI/accounting/reports/bank-recon-statment.component';
import { TrialBalanceComponent } from './UI/accounting/reports/trialbalance/trial-balance.component';

import { ContactListComponent } from './UI/Settings/contacts/contact-list/contact-list.component';
import { ContactListDetailViewComponent } from './UI/Settings/contacts/contact-list-detail-view/contact-list-detail-view.component';
import { AutoFocusDirective } from './Directives/auto-focus.directive';

import { BalanceSheetComponent } from './UI/accounting/reports/balance-sheet.component';
import { ProfitAndLossComponent } from './UI/accounting/reports/profit-and-loss.component';
import { ComparisionTrialBalanceComponent } from './UI/accounting/reports/comparision-trial-balance.component';
import { AccountSummaryDetailsComponent } from './UI/accounting/reports/account-summary-details.component';
import { RePrintComponent } from './UI/accounting/reports/re-print.component';
import { JournalVoucherReportComponent } from './UI/accounting/reports/journal-voucher-report.component';
import { CompanyDetailsComponent } from './UI/Common/company-details/company-details.component';
import { TrialbalanceLedgersummeryComponent } from './UI/accounting/reports/trialbalance/trialbalance-ledgersummery.component';
import { TrialbalanceAccountledgerComponent } from './UI/accounting/reports/trialbalance/trialbalance-accountledger.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { EmichartReportComponent } from './UI/Loans/Reports/emichart-report/emichart-report.component';

import { DueReportsComponent } from './UI/Loans/Reports/due-reports/due-reports.component';
import { DisbursmentReportComponent } from './UI/Loans/Reports/disbursment-report/disbursment-report.component';
import { RemoveZeroDirective } from './Directives/remove-zero.directive';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ZeroDirective } from './Directives/zero.directive';
import { LoanStatementComponent } from './UI/Loans/Reports/loan-statement/loan-statement.component';

import { EmichartViewComponent } from './UI/Loans/Reports/emichart-report/emichart-view.component';

import { DuereportsEmiComponent } from './UI/Loans/Reports/due-reports/duereports-emi.component';
import { GenerateidMasterComponent } from './UI/Settings/generateid-master/generateid-master.component';
import { ChequeEnquiryComponent } from './UI/accounting/reports/cheque-enquiry/cheque-enquiry.component';
import { JvListComponent } from './UI/accounting/reports/jv-list/jv-list.component';
import { LedgerExtractComponent } from './UI/accounting/reports/ledger-extract/ledger-extract.component';
import { ChequeCancelComponent } from './UI/accounting/reports/cheque-cancel/cheque-cancel.component';
import { ChequeReturnComponent } from './UI/accounting/reports/cheque-return/cheque-return.component';

import { IssuedChequeComponent } from './UI/accounting/reports/issued-cheque/issued-cheque.component';

import { CompanyConfigComponent } from './UI/Settings/company-config/company-config.component';
import { BranchConfigComponent } from './UI/Settings/branch-config/branch-config.component';
import { CompanyconfigDocumentsComponent } from './UI/Settings/company-config/companyconfig-documents/companyconfig-documents.component';
import { CompanyconfigPromotorsComponent } from './UI/Settings/company-config/companyconfig-promotors/companyconfig-promotors.component';

import { TrendreportsComponent } from './UI/Loans/Reports/trendreports/trendreports.component';
import { TrendDisbursementReportComponent } from './UI/Loans/Reports/trendreports/trend-disbursement-report.component';
import { TrendCollectionReportComponent } from './UI/Loans/Reports/trendreports/trend-collection-report.component';
import { SubaccountLedgerComponent } from './UI/accounting/reports/subaccount-ledger/subaccount-ledger.component';
import { MembertypeViewComponent } from './UI/Banking/Masters/Membertype/membertype-view.component';
import { MembertypeNewComponent } from './UI/Banking/Masters/Membertype/membertype-new.component';
import { MemberNewComponent } from './UI/Banking/Masters/Member/member-new.component';
import { MemberViewComponent } from './UI/Banking/Masters/Member/member-view.component';
import { CompanydocumentsComponent } from './UI/Common/companydocuments/companydocuments.component';

import { CollectionReportsDetailSectionComponent } from './UI/Loans/Reports/collections-report/collection-reports-detail-section.component';
import { SubledgerSummaryComponent } from './UI/accounting/reports/subledger-summary/subledger-summary.component';


import { FdconfigNewComponent } from './UI/Banking/Masters/Fdconfig/fdconfig-new.component';
import { FdConfigViewComponent } from './UI/Banking/Masters/Fdconfig/fd-config-view.component';
import { RdconfigNewComponent } from './UI/Banking/Masters/Rdconfig/rdconfig-new.component';
import { RdconfigViewComponent } from './UI/Banking/Masters/Rdconfig/rdconfig-view.component';
import { SavingsConfigNewComponent } from './UI/Banking/Masters/Savings-AC/savings-config-new.component';
import { SavingsConfigViewComponent } from './UI/Banking/Masters/Savings-AC/savings-config-view.component';
import { SharesConfigViewComponent } from './UI/Banking/Masters/Shares/shares-config-view.component';
import { SharesConfigNewComponent } from './UI/Banking/Masters/Shares/shares-config-new.component';
import { CompanynameCompanycodeComponent } from './UI/Common/companyname-companycode/companyname-companycode.component';

import { ShareCapitalComponent } from './UI/Banking/Masters/Shares/share-capital.component';
import { ShareReferralCommissionComponent } from './UI/Banking/Masters/Shares/share-referral-commission.component';

import { SavingsNameCodeComponent } from './UI/Banking/Masters/Savings-AC/savings-name-code.component';
import { SavingsConfigurationComponent } from './UI/Banking/Masters/Savings-AC/savings-configuration.component';
import { LoanFacilityComponent } from './UI/Banking/Masters/Savings-AC/loan-facility.component';
import { ReferralCommissionComponent } from './UI/Banking/Masters/Savings-AC/referral-commission.component';
import { IdentificationDocumentsComponent } from './UI/Common/identification-documents/identification-documents.component';
import { DecimalwithcurrencyformatDirective } from './Directives/decimalwithcurrencyformat.directive';
import { ProfitandLossMTDYTDComponent } from './UI/accounting/reports/profitand-loss-mtdytd/profitand-loss-mtdytd.component';
import { LoanpreclosureViewComponent } from './UI/Loans/Transactions/loanpreclosure/loanpreclosure-view.component';
import { LoanpreclosureNewComponent } from './UI/Loans/Transactions/loanpreclosure/loanpreclosure-new.component';
import { RdnameandcodeComponent } from './UI/Banking/Masters/Rdconfig/rdnameandcode.component';
import { RdconfigurationComponent } from './UI/Banking/Masters/Rdconfig/rdconfiguration.component';
import { RdloanandfacilityComponent } from './UI/Banking/Masters/Rdconfig/rdloanandfacility.component';
import { RdidentificationComponent } from './UI/Banking/Masters/Rdconfig/rdidentification.component';
import { RdrefferalcommisionComponent } from './UI/Banking/Masters/Rdconfig/rdrefferalcommision.component';
import { CurrencypipewithdecimalPipe } from './Pipes/currencypipewithdecimal.pipe';
import { InsuranceMemberViewComponent } from './UI/Banking/Masters/Insurance/insurance-member-view.component';
import { InsuranceMemberNewComponent } from './UI/Banking/Masters/Insurance/insurance-member-new.component';
import { InsuranceConfigViewComponent } from './UI/Banking/Masters/Insurance/insurance-config-view.component';
import { InsuranceConfigNewComponent } from './UI/Banking/Masters/Insurance/insurance-config-new.component';
import { FdconfigurationComponent } from './UI/Banking/Masters/Fdconfig/fdconfiguration.component';
import { FdloanandfacilityComponent } from './UI/Banking/Masters/Fdconfig/fdloanandfacility.component';
import { FdidentificationComponent } from './UI/Banking/Masters/Fdconfig/fdidentification.component';
import { FdrefferalcommisionComponent } from './UI/Banking/Masters/Fdconfig/fdrefferalcommision.component';
import { FdnameandcodeComponent } from './UI/Banking/Masters/Fdconfig/fdnameandcode.component';

import { LoanStatementReportComponent } from './UI/Loans/Reports/loan-statement/loan-statement-report.component';

import { SavingsTransactionsViewComponent } from './UI/Banking/Transactions/Savings-AC/savings-transactions-view.component';
import { SavingsTransactionsNewComponent } from './UI/Banking/Transactions/Savings-AC/savings-transactions-new.component';
import { ShareApplicationComponent } from './UI/Banking/Transactions/share-application/share-application.component';
import { ContactListPartyComponent } from './UI/Settings/contacts/contact-list-party/contact-list-party.component';
import { ShareAppViewComponent } from './UI/Banking/Transactions/share-application/share-app-view.component';
import { FdTransactionViewComponent } from './UI/Banking/Transactions/FD-AC-Creation/fd-transaction-view.component';
import { FdTransactionNewComponent } from './UI/Banking/Transactions/FD-AC-Creation/fd-transaction-new.component';
import { RdTransactionNewComponent } from './UI/Banking/Transactions/RD-AC-Creation/rd-transaction-new.component';
import { RdTransactionViewComponent } from './UI/Banking/Transactions/RD-AC-Creation/rd-transaction-view.component';


import { FdJointmemberComponent } from './UI/Banking/Transactions/FD-AC-Creation/fd-jointmember.component';
import { FdReferralComponent } from './UI/Banking/Transactions/FD-AC-Creation/fd-referral.component';




import { JointmemberNomineeComponent } from './UI/Banking/Transactions/Savings-AC/jointmember-nominee.component';
import { ReferralComponent } from './UI/Banking/Transactions/Savings-AC/referral.component';

import{ RdRecurringdepositComponent } from './UI/Banking/Transactions/RD-AC-Creation/rd-recurringdeposit.component'
import{ RdJointmemberComponent } from './UI/Banking/Transactions/RD-AC-Creation/rd-jointmember.component'
import{ RdReferralComponent } from './UI/Banking/Transactions/RD-AC-Creation/rd-referral.component';
import { NegativevaluePipe } from './Pipes/negativevalue.pipe';
import { LienEntryComponent } from './UI/Banking/Masters/lien-entry/lien-entry.component'
import { LienEntryViewComponent } from './UI/Banking/Masters/lien-entry/lien-entry-view.component'
import { SelfOrAdjustmentViewComponent } from './UI/Banking/Transactions/SelfOrAdustment/self-or-adjustment-view.component'
import { SelfOrAdjustmentNewComponent } from './UI/Banking/Transactions/SelfOrAdustment/self-or-adjustment-new.component';
import { LienReleaseNewComponent } from './UI/Banking/Transactions/Lien-Release/lien-release-new.component';
import { LienReleaseViewComponent } from './UI/Banking/Transactions/Lien-Release/lien-release-view.component'
import { NomineedetailsComponent } from './UI/Banking/Transactions/FD-AC-Creation/nomineedetails.component';
import { FdreceiptViewComponent } from './UI/Banking/Transactions/FD-Receipt/fdreceipt-view.component';
import { FdreceiptNewComponent } from './UI/Banking/Transactions/FD-Receipt/fdreceipt-new.component';
import { InterestpaymentViewComponent } from './UI/Banking/Transactions/Interest Payment/interestpayment-view.component';
import { InterestpaymentNewComponent } from './UI/Banking/Transactions/Interest Payment/interestpayment-new.component';
import { MaturityPaymentnewComponent } from './UI/Banking/Transactions/Maturity Payment/maturity-paymentnew.component';
import { MaturityBondnewComponent } from './UI/Banking/Transactions/Maturity Bond/maturity-bondnew.component';
import { CommissionPayementNewComponent } from './UI/Banking/Transactions/Commission Payment/commission-payement-new.component';
import { CommissionPayementViewComponent } from './UI/Banking/Transactions/Commission Payment/commission-payement-view.component';
import { TransferNewComponent } from './UI/Banking/Transactions/Transfer/transfer-new.component';
import { BondPreviewNewComponent } from './UI/Banking/Transactions/Bond-Preview/bond-preview-new.component';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BondPreviewComponent } from './UI/Banking/Reports/bond-preview.component';
import { MaturityBondViewComponent } from './UI/Banking/Transactions/Maturity Bond/maturity-bond-view.component';
import { InterestPaymentReportComponent } from './UI/Banking/Reports/interest-payment-report/interest-payment-report.component';
import { InterestpaymentpreviewComponent } from './UI/Banking/Reports/interestpaymentpreview/interestpaymentpreview.component';
import { MaturityPaymentViewComponent } from './UI/Banking/Transactions/Maturity Payment/maturity-payment-view.component';
import { MaturityPaymentRenewalComponent } from './UI/Banking/Transactions/Maturity Payment/maturity-payment-renewal.component';
import { PromoteSalaryReportComponent } from './UI/Banking/Reports/promote-salary-report.component';
import { MaturityIntimationReportComponent } from './UI/Banking/Reports/maturity-intimation-report.component';
import { LienReleaseReportComponent } from './UI/Banking/Reports/lien-release-report.component';
import { SelfAdjustmentReportComponent } from './UI/Banking/Reports/self-adjustment-report.component';
import { PreMaturityReportComponent } from './UI/Banking/Reports/pre-maturity-report.component';
import { FdTranscationDetailsComponent } from './UI/Banking/Transactions/FD-AC-Creation/fd-transcation-details.component';
import { MemberEnquiryComponent } from './UI/Banking/Reports/member-enquiry/member-enquiry.component';
import { TrendReportComponent } from './UI/Banking/Reports/trend-report.component';
import { MemberenquiryreceiptsComponent } from './UI/Banking/Reports/member-enquiry/memberenquiryreceipts.component';
import { InterestPaymentTrendReportComponent } from './UI/Banking/Reports/interest-payment-trend-report.component';
import { MemberWiseReceiptsReportComponent } from './UI/Banking/Reports/member-wise-receipts-report.component';
import { LienEntryPreviewComponent } from './UI/Banking/Reports/lien-entry-preview.component';
import { MaturityIntimationPreviewComponent } from './UI/Banking/Reports/maturity-intimation-preview.component';
import { AgentPointsReportComponent } from './UI/Banking/Reports/agent-points-report.component';
import { TargetReportComponent } from './UI/Banking/Reports/target-report.component';
import { CashFlowReportComponent } from './UI/Banking/Reports/cash-flow-report.component';
import { ContactNewComponent } from './UI/Loans/Masters/contact-new/contact-new.component';
import { ContactNewIndividualComponent } from './UI/Loans/Masters/contact-new/contact-new-individual.component';
import { ContactNewBusinessComponent } from './UI/Loans/Masters/contact-new/contact-new-business.component';
import { ContactNewPhotouploadComponent } from './UI/Loans/Masters/contact-new/contact-new-photoupload.component';
import { SelectsubscriberComponent } from './UI/Loans/Masters/contact-new/selectsubscriber.component';
import { BankdetailsnewComponent } from './UI/Common/bankdetails-new/bankdetailsnew.component';
import { KycdocumentsnewComponent } from './UI/Common/kycdocuments-new/kycdocuments-new.component';
import { AccountTreeComponent } from './UI/accounting/masters/Account-Tree/account-tree.component';
import { ContactNewViewComponent } from './UI/Loans/Masters/contact-new/contact-new-view.component';
import { ContactNewDetailedNewComponent } from './UI/Loans/Masters/contact-new/contact-new-detailed-new.component';
import { ContactMoreComponent } from './UI/Loans/Masters/contact-more/contact-more.component';
import { EmployeeDetailsNewComponent } from './UI/Common/employee-details/employee-details-new.component';
import { NumberRangeDirective } from './Directives/longitudeformat.directive';
import { InterestReportComponent } from './UI/Banking/Reports/interest-report.component';
import { TdsReportComponent } from './UI/Tds/Transcations/Tds report/tds-report.component';
import { ChallanaCheckingComponent } from './UI/Tds/Transcations/challana-checking/challana-checking.component';
import { ChallanaPaymentComponent } from './UI/Tds/Transcations/challana-payment.component';
import { CINEntryComponent } from './UI/Tds/Transcations/cin-entry.component';
import { CINEntryReportComponent } from './UI/Tds/Transcations/Cin-entryReport/cin-entry-report.component';
import { ChallanaPaymentReportComponent } from './UI/Tds/Transcations/challana-payment-report.component';
import { MaturityTrendDetailsComponent } from './UI/Banking/Reports/maturity-trend-details/maturity-trend-details.component';
import { MemberEnquiryDetailsComponent } from './UI/Banking/Reports/member-enquiry-details.component';
import { InterestpaymentTrenddetailsReportComponent } from './UI/Banking/Reports/interestpayment-trenddetails-report/interestpayment-trenddetails-report.component';
import { ApplicationFormComponent } from './UI/Banking/Reports/application-form.component';
import { ApplicationFormReportComponent } from './UI/Banking/Reports/application-form-report.component';
import { RdreceiptNewComponent } from './UI/Banking/Transactions/RD-Receipt/rdreceipt-new/rdreceipt-new.component';
import { SAReceiptComponent } from './UI/Banking/Transactions/SA-Receipt/sa-receipt.component';
import { MemberReceiptComponent } from './UI/Banking/Transactions/Member Receipt/member-receipt.component';
import { MemberReceiptViewComponent } from './UI/Banking/Transactions/Member Receipt/member-receipt-view.component';
import { SavingReceiptViewComponent } from './UI/Banking/Transactions/SA-Receipt/sa-receipt-view.component';
import { RdNomineedetailsComponent } from './UI/Banking/Transactions/RD-AC-Creation/rd-nomineedetails.component';
import { SpJointmemberComponent } from './UI/Banking/Transactions/share-application/sp-jointmember.component';
import { SpReferralComponent } from './UI/Banking/Transactions/share-application/sp-referral.component';
import { CoReferralComponent } from './UI/Common/co-referral/co-referral.component';
import { CoJointmemberComponent } from './UI/Common/co-jointmember/co-jointmember.component';
import { CoNomineedetailsComponent } from './UI/Common/co-nomineedetails/co-nomineedetails.component';
import { ShareReceiptComponent } from './UI/Banking/Transactions/share-receipt/share-receipt.component';
import { ShareReceiptViewComponent } from './UI/Banking/Transactions/share-receipt/share-receipt-view.component';
import { RdInstallmentsChartComponent } from './UI/Banking/Reports/rd-installments-chart/rd-installments-chart.component';



export function getDatepickerConfig(): BsDatepickerConfig {
    return Object.assign(new BsDatepickerConfig(), {
        dateInputFormat: 'DD/MM/YYYY'
    });
}

const appRoutes: Routes = [


    { path: '', component: UserLoginComponent },


    {
        path: '', component: NavigationComponent,
        children: [
            { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'LoansMaster', component: LoansComponent, canActivate: [AuthGuard] },
            { path: 'ChargesMaster', component: ChargesMasterComponent, canActivate: [AuthGuard] },
            { path: 'ChargeconfigurationView', component: ChargeconfigurationViewComponent, canActivate: [AuthGuard] },
            { path: 'ChargeconfigurationMaster', component: ChargeconfigurationMasterComponent },
            { path: 'Documents', component: DocumentsComponent, canActivate: [AuthGuard] },
            { path: 'SchemeView', component: SchemeViewComponent, canActivate: [AuthGuard] },
            { path: 'SchemeMaster', component: SchemeMasterComponent },
            { path: 'PreclosureView', component: PreclosureViewComponent, canActivate: [AuthGuard] },
            { path: 'PreclosureMaster', component: PreclosureMasterComponent },
            { path: 'ContactForm', component: ContactComponent },
            { path: 'ContactMore', component: ContactMoreComponent },
            {path:'ContactNew',component:ContactNewComponent},
            {path:'ContactNewViewDetailed',component:ContactNewDetailedNewComponent},
            {path:'ContactViewNew',component:ContactNewViewComponent},
            { path: 'ContactView', component: ContactViewComponent },
            { path: 'ContactIndividual', component: ContactIndividualComponent },
            { path: 'ContactBusiness', component: ContactBusinessComponent },
            { path: 'LoansCreation', component: LoansCreationComponent },
            { path: 'FiView', component: FiViewComponent, canActivate: [AuthGuard] },
            { path: 'Fiindividual', component: FiMasterComponent },
            { path: 'Fiindividual/:id', component: FiMasterComponent },
            { path: 'AdvocateLawyerView', component: AdvocateLawyerViewComponent, canActivate: [AuthGuard] },
            { path: 'AdvocateLawyerMaster', component: AdvocateLawyerMasterComponent },
            { path: 'AdvocateLawyerMaster/:id', component: AdvocateLawyerMasterComponent },
            { path: 'ReferralAgentView', component: ReferralAgentViewComponent, canActivate: [AuthGuard] },
            { path: 'ReferralAgentMaster', component: ReferralAgentMasterComponent },
            { path: 'ReferralAgentMaster/:id', component: ReferralAgentMasterComponent },
            { path: 'PartyView', component: PartyViewComponent, canActivate: [AuthGuard] },
            { path: 'PartyMaster', component: PartyMasterComponent },
            { path: 'PartyMaster/:id', component: PartyMasterComponent },
            { path: 'GroupView', component: GroupViewComponent, canActivate: [AuthGuard] },
            { path: 'GroupCreation', component: GroupCreationComponent },
            { path: 'EmployeeView', component: EmployeeViewComponent, canActivate: [AuthGuard] },
            { path: 'EmployeeMaster', component: EmployeeMasterComponent },
            { path: 'EmployeeMaster/:id', component: EmployeeMasterComponent },
            { path: 'VerificationView', component: VerificationViewComponent, canActivate: [AuthGuard] },
            { path: 'Televerification', component: TeleVrificationComponent },
            { path: 'Documentverification', component: DocumentVerificationComponent },
            { path: 'Fieldverification', component: AddressVerificationComponent },
            { path: 'Televerification/:id', component: TeleVrificationComponent },
            { path: 'Documentverification/:id', component: DocumentVerificationComponent },
            { path: 'Fieldverification/:id', component: AddressVerificationComponent },
            { path: 'AprovalView', component: AprovalViewComponent, canActivate: [AuthGuard] },
            { path: 'DisbursementView', component: DisbursementViewComponent, canActivate: [AuthGuard] },
            { path: 'VerificationNew', component: VerificationNewComponent },
            { path: 'AprovalNew', component: AprovalNewComponent },
            { path: 'DisbursementNew', component: DisbursementNewComponent },
            { path: 'VerificationNew/:id', component: VerificationNewComponent },
            { path: 'AprovalNew/:id', component: AprovalNewComponent },
            { path: 'DisbursementNew/:id', component: DisbursementNewComponent },
            { path: 'DeliveryorderNew', component: DeliveryorderNewComponent },
            { path: 'AcknowledgementsNew', component: AcknowledgementsNewComponent },
            { path: 'SanctionLetter', component: SanctionLetterComponent },
            { path: 'DeliveryorderNew/:id', component: DeliveryorderNewComponent },
            { path: 'AcknowledgementsNew/:id', component: AcknowledgementsNewComponent },
            { path: 'SanctionLetter/:id', component: SanctionLetterComponent },
            { path: 'AccountsView', component: AccountsViewComponent, canActivate: [AuthGuard] },
            { path: 'BankView', component: BankViewComponent, canActivate: [AuthGuard] },
            { path: 'ChequemanagementView', component: ChequemanagementViewComponent, canActivate: [AuthGuard] },
            { path: 'AccountsMaster', component: AccountsMasterComponent },
            { path: 'BankMaster', component: BankMasterComponent },
            { path: 'ChequemanagementMaster', component: ChequemanagementMasterComponent },
            { path: 'GeneralreceiptView', component: GeneralreceiptViewComponent, canActivate: [AuthGuard] },
            { path: 'PaymentvoucherView', component: PaymentvoucherViewComponent, canActivate: [AuthGuard] },
            { path: 'JournalvoucherView', component: JournalvoucherViewComponent, canActivate: [AuthGuard] },
            { path: 'GeneralreceiptNew', component: GeneralreceiptNewComponent },
            { path: 'PaymentvoucherNew', component: PaymentvoucherNewComponent },
            { path: 'JournalvoucherNew', component: JournalvoucherNewComponent },
            { path: 'GeneralreceiptNew/:id', component: GeneralreceiptNewComponent },
            { path: 'PaymentvoucherNew/:id', component: PaymentvoucherNewComponent },
            { path: 'JournalvoucherNew/:id', component: JournalvoucherNewComponent },
            { path: 'ChequesonHandNew', component: ChequesonhandNewComponent, canActivate: [AuthGuard] },
            { path: 'ChequesinBankNew', component: ChequesinbankNewComponent, canActivate: [AuthGuard] },
            { path: 'ChequesIssuedNew', component: ChequesissuedNewComponent, canActivate: [AuthGuard] },
            { path: 'DisburementLetter', component: DisburementLetterComponent },
            { path: 'DisburementLetter/:id', component: DisburementLetterComponent },
            { path: 'LoanreceiptView', component: LoanreceiptViewComponent, canActivate: [AuthGuard] },
            { path: 'LoanreceiptNew', component: LoanreceiptNewComponent },
            { path: 'LoanreceiptNew/:id', component: LoanreceiptNewComponent },
            { path: 'AddMenu', component: AddMenuComponent, canActivate: [AuthGuard] },
            { path: 'AddMenu/:id', component: AddMenuComponent },
            { path: 'UserRights', component: UserRightsComponent, canActivate: [AuthGuard] },
            { path: 'UserRights/:id', component: UserRightsComponent },
            { path: 'UsersView', component: UsersviewComponent, canActivate: [AuthGuard] },
            { path: 'UsersRegistration', component: UsersregistrationComponent },
            { path: 'CashBook', component: CashBookComponent, canActivate: [AuthGuard] },
            { path: 'CashBook/:id', component: CashBookComponent },
            { path: 'BankBook', component: BankBookComponent, canActivate: [AuthGuard] },
            { path: 'BankBook/:id', component: BankBookComponent },
            { path: 'AccountLedger', component: AccountLedgerComponent, canActivate: [AuthGuard] },
            { path: 'AccountLedger/:id', component: AccountLedgerComponent },
            { path: 'DayBook', component: DayBookComponent, canActivate: [AuthGuard] },
            { path: 'DayBook/:id', component: DayBookComponent },
            { path: 'TrialBalance', component: TrialBalanceComponent, canActivate: [AuthGuard] },
            { path: 'TrialBalance/:id', component: TrialBalanceComponent },
            { path: 'PartyLedger', component: PartyLedgerComponent, canActivate: [AuthGuard] },
            { path: 'PartyLedger/:id', component: PartyLedgerComponent },
            { path: 'CollectionsReport', component: CollectionsReportComponent, canActivate: [AuthGuard] },
            { path: 'CollectionsReport/:id', component: CollectionsReportComponent },
            { path: 'ContactList', component: ContactListComponent, canActivate: [AuthGuard] },
            { path: 'ContactList/:id', component: ContactListComponent },
            { path: 'ContactListDetailView', component: ContactListDetailViewComponent },
            { path: 'ContactListDetailView/:id', component: ContactListDetailViewComponent },
            { path: 'BRStatment', component: BankReconStatmentComponent, canActivate: [AuthGuard] },
            { path: 'BRStatment/:id', component: BankReconStatmentComponent },
            { path: 'BalanceSheet', component: BalanceSheetComponent, canActivate: [AuthGuard] },
            { path: 'BalanceSheet/:id', component: BalanceSheetComponent },
            { path: 'ProfitAndLoss', component: ProfitAndLossComponent, canActivate: [AuthGuard] },
            { path: 'ProfitAndLoss/:id', component: ProfitAndLossComponent },
            { path: 'ComparisionTrialBalance', component: ComparisionTrialBalanceComponent, canActivate: [AuthGuard] },
            { path: 'ComparisionTrialBalance/:id', component: ComparisionTrialBalanceComponent },
            { path: 'AccountSummaryDetails', component: AccountSummaryDetailsComponent, canActivate: [AuthGuard] },
            { path: 'AccountSummaryDetails/:id', component: AccountSummaryDetailsComponent },
            { path: 'RePrint', component: RePrintComponent, canActivate: [AuthGuard] },
            { path: 'RePrint/:id', component: RePrintComponent },
            { path: 'Duereports', component: DueReportsComponent, canActivate: [AuthGuard] },
            { path: 'Duereports/:id', component: DueReportsComponent },
            { path: 'DisbursmentReports', component: DisbursmentReportComponent, canActivate: [AuthGuard] },
            { path: 'DisbursmentReports/:id', component: DisbursmentReportComponent },
            { path: 'LoanStatement', component: LoanStatementComponent, canActivate: [AuthGuard] },
            { path: 'LoanStatement/:id', component: LoanStatementComponent },
            { path: 'EmiChartView', component: EmichartViewComponent },
            { path: 'GenerateidMaster', component: GenerateidMasterComponent },
            { path: 'ChequeEnquiry', component: ChequeEnquiryComponent },
            { path: 'ChequeCancel', component: ChequeCancelComponent },
            { path: 'ChequeReturn', component: ChequeReturnComponent },
            { path: 'IssuedCheque', component: IssuedChequeComponent },
            { path: 'JvList', component: JvListComponent },
          
            { path: 'LedgerExtract', component: LedgerExtractComponent },
            { path: 'CompanyConfig', component: CompanyConfigComponent },
            { path: 'BranchConfig', component: BranchConfigComponent },
            { path: 'Trendreports', component: TrendreportsComponent },
            // {path:'report',component:TrendDisbursementReportComponent},
           
            { path: 'MembertypeView', component: MembertypeViewComponent },
            { path: 'MembertypeNew', component: MembertypeNewComponent },
            // { path: 'Fiindividual/:id', component: FiMasterComponent },
            { path: 'MemberNew/:id', component: MemberNewComponent },
            { path: 'MemberNew', component: MemberNewComponent },
            { path: 'MemberView', component: MemberViewComponent },
            { path: 'SubaccountLedgerreports', component: SubaccountLedgerComponent },
            { path: 'SubledgerSummary', component: SubledgerSummaryComponent },
            { path: 'FdView', component: FdConfigViewComponent },
            { path: 'FdNew', component: FdconfigNewComponent },
            { path: 'FdNew/:id', component: FdconfigNewComponent },
            { path: 'RdView', component: RdconfigViewComponent },
            { path: 'RdNew', component: RdconfigNewComponent },
            { path: 'RdNew/:id', component: RdconfigNewComponent },
            { path: 'SavingsView', component: SavingsConfigViewComponent },
            { path: 'SavingsNew', component: SavingsConfigNewComponent },
            { path: 'SavingsNameCode',component:SavingsNameCodeComponent},
            { path: 'SharesConfigView', component: SharesConfigViewComponent },
            { path: 'SharesConfigNew', component: SharesConfigNewComponent },
            { path: 'ProfitandLossMTDYTD', component: ProfitandLossMTDYTDComponent },
            { path: 'LoanpreclosureView', component: LoanpreclosureViewComponent },
            { path: 'LoanpreclosureNew', component: LoanpreclosureNewComponent },
            { path: 'InsuranceMemberView', component: InsuranceMemberViewComponent },
            { path: 'InsuranceMemberNew', component: InsuranceMemberNewComponent },
            { path: 'InsuranceConfigView', component: InsuranceConfigViewComponent },
            { path: 'InsuranceConfigNew', component: InsuranceConfigNewComponent },
            { path: 'InsuranceConfigNew/:urlObject', component: InsuranceConfigNewComponent },


            { path: 'SavingsTransactionsView', component: SavingsTransactionsViewComponent },
            { path: 'SavingsTransactionsNew', component: SavingsTransactionsNewComponent },
            { path: 'ShareApplication', component: ShareAppViewComponent },
            { path: 'shareAppNewComponent',component:ShareApplicationComponent},
            {path:'TdsReport',component:TdsReportComponent},
            {path:'ChallanaChecking',component:ChallanaCheckingComponent},
            {path:'ChallanaPayment',component:ChallanaPaymentComponent},
            {path:'ApplicationForm',component:ApplicationFormComponent},
            {path:'CIN-Entry',component:CINEntryComponent},
            {path:'CIN-Entry-Report',component:CINEntryReportComponent},
            { path: 'FdTransactionView', component: FdTransactionViewComponent },
            { path: 'FdTransactionNew', component: FdTransactionNewComponent },
            { path: 'RdTransactionView', component: RdTransactionViewComponent },
            { path: 'RdTransactionNew', component: RdTransactionNewComponent },
            { path: 'LienEntryNew', component: LienEntryComponent },
            { path: 'LienEntryView', component: LienEntryViewComponent },
           { path: 'RdTransactionNew', component: RdTransactionNewComponent },
          { path: 'SelfOrAdjustmentView', component: SelfOrAdjustmentViewComponent },
          { path: 'SelfOrAdjustmentNew', component: SelfOrAdjustmentNewComponent },
          { path: 'LienReleaseNew', component: LienReleaseNewComponent },
          { path: 'LienReleaseView', component: LienReleaseViewComponent },
          { path: 'FdreceiptNew', component: FdreceiptNewComponent },
          { path: 'FdreceiptView', component: FdreceiptViewComponent },
          {path:'InterestpaymentView',component:InterestpaymentViewComponent},
            { path: 'InterestpaymentNew', component: InterestpaymentNewComponent },
            { path: 'InterestpaymentReport', component: InterestPaymentReportComponent },
            { path: 'PromoteSalaryReport', component: PromoteSalaryReportComponent },
            { path: 'MaturityIntimationReport', component: MaturityIntimationReportComponent },
            { path: 'LienReleaseReport', component: LienReleaseReportComponent },
            {path:'MemberEnquiry',component:MemberEnquiryComponent},
            { path: 'SelfAdjustmentReport', component: SelfAdjustmentReportComponent },
            { path: 'PreMaturityReport', component: PreMaturityReportComponent },
            { path: 'TrendReport', component: TrendReportComponent },
            { path: 'InterestPaymentTrendReport', component: InterestPaymentTrendReportComponent },
            { path: 'MemberWiseReceiptsReport', component: MemberWiseReceiptsReportComponent },
          { path: 'AccountTreeNew', component: AccountTreeComponent },

            { path: 'MaturitypaymentNew', component: MaturityPaymentnewComponent },
          { path: 'MaturitypaymentView', component: MaturityPaymentViewComponent },
          
          { path: 'MaturityBondNew', component: MaturityBondnewComponent },
          { path: 'MaturityBondView', component: MaturityBondViewComponent},
        {path:'MaturityRenewal',component:MaturityPaymentRenewalComponent},
          {path:'CommissionPaymentNew',component:CommissionPayementNewComponent},
          {path:'CommissionPaymentView',component:CommissionPayementViewComponent},
          {path:'TransferNew',component:TransferNewComponent},
            { path: 'BondPreviewNew', component: BondPreviewNewComponent },
            { path: 'Interestpaymentpreview', component: InterestPaymentReportComponent },
             { path: 'AgentPointsReport', component: AgentPointsReportComponent },
            { path: 'TargetReport', component: TargetReportComponent },
            {path:'InterestReport',component:InterestReportComponent},
            { path: 'CashFlow', component: CashFlowReportComponent },
          
         
            { path: 'InterestPaymentPreview', component: InterestpaymentpreviewComponent },
            { path: 'InterestPaymentPreview/:id', component: InterestpaymentpreviewComponent },
            { path: 'Rdreceipt', component: RdreceiptNewComponent },
            {path:'SAreceipt',component:SAReceiptComponent},
            {path:'Memberreceipt',component:MemberReceiptComponent},
            {path:'MemberReceiptView',component:MemberReceiptViewComponent},
            {path:'SavingReceiptView',component:SavingReceiptViewComponent},
            {path:'ShareReceipt',component:ShareReceiptComponent},
            {path:'ShareReceiptView',component:ShareReceiptViewComponent},
            
            
        ]
    },
    { path: 'PaymentVoucherReports', component: PaymentVoucherReportsComponent },
    { path: 'PaymentVoucherReports/:id', component: PaymentVoucherReportsComponent },
    { path: 'GeneralReceiptReports', component: GeneralReceiptReportsComponent },
    { path: 'GeneralReceiptReports/:id', component: GeneralReceiptReportsComponent },
    { path: 'JournalvoucherReport', component: JournalVoucherReportComponent },
    { path: 'JournalvoucherReport/:id', component: JournalVoucherReportComponent },
    { path: 'EmiChartReport', component: EmichartReportComponent },
    { path: 'EmiChartReport/:id', component: EmichartReportComponent },
    { path: 'ApplicationFormReport', component: ApplicationFormReportComponent },
    { path: 'ApplicationFormReport/:id', component: ApplicationFormReportComponent },
    {path:'BondPreview',component:BondPreviewComponent},
    { path: 'BondPreview/:id', component: BondPreviewComponent },
    {path:'Challanapaymentreport',component:ChallanaPaymentReportComponent},
    {path:'Challanapaymentreport/:id',component:ChallanaPaymentReportComponent},
    {path:'Maturitytrenddetails',component:MaturityTrendDetailsComponent},
    {path:'Maturitytrenddetails/:id',component:MaturityTrendDetailsComponent},
    {path:'Interestpaymentrenddetails',component:InterestpaymentTrenddetailsReportComponent},
    {path:'Interestpaymentrenddetails/:id',component:InterestpaymentTrenddetailsReportComponent},
    { path: 'LienEntryPreview', component: LienEntryPreviewComponent },
    { path: 'LienEntryPreview/:id', component: LienEntryPreviewComponent },
    
    { path: 'MaturityIntimationPreview', component: MaturityIntimationPreviewComponent },
    { path: 'MaturityIntimationPreview', component: MaturityIntimationPreviewComponent },
    { path: 'MemberEnquirydetails', component: MemberEnquiryDetailsComponent },
    { path: 'MemberEnquirydetails/:id', component: MemberEnquiryDetailsComponent },
    { path: 'MaturityIntimationPreview/:id', component: MaturityIntimationPreviewComponent },
    { path: 'RdInstallmentsChart', component: RdInstallmentsChartComponent },

    { path: 'RdInstallmentsChart/:id', component: RdInstallmentsChartComponent },
    

];

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        NavigationComponent,
        ContactComponent,
        LoansCreationComponent,
        ChargesMasterComponent,
        DocumentsComponent,
        ContactIndividualComponent,
        ContactBusinessComponent,
        LoansComponent,
        LoansnamecodeComponent,
        LoansinstallmentduedateComponent,
        LoansconfigurationComponent,
        LoanspenalinterestComponent,
        LoansidentificationdocumentsComponent,
        LoansreferralcommissionComponent,
        ContactViewComponent,
        PhotouploadComponent,
        NumbersonlyDirective,NumbersWithZeroDirective,
        UserLoginComponent,
        AddressformatDirective,
        CharactersonlyDirective,
        UppercaseDirective,
        EmailpatternDirective,
        EmailFormatDirective,
        EnterpriseNameFormatDirective,
        ThreeDigitDecimaNumberDirective,
        TwoDigitDecimaNumberDirective,
        ThreeDigitNumberDirective,
        NumberRangeDirective,
        MycurrencyFormatterDirective,
        UppercaseDirective,
        NewlineDirective,
        TitlecasewordDirective,
        SchemeMasterComponent,
        AddMenuComponent,
        UserRightsComponent,
        ChargeconfigurationViewComponent,
        ChargeconfigurationMasterComponent,
        PreclosureMasterComponent,
        PreclosureViewComponent,
        SchemeViewComponent,
        InitCapDirective,
        FiViewComponent,
        FiMasterComponent,
        FiContacttypeComponent,
        FiLoandetailsComponent,
        FiApplicantsandothersComponent,
        FiKycandidentificationComponent,
        FiPersonaldetailsComponent,
        FiSecurityandcollateralComponent,
        FiExistingloansComponent,
        FiReferencesComponent,
        FiReferralComponent,
        BusinessloanComponent,
        ConsumerloanComponent,
        EducationloanComponent,
        GoldloanComponent,
        HomeloanComponent,
        LoanagainstdepositsloanComponent,
        LoanagainstpropertyloanComponent,
        PersonalLoanComponent,
        VehicleLoanComponent,
        ReferralAgentViewComponent,
        ReferralAgentMasterComponent,
        AdvocateLawyerMasterComponent,
        AdvocateLawyerViewComponent,
        EmployeeViewComponent,
        EmployeeMasterComponent,

        MycurrencypipePipe,
        IfsccodevalidatorDirective,
        FiLoanspecficComponent,
        AutoFocusDirective,
        TrialBalanceComponent,

        // ReferralAgentContactComponent,

        // ReferralAgentKycdocumentsComponent,

        // ReferralAgentBankdetailsComponent,

        // ReferralAgentTdsdetailsComponent,

        // AdvocateLawyerTdsdetailsComponent,

        // AdvocateLawyerBankdetailsComponent,

        // AdvocateLawyerKycdocumentsComponent,

        // AdvocateSelectComponent,

        KYCDocumentsComponent,

        BankdetailsComponent,

        TDSDetailsComponent,


        RoundecimalDirective,

        PartyViewComponent,

        PartyMasterComponent,

        // PartyBankdetailsComponent,

        // PartyKycdocumentsComponent,

        // PartySelectComponent,

        // PartyTdsdetailsComponent,

        GroupViewComponent,

        GroupCreationComponent,

        ContactSelectComponent,



        FiPersonaldetailsEmploymentComponent,

        FiPersonaldetailsBusinessComponent,

        FiPersonaldetailsFinancialperformanceComponent,



        FiPersonaldetailsFamilyComponent,

        FiPersonaldetailsNomineeComponent,



        FiPersonaldetailsIncomeComponent,

        FiPersonaldetailsOtherincomeComponent,

        FiPersonaldetailsEducationComponent,

        PersonalDetailsComponent,

        FamilyDetailsComponent,

        EmployeeDetailsComponent,

        ValidationMessageComponent,

        AddressComponent,

        ButtonDoubleClickDirective,

        AlphaNumericDirective,
        AlphanumericcharsonlyDirective,
        appAlphanumericwithSpecialCharactersDirective,

        TimeMaskDirective,
        PropertyDetailsComponent,
        MovablePropertyDetailsComponent,
        VerificationNewComponent,
        VerificationViewComponent,
        AprovalViewComponent,
        AprovalNewComponent,
        DisbursementNewComponent,
        DisbursementViewComponent,
        DeliveryorderNewComponent,
        AcknowledgementsNewComponent,
        TeleVrificationComponent,
        AddressVerificationComponent,
        DocumentVerificationComponent,
        ChequemanagementViewComponent, ChequemanagementMasterComponent, AccountsMasterComponent, AccountsViewComponent, BankViewComponent, BankMasterComponent, GeneralreceiptViewComponent, GeneralreceiptNewComponent, PaymentvoucherViewComponent, PaymentvoucherNewComponent, JournalvoucherNewComponent, JournalvoucherViewComponent, ChequesonhandNewComponent, ChequesissuedNewComponent, ChequesinbankNewComponent, SanctionLetterComponent, DisburementLetterComponent, LoanreceiptViewComponent, LoanreceiptNewComponent,
        GeneralReceiptReportsComponent, PaymentVoucherReportsComponent, NumberToWordsPipe, AddMenuComponent, UserRightsComponent, UsersviewComponent, UsersregistrationComponent, CashBookComponent, BankBookComponent,
        LoginComponent,



        UserLoginComponent,



        AccountLedgerComponent, DayBookComponent, PartyLedgerComponent, CollectionsReportComponent, ContactListComponent, ContactListDetailViewComponent, BankReconStatmentComponent, BalanceSheetComponent, ProfitAndLossComponent, ComparisionTrialBalanceComponent, AccountSummaryDetailsComponent, RePrintComponent, JournalVoucherReportComponent, CompanyDetailsComponent, TrialbalanceLedgersummeryComponent, TrialbalanceAccountledgerComponent, EmichartReportComponent, DueReportsComponent, DisbursmentReportComponent, RemoveZeroDirective, ZeroDirective, LoanStatementComponent, EmichartViewComponent, DuereportsEmiComponent, GenerateidMasterComponent, ChequeEnquiryComponent, JvListComponent, LedgerExtractComponent, ChequeCancelComponent, ChequeReturnComponent, CompanyConfigComponent, BranchConfigComponent, CompanyconfigDocumentsComponent, CompanyconfigPromotorsComponent,

        TrendreportsComponent, TrendDisbursementReportComponent, TrendCollectionReportComponent, MembertypeViewComponent, MembertypeNewComponent, MemberNewComponent, MemberViewComponent, IssuedChequeComponent, SubaccountLedgerComponent, CompanydocumentsComponent
        , TrendDisbursementReportComponent, TrendCollectionReportComponent, MembertypeViewComponent, MembertypeNewComponent, MemberNewComponent, MemberViewComponent, IssuedChequeComponent, SubaccountLedgerComponent, CollectionReportsDetailSectionComponent,


       
        FdconfigNewComponent, FdConfigViewComponent, RdconfigNewComponent, RdconfigViewComponent, CompanynameCompanycodeComponent, SavingsConfigViewComponent, SavingsConfigNewComponent, SharesConfigViewComponent, SharesConfigNewComponent, SubledgerSummaryComponent, ShareCapitalComponent, ShareReferralCommissionComponent, SavingsNameCodeComponent, SavingsConfigurationComponent, LoanFacilityComponent, ReferralCommissionComponent, IdentificationDocumentsComponent, DecimalwithcurrencyformatDirective, ProfitandLossMTDYTDComponent, LoanpreclosureViewComponent, LoanpreclosureNewComponent, RdnameandcodeComponent, RdconfigurationComponent, RdloanandfacilityComponent, RdidentificationComponent, RdrefferalcommisionComponent, CurrencypipewithdecimalPipe, InsuranceMemberViewComponent, InsuranceMemberNewComponent, InsuranceConfigViewComponent, InsuranceConfigNewComponent, FdnameandcodeComponent, FdconfigurationComponent, FdloanandfacilityComponent, FdidentificationComponent, FdrefferalcommisionComponent, SavingsTransactionsViewComponent, SavingsTransactionsNewComponent, ShareApplicationComponent, LoanStatementReportComponent, ContactListPartyComponent, FdTransactionViewComponent, FdTransactionNewComponent, RdTransactionNewComponent, RdTransactionViewComponent
        ,ShareAppViewComponent, JointmemberNomineeComponent, ReferralComponent,
         LienEntryComponent,LienEntryViewComponent,PromoteSalaryReportComponent,
    FdReferralComponent, FdJointmemberComponent, RdRecurringdepositComponent, RdJointmemberComponent, RdReferralComponent, NegativevaluePipe, SelfOrAdjustmentViewComponent, SelfOrAdjustmentNewComponent, LienReleaseNewComponent, LienReleaseViewComponent, NomineedetailsComponent, FdreceiptViewComponent, FdreceiptNewComponent, InterestpaymentViewComponent, InterestpaymentNewComponent, MaturityPaymentnewComponent, CommissionPayementNewComponent, CommissionPayementViewComponent, MaturityBondnewComponent, MaturityPaymentRenewalComponent, TransferNewComponent, BondPreviewNewComponent, BondPreviewComponent, MaturityBondViewComponent, InterestPaymentReportComponent, InterestpaymentpreviewComponent, MaturityPaymentViewComponent, PromoteSalaryReportComponent, MaturityIntimationReportComponent, LienReleaseReportComponent, SelfAdjustmentReportComponent, PreMaturityReportComponent, FdTranscationDetailsComponent, MemberEnquiryComponent, MemberenquiryreceiptsComponent, TrendReportComponent, InterestPaymentTrendReportComponent, MemberWiseReceiptsReportComponent, LienEntryPreviewComponent, MaturityIntimationPreviewComponent, AgentPointsReportComponent, TargetReportComponent, CashFlowReportComponent, ContactNewComponent, ContactNewIndividualComponent, ContactNewBusinessComponent, ContactNewPhotouploadComponent, SelectsubscriberComponent, BankdetailsnewComponent, KycdocumentsnewComponent,AccountTreeComponent, ContactNewViewComponent, ContactNewDetailedNewComponent, ContactMoreComponent, EmployeeDetailsNewComponent, InterestReportComponent, TdsReportComponent, ChallanaCheckingComponent, ChallanaPaymentComponent, CINEntryComponent, CINEntryReportComponent, ChallanaPaymentReportComponent, MaturityTrendDetailsComponent,
    MemberEnquiryDetailsComponent,
    InterestpaymentTrenddetailsReportComponent,
    ApplicationFormComponent,
    ApplicationFormReportComponent,
    RdreceiptNewComponent,
    SAReceiptComponent,
    MemberReceiptComponent,MemberReceiptViewComponent, RdNomineedetailsComponent,SpJointmemberComponent,SpReferralComponent,  CoReferralComponent, CoJointmemberComponent, CoNomineedetailsComponent,SavingReceiptViewComponent, ShareReceiptComponent,ShareReceiptViewComponent, RdInstallmentsChartComponent
 ,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        ExportAsModule,
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        Ng4LoadingSpinnerModule.forRoot(),
        HttpClientModule,
        AmazingTimePickerModule,
        ReactiveFormsModule,
        ImageCropperModule,
        BrowserAnimationsModule,NgxDatatableModule,
        GridModule,
      NgSelectModule,
      NgOptionHighlightModule,
        ExcelModule,
        PDFModule,
        FilterPipeModule,
       TreeViewModule,
      ContextMenuModule.forRoot({
        useBootstrap4: true,
      }),
        NgxLoadingModule.forRoot({}),
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot({
            // timeOut: 1000,
            positionClass: 'toast-top-right',
            closeButton: true,
            preventDuplicates: true
        }),


        RouterModule.forRoot(appRoutes, { useHash: true, scrollPositionRestoration: 'enabled' }),


        PDFExportModule,

    ],
    providers: [
        { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
        { provide: LOCALE_ID, useValue: "en-IN" },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CookieService, DatePipe, TitleCasePipe, NegativevaluePipe],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

import { Directive, Output, Renderer2, EventEmitter, ElementRef, HostListener,HostBinding, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { CookieService } from 'ngx-cookie-service';

@Directive({
  selector: '[appNumbersWithZeroOnly]'
})
export class NumbersWithZeroDirective {
 data: any;
    constructor(private _el: ElementRef, private commonService: CommonService,
    private cookieservice: CookieService, private render: Renderer2, private elRef: ElementRef) { }

  @HostListener('input') Input() {
debugger;
   const initalValue = this._el.nativeElement.value;
   if(initalValue!=0){
    this._el.nativeElement.value = initalValue.toString().replace(/,/g, "").replace(/^0+/, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
   }
    let d = this.elRef.nativeElement.value;
    let s = d.split(',');
    let n = s.join('')
    d = n;
    if (d != '' && d!=0) {

      //  this.data = this.cookieservice.get("savedformat")
      this.data = "India"
      if (this.data == "India") {
        var result = d.toString().split('.');
        var lastThree = result[0].substring(result[0].length - 3);
        var otherNumbers = result[0].substring(0, result[0].length - 3);
        if (otherNumbers != '')
          lastThree = ',' + lastThree;
        var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        if (result.length > 1) {
          output += "." + result[1];
        }
        d = output;
        this.render.setProperty(this.elRef.nativeElement, 'value', d);
      }
      else {
        var result = d.toString().split('.');
        var lastThree = result[0].substring(result[0].length - 3);
        var otherNumbers = result[0].substring(0, result[0].length - 3);
        if (otherNumbers != '')
          lastThree = ',' + lastThree;
        var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
        if (result.length > 1) {
          output += "." + result[1];
        }
        d = output;
        this.render.setProperty(this.elRef.nativeElement, 'value', d);
      }

    }
    else{
        if(d==0){
              this.render.setProperty(this.elRef.nativeElement, 'value', d);
        }
    }
    }

}

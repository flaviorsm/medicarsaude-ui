import { Directive, Injector, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { valueToFormat, unmaskValue } from './mask';

@Directive({
  selector: '[rtsMask]',
})
export class MaskDirective implements OnInit {

  @Input() rtsMask!: string;

  private control!: NgControl;
  private lastMaskedValue = '';

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    this.control = this.injector.get(NgControl);

    if (!this.control || !this.control.valueAccessor) {
      return;
    }

    const originalWriteVal = this.control.valueAccessor.writeValue.bind(this.control.valueAccessor);
    this.control.valueAccessor.writeValue = (val: any) => originalWriteVal(this._maskValue(val));

    const originalChange = (this.control.valueAccessor as any).onChange.bind(this.control.valueAccessor);
    this.control.valueAccessor.registerOnChange((val: any) => originalChange(this._unmaskValue(val)));

    this.setVal(this._maskValue(this.control.value));
  }

  private _maskValue(val: string): string {
    if (!this.rtsMask || val === this.lastMaskedValue) {
      return val;
    }

    const maskedVal = this.lastMaskedValue =
      valueToFormat(
        val,
        this.rtsMask, this.lastMaskedValue.length > val.length,
        this.lastMaskedValue);

    return maskedVal;
  }

  private _unmaskValue(val: string): string {
    const maskedVal = this._maskValue(val);
    const unmaskedVal = unmaskValue(maskedVal);

    if (maskedVal !== val) {
      this.setVal(maskedVal);
    }

    return maskedVal ? unmaskedVal : '';
  }

  private setVal(val: string): void {
    if (this.control.control) {
      this.control.control.setValue(val, { emitEvent: false });
    }
  }
}

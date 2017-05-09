import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberField]'
})
export class NumberFieldDirective {
  private _regex: RegExp = new RegExp(/^[0-9]*$/g);
  private _specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(e.key);

    // Allow backspace, tab, end, and home keys
    if (this._specialKeys.indexOf(e.key) !== -1) {
      return;
    }
    if (next && !String(next).match(this._regex)) {
      e.preventDefault();
    }
  }

}

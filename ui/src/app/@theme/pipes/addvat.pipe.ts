import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addVat',
})
export class AddVatPipe extends CurrencyPipe implements PipeTransform {
  transform(
    value: any, currencyCode?: string,
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol', digitsInfo?: string,
    locale?: string): string | null {
    let valueWithVat = value * 1.15;
    return super.transform(valueWithVat, currencyCode, display, digitsInfo, locale);
  }
}


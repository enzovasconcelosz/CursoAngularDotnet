import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/constants';

@Pipe({
  name: 'DateFormatPipe',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof value === 'string' && value.includes('/') && value.includes(':')) {
      const [datePart, timePart] = value.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes, seconds] = timePart.split(':');

      const validDate = new Date(
        +year,
        +month - 1,
        +day,
        +hours,
        +minutes,
        +seconds
      );

      // 5. Agora sim, chama a formatação do pipe pai com a data válida
      return super.transform(validDate, Constants.DATE_TIME_FMT);
    }

    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loopForNumber'
})
export class LoopForNumberPipe implements PipeTransform {

  transform(value, selectedPage: number, totalPages: number, args: string[]): any {
    if (!selectedPage && !totalPages) {
      return this.getNumbers(0, value);
    }
    if (!totalPages || totalPages < 5) {
      return this.getNumbers(0, totalPages);
    }
    if (!selectedPage || selectedPage < 3) {
      selectedPage = 3;
    }

    const limit = (totalPages - selectedPage >= 2) ? (selectedPage + 2) : totalPages;
    const start = (totalPages - selectedPage <= 1) ? (totalPages - 5) : (selectedPage - 3);
    return this.getNumbers(start, limit);
  }

  private getNumbers(start: number, totalPages: number) {
    const numbers = [];
    for (start; start < totalPages; start++) {
      numbers.push(start + 1);
    }
    return numbers;
  }

}

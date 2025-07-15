// src/app/shared/pipes/truncate-words.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {
  transform(value: string, maxWords: number = 25, ellipsis: string = '...'): string {
    if (!value) return '';
    const words = value.split(/\s+/);
    if (words.length <= maxWords) {
      return value;
    }
    return words.slice(0, maxWords).join(' ') + ellipsis;
  }
}

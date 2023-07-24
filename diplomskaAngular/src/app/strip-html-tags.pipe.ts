import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stripHtmlTags' })
export class StripHtmlTagsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Handle the case when the input is null or undefined

    // Regular expression to remove HTML tags
    const regex = /<[^>]*>/g;
    return value.replace(regex, '');
  }
}

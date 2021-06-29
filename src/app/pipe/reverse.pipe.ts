import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../model/Movie';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Movie[]): Movie[] {
    return value.slice().reverse();
  }

}

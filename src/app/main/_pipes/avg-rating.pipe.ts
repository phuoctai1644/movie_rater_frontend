import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avgRating'
})
export class AvgRatingPipe implements PipeTransform {
  transform(rating: number, floatingPoint = 1):  string {
    return rating.toFixed(floatingPoint);
  }
}

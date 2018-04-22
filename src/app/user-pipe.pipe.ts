import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe',
  pure: false
})
export class UserPipePipe implements PipeTransform {

  transform(items: any[], filter: any): any {
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.sender.indexOf(filter.sender) !== -1);
  }

}

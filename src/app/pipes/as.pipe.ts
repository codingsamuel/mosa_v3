import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'as',
    standalone: true,
})
export class AsPipe implements PipeTransform {

    public transform<T, T1>(value: T, _type: T1): T1 {
        return value as unknown as T1;
    }

}

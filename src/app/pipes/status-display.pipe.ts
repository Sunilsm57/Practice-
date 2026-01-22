import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusDisplay',
    standalone: true
})
export class StatusDisplayPipe implements PipeTransform {
    transform(completed: boolean): string {
        return completed ? 'Closed' : 'Active';
    }
}

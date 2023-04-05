import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agendamentos'
})
export class AgendamentosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

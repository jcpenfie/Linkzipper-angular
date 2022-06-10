import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcion'
})
export class DescripcionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let logintud:any = args[0]    
    if (logintud.length > 1){
      return '"'+value+'"'
    }else{
      return "\u00a0"
    }
  }

}

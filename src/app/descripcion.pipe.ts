import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcion'
})
export class DescripcionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(args[0]);

    let logintud:any = args[0]
    
    if (logintud > 1){
      return '"'+value+'"'
    }else{
      return value
    }
  }

}

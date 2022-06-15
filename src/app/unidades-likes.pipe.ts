import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidadesLikes'
})
export class UnidadesLikesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let likes:any = args[0]
    
    if (likes > 1000000){
      let count = Math.floor(likes/1000000)
      return `${count}mill.`
    }else if(likes > 1000){
      let count = Math.floor(likes/1000)
      return `${count}k`
    }else{
      return likes
    }
  }

}

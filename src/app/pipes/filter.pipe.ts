import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
   if (arg === '' || arg.length < 3) return value;
   const resultPosts = [];
   for (const usuario of value) {
     if (usuario.negocio.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
       resultPosts.push(usuario);
       // console.log('siiii')
     };
   };
   return resultPosts;
 }

}

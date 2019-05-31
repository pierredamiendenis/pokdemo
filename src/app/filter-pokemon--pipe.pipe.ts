import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'filterPokemonPipe'
})

export class FilterPokemonPipePipe implements PipeTransform {
  transform(pokemons: Pokemon[], searchText: string): any[] {
    if(!pokemons) return [];
    if(!searchText) return pokemons;
    console.log(searchText)
searchText = searchText.toLowerCase();
return pokemons.filter( it => {
      return it.name.toLowerCase().substring(0,searchText.length)==searchText;
    });
   }
}


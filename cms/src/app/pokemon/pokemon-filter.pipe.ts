import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { filter } from 'rxjs';

@Pipe({
  name: 'pokemonFilter'
})
export class PokemonFilterPipe implements PipeTransform {


  transform(pokemon: Pokemon[], term: string): Pokemon[] {
    let filterArray: Pokemon[] = [];


    if (term && term.length > 0) {
      filterArray = pokemon.filter(
        (pokemon: Pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase())
      )

    }

    if (filterArray.length < 1) {
      return pokemon;
    }
    return filterArray;
  }

}
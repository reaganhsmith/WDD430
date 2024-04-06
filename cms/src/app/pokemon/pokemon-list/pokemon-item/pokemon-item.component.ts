import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Pokemon } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.css'
})
export class PokemonItemComponent{
  @Input() pokemon: Pokemon;
  @Output() pokemonSelected = new EventEmitter<void>();
  @Input() index: Number;


  onSelected(){
    this.pokemonSelected.emit();
  }
}

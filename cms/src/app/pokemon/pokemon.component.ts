import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  selectedPokemon: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.pokemonSelectedEvent
      .subscribe(
        (pokemon: Pokemon) => {
          this.selectedPokemon = pokemon;
        }
      );
  }
}

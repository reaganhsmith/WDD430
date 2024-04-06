import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { PokemonFilterPipe } from '../pokemon-filter.pipe';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit{
  pokemon: Pokemon[];
  subscription: Subscription;
  term: string;


  constructor(private pokemonService: PokemonService){
  }

  ngOnInit() {
    this.pokemon = this.pokemonService.getAllPokemon();

    this.subscription = this.pokemonService.pokemonListChangedEvent
    .subscribe((pokemonList: Pokemon[]) => {
      this.pokemon = pokemonList
    })
  }

 

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  search(value: string){
    this.term = value;
  }

  
}
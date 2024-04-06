import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent implements OnInit{
  pokemon: Pokemon;
  id: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService){
  }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          
          this.pokemon = this.pokemonService.getPokemon(this.id); 
        }
      );
  }

  onDelete(){
    this.pokemonService.deletePokemon(this.pokemon);
    this.router.navigate(['/pokemon']);
  }




} 
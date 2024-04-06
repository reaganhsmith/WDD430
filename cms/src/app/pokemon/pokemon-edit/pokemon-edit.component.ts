import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { NgForm } from '@angular/forms';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrl: './pokemon-edit.component.css'
})
export class PokemonEditComponent implements OnInit{
  originalPokemon: Pokemon;
  pokemon: Pokemon;
  editMode: boolean = false;
  id: string;
  


  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  
  ngOnInit(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return
      }
      this.originalPokemon = this.pokemonService.getPokemon(id);
      if (!this.originalPokemon) {
        return
      }
      this.editMode = true;
      this.pokemon = JSON.parse(JSON.stringify(this.originalPokemon));

    })



  }


  onCancel() {
    this.router.navigate(['/pokemon']);

  }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }

    const values = form.value;
    const newPokemon = new Pokemon(
      values.id,
      values.name,
      values.type,
      values.color,
      values.img,
      values.name,
      values.type,
      values.color,
    );
      if(this.editMode){
        this.pokemonService.updatePokemon(this.originalPokemon, newPokemon)
      }else{
        this.pokemonService.addPokemon(newPokemon)

      }

      this.router.navigate(['/pokemon']);
  }

  isInvalidPokemon(newPokemon: Pokemon){
    if(!newPokemon){
      return true;
    }

    if(this.pokemon && newPokemon.id === this.pokemon.id){
      return true;
    }

  }


}

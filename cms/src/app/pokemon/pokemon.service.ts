import { EventEmitter, Injectable, Output } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  @Output() pokemonSelectedEvent = new EventEmitter<Pokemon>();
  @Output() pokemonChangedEvent = new EventEmitter<Pokemon[]>();
  pokemonListChangedEvent = new Subject<Pokemon[]>();
  pokemonUrl = "http://localhost:3000/pokemon";

  pokemon: Pokemon[] = [];
  maxPokemonId: number;
  pokemonListClone!: Pokemon[];

  constructor(private httpClient: HttpClient) {
    this.maxPokemonId = this.getMaxId();
  }

  getAllPokemon(): Pokemon[] {
     this.httpClient
      .get<Pokemon[]>(this.pokemonUrl)
      .subscribe((pokemon: Pokemon[]) => {
        this.pokemon = pokemon;
        this.maxPokemonId = this.getMaxId();
        this.sortByName();
        this.pokemonListChangedEvent.next(this.pokemon.slice())
      });

      return this.pokemon.slice();
  }

  private sortByName() {
    this.pokemon.sort((a, b) => a.name.localeCompare(b.name));
  }

  storePokemon() {
    this.httpClient
      .put(this.pokemonUrl, JSON.stringify(this.pokemon), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortByName;
        this.pokemonListChangedEvent.next(this.pokemon.slice());
      });
  }

  getPokemon(id: string){
    return this.pokemon[+id];
  }

  getMaxId(): number {
    let maxId = 0;
    for (let pokemon of this.pokemon) {
      let currentId = maxId;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addPokemon(newPokemon: Pokemon) {
    if (!newPokemon) return;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string, pokemon: Pokemon }>(
        this.pokemonUrl,
        newPokemon,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.pokemon.push(res.pokemon);
            this.sortByName;
            const sortedPokemon = this.pokemon.slice();
            this.pokemonListChangedEvent.next(sortedPokemon);
          }
        });
  }

  updatePokemon(originalPokemon: Pokemon, newPokemon: Pokemon) {
    if (!originalPokemon || !newPokemon) {
      return;
    }

    const pos = this.pokemon.findIndex(d => d.id === originalPokemon.id);

    if (pos < 0) {
      return;
    }

    newPokemon.id = originalPokemon.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient.put(`${this.pokemonUrl}/${newPokemon.id}`,
      newPokemon, { headers: headers })
      .subscribe(
        () => {
          this.pokemon[pos] = newPokemon;
          this.sortByName;
          const sortedPokemon = this.pokemon.slice();
          this.pokemonListChangedEvent.next(sortedPokemon);
        }
      );
  }

  deletePokemon(pokemon: Pokemon) {
    if (!pokemon) {
      return;
    }
    const pos = this.pokemon.indexOf(pokemon);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete(`${this.pokemonUrl}/${pokemon.id}`)
      .subscribe(
        () => {
          this.pokemon.splice(pos, 1);
          this.sortByName;
          const sortedPokemon = this.pokemon.slice();
          this.pokemonListChangedEvent.next(sortedPokemon);
        }
      );
  }
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListPagiationnRes {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonType {
  name: string;
  url: string;
}
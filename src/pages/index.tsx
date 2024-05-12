import React from "react";
import { PokemonListPagiationnRes, PokemonType } from "@/interfaces";
import { PokemonItem } from "@/common/pokemon-item";
import { fetchData } from "@/uitls";
import { useRouter } from "next/router";
import { PokemonTypeItem } from "@/common/pokemon-type";

const DEFAULT_ITEM_PER_PAGE = 100;
async function fetchPokemon(
  skip: number,
  take: number = DEFAULT_ITEM_PER_PAGE
): Promise<PokemonListPagiationnRes> {
  return await fetchData(
    `https://pokeapi.co/api/v2/pokemon?offset=${skip}&limit=${take}`
  );
}

export async function getServerSideProps(ctx: any) {
  const currentPage = ctx.query?.page ? +ctx.query.page : 0;
  const pokemonsPaginationData = await fetchPokemon(
    currentPage * DEFAULT_ITEM_PER_PAGE
  );
  const pokemonTypeResult = await fetchData("https://pokeapi.co/api/v2/type/");
  return {
    props: { pokemonsPaginationData, currentPage, pokemonTypes: pokemonTypeResult.results },
  };
}

export default function Home({
  pokemonsPaginationData,
  currentPage,
  pokemonTypes,
}: {
  pokemonsPaginationData: PokemonListPagiationnRes;
  currentPage: number;
  pokemonTypes: PokemonType[];
}) {
  const router = useRouter();
  const lastPageNumber = Math.floor(
    pokemonsPaginationData?.count / DEFAULT_ITEM_PER_PAGE
  );

  const moveToPage = (pageNumber: number) => {
    router.push(`/?page=${pageNumber}`);
  };

  const moveToNextPage = () => {
    const nextPage =
      currentPage === lastPageNumber ? currentPage : currentPage + 1;
    moveToPage(nextPage);
  };

  const moveToPrePage = () => {
    const prePage = currentPage <= 0 ? 0 : currentPage - 1;
    moveToPage(prePage);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <span>Types:</span>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {(pokemonTypes || []).map((pt) => (
            <PokemonTypeItem key={pt.name} pokemonType={pt} isSelected={false} />
          ))}
        </div>
      </div>
      <div>
        <h3>{pokemonsPaginationData?.count || 0} results found</h3>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {(pokemonsPaginationData?.results || []).map((p) => (
          <PokemonItem key={p.url} url={p.url} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <button disabled={currentPage === 0} onClick={moveToPrePage}>
          Previous
        </button>
        <button
          disabled={currentPage === lastPageNumber}
          onClick={moveToNextPage}
        >
          Next
        </button>
      </div>
    </main>
  );
}

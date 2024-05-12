import { Pokemon } from "@/interfaces";
import { useEffect, useState } from "react";
import { fetchData } from "@/uitls";

export const PokemonItem = ({ url }: { url: string }) => {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon>();

  useEffect(() => {
    fetchData(url).then(({ name = "", sprites = {} }) =>
      setPokemonDetail({
        name,
        url:
          sprites?.other?.["official-artwork"]?.front_default ||
          sprites?.front_default,
      })
    );
  }, [url]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "150px",
        alignItems: "center",
      }}
    >
      <img width={100} height={100} src={pokemonDetail?.url}></img>
      <span>{pokemonDetail?.name}</span>
    </div>
  );
};

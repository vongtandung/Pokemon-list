import { PokemonType } from "@/interfaces";

export const PokemonTypeItem = ({
  pokemonType,
  isSelected,
}: {
  pokemonType: PokemonType;
  isSelected: boolean;
}) => {
  return (
    <div
      style={{
        minWidth: "30px",
        height: "50px",
        border: "solid 1px red",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        padding: "8px",
        cursor: "pointer",
        backgroundColor: isSelected ? "red" : "white",
      }}
    >
      <span style={{ color: isSelected ? "white" : "red", textDecoration: 'bold' }}>
        {pokemonType?.name}
      </span>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@material-ui/core";
import { Button } from "@mui/material";

import CardsComponent from "../Card/CardsComponent.tsx";

const styles = {
  homepage: {
    margin: 20,
  },
  button: {
    textAlign: "center",
  },
};

const HomePage = ({ onAdd, classes }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);
  console.log("allPokemons", allPokemons);

  const handleRemove = (rdata) => {
    setAllPokemons(allPokemons.filter((i) => i.id !== rdata.id));
  };

  return (
    <div className={classes.homepage}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {allPokemons.map((pokemon, index) => (
          <Grid>
            <CardsComponent
              data={pokemon}
              onAdd={onAdd}
              onRemove={handleRemove}
            />
          </Grid>
        ))}
      </Grid>
      <div>
        <div className={classes.button}>
          {
            <Button
              size="small"
              onClick={() => getAllPokemons()}
              color="primary"
            >
              LoadMore
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(HomePage);

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@material-ui/core";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

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
  const [open, setOpen] = React.useState(false);
  const [popupData, setPopupData] = React.useState();
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

  const handleRemove = (e, rdata) => {
    setAllPokemons(allPokemons.filter((i) => i.id !== rdata.id));
    e.stopPropagation();
  };

  const showMoreInfo = (data) => {
    setPopupData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.homepage}>
      {popupData && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>More Details for {popupData.name}</DialogTitle>
          <DialogContent>
            <div>name: {popupData.name}</div>
            <div>type: {popupData.type}</div>
            <div>Similar with type:</div>
            <ul>
              {allPokemons
                .filter((p) => p.types[0].type.name === popupData.type)
                .map((pok) => (
                  <li>{pok.name}</li>
                ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

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
              showMoreInfo={showMoreInfo}
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

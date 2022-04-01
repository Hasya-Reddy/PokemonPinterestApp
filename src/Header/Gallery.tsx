import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@material-ui/core";

import CardsComponent from "../Card/CardsComponent.tsx";

const styles = {
  gallery: {
    margin: 20,
  },
};

const Gallery = ({ classes }) => {
  return (
    <div className={classes.gallery}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {(JSON.parse(localStorage.getItem("data")) || []).map((pokemon, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CardsComponent data={pokemon} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Gallery);

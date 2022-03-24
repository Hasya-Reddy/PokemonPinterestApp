import React from "react";
import { Button } from "@mui/material";
import { withStyles } from "@material-ui/core";

const styles = {
  img: {
    height: 150,
    width: 200,
  },
  card: {
    border: "1px solid",
    height: 300,
    width: 250,
  },
  container: {
    margin: 100,
  },
};

const Card = ({ image, name, type, onAdd, onRemove, data, classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <img className={classes.img} src={image} alt={name}></img>
        {name}
        <div>{type}</div>

        {onAdd && (
          <Button size="small" onClick={() => onAdd(data)} color="primary">
            Add
          </Button>
        )}
        {onRemove && (
          <Button size="small" onClick={() => onRemove(data)} color="primary">
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(Card);

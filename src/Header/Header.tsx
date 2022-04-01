import React from "react";
import { withStyles } from "@material-ui/core";

import Gallery from "./Gallery.tsx";
import HomePage from "./HomePage.tsx";
import Route from "./Route.tsx";
import Link from "./Link.tsx";

const styles = {
  link: {
    marginLeft: 10,
  },
  title: {
    textAlign: "center",
  },
};

const Header = ({ classes }) => {
  const [gallery, setGallery] = React.useState([]);
  return (
    <div>
      <div className={classes.title}>
        <h1>PokeMon-Pinterest-App</h1>
      </div>
      <Link href="/home" className="item">
        HomePage
      </Link>
      <Link href="/gallery" className={classes.link}>
        Gallery
      </Link>

      <Route path="/home">
        <HomePage
          onAdd={(e, d) => {
            const prevData = JSON.parse(localStorage.getItem("data")) || [];
            localStorage.setItem("data", JSON.stringify([...prevData, d]));
            e.stopPropagation();
          }}
        />
      </Route>

      <Route path="/gallery">
        <Gallery list={gallery} />
      </Route>
    </div>
  );
};

export default withStyles(styles)(Header);

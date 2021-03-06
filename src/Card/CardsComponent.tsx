import React from "react";
import Card from "./Card.tsx";

const CardsComponent = ({ data, onAdd, onRemove, showMoreInfo }) => {
  return (
    <div>
      {data && (
        <>
          <Card
            image={data.sprites.other.dream_world.front_default}
            name={data.name}
            type={data.types[0].type.name}
            data={data}
            onAdd={onAdd}
            showMoreInfo={showMoreInfo}
            onRemove={onRemove}
          ></Card>
        </>
      )}
    </div>
  );
};

export default CardsComponent;

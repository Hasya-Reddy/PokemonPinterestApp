import React from "react";
import Card from "./Card.tsx";

const CardsComponent = ({ data, onAdd, onRemove }) => {
  return (
    <div>
      {data && (
        <>
          <Card
            image={data.sprites.front_default}
            name={data.name}
            type={data.types[0].type.name}
            data={data}
            onAdd={onAdd}
            onRemove={onRemove}
          ></Card>
        </>
      )}
    </div>
  );
};

export default CardsComponent;

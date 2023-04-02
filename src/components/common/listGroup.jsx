import React from "react";

const ListGroup = ({ genres, selectedItem, textProperty, valueProperty, onItemSelect }) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          style={{ cursor: "pointer" }}
          className={genre === selectedItem ? "list-group-item active" : "list-group-item"}
          onClick={() => onItemSelect(genre)}
          key={genre[valueProperty]}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;

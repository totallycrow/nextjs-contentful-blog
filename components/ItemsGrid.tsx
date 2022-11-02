import React from "react";
import { ItemCard } from "./ItemCard";

export const ItemsGrid = ({ data }: any) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item: any) => {
        return <ItemCard data={item} key={Date.now()} />;
      })}
    </div>
  );
};

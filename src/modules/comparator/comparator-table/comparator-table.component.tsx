import React from "react";
import { Rate } from "../comparator.utils";
import { ComparatorItem } from "./comparator-item.component";
import "./comparator-table.styles.css";

type ComparatorTableProps = {
  data: {
    [exchange: string]: Rate[];
  };
};

// Crypto Comparator table component
export function ComparatorTable({ data }: ComparatorTableProps) {
  return (
    <div className="comparator-table">
      {Object.keys(data).map((exchange: string) => (
        <ComparatorItem
          key={exchange}
          exchange={exchange}
          prices={data[exchange]}
        />
      ))}
    </div>
  );
}

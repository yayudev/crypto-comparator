import React from "react";
import { Rate } from "../comparator.utils";
import { ComparatorItem } from "./comparator-item.component";
import { LoadingSpinner } from "../../shared/components";
import "./comparator-table.styles.css";

type ComparatorTableProps = {
  data: {
    [exchange: string]: Rate[];
  };
};

export function ComparatorTable({ data }: ComparatorTableProps) {
  const hasData = Object.keys(data).length > 0;

  if (!hasData) {
    return <LoadingSpinner />;
  }

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

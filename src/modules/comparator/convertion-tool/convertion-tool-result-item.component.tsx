import React from "react";
import { getExchangeName } from "../comparator.utils";
import "./convertion-tool-result-item.styles.css";

type ConvertionToolResultItemProps = {
  exchange: string;
  currentRate: number;
  amount: number;
  selectedCoin: string;
};

export function ConvertionToolResultItem({
  exchange,
  currentRate,
  amount,
  selectedCoin,
}: ConvertionToolResultItemProps) {
  const convertedAmount = amount === 0 ? 0 : (amount / currentRate).toFixed(8);

  return (
    <div className="convertion-tool-result-item">
      <div className="convertion-tool-result-item-price">
        <span>
          {convertedAmount} {selectedCoin}
        </span>
      </div>

      <div className="convertion-tool-result-item-exchange">
        {getExchangeName(exchange)}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Rate } from "../comparator.utils";
import { ConvertionToolResultItem } from "./convertion-tool-result-item.component";
import "./convertion-tool.styles.css";

type ConvertionToolProps = {
  data: {
    [exchange: string]: Rate[];
  };
  selectedCoin: string;
};

export function ConvertionTool({ data, selectedCoin }: ConvertionToolProps) {
  const [amount, setAmount] = useState<number | null>();

  return (
    <div className="convertion-tool">
      <div className="convertion-tool-input-container">
        <h3 className="convertion-tool-title">MXN→{selectedCoin} converter</h3>

        <label
          htmlFor="convertion-tool-input"
          className="convertion-tool-input-label"
        >
          <span>Amount</span>
        </label>

        <input
          id="convertion-tool-input"
          className="convertion-tool-input"
          type="number"
          placeholder="Amount in MXN"
          min={0}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
          }}
        />
      </div>

      <div className="convertion-tool-results">
        {Object.keys(data).map((exchange: string) => (
          <ConvertionToolResultItem
            key={exchange}
            exchange={exchange}
            currentRate={data[exchange][0].price}
            amount={amount || 0}
            selectedCoin={selectedCoin}
          />
        ))}
      </div>
    </div>
  );
}

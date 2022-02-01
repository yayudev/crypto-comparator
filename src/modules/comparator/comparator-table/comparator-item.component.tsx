import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { getExchangeName, Rate } from "../comparator.utils";
import "./comparator-item.styles.css";

type ComparatorItemProps = {
  exchange: string;
  prices: Rate[];
};

export function ComparatorItem({ exchange, prices }: ComparatorItemProps) {
  const [currentPrice, ...pastPrices] = prices;

  const isUp = pastPrices[0] && currentPrice.price > pastPrices[0].price;
  const isDown = pastPrices[0] && currentPrice.price < pastPrices[0].price;
  const priceClass = isUp ? "up" : isDown ? "down" : "equal";

  return (
    <div className="comparator-item">
      <div className={`comparator-item-current ${priceClass}`}>
        <span>${currentPrice?.price?.toFixed(2)}</span>
      </div>
      <div className="comparator-item-exchange">
        {getExchangeName(exchange)}
      </div>

      {pastPrices.map(({ price, date }, index) => (
        <div key={date.toISOString()} className="comparator-item-price">
          <span >
            <strong>${price?.toFixed(2)}</strong>
          </span>
          <span>{formatDistanceToNowStrict(date, { addSuffix: true })}</span>
        </div>
      ))}
    </div>
  );
}

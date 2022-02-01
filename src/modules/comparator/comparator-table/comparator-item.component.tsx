import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ResponsiveLine } from "@nivo/line";
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

  const data = prices
    .map((item) => ({
      x: formatDistanceToNowStrict(new Date(item.date), {
        addSuffix: true,
      }),
      y: item.price,
    }))
    .reverse();

  const chartColor = isUp
    ? "rgb(68, 176, 124)"
    : isDown
    ? "rgb(236, 99, 99)"
    : "rgba(97, 96, 96)";

  return (
    <div className="comparator-item">
      <div className={`comparator-item-current ${priceClass}`}>
        <span>${currentPrice?.price?.toFixed(2)}</span>
      </div>
      <div className="comparator-item-exchange">
        {getExchangeName(exchange)}
      </div>

      {prices.map(({ price, date }, index) => (
        <div key={date.toISOString()} className="comparator-item-price">
          <span>
            <strong>${price?.toFixed(2)}</strong>
          </span>
          <span>
            {index === 0
              ? "Now"
              : formatDistanceToNowStrict(date, { addSuffix: true })}
          </span>
        </div>
      ))}

      {/* This is a workoaround due to a bug making the chart to grow endlessly
       * See https://github.com/plouc/nivo/issues/109
       */}
      <div
        style={{
          position: "relative",
          height: "8rem",
          width: "100%",
          marginTop: "auto",
        }}
      >
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <ResponsiveLine
            data={[
              {
                id: exchange,
                data,
              },
            ]}
            colors={[chartColor]}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            // enablePoints={false}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            enableCrosshair={false}
            legends={[]}
          />
        </div>
      </div>
    </div>
  );
}

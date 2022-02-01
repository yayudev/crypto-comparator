import { convertDataToCoinsByExchange } from "./comparator.utils";
import { ExchangesRateData } from "./crypto-api/crypto-api.service";

describe("convertDataToCoinsByExchange", () => {
  it("should convert the data correctly", () => {
    const now = new Date();
    const rawData: ExchangesRateData[] = [
      {
        cryptocompare: {
          BTC: { price: 1, date: now },
          ETH: { price: 1, date: now },
        },
        coingecko: {
          BTC: { price: 1, date: now },
          ETH: { price: 1, date: now },
        },
      },
      {
        cryptocompare: {
          BTC: { price: 2, date: now },
          ETH: { price: 2, date: now },
        },
        coingecko: {
          BTC: { price: 2, date: now },
          ETH: { price: 2, date: now },
        },
      },
      {
        cryptocompare: {
          BTC: { price: 3, date: now },
          ETH: { price: 3, date: now },
        },
        coingecko: {
          BTC: { price: 3, date: now },
          ETH: { price: 3, date: now },
        },
      },
    ];

    const parsedData = convertDataToCoinsByExchange(rawData);
    console.log({
      parsedData: parsedData,
      coingecko: parsedData.BTC.coingecko,
    });

    expect(parsedData.BTC).toEqual({
      cryptocompare: [
        { price: { price: 1, date: now } },
        { price: { price: 2, date: now } },
        { price: { price: 3, date: now } },
      ],
      coingecko: [
        { price: { price: 1, date: now } },
        { price: { price: 2, date: now } },
        { price: { price: 3, date: now } },
      ],
    });
    expect(parsedData.ETH).toEqual({
      cryptocompare: [
        { price: { price: 1, date: now } },
        { price: { price: 2, date: now } },
        { price: { price: 3, date: now } },
      ],
      coingecko: [
        { price: { price: 1, date: now } },
        { price: { price: 2, date: now } },
        { price: { price: 3, date: now } },
      ],
    });
  });
});

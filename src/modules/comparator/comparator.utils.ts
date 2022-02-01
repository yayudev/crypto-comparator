import { ExchangesRateData } from "./crypto-api/crypto-api.service";

export const AVAILABLE_COINS = ["BTC", "ETH", "XRP"];

export enum AVAILABLE_EXCHANGES {
  STORMGAIN = "StormGain",
  CRYPTOCOMPARE = "CryptoCompare",
  COINGECKO = "CoinGecko",
}

export type Rate = {
  price: number;
  date: Date;
};

export type CoinExchangesData = {
  [coin: string]: {
    [exchange: string]: Rate[];
  };
};

/**
 * Converts an API raw ExchangesRateData array to a format by coin and exchange.
 * Example:
 * INPUT:
 * [
 *  {
 *    cryptocompare: { BTC: 1, ETH: 1},
 *    coingecko: { BTC: 1, ETH: 1},
 *  },
 *  {
 *    cryptocompare: { BTC: 2, ETH: 2},
 *    coingecko: { BTC: 2, ETH: 2},
 *  },
 *  {
 *    cryptocompare: { BTC: 3, ETH: 3},
 *    coingecko: { BTC: 2, ETH: 3},
 *  },
 * ]
 * OUTPUT:
 * {
 *   BTH: {
 *     cryptocompare: [
 *       { price: 1, date: new Date() },
 *       { price: 2, date: new Date() },
 *       { price: 3, date: new Date() },
 *     ],
 *     coingecko: [
 *       { price: 1, date: new Date() },
 *       { price: 2, date: new Date() },
 *       { price: 3, date: new Date() },
 *     ],
 *   },
 *   ETH: {
 *     cryptocompare: [1, 2, 3],
 *     coingecko: [1, 2, 3],
 *   }
 * }
 * @param data Data to be converted
 * @returns Data parsed on a map by coin and exchange
 */
export function convertDataToCoinsByExchange(
  data: ExchangesRateData[]
): CoinExchangesData {
  const coins: any = {};

  for (const entry of data) {
    for (const exchange of Object.keys(entry)) {
      for (const coin of Object.keys(entry[exchange])) {
        if (!coins[coin]) {
          coins[coin] = {};
        }

        if (!coins[coin][exchange]) {
          coins[coin][exchange] = [];
        }

        coins[coin][exchange].push({
          price: entry[exchange][coin],
          date: entry[exchange]?.date,
        });
      }
    }
  }

  return coins;
}

/**
 * Map object name to actual exchange name
 */
export function getExchangeName(key: string) {
  switch (key) {
    case "cryptocompare":
      return AVAILABLE_EXCHANGES.CRYPTOCOMPARE;
    case "coingecko":
      return AVAILABLE_EXCHANGES.COINGECKO;
    case "stormgain":
      return AVAILABLE_EXCHANGES.STORMGAIN;
    default:
      return key;
  }
}

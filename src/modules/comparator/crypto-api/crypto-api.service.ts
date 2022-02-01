import {
  CRYPTOCOMPARE_ENDPOINT,
  COINGECKO_ENDPOINT,
  STORMGAIN_ENDPOINT,
  USD_TO_MXN_RATE_API_ENDPOINT,
  MAX_STORED_RECORDS,
} from "./crypto-api.constants";

type CurrencyData = {
  coin: string;
  price: number;
  date: Date;
};

export type CurrencyDataMap = {
  [coin: string]: {
    price: number;
    date: Date;
  };
};

export type ExchangesRateData = {
  [exchange: string]: CurrencyDataMap;
};

export class CryptoApiService {
  private static recordedData: ExchangesRateData[] = [];

  /* Get all rates for the crypto currencies in MXN */
  static async getAllCryptoCurrencies(): Promise<ExchangesRateData[]> {
    const [cryptocompareData, coingeckoData, stormgainData, usdToMxnRate] =
      await Promise.all([
        this.getCryptoCompareData(),
        this.getCoingeckoData(),
        this.getStormgainData(),
        this.getUsdToMxnRate(),
      ]);

    const pricesData = {
      cryptocompare: this.normalizeAndConvertToMXN(
        cryptocompareData,
        usdToMxnRate
      ),
      coingecko: this.normalizeAndConvertToMXN(coingeckoData, usdToMxnRate),
      stormgain: this.normalizeAndConvertToMXN(stormgainData, usdToMxnRate),
    };

    this.recordedData = [pricesData, ...this.recordedData].splice(
      0,
      MAX_STORED_RECORDS
    );

    return this.recordedData;
  }

  /*************
   *   Utils   *
   *************/

  /**
   * Converts a value from USD to MXN
   *
   * @param rate usd to mxn rate
   * @param amount usd amount
   * @returns mxn amount
   */
  private static convertUsdToMxn(rate: number, amount: number): string {
    return (amount * rate).toFixed(2);
  }

  /**
   * Parses the data and converts it to a map of coin to price so it
   * can be easily consumed.
   *
   * @param data data to be converted
   * @param rate usd to mxn rate
   * @returns converted data
   */
  private static normalizeAndConvertToMXN(
    data: CurrencyData[],
    rate: number
  ): CurrencyDataMap {
    return data.reduce(
      (data, current) => ({
        ...data,
        [current.coin]: Number.parseFloat(
          this.convertUsdToMxn(rate, current.price)
        ),
        date: new Date(),
      }),
      {}
    );
  }

  /*********************
   * Currency fetchers *
   *********************/

  /*Fech data from cryptocompare*/
  private static async getCryptoCompareData(): Promise<CurrencyData[]> {
    const response = await fetch(CRYPTOCOMPARE_ENDPOINT);
    const data = await response.json();
    const now = new Date();

    const prices = Object.keys(data).map((key) => {
      return {
        coin: key,
        price: data[key]?.USD,
        date: now,
      };
    });

    return prices;
  }

  /** Fetch data from coingecko */
  private static async getCoingeckoData(): Promise<CurrencyData[]> {
    const response = await fetch(COINGECKO_ENDPOINT);
    const data = await response.json();
    const now = new Date();

    const prices = Object.values(data).map((entry: any) => {
      return {
        coin: entry?.symbol?.toUpperCase(),
        price: entry?.current_price,
        date: now,
      };
    });

    return prices;
  }

  /** Fetch data from stormgain */
  private static async getStormgainData(): Promise<CurrencyData[]> {
    const response = await fetch(STORMGAIN_ENDPOINT);
    const data = await response.json();
    const now = new Date();

    return [
      {
        coin: "BTC",
        price: Number.parseFloat(data?.BTC_USDT?.last_price),
        date: now,
      },
      {
        coin: "ETH",
        price: Number.parseFloat(data?.ETH_USDT?.last_price),
        date: now,
      },
      {
        coin: "XRP",
        price: Number.parseFloat(data?.XRP_USDT?.last_price),
        date: now,
      },
    ];
  }

  /** Fetch data from currency api. See https://github.com/fawazahmed0/currency-api#readme */
  private static async getUsdToMxnRate(): Promise<number> {
    const response = await fetch(USD_TO_MXN_RATE_API_ENDPOINT);
    const data = await response.json();

    return data?.mxn;
  }
}

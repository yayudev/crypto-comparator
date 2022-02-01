import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import { CryptoApiService } from "./crypto-api";
import { ComparatorTable } from "./comparator-table";
import { ConvertionTool } from "./convertion-tool";
import {
  convertDataToCoinsByExchange,
  CoinExchangesData,
  AVAILABLE_COINS,
} from "./comparator.utils";
import "./comparator.styles.css";
import { UserContext } from "../shared/user.context";

const RATE_UPDATE_INTERVAL = 1000 * 5; // 15 seconds

export function Comparator() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState<CoinExchangesData>({});
  const navigate = useNavigate();
  const { coin: selectedCoin } = useParams<{ coin: string }>();

  async function getData() {
    const newData = await CryptoApiService.getAllCryptoCurrencies();
    const parsedData = convertDataToCoinsByExchange(newData);
    setData(parsedData);
  }

  // Fetch data on mount
  useEffect(() => {
    getData();
  }, []);

  // Then fetch data every 15 seconds
  useInterval(getData, RATE_UPDATE_INTERVAL);

  if (!user) {
    navigate("/");
    return null;
  }

  if (!selectedCoin || !AVAILABLE_COINS.includes(selectedCoin)) {
    return null;
  }

  return (
    <div className="comparator-content">
      <div role="tablist" className="comparator-tabs">
        <NavLink to="/compare/BTC" role="tab" className="comparator-tabs-item">
          BTC
        </NavLink>
        <NavLink to="/compare/ETH" role="tab" className="comparator-tabs-item">
          ETH
        </NavLink>
        <NavLink to="/compare/XRP" role="tab" className="comparator-tabs-item">
          XRP
        </NavLink>
      </div>

      <ComparatorTable data={data[selectedCoin] || {}} />
      <ConvertionTool
        data={data[selectedCoin] || {}}
        selectedCoin={selectedCoin}
      />
    </div>
  );
}


import { useContext } from "react";
import { StocksContext } from "../context/stocks";

export default function useStocks() {
    return useContext(StocksContext)
}
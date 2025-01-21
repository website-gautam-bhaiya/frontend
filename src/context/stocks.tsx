import { ReactNode, createContext, useState, useEffect } from "react";
import axios from "axios";

// Define the Stock interface
interface Stock {
  change: number;
  chart30dPath: string;
  chart365dPath: string;
  chartTodayPath: string;
  date30dAgo: string;
  date365dAgo: string;
  dayHigh: number;
  dayLow: number;
  ffmc: number;
  nearWKH: number;
  nearWKL: number;
  pChange: number;
  perChange30d: number;
  perChange365d: number;
  previousClose: number;
  priority: number;
  symbol: string;
  totalTraderValue: number;
  totalTradedVolume: number;
  yaerHigh: number;
  yearLow: number;
  open: number;
  identifier: string;
  lastUpdatedTime: string;
  lastPrice: number;
}

// Define GlobalStocks type
type GlobalStocks = {
  stocks: Stock[] | [];
  setStocks: React.Dispatch<React.SetStateAction<Stock[] | []>>;
};

// Create StocksContext with default values
export const StocksContext = createContext<GlobalStocks>({
  stocks: [],
  setStocks: () => {},
});

export default function StocksProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<Stock[] | []>([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `https://backend-final-self.vercel.app/api/v1/stocks/nifty-100`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });

        // Check if the response data is valid
        if (response.status === 200 && response.data.stocksData?.data) {
          console.log("Stocks Data:", response.data.stocksData.data); // Log the data for inspection
          setStocks(response.data.stocksData.data); // Update the state with stocks data
        } else {
          console.error("Invalid data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching stocks data:", error);
        // You can handle errors here, for example, setting an error state
      }
    };

    fetchStocks(); // Call the function to fetch stocks data
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return <StocksContext.Provider value={{ stocks, setStocks }}>{children}</StocksContext.Provider>;
}

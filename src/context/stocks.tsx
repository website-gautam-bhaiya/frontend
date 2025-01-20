import { ReactNode, createContext, useState, useEffect} from "react"
import axios from "axios"
 
type GlobalStocks = {
    stocks: Stock[] | []
    setStocks: React.Dispatch<React.SetStateAction<Stock[] | []>>

}

export const StocksContext = createContext<GlobalStocks>({

    stocks: [],
    setStocks: () => {}
})


interface Stock {
    change: number
    chart30dPath: string
    chart365dPath: string
    chartTodayPath: string
    date30dAgo: string
    date365dAgo: string
    dayHigh: number
    dayLow: number
    ffmc: number
    nearWKH: number
    nearWKL: number
    pChange: number
    perChange30d: number
    perChange365d: number
    previousClose: number
    priority: number
    symbol: string
    totalTraderValue: number
    totalTradedVolume: number
    yaerHigh:number
    yearLow: number
    open: number 
    identifier: string
    lastUpdatedTime: string
    lastPrice: number
}

export default function StocksProvider( {children}: {children: ReactNode}) {

    const [stocks, setStocks] = useState<Stock[] | []>([])
    useEffect( () => { 
            axios({
                method: "GET",
                url: `https://backend-final-self.vercel.app/api/v1/stocks/nifty-100`,
                headers: 
                    {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    }
        
            }).then((res) => {
                setStocks(res.data.stocksData.data) 
            }) 
        
        
    }, [])
    

    return <StocksContext.Provider value = {{stocks,setStocks}}>
        {children}
    </StocksContext.Provider>
}


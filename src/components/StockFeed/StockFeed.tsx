 
import './StockFeed.css'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import useStocks from "../../hooks/useStocks";


const StockFeed = () => {
 
    const {stocks } = useStocks(); 
    
    const zippedStocks = stocks.map( stock => {  
        
        return <span key={stock.symbol}>{stock.symbol} &nbsp; {stock.pChange > 0 ? <FaArrowUp style={{'color': 'lightgreen'}} /> : <FaArrowDown style={{'color': 'red'}}/> } {stock.pChange}% &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp; </span>
    })  
 
    

    return (
        <div className="stock-feed">
            <h1>LIVE</h1>
            <marquee>
                {zippedStocks}
            </marquee> 
        </div>
    )
}

export default StockFeed
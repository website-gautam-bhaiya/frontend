import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

 
import './GainersLosers.css'
import useStocks from "../../hooks/useStocks";
import Data from "./Data";
import GainersLosersSkeleton from "../Placeholders/GainersLosers/GainersLosersSkeleton";


const GainersLosers = () => {

    const [active, setActive] = useState<'gainers' | 'losers'>('gainers')

    const { stocks } = useStocks();

    const topGainers = [ stocks[1], stocks[2], stocks[3], stocks[4], stocks[5], stocks[6]]
    const topLosers = [ stocks[stocks.length - 1 ], stocks[stocks.length - 2 ], stocks[stocks.length - 3], stocks[stocks.length - 4 ], stocks[stocks.length - 5 ], stocks[stocks.length - 6 ]]
     
    

    const renderedGainers = topGainers.map( (gainer) => <tr className="stocks--row"> <td className="stock--item">{gainer?.symbol}</td> <td>{gainer?.lastPrice}</td> <td>{gainer?.pChange}% <FaArrowTrendUp style={{'color': 'lightgreen'}} /></td> </tr>   ) 
    const renderedLosers = topLosers.map( (loser) =>   <tr  className="stocks--row"> <td className="stock--item">{loser?.symbol}</td> <td>{loser?.lastPrice}</td> <td>{loser?.pChange}% <FaArrowTrendDown style={{'color': 'red'}} /></td> </tr> ) 
 
    return (                        
        <div className='gainers--losers '> 
                <div className="box--heading">
                    <div className="gainers--heading">
                        <h2  onClick={() => setActive('gainers')} style={{'borderBottom': active === 'gainers' ? '2px solid orange' : ''  }}> Top Gainers  </h2>
                    </div>
                    <div className="losers--heading">
                        <h2 onClick={() => setActive('losers')} style={{'borderBottom': active === 'losers' ? '2px solid orange' : ''  }}>  Top Losers </h2>
                    </div>

                </div>  
                <div className="stock--table">
                    {stocks.length > 0 ?<table>
                        <thead>
                            <tr className="heading--row">
                                <th> Symbol  </th>
                                <th> LTP  </th>
                                <th>% Change</th>
                            </tr>
                        </thead> 
                        {active === 'gainers' ? <Data stocksEle={renderedGainers} /> : <Data stocksEle={renderedLosers} /> }
                    </table> : <GainersLosersSkeleton />}
                </div>
        </div> 
 
  )
}

export default GainersLosers
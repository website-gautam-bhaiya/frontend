import './GainersLosersSkeleton.css'

const GainersLosersSkeleton = () => {
    return (
        <table>
            <div>
                <tr className="heading--placeholder">
                    <th> Symbol  </th>
                    <th> LTP  </th>
                    <th>% Change</th>
                </tr>
            </div>
            <div className='placeholder--tbody'>
                <div>
                    <div className="gain--lose--placeholder--div"></div>
                </div>
                <div>
                    <div className="gain--lose--placeholder--div"></div>
                </div>
                <div>
                    <div className="gain--lose--placeholder--div"></div>
                </div>
                <div>
                    <div className="gain--lose--placeholder--div"></div>
                </div>
                <div>
                    <div className="gain--lose--placeholder--div"></div>
                </div>
            </div>
        </table> 
    )
}

export default GainersLosersSkeleton
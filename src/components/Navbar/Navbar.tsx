 
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {



    return (
        <nav>
            <ul className='nav--links flex--row'>
                    <Link to={'/'}><span>Home</span></Link>
                    <Link to={'/category/quarterly-results'}><span>Quarterly Results</span></Link>
                    <Link to={'/category/industry-analysis'}><span>Industry Analysis</span></Link>
                    <Link to={'/category/market-movers'}><span>Market Movers</span></Link>
                    <Link to={'/books'}><span>Books</span></Link>
                    <Link to={'/category/news'}><span>News</span></Link>
            </ul>
        </nav>
    )
}

export default Navbar
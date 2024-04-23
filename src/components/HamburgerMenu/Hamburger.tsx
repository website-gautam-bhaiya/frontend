import { Link } from "react-router-dom"
import './Hamburger.css'
import { IoClose } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const Hamburger = ( { display } : {display: {navOpen: boolean, setNavOpen: React.Dispatch<React.SetStateAction<boolean>>} } ) => {

    const { auth, logout  } = useAuth();
                        

    
    return (
        <div className="hamburger--nav flex--col fade--x"  style={{'display': display.navOpen ? '' : 'none' }}> 
            <div className="close--btn"> <IoClose onClick={ () => display.setNavOpen(false)} /> </div>
            <div className="myAccount " >
                <h2>Hi, {auth.isLoggedIn ? auth.user?.name : 'Guest' }</h2>
                <ul className="flex--col options--list">
                    <Link to = {'/myAccount'} style={{'opacity': auth.isLoggedIn ? 1 : 0.5, 'pointerEvents': auth.isLoggedIn ? 'auto' : 'none'} }><span>My Account</span></Link>
                    <Link to = {'/publishPage'}  style={{'opacity': auth.isLoggedIn ? 1 : 0.5, 'pointerEvents': auth.isLoggedIn ? 'auto' : 'none'} }><span>Publish </span></Link>
                </ul>
            </div>
            <div className="categories " >
                <h2>Categories</h2>
                <ul className="flex--col options--list"> 
                    <Link to={'/'}><span>Home</span></Link>
                    <Link to={'/category/quarterly-results'}><span>Quarterly Results</span></Link>
                    <Link to={'/category/industry-analysis'}><span>Industry Analysis</span></Link>
                    <Link to={'/category/market-movers'}><span>Market Movers</span></Link>
                    <Link to={'/books'}><span>Books</span></Link>
                    <Link to={'/category/news'}><span>News</span></Link>
                </ul>
            </div>
            <div className="btns-- flex--col"> 
                <div className="register--btns flex--row">
                    {auth.isLoggedIn ? <Link to={'/'}> <button onClick={() => logout()} className="logout--btn" >Logout</button> </Link> : <Link to={'/login'}><button className="acc--btn" >Login</button></Link> }
                    {auth.isLoggedIn && auth.user?.role === 'admin' ? <Link to={'/addNewAuthor'}> <button className="add--btn">Add Author</button>  </Link>  : ""} 
                </div>
                {auth.isLoggedIn && auth.user?.role === 'admin' ? <Link to={'/addBooks'}> <button className="post--btn">Add Book</button>  </Link>  : ""} 
            </div>
        </div>
    )
}

export default Hamburger

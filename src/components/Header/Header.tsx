
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Logo from './../../assets/images/logo.png'

import {  useState  } from "react";
import Hamburger from "../HamburgerMenu/Hamburger";

import './Header.css' 
import useAuth from "../../hooks/useAuth";

const Header = () => { 

    const {auth} = useAuth();
    const [navOpen, setNavOpen] = useState<boolean>(false)  
    
    return (
        <div  className='header'>
            <div className='header--container  '> 
                    <div className="flex--row">
                        <Link to={"/"}><img className="logo" src = {Logo}  /></Link>
                        
                    </div>

                    <div className="logo--div">
                        <h1 className='logo--heading'><span style={{'textDecoration': 'underline'}}>Nivesh</span>कारी</h1>
                    </div>

                    <div className='flex--row header--end'>
                        <div className="register--btns flex--row">
                            {auth.isLoggedIn ? <Link to = {'/publishPage'}><button className="acc--btn" >Publish</button></Link>  : <Link to={'/login'}><button className="acc--btn" >Login</button></Link> }
                        </div>
                        <GiHamburgerMenu onClick={() => setNavOpen(true)} className='hamburger' />
                    </div>

                    <Hamburger display = {{navOpen, setNavOpen}} />
            </div>
 
        </div>
        ) 
}

export default Header
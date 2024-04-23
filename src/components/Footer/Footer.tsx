
import './Footer.css'
import { FaTwitter } from "react-icons/fa"; 
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer flex--row'>
        
        <div className='footer--socials flex--col'>
            <h2>
                Follow Us
            </h2>

            <div className='social--links flex--col'>
                <a className='social--icon' target='_blank' href='https://twitter.com' style={{'color': 'blue'}}>  <FaTwitter /> </a>
                <a className='social--icon' target='_blank' href='https://linkedin.com' style={{'color': 'navy'}}> <FaLinkedin /> </a>
            </div>
        </div>

        <div className='footer--categories flex--col'>
            <h2>
                Categories
            </h2>

            <div className='flex--col category--links'>
                    <Link to={'/quarterly-results'}><span>Quarterly Results</span></Link>
                    <Link to={'/ind-analysis'}><span>Industry Analysis</span></Link>
                    <Link to={'/market-movers'}><span>Market Movers</span></Link>
                    <Link to={'/books'}><span>Books</span></Link>
                    <Link to={'/news'}><span>News</span></Link>
            </div>

        </div>

        <div className='reach--out '>
            <span className='flex--col'> <span><MdEmail style={ { 'transform': 'translateY(5px)'}} /> Reach us : </span>  <span >niveshkari@gmail.com</span> </span>
            <div className='privacy--and--us'>
                <Link to={'/privacyStatement'}><span> Terms & Conditions <FiExternalLink /> </span></Link>
                <Link to={'/aboutUs'}><span>About Us <FiExternalLink /></span></Link>
            </div>
        </div>
 
    </div>
  )
}

export default Footer
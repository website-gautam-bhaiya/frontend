import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"

import { MdCancel } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import './ErrorPage.css'
import { Link } from "react-router-dom";


const ErrorPage = ( { type } : { type : 'NotFound' | 'Unauthorized' } ) => {
 

    let statusCode;
    let message;
    let solutions;

    if (type === 'Unauthorized') {
        
        statusCode = 401
        message = <p> You are not <em><b>authorized</b></em> to view this page.<MdCancel className="label--icon" /></p>

        solutions = 
        <div className="err--solutions">
            
            <span> <IoMdArrowDropright  /> Please log-in to access this page.</span>
            <span> <IoMdArrowDropright  /> 
                If you are accessing an <em><b>Adminstrator</b></em> resource, 
                please check if you are logged-in as an Administrator and have the authority to do so.
            .</span>
            <span> <IoMdArrowDropright  /> 
                If you are logged-in and still cannot access this page, 
                please create a new session and close this tab.
            </span>
        </div>
    }

    else if ( type === 'NotFound' )
    {
        statusCode = 404   
        message = <p> The page you requested does not exist. <MdCancel className="label--icon" /></p>
        solutions = 
        <div className="err--solutions">
            
            <span> <IoMdArrowDropright  /> Please check if the URL you have entered is correct.</span>
            <span> <IoMdArrowDropright  /> Please check your Internet Connection. </span>
            <span> <IoMdArrowDropright  /> If this issue persists, please try again after some time. </span>
        </div>
    }

    return (
        <div className="error--page">
            <Header />
            <Navbar />
            <div className="center--error">
                <div className="error--container">

                        <div className="status--code">
                            <p>{statusCode}</p>
                        </div>

                        <div className="error--message">
                            {message} 
                            {solutions}
                            <div className="nav--btns">
                                    <Link to={'/'}> <button className="acc--btn"> Home  <MdHome/> </button> </Link> 
                                    <Link to={'/login'}> <button className="post--btn">Log-In <FaLock /> </button></Link> 
                            </div>

                        </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
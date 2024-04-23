
import { SyntheticEvent, useEffect, useState } from "react" 

import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import useAuth from "../../hooks/useAuth"; 
import PFP from './../../assets/images/placeholder.png'

import { MdModeEditOutline } from "react-icons/md";
import { IoSave } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdAlert } from "react-icons/io"; 
import { FaUserAltSlash } from "react-icons/fa";

import './AccountPage.css' 
import Input from "../../components/Input/Input";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Footer from "../../components/Footer/Footer";
import useNews from "../../hooks/useNews";
import { Link, useNavigate } from "react-router-dom";
import { isEmail } from 'validator' 

const AccountPage = () => {
 
    const { auth, updatePassword, updateMyAccount, err, setErr } = useAuth();
    const { articlesPublished, getArticlesPublishedBy } = useNews()
    const navigate = useNavigate()
    
    const [isUpdatingPass, setIsUpdatingPass] = useState<boolean>(false) 
    const [isUpdatingInfo, setIsUpdatingInfo] = useState<boolean>(false)   

    useEffect( () => {
         
        getArticlesPublishedBy(auth.user._id) 

    }, [])
 
    
    const cancelUpdateForms = () => {

        setIsUpdatingPass(false)
        setIsUpdatingInfo(false)
        setErr( {isErr: false, message: '', statusCode: 200, type: ''})
    }

    const handlePassChangeSubmit = async (event: SyntheticEvent) => {
        
        event.preventDefault(); 

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        const currentPassword = target[0].value;
        const password = target[1].value;
        const passwordConfirm = target[2].value;

        if(!currentPassword || !password || !passwordConfirm) {

            setErr( { isErr: true, message: "Please fill all the fields before submitting!", statusCode: 400, type: "Bad Request" } )
            return;
        }

        if(currentPassword === password) {

            setErr( { isErr: true, message: "Your current password and new password cannot be the same!", statusCode: 400, type: "Bad Request" } )
            return;
        }
 
        const isSuccess = await updatePassword(currentPassword, password, passwordConfirm);
        
        if(isSuccess) {
            navigate('/')
        }
    }

    const handleUpdateSubmit = async (event: SyntheticEvent) => {

        event.preventDefault();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        const username = target[0].value ? target[0].value : undefined
        const email = target[1].value ? target[1].value : undefined

        if (!username && !email) {

            setErr({isErr: true, statusCode: 400, message: "Please fill a field to update!", type: "Bad Request"})
            return
        }

        if (email && !isEmail(email)) {

            setErr({isErr: true, statusCode: 400, message: "Please provide a valid e-Mail!", type: "Bad Request"})
            return
        }
        
       const isSuccess = await updateMyAccount( {name: username, email}) 
        
        if(isSuccess) {
            navigate('/')
        }
    }


 

    return (

        <div className="account--page">
                <Header />
                <Navbar />

                <div className="account--container">
                    <div className="acc--img">
                        <img src={PFP}/>
                    </div>

                    <div className="acc--content">
                        <div className="acc--about">
                            <h1 className="user--name">{auth.user.name}  |  <span className="user--role">{auth.user.role}</span>   </h1>
                            <p className="user--email">{auth.user.email}</p>
                        </div>

                        <div className="acc--btns">
                            {isUpdatingInfo ?  
                            <button onClick={cancelUpdateForms} className="cancel--btn">Cancel <MdCancel /></button>
                            :
                            <button className="edit--btn" onClick={() => {setIsUpdatingPass(false); setIsUpdatingInfo(true);}}>Edit <MdModeEditOutline /></button> 
                             }

                            {isUpdatingPass ?
                            <button onClick={cancelUpdateForms} className="cancel--btn">Cancel <MdCancel /> </button>
                            :
                            <button onClick={() => {setIsUpdatingPass(true); setIsUpdatingInfo(false);}} className="update--btn">Update Password <FaLock /> </button>}
                            {auth.user.role === 'admin' ?<Link to={'/allUsers'}><button className="logout--btn">Remove Author <FaUserAltSlash /> </button></Link> : '' }
                        </div>

                        <div className="update--pass--form" style={{'display': isUpdatingPass ? 'block': 'none'}}>
                            <form onSubmit={handlePassChangeSubmit}>
                                <label className="mess--label"> <IoMdAlert /> You will be <em>LOGGED OUT</em> after successfully changing your password.</label>
                                {err.isErr ? <label className="err--label"> <IoMdAlert /> {err.message}</label>: ''}
                                <Input isPassword >Current Password</Input>
                                <Input isPassword >New Password</Input>
                                <Input isPassword >Confirm Password</Input> 
                                <button  className="save--btn">Save <IoSave /></button>
                            </form>
                        </div>
                        <div className="update--pass--form" style={{'display': isUpdatingInfo ? 'block': 'none'}}>
                            <form onSubmit={handleUpdateSubmit}>
                                <label className="mess--label"> <IoMdAlert /> You will be <em>LOGGED OUT</em> after successfully updating your details.</label>
                                {err.isErr ? <label className="err--label"> <IoMdAlert /> {err.message}</label>: ''}
                                <Input  >New Username</Input>
                                <Input  >New e-Mail</Input> 
                                <button  className="save--btn">Save <IoSave /></button>
                            </form>
                        </div>


                    </div>
                        
                    <div className="articles--published">
                            <h1>My Articles</h1>
                            <div className="articles--section">
                                {articlesPublished.map( article =>  <ArticleCard article={article} isOperations /> )} 
                            </div>
                    
                    </div>
                </div>

                <Footer />
        </div>
    )
}

export default AccountPage

import './LoginForm.css' 
import {isEmail} from 'validator'
import { useNavigate } from 'react-router-dom'; 
import { SyntheticEvent, useEffect, useState } from "react";
import { GrCircleAlert } from "react-icons/gr"; 
import { FaCheckCircle } from "react-icons/fa";


import Input from "../Input/Input";
import useAuth  from "../../hooks/useAuth"; 

const LoginForm = () => { 
    
    const { auth, err, setErr, logIn, forgotPassword  } = useAuth();  
    const navigate = useNavigate();  

    const [forgotPass, setForgotPass] = useState<boolean>(false) 
    const [ response, setResponse ] = useState<boolean>(false)

    useEffect( () => {
        
        if(auth.isLoggedIn) navigate('/')    
        else navigate('/login')

    }, [ auth ]) 
 

    const handleLoginSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}
        
        const email :string = target[0].value
        const password : string = target[1].value
        
        if(!isEmail(email))
        {
            setErr({...err, isErr: true, message: "Please enter a valid e-Mail!", type: 'ValidationError', statusCode: 400})
            return
        }

        logIn(email, password)

        if( auth.isLoggedIn) {
            setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
        }

    }
    const handleForgotPassSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        const email :string = target[0].value 
        
        if(!isEmail(email))
        {
            setErr({...err, isErr: true, message: "Please enter a valid e-Mail!"})
            setResponse(false)
            return
        }

        await forgotPassword(email)
        setResponse(true)

        if( auth.isLoggedIn) {
            setErr({...err, isErr: false, message: ''})
        }

    }
   
    const formContent = forgotPass ? 
                        <form className="loginpage--form" onSubmit={handleForgotPassSubmit}>
                            <label className="err--label"> {err.isErr ? <GrCircleAlert /> : <> &nbsp;</> } {err.message}</label>
                            <label className="feedback--label"> {response ? <><FaCheckCircle /> Email sent!</>  : <> &nbsp;</> }   </label>
                            <Input>Email</Input> 
                            <button>Submit</button>

                            <a onClick={() => setForgotPass(!forgotPass)}><span>Back to Login</span></a>
                        </form> :
                        <form className="loginpage--form" onSubmit={handleLoginSubmit}>
                            <label className="err--label"> {err.isErr ? <GrCircleAlert /> : <> &nbsp;</> } {err.message}</label>
                            <Input>Email</Input>
                            <Input isPassword >Password</Input>
                            <button>Submit</button>
        
                            <a onClick={() => setForgotPass(!forgotPass)}><span>Forgot your password?</span></a>
                        </form> 
 
    
    return (
  
        
            <div className="form--container">
                <div>
                    <h1>LOGIN</h1>
                </div>
                {formContent}
                 
            </div> 

    )
}

export default LoginForm
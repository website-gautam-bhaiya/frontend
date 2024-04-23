 
import './ResetPage.css'
import Input from '../../components/Input/Input'
import useAuth from '../../hooks/useAuth'
import { GrCircleAlert } from 'react-icons/gr'
import { FaCheck } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom' 
import { SyntheticEvent } from 'react'


const ResetPage = () => { 

    const { err, resetPassword, resetStatus } = useAuth();
    const { token } = useParams(); 



    const handleSubmit = ( event : SyntheticEvent) => {

        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        event.preventDefault();
        const password = target[0].value
        const passwordConfirm = target[1].value

        if (token)
        resetPassword(password, passwordConfirm, token);  
    }

    const formContent = resetStatus ? 

                        <div className="reset--confirmed">
                            <FaCheck style={{'color': 'lightgreen', 'fontSize': '5rem'}} />
                            <h1>Your Password has been reset.</h1>
                            <Link to={'/login'}><a>Back to Login</a></Link>
                        </div>

                        :
                        <form className="reset--form" onSubmit={handleSubmit}>
                            <label className="err--label"> {err.isErr ? <GrCircleAlert /> : <> &nbsp;</> } { err.message }</label>
                            <Input isPassword>New Password</Input>
                            <Input isPassword >Confirm Password</Input>
                            <button>Submit</button> 
                        </form> 

    return (
        <div className="reset--page">
            <div className="reset--page--container">
                <div className="reset--about--container">
                    <h2>Reset</h2>
                    <h2>Password</h2>
                </div>
                {formContent}
            </div>
 
    </div>  
    )
}

export default ResetPage
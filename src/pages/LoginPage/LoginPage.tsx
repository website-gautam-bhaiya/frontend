import MobileArticle from './../../assets/images/nivesh--mobile.png'
import LoginForm from '../../components/Form/LoginForm'
import './LoginPage.css'

const LoginPage = () => { 
    return (
        <div className="login--page">
            <div className="login--page--container">
                <div className="login--about--container">
                    <h2>Welcome</h2>
                    <h2>to</h2>
                    <h1 className=' '><span style={{'textDecoration': 'underline'}}>Nivesh</span>कारी  </h1>

                    <img src={MobileArticle} className='img--nivesh'/>
                </div>
                <LoginForm /> 
            </div>
 
    </div>  
    )
}

export default LoginPage
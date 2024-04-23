import { ReactNode, useEffect } from "react" 
import useAuth from "../../hooks/useAuth"  
import { useNavigate } from "react-router-dom"
import AuthSpinner from "../AuthSpinner/AuthSpinner"


const Protected = ( { children, authorized } : { children: ReactNode, authorized ?: 'admin' | 'author' } ) => {
 
    const { authCheck, auth } = useAuth() 
    
    const navigate = useNavigate(); 
 
    
    useEffect( () => {

        const handler = () => { 

            window.location.reload()
            
        }

        window.addEventListener('popstate', handler)
        
        return ( () => {
            window.removeEventListener('popstate', handler)
        })

    },[])

    
    if (authorized && auth.user.role !== authorized) 
    {
        navigate('/restricted')
        return
    }

    if(authCheck.isLoading) {  
        return <AuthSpinner />
    }
    
    else {

        if(authCheck.isAuthenticated)
        {
            return children
        }
        
        navigate('/restricted')
    }
    
}

export default Protected
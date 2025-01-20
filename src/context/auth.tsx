import { ReactNode, createContext, useEffect } from "react";
import { User } from "./news";
import { useState } from "react"; 
import axios from "axios";  
import { AxiosError } from "axios"; 
const BASE_URL = "https://backend-final-self.vercel.app/api/v1";


type GlobalAuth = {
    auth: Auth
    err: Error,
    resetStatus: boolean
    authCheck: {
        isLoading: boolean,
        isAuthenticated: boolean
    }
    users: User[] | []

    setAuth:  React.Dispatch<React.SetStateAction<Auth>>, 
    setErr: React.Dispatch<React.SetStateAction<Error>>,
    setResetStatus: React.Dispatch<React.SetStateAction<boolean>>
    setAuthCheck: React.Dispatch<React.SetStateAction<{isLoading: boolean, isAuthenticated: boolean }>>
    setUsers: React.Dispatch<React.SetStateAction<User[] | []>>

    logIn: (email: string, password: string) => void,
    forgotPassword: (email: string) => void,
    resetPassword: (password: string, passwordConfirm: string, token: string) => void,
    updatePassword: (currentPassword: string, password: string, passwordConfirm: string) => Promise<boolean>
    onRefresh: () => void
    logout: () => void, 
    getAllUsers: () => void

    addNewAuthor : (credentials: {name: string, email: string, password: string, passwordConfirm: string}) => Promise<boolean>
    updateMyAccount : ( updateData: {name ?: string, email ?: string}) => Promise<boolean>
    deleteAuthor: (id: string) => Promise<boolean>
}

interface ErrorResponse {
    error: {
        statusCode: number
    };
    message: string;
    // Add any other properties you expect in the error response
}

interface Auth {
    user: User,
    isLoggedIn: boolean
}

interface Error {
    isErr: boolean
    message: string,
    statusCode?: number,
    type: string
}


export const AuthContext = createContext<GlobalAuth>({
    auth: {
        user: {
            name: '',
            profilePhoto: '',
            email: '',
            role: '',
            _id: '',
        },
        isLoggedIn: false
    },
    err: {
        isErr: false,
        message: '',
        statusCode: 200,
        type: ''
    },

    authCheck: {
        isAuthenticated:false,
        isLoading: true
    },

    resetStatus: false,
    users: [],

    setAuth: () => {},
    setErr: () => {},
    setResetStatus: () => {},
    setAuthCheck: () => {},
    setUsers: () => {},

    onRefresh: () => {},
    logIn: () => {},
    forgotPassword: () => {},
    resetPassword: () => {},
    logout: () => {}, 
    updatePassword: () => Promise.reject(),
    addNewAuthor: () => Promise.reject(),
    updateMyAccount: () => Promise.reject(),
    getAllUsers: () => {},
    deleteAuthor: () => Promise.reject()

})


export default function AuthProvider({ children }: {children: ReactNode}) {

    const [auth, setAuth] = useState<Auth>({ 
            user: {
                name: '',
                profilePhoto: '',
                email: '',
                role: '',
                _id: ''
            },
            isLoggedIn: false
        }) 

    const [err, setErr] = useState<Error>({
        message: '',
        isErr: false,
        statusCode: 200,
        type: ''
    })

    const [authCheck, setAuthCheck] = useState<{ isLoading: boolean, isAuthenticated: boolean }>({
        isLoading: true,
        isAuthenticated: false
    })

    const [resetStatus, setResetStatus] = useState<boolean>(false)
    const [users, setUsers] = useState<User[] | []>([]) 

    useEffect( () => {

        if(JSON.parse(sessionStorage.getItem('checkLoginStatus') as string)?.isLoggedIn)
        { 
            onRefresh()
        }
        
        else setAuthCheck( { isAuthenticated: false, isLoading: false } )  
            
    }, [window.location])

    const handleError = (error: AxiosError<ErrorResponse>) => {
     
        if ('response' in error && error.response)
        { 
            if(error.message === 'NetworkError') {
                setErr({...err, isErr: true, message: err.message ,type: 'Bad Connection', statusCode: 500})
        
            }  
            
            else if (error.response.data && error.response.data.error.statusCode === 400) { 
                setErr({...err, isErr: true, message: error.response.data.message ,type: 'DuplicateError', statusCode: 400})
            }
    
            else
            {
                setErr({...err, isErr: true, message: 'Something went wrong!', statusCode: 400, type: 'Unknown'})
            } 
        }
    }

    const onRefresh = async () => { 
        
        try {
            const response = await axios({
                url: '${BASE_URL}/users/refresh',
                method: "GET", 
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json' 
                }, 
            
            })   

            setAuth( {user : response.data.currentUser, isLoggedIn: true} )
            setAuthCheck({ isAuthenticated: true, isLoading: false })
            setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
        }

        catch (error) { 
            console.log(error);
            
            if (error instanceof AxiosError) handleError(error)
            setAuthCheck({isAuthenticated: false, isLoading: false}) 
        }
 
    }

    const logIn = async (email: string, password: string) => { 

        try {
            const response = await axios({
                url: '${BASE_URL}/users/login',
                method: "POST", 
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json' 
                },
                data: {
                    "email": email,
                    "password": password
                }
            
            }) 
            
            if (response.status === 200) {
                setAuth( {user : response.data.user, isLoggedIn: true} )
                setAuthCheck( {isAuthenticated: true, isLoading: false})
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
                sessionStorage.setItem('checkLoginStatus', JSON.stringify({isLoggedIn: true }))
            }
            
        }

        catch (error) { 
 
            if (error instanceof AxiosError)
            {

                if ('response' in error && error.response)
                {                    
                    if(err.message === 'NetworkError') {
                        setErr({...err, isErr: true, message: err.message ,type: 'Bad Connection'})
                
                    } 
    
                    else {
                        setErr({...err, isErr: true, message: error.response.data.message, statusCode: error.response.data.error.statusCode, type: 'ValidationError'})
                    }
                }

            }
        }
         
        

    }

    const forgotPassword = async (email: string) => {

        try {
            const response = await axios({
                url: '${BASE_URL}/users/forgotPassword',
                method: "POST",
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                data: {
                    "email": email, 
                }
                
            })

            if ( response.status === 200) {
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
            }

        }

        catch (error) {

            if (error instanceof AxiosError) handleError(error) 
        }
 
    }


    const resetPassword = async (password: string, passwordConfirm: string, token: string) => {

        try {

            const response = await axios({
                url: `${BASE_URL}/users/resetPassword/${token}`,
                method: "PATCH",
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                data: {
                    password,
                    passwordConfirm
                }
            })

            if (response.status === 200) {
                
                setResetStatus(true)
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
            }
        }

        catch (error) {
             
            if (error instanceof AxiosError)
            {
                if ('response' in error && error.response)
                {
                    if(error.message === 'NetworkError') {
                        setErr({...err, isErr: true, message: err.message ,type: 'Bad Connection'})
             
                    } 
                    
                    if (error.response.data.error.statusCode === 400 ) {
                         
                        setErr({...err, isErr: true, message: error.response.data.message , statusCode: error.response.data.error.statusCode , type: 'ValidationError'})
                    }
        
                    else
                    {
                        setErr({...err, isErr: true, message: 'Something went wrong!', statusCode: 400, type: 'Unknown'})
                    }
                }
            }
        }

         
    }

    const logout = async () => {

        try {

            const response = await axios({
                url: `${BASE_URL}/users/logout`,
                method: "GET",
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {

                setAuth({ 
                    user: {
                        name: '',
                        profilePhoto: '',
                        email: '',
                        role: '',
                        _id: ''
                    },
                    isLoggedIn: false
                })
                sessionStorage.clear()
                setAuthCheck( { isLoading: false, isAuthenticated: false })
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
            }

        }

        catch (error) {
 
            if (error instanceof AxiosError)
            {
                if( 'response' in error && error.response)
                {
                    if(error.message === 'NetworkError') {
                        setErr({...err, isErr: true, message: err.message ,type: 'Bad Connection'})
             
                    } 
        
                    else
                    {
                        setErr({...err, isErr: true, message: 'Something went wrong!', statusCode: 400, type: 'Unknown'})
                    }
                }
            }
        } 
    }
     


    const updatePassword = async (currentPassword: string, password: string, passwordConfirm: string)  => {

        try {

            const response = await axios({
                url: `${BASE_URL}/users/updateMyPassword`,
                method: "PATCH",
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                data: {
                    currentPassword,
                    password,
                    passwordConfirm
                }
            })

            if (response.status === 200) {
                
                setAuth({ 
                    user: {
                        name: '',
                        profilePhoto: '',
                        email: '',
                        role: '',
                        _id: ''
                    },
                    isLoggedIn: false
                })
                setAuthCheck( { isAuthenticated: true, isLoading: false } )  
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
                sessionStorage.clear()
 
                return true
            }
            return false
        }

        catch (error) { 

            if (error instanceof AxiosError) 
            {
                if ('response' in error && error.response)
                {
                    
                    if(error.message === 'NetworkError') {
                        setErr({...err, isErr: true, message: err.message ,type: 'Bad Connection'})
             
                    } 
                    
                    if (error.response.data.error.statusCode === 400 ) {
                         
                        setErr({...err, isErr: true, message: error.response.data.message , statusCode: error.response.data.error.statusCode , type: 'ValidationError'})
                    }
        
                    else if (error.response.data.error.statusCode === 401) {
                        setErr({...err, isErr: true, message: error.response.data.message , statusCode: 401 , type: 'ValidationError'})
                    
                    }
        
                    else
                    {
                        setErr({...err, isErr: true, message: 'Something went wrong!', statusCode: 400, type: 'Unknown'})
                    }
                }
            }

            return false
        } 
    }

    const addNewAuthor = async (credentials: { name: string, email: string, password: string, passwordConfirm: string } ) => {
 
        try { 
            const response = await axios({
                url: `${BASE_URL}/users/addAuthor`,
                method: "POST",
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                data: credentials
            })
            
            if (response.status === 200)
            {
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
                return true
            }

            return false
        }

        catch (error) {
            
            if ( error instanceof AxiosError) handleError(error)
             
            return false
            
        }
    }

    const updateMyAccount = async ( updateData: {name?: string, email ?: string }) => {

        try {

            const response = await axios({
                url: `${BASE_URL}/users/updateMyAccount`,
                method: "PATCH",
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json',
                },
                data: updateData
            })

            if (response.status === 200) {
                
                setAuth({ 
                    user: {
                        name: '',
                        profilePhoto: '',
                        email: '',
                        role: '',
                        _id: ''
                    },
                    isLoggedIn: false
                })
                setAuthCheck( { isAuthenticated: true, isLoading: false } )  
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
                sessionStorage.clear()
 
                return true
            }
            return false
            
        }

        catch (error ) {
            
            if (error instanceof AxiosError) handleError(error)
            return false;
            
        } 
    }

    const getAllUsers = async () => {

        try {

            const response = await axios({
                url: `${BASE_URL}/users/getAllAuthors`,
                method: "GET",
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json',
                }
            })

            if (response.status === 200 ) {

                setUsers(response.data.users)
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
            } 
            
        }


        catch (error ) {
            
            if (error instanceof AxiosError) handleError(error)
            return false;
            
        } 
    }

    const deleteAuthor = async (id: string) => {

        try{

            const response = await axios({
                url: `${BASE_URL}/users/deleteAuthor/${id}`,
                method: "DELETE",
                withCredentials: true,
                headers: 
                { 
                    'Content-Type': 'application/json',
                }
            })

            
            if (response.status === 204 ) {
 
                setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
                return true
            }

            return false

        }

        catch (error ) {
            
            if (error instanceof AxiosError) handleError(error )
            return false;
            
        } 
    }


    console.log("User: ", auth);
    console.log(authCheck);
    
    
    
        
    return <AuthContext.Provider value={{auth, setAuth, err, setErr, users, setUsers, logIn, forgotPassword, resetPassword, resetStatus, setResetStatus, logout, updatePassword, onRefresh, authCheck, setAuthCheck, addNewAuthor, updateMyAccount, getAllUsers, deleteAuthor }}>
        {children}
    </AuthContext.Provider>

}



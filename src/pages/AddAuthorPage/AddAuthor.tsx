import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import Input from "../../components/Input/Input"
import useAuth from "../../hooks/useAuth"; 
import { isEmail } from 'validator'
import { GrCircleAlert } from "react-icons/gr"; 


import './AddAuthor.css'
import { SyntheticEvent, useEffect } from "react";

const AddAuthor = () => {

    const { addNewAuthor, err, setErr } = useAuth(); 

    useEffect( () => {

        return () => {
            setErr( { message: "", isErr: false, statusCode: 200, type: "" } ) 
        }
    }, [])

    const handleSubmit = async (event: SyntheticEvent) => {

        event.preventDefault(); 
        
         
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}
        const email = target[0].value
        const name = target[1].value
        const password = target[2].value
        const passwordConfirm = target[3].value
        const role = target[4].value.toLowerCase() 

        if (!email || !name || !password || !passwordConfirm || !role) {
            setErr( { isErr: true, message: "Please fill all the fields before submitting!", statusCode: 400, type: "Bad Request" } )
            return;
        }

        if(!isEmail(email)) {
            setErr( { message: "Please enter a valid e-Mail!", isErr: true, statusCode: 400, type: "Bad Request" } )
            return
        }

        if(password !== passwordConfirm) {
            setErr( { message: "Passwords do not match!", isErr: true, statusCode: 400, type: "Bad Request" } )
            return
        }

        const credentials = {
            email,  
            name,
            password, 
            passwordConfirm,
            role
        }
        
        const isSuccess = await addNewAuthor(credentials)

        if(isSuccess) window.location.reload()

    }


    return (
    
        <div className="add--author--page">

        <Header />
        <Navbar />

        <div className="add--author--container">

            <h1>Enter Author's Credentials</h1>
            {err.isErr ?  <label className="err--label"><GrCircleAlert /> {err.message}</label> : ''}  
            <form onSubmit={handleSubmit}>
                <Input>Enter e-Mail</Input>
                <Input>Enter Username</Input>
                <Input isPassword>Enter Password</Input>
                <Input isPassword>Confirm Password</Input>
                <label>Choose a role</label>
                <select>
                    <option>Author</option>
                    <option>Admin</option>
                </select>
                <button className="post--btn">Submit</button>
            </form>

        </div>

        </div>
    )
}

export default AddAuthor
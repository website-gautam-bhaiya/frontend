
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import useBooks from '../../hooks/useBooks'

import './AddBookPage.css'
import useAuth from '../../hooks/useAuth'

import { GrCircleAlert } from "react-icons/gr"; 
import { SyntheticEvent } from 'react'


const AddBookPage = () => {

    const { publishBook } = useBooks();
    const { err } = useAuth();

    const navigate  = useNavigate();


    const handleSubmit = async (event: SyntheticEvent) => {
        
        event.preventDefault();
 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        const title = target[0].value;
        const author = target[1].value;
        const ISBNCode = target[2].value;

        const options = {
            selfHelp: target[3].checked,
            experiencedTrader: target[4].checked,
            beginner: target[5].checked,
        }

        
        const isSuccess = await publishBook( { title, author, ISBNCode, options } )
        
        if (isSuccess) {
            navigate('/')
        }

         
    }
    

    return (
        
        <div className='add--book--page'>

            <header>
                <Header />
                <Navbar />
            </header>

            <div className='add--book--page--container'>
                <form onSubmit = {handleSubmit}>
                    <label className='err--label'>{ err.isErr ? <GrCircleAlert /> : ''}{err.message} </label>
                    <input className='publish--input' placeholder = "Enter Book's title" />
                    <input className='publish--input' placeholder = "Enter Book's author" />
                    <input className='publish--input' placeholder = "Enter Book's ISBN Code" /> 

                    <div className="checkboxes">
                        <div className='checkbox--container'>
                            <input className='checkbox' type='checkbox' id='selfHelp' name='selfHelp' /> 
                            <label htmlFor = "selfHelp">Self Help</label>
                        </div>
                        
                        <div className="checkbox--container">
                            <input className='checkbox' type='checkbox' id='expTrader' name='expTrader' /> 
                            <label htmlFor = "expTrader" >Experienced Trader</label>
                        </div>

                        <div className="checkbox--container">
                            <input className='checkbox' type='checkbox' id='beginner' name='beginner' /> 
                            <label htmlFor = "beginner" >Beginner</label>
                        </div>

                    </div>

                    <button className='post--btn' >Post</button>
                </form>
                
            </div>

        </div>
    )
}

export default AddBookPage
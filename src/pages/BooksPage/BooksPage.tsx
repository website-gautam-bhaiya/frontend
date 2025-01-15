
import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import StockFeed from '../../components/StockFeed/StockFeed'
import useBooks from '../../hooks/useBooks'

import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa"; 

import { FiExternalLink } from "react-icons/fi";

import './BooksPage.css' 
 
const BooksPage = () => {
    
    const { books, getAllBooks } = useBooks() 

    useEffect( () => {

        getAllBooks() 
    }, [])
    
    const renderedBooks = books.map( (book, i) => 
        <div key={i} className='book'>
            <img src = {`https://covers.openlibrary.org/b/isbn/${book.ISBNCode}-M.jpg`} /> 
            <div className='book--about'>
                <p className='book--title'>{book.title}</p>
                <p className='book--author'>{book.author}</p>
                <div className='book--options'>
                    <p className='book--option'>Self Help {book.options.selfHelp ? <FaThumbsUp className='thumbs--up' /> : <FaThumbsDown className='thumbs--down'/> }</p>
                    <p className='book--option'>Beginner {book.options.beginner ? <FaThumbsUp className='thumbs--up' /> : <FaThumbsDown className='thumbs--down' /> }</p>
                    <p className='book--option'>Experienced Trader {book.options.experiencedTrader ? <FaThumbsUp className='thumbs--up' /> : <FaThumbsDown className='thumbs--down' /> }</p>
                </div>
                <a href={book.link} target='/blank' className='book--link'>Amazon <FiExternalLink /> </a>
            
            </div>
        </div>
    )

    return (
        <div className='books--page'>

            <header>
                <Header />
                <Navbar />
                <StockFeed />

            </header>

            <div className="books--page--container"> 
                <div className='books--container'>
                    {renderedBooks}
                </div>
            </div>

            
            <div className='footer--section'>
                    <Footer />
            </div> 

        </div>
        
    )
}

export default BooksPage
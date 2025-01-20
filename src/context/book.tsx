 
import { ReactNode, createContext, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "axios"
import { AxiosError } from "axios"

interface Book {

    title: string,
    ISBNCode: number
    author: string,
    link: string
    options: {
        beginner: boolean
        experiencedTrader: boolean
        selfHelp: boolean
    }
}

type GlobalBooks = {

    books: Book[] | []
    
    setBooks: React.Dispatch<React.SetStateAction<[] | Book[]>>
    
    getAllBooks: () => void
    publishBook: (data: { 
        title: string, 
        author: string, 
        ISBNCode: number, 
        link: string, 
        options: { 
            selfHelp: boolean, 
            experiencedTrader: boolean, 
            beginner: boolean 
        }} ) => Promise<boolean>


}

export const BooksContext = createContext<GlobalBooks>({

    books: [],


    setBooks: () => {},

    getAllBooks: () => {},
    publishBook: () => Promise.reject()
})


export default function BooksProvider( { children } : { children: ReactNode} ) {


    const [ books, setBooks ] = useState<Book[] | []>([])
    const { err, setErr } = useAuth();

    const getAllBooks = async () => {

        try {
            
            const response = await axios({
             
                url: "https://backend-final-self.vercel.app/api/v1/books/all",
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            }) 
            

            if (response.status === 200) {

                setBooks(response.data.books)
            }

        }

        catch (error) {
            
            if (error instanceof AxiosError)
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

    const publishBook = async (data: { 
        title: string, 
        author: string, 
        ISBNCode: number, 
        link: string,
        options: { 
            selfHelp: boolean, 
            experiencedTrader: boolean, 
            beginner: boolean 
        }} ) => 
            
        {
            
            try {
                console.log(data);
                    
                const response = await axios({
                    url: "https://backend-final-self.vercel.app/api/v1/books/newBook",
                    method: "POST",
                    
                    withCredentials: true,
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data,
                })
                 

                if (response.status === 200) { 
                    setErr({...err, isErr: false, message: '', type: '', statusCode: 200})
                    return true
                }
                
                return false
            }

            catch (error)
            {
                if (error instanceof AxiosError) {
                    
                    if(error.message === 'NetworkError') {
                        setErr({...err, isErr: true, message: err.message ,type: 'Bad Connection'})
            
                    } 
                    
                    if (error.response) {
                        if (error?.response.data.error.statusCode === 400 ) {
                             
                            setErr({...err, isErr: true, message: error.response.data.message , statusCode: error.response.data.error.statusCode , type: 'DuplicateError'})
                        }
        
                        else if (error?.response.data.error.statusCode === 401) {
                            setErr({...err, isErr: true, message: error.response.data.message , statusCode: 401 , type: 'ValidationError'})
                        
                        }
        
                    }
                    else
                    {
                        setErr({...err, isErr: true, message: 'Something went wrong!', statusCode: 400, type: 'Unknown'})
                    }
                }

                return false
                
            }
            
        }


    return <BooksContext.Provider value={ { books, setBooks, getAllBooks, publishBook } }>
        { children }
    </BooksContext.Provider>
}



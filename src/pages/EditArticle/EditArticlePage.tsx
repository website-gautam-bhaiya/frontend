import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar" 

import { useParams } from "react-router-dom"  
import { useNavigate } from "react-router-dom"
import { SyntheticEvent, useEffect, useState } from "react"

import { GrCircleAlert } from "react-icons/gr"; 

import useAuth from "../../hooks/useAuth"
import useNews from "../../hooks/useNews"

const EditArticlePage = ( ) => {
 
    const {  updateArticle, getArticle  } = useNews();

    const { auth, setErr, err } = useAuth();
    const navigate = useNavigate()
    const articleId = useParams().id as string 
     

    const [ titleValue, setTitleValue ] = useState<string>('')
    const [ bodyValue, setBodyValue ] = useState<string>('')
    const [ isQuarterly, setIsQuarterly ]= useState<boolean>(false)

    const editArticleSet = async () => {

        const article = await getArticle(articleId)

        if (article) {
            setBodyValue(article.body)
            setTitleValue(article.title)
        }
    }

    useEffect( () => {
         
        editArticleSet() 

    }, [])
 
    const handleCategoryChange = (event: SyntheticEvent) => {

        const target = event.target as HTMLInputElement

        if( target.value === 'Quarterly Results')
        {
            setIsQuarterly(true)
            return
        }

        setIsQuarterly(false)
    }

    const handleSubmit = async(event: SyntheticEvent) => {

        event.preventDefault();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        const updatedData = {
            title : target[0].value,
            body : target[2].value,
            categories : target[3].value,
            subCategory: undefined
        }

        if (!updatedData.title || !updatedData.body || !updatedData.categories)
        {
            setErr({isErr: true, message: "Please fill all the fields before publishing!", statusCode: 400, type: "ValidationError" })
            return
        }

        if (isQuarterly) {
            updatedData.subCategory = target[4].value
        }
        
        const isSuccess = await updateArticle(articleId , updatedData )

        if(isSuccess) navigate('/myAccount')
    }

    return (

        <div className='publish--page'>
            <Header />
            <Navbar />
            <div> 
                <form onSubmit={handleSubmit}  className="publish--form">

                    {err.isErr ? <label className="err--label"> <GrCircleAlert /> {err.message}</label> : ''}
                    <input onChange={(e) => setTitleValue(e.target.value)} value = {titleValue} className='publish--input' placeholder= 'Enter title here...' />
                    <input value={auth.user.name} className='publish--input' disabled placeholder="Author's Name"/> 
                    <textarea onChange={(e) => setBodyValue(e.target.value)} value = {bodyValue} placeholder = 'Start typing here...' >
                    </textarea>
    
        
                    <select onChange={handleCategoryChange} >
                        <option>Market Movers</option>
                        <option>Quarterly Results</option>
                        <option>Industry Analysis</option>
                        <option>Budget</option>
                        <option>News</option>
                    </select>

                    <select style={{'display': isQuarterly ? 'block' : 'none'}} >
                        <option>Quarter - I</option>
                        <option>Quarter - II</option>
                        <option>Quarter - III</option>
                        <option>Quarter - IV</option>
                    </select>

                    <div>
                        
                    </div>
                    <button className='post--btn'>Post</button>
                </form>
            </div>
            
        </div>
        )
}

export default EditArticlePage
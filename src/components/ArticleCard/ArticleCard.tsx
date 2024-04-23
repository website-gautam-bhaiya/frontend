import { News } from "../../context/news" 
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { useState } from "react";

import './ArticleCard.css' 
import Article from "./Article";
import useNews from "../../hooks/useNews";



const ArticleCard = ( { article, isOperations } : { article: News, isOperations ?: boolean }) => {
      
    const [isDeleteReq, setisDeleteReq] = useState<boolean>(false)
    const {deleteArticle} = useNews()

    const handleDelete = () => {

        deleteArticle(article._id)
        window.location.reload()
    }

 
    if( isOperations) {
        return(
            <div className="my--article"> 
                <Article article={article} />
                <div className="article--operations">
                    <button onClick={() => { setisDeleteReq(true)}} className="remove--btn"> <FaTrash /> </button> 
                    <Link to = {`/editArticle/${article._id}`}> <button className="edit--article--btn"> <FaPencilAlt /> </button> </Link> 

                    <div style={{'display': isDeleteReq ? 'block' : 'none'}}> 
                        <h2>Are you sure you want to delete this article?</h2>
                        <button  onClick={handleDelete} className="post--btn"> Confirm </button>
                        <button  onClick={() => { setisDeleteReq(false)}} className="logout--btn"> Cancel </button>
                    </div>

                </div>

            </div>
        )
    }

    return (
        
        <Article article={article} /> 
    )
}

export default ArticleCard
import { News } from "../../context/news"
import { Link } from "react-router-dom" 

// Involving CSS in ArticleCard.css

const Article = ( { article }: {article: News}) => {



    const formatDate = (date: string) :string => `${date.substring(4,11)}, ${date.substring(11,15)}${date.substring(15,21)} ` 
     

    return (
            <div className="article--container  " >
                    <span className="article--category ">{article?.categories}</span>
                    <div className="article--main">
                        <Link to = {`/article/${article._id}`}><h2  >{`${article?.title}`}</h2></Link> 


                    </div>
                    <div className="article--img-div">
                        <img src = {article?.imageCover} />
                    </div>
                    <div> 
                        <span className="article--preview">{article.preview}</span>
                    </div>
                    <div className="article--footer"> 
                        <span> {article?.publishedBy?.name} </span> 
                        <span> {formatDate(new Date(article?.publishedOn).toString())} </span>
                        {article.subCategory ?  <span> {article?.subCategory}</span> : ' '}
                    </div>
            </div>  
    )
}

export default Article
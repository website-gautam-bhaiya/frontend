import { useEffect, useState } from "react"
import './Carousel.css'  
import { Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import axios  from "axios";

const Carousel = () => {
    
    const [current, setCurrent] = useState<number>(0)
    const [topArticles, setTopArticles] = useState([{
        imageCover: '',
        title: '',
        body: '',
        publishedBy: {
            name:'',
            profilePhoto: ''
        },
        publishedOn: '',
        categories: '',
        views: '',
        _id: ''

    }]);

    useEffect( () => {
        axios({
            method: "GET",
            url: `https://news-api-qsji.onrender.com/api/v1/articles/nivesh-top`,
            headers: 
                {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
    
        }).then((res) => setTopArticles(res.data.data.articles))
    }, [])
 
    const formatDate = (date: string) :string => `${date.substring(4,11)}, ${date.substring(11,15)}${date.substring(15,21)} ` 

    const renderedIndices = topArticles.map( (_, i) => {
        
        if((current % topArticles.length) === i)
        { 
            return <div key={i} onClick = {() => setCurrent(i)} className="carousel--index active"></div>
        }

        return <div key={i} onClick = {() => setCurrent(i)} className="carousel--index"></div>
    } )
 
       
    
    const handleDecrement = () => {
        
        if(current === 0) {
            setCurrent(4)
        }

        else {
            setCurrent((prev) => prev - 1)
        }
    }
    
    return(
        <div className=" carousel "  style={ { 'backgroundImage' : ` linear-gradient(to bottom, rgba(255,255,255,0.1),  rgba(0,0,0,0.5)),url(${topArticles[current % topArticles.length]?.imageCover})`} }> 
            <div className="top--news">
                <Link to={'/vista-top'}> <h1>NiveshTop <MdKeyboardArrowRight className="fwd--icon" /> </h1>      </Link>   
            </div>

            <div className="flex--row carousel--body">
                <div className="carousel--arrow ">
                  <MdKeyboardArrowLeft   onClick={handleDecrement} className="carousel--left   "  /> 
                </div>
                 
                 <div className="carousel--content">
                    <Link  to = {`/article/${topArticles[current % topArticles.length]._id}`}><h2  >{topArticles[current % topArticles.length]?.title.substring(0,100)}</h2></Link> 
                    <div className="article--footer"> 
                        <span>{topArticles[current % topArticles.length]?.publishedBy?.name}</span> 
                        <span>{formatDate( new Date( topArticles[current % topArticles.length]?.publishedOn).toString()) } </span>
                        <span>{topArticles[current % topArticles.length]?.categories}</span>
                        
                    </div>

                 </div> 

                <div className="carousel--arrow ">
                    <MdKeyboardArrowRight   onClick={ () => setCurrent((prev) => prev + 1)} className="carousel--right  "  />
                </div>
            </div>

            <div>

            </div>

            <div className="carousel--nav">
                {renderedIndices}
            </div>
        </div>
        )
}

export default Carousel
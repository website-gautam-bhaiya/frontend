import './ArticlePage.css'
import axios from 'axios'
 
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer'; 
import Navbar from '../../components/Navbar/Navbar';
import Markdown from 'react-markdown';

import { ReactNode, useEffect } from 'react';
import { IoEye } from "react-icons/io5"; 
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { useParams } from 'react-router-dom';  

const ArticlePage = () => {

    useEffect( () => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:3000/api/v1/articles/${articleID.id}`, 
            headers: 
                {  
                    'Content-Type': 'application/json',
                }
    
        }).then((res) => {
            setCurrentArticle(res.data.data.article)  
    
        }).catch(err => console.log(err) )
    
    }, [])

    const articleID = useParams(); 
    
    const [ currentArticle, setCurrentArticle ] = useState({
        imageCover: '',
        title: '',
        body: '',
        publishedBy: {
            name:'',
            profilePhoto: ''
        },
        articleImages: [],
        publishedOn: '',
        categories: '',
        views: ''

    });
    
    let renderedContent: ReactNode[] = [];
    
    
    if(currentArticle.articleImages.length > 0) {
        let splitBodyText: string[] = [];
        const images = [...currentArticle.articleImages ]

        splitBodyText = currentArticle.body.split('/***IMAGE-PLACEHOLDER***/')

        renderedContent = splitBodyText.map((text, index) => 
        {
            if(index === splitBodyText.length - 1)
            {
                return(

                <div className = {`article--body part--${index}`}>
                    <Markdown>{text}</Markdown> 
                </div>

                )
            }
             
            return(

            <div className = {`article--body part--${index}`}>
                <Markdown>{text}</Markdown>
                <img className={`article--image img--${index}`} src={`http://localhost:3000/images/${images.splice(0,1)}`} />
            </div>
            
            )
        })

        if(images.length > 0) {
            
            images.forEach((image) => renderedContent.push(<img className='article--image end--images' src={`http://localhost:3000/images/${image}`} />))
        }
        
    } 

    else 
    {
        renderedContent.push(<Markdown>{currentArticle.body}</Markdown>)
    }
    

    const formatDate = (date: string) :string => `${date.substring(4,11)}, ${date.substring(11,15)}${date.substring(15,21)} ` 
     
     
    return (  
            <div className=''> 
                <Header />
                <Navbar /> 
                    
                <div className='article--page--container'>
                     

                    <div className="article--metadata" style={ { 'backgroundImage' : ` linear-gradient(to bottom, rgba(255,255,255,0.1),  rgba(0,0,0,0.5)),url(${currentArticle?.imageCover})`} }>
                        <h1>{currentArticle?.title}</h1>

                        <div className='article--about'>
                            <span><FaRegUserCircle /> {currentArticle?.publishedBy.name}</span>
                            <span>{currentArticle?.categories}</span>
                        </div>

                    </div>

                    <div className="article--metrics">
                        <span> <IoEye /> {currentArticle?.views}</span>
                        <span> {formatDate(new Date(currentArticle?.publishedOn).toString())}</span>
                    </div>

                    <div className='article--content'>
                        {renderedContent}
                    </div>
                </div>   
                <Footer /> 
            </div>   
    )
}

export default ArticlePage;
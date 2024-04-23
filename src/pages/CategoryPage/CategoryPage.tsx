  
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import StockFeed from "../../components/StockFeed/StockFeed";
import GainersLosers from "../../components/GainersLosers/GainersLosers";

import ArticleCard from "../../components/ArticleCard/ArticleCard";
import CategorySkeleton from "../../components/Placeholders/CategorySkeleton/CategorySkeleton";

import './CategoryPage.css'
import useNews from "../../hooks/useNews";
import QuarterlyResults from "../../components/QuarteryResults/QuarterlyResults";


const CategoryPage = () => {

    let category: string = '';
    const params = useParams();
    
    if(params.name)
    {
        category = params.name ; 
    }

    const {categoryArticles, getArticlesByCategories} = useNews();
    let renderedArticles;

    useEffect( () => {  
        
        getArticlesByCategories(category);

    }, [category])

    if (category !== 'quarterly-results') 
    {
        renderedArticles = categoryArticles.map( (article) => <ArticleCard key={article._id}  article={article}/>)
    }


    return (
        <div>
            <header >
                <Header />
                <Navbar />
                <StockFeed />
            </header>

            <div className='homepage--body  '> 
                <div className='top--section '  >
                    
                        <GainersLosers />  
                        <div className="category--section">
                            <h1>{category?.split('-').map(i => i.charAt(0).toUpperCase() + i.substring(1, i.length)).join(' ')}</h1>
                            
                            <div style={{'display': category === 'quarterly-results' ? 'none': 'block'}}>
                                {categoryArticles.length > 0 ? renderedArticles: <CategorySkeleton />}  
                            </div> 
                            
                            <div style={{'display': category === 'quarterly-results' ? 'block': 'none'}}>
                                <QuarterlyResults  />
                            </div> 
                        </div> 
                </div>  
            
            </div>
 
            <div className='footer--section'>
                    <Footer />
            </div> 
        </div>
    )
}

export default CategoryPage
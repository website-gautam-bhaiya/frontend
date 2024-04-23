import './HomePage.css' 
import useNews from '../../hooks/useNews.ts'; 

import { useEffect, useRef } from 'react';  
 
import StockFeed from '../../components/StockFeed/StockFeed.tsx';
import Header from '../../components/Header/Header'; 
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Carousel from '../../components/Carousel/Carousel';
import GainersLosers from '../../components/GainersLosers/GainersLosers.tsx';

const HomePage = () => {
    
    const {news, getFrontPageNews } = useNews(); 
    const navRef = useRef<HTMLDivElement | null>(null)   
 
    // ---------------------------------------------------------------------------- // 
   
    useEffect( () => {
        getFrontPageNews();

    }, [])


    const frontPageNews = news.map( (article) => <ArticleCard key={article._id} article={article} />) 
    
    return (
        <div className='page--head '>
            <header ref={navRef}>
                <Header />
                <Navbar />
                <StockFeed />
            </header>
             

            <div className='homepage--body  '> 
                <div className='top--section '  >
                    
                        <GainersLosers />
                        <Carousel /> 
                </div>

                <div className='articles--section'>
                    {frontPageNews}
                </div> 
            
            </div>
 
            <div className='footer--section'>
                    <Footer />
            </div> 
        </div>
    )
}

export default HomePage
 
import './TopArticlePage.css'

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar'; 
import Footer from '../../components/Footer/Footer';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import useNews from '../../hooks/useNews.ts'; 

const TopArticlePage = ( ) => {
     
    const{news} = useNews();

    const renderedArticles = news.sort( (curr, next) =>  next.views - curr.views  ).filter( (_, i) => i < 5).map( (article) => <ArticleCard article={article} />) 
    return (
        <div className='top--articles--page'>
            <header>
                <Header />
                <Navbar />
            </header>
  

            <div className="top--articles--heading">
                <h1>Hot Articles</h1>
            </div>
                
            <div className='articles--list'> 

                    {renderedArticles}
            </div>
 
            <footer className='footer--section'>
                <Footer />
            </footer>
        </div>
    )
}

export default TopArticlePage

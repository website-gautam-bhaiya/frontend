
import { SyntheticEvent, useState } from 'react' 
import './QuarterlyResults.css'
import useNews from '../../hooks/useNews'
import ArticleCard from '../ArticleCard/ArticleCard'
import { MdOutlineArticle } from "react-icons/md";

const QuarterlyResults = () => {


    const [ quarter, setQuarter ] = useState<string>('Quarter - I') 
    const { categoryArticles } = useNews();

    const filtertedArticles = categoryArticles.filter(article => article.subCategory === quarter)
    const renderedArticles = filtertedArticles.map( article => <ArticleCard article={article} />)
    
    const emptyCategoryContent = 
    <div className='empty--section'>
        <h3>No Articles Found <MdOutlineArticle/ > </h3>
    </div>

    const handleClick = (event: SyntheticEvent) => {
        
        const target = event.target as HTMLElement
        setQuarter(target.innerText) 
        
    } 

    
    return (
        <div>
            <div className='qtr--btns'>
                <button className = { quarter === 'Quarter - I' ? ' btn--active ' : 'quarter--btn'} onClick={handleClick}>Quarter - I</button>
                <button className = { quarter === 'Quarter - II' ? ' btn--active ' : 'quarter--btn'} onClick={handleClick}>Quarter - II</button>
                <button className = { quarter === 'Quarter - III' ? ' btn--active ' : 'quarter--btn'} onClick={handleClick}>Quarter - III</button>
                <button className = { quarter === 'Quarter - IV' ? ' btn--active ' : 'quarter--btn'} onClick={handleClick}>Quarter - IV</button>
            </div>

            {renderedArticles.length > 0 ? renderedArticles : emptyCategoryContent}
        </div>
    )
}

export default QuarterlyResults
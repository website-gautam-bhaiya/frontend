 
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import NewsProvider from './context/news.js'
import StocksProvider from './context/stocks.tsx'
import AuthProvider from './context/auth.tsx'
import BooksProvider from './context/book.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render( 

  <AuthProvider>
    <NewsProvider>
      <BooksProvider>
        <StocksProvider>
          <App />
        </StocksProvider>
      </BooksProvider>
    </NewsProvider> 
  </AuthProvider>
)

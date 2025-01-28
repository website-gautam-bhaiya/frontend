import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import NewsProvider from './context/news.tsx';
import StocksProvider from './context/stocks.tsx';
import AuthProvider from './context/auth.tsx';
import BooksProvider from './context/book.tsx';
import axios from 'axios'; // Import Axios for global configuration

// Global Axios Configuration
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // Dynamically set baseURL
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; // Enable this if you use cookies for authentication

// Add Authorization token globally
const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add global interceptors for request and response
axios.interceptors.request.use(
  (config) => {
    console.log('Request:', config); // Debugging request
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response.data, // Simplify response
  (error) => {
    console.error('API Error:', error.response?.data || 'An error occurred.');
    return Promise.reject(error.response?.data?.message || 'An error occurred.');
  }
);

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
);

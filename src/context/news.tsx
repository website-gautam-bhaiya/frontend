import { ReactNode, createContext, useState } from "react"; 
import axios, { AxiosError } from 'axios'; 
import useAuth from "../hooks/useAuth"; 

export interface User {
    name: string;
    profilePhoto: string;
    email: string;
    role: string;
    _id: string;
} 

export interface News {
    publishedBy: User;
    _id: string;
    title: string;
    body: string;
    imageCover: string;
    articleImages?: string[];
    preview?: string;
    categories: string;
    subCategory?: string;
    publishedOn: string;
    views: number;
}

type GlobalNews = {
    news: News[]; 
    currentArticle: News | null; 
    articlesPublished: News[]; 
    categoryArticles: News[];

    setNews: React.Dispatch<React.SetStateAction<News[]>>; 
    setCurrentArticle: React.Dispatch<React.SetStateAction<News | null>>; 
    setArticlesPublished: React.Dispatch<React.SetStateAction<News[]>>; 
    setCategoryArticles: React.Dispatch<React.SetStateAction<News[]>>;

    getArticle: (id: string) => Promise<News | false>;
    getArticlesPublishedBy: (id: string) => void;
    postArticle: (article: FormData) => Promise<boolean>;
    updateArticle: (id: string, data: { title?: string; body?: string; categories?: string }) => Promise<boolean>;
    deleteArticle: (id: string) => Promise<boolean>;
    getArticlesByCategories: (category: string) => void;
    getFrontPageNews: () => void;
}

export const NewsContext = createContext<GlobalNews>({
    news: [], 
    currentArticle: null, 
    articlesPublished: [], 
    categoryArticles: [], 
    setNews: () => {}, 
    setCurrentArticle: () => {}, 
    setArticlesPublished: () => {},  
    setCategoryArticles: () => {}, 
    getArticle: () => Promise.reject(),
    getArticlesPublishedBy: () => {},
    postArticle: () => Promise.reject(),
    updateArticle: () => Promise.reject(),
    deleteArticle: () => Promise.reject(),
    getArticlesByCategories: () => {},
    getFrontPageNews: () => {}
});

export default function NewsProvider({ children }: { children: ReactNode }) {
    const [news, setNews] = useState<News[]>([]); 
    const [currentArticle, setCurrentArticle] = useState<News | null>(null); 
    const [articlesPublished, setArticlesPublished] = useState<News[]>([]); 
    const [categoryArticles, setCategoryArticles] = useState<News[]>([]); 
    
    const { err, setErr } = useAuth();
    
    // Reusable error handler function
    const handleError = (error: AxiosError) => {
        if (error.message === 'NetworkError') {
            setErr({ ...err, isErr: true, message: 'Bad Connection', type: 'Bad Connection' });
        } else if (error.response && error.response.data.error.statusCode === 400) {
            setErr({ ...err, isErr: true, message: error.response.data.message, type: 'DuplicateError', statusCode: 400 });
        } else {
            setErr({ ...err, isErr: true, message: 'Something went wrong!', statusCode: 400, type: 'Unknown' });
        }
    };

    // Fetch an individual article
    const getArticle = async (id: string): Promise<News | false> => {
        try {
            const response = await axios.get(`https://backend-final-self.vercel.app/api/v1/articles/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                return response.data.data.article;
            }
            return false;
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
            return false;
        }
    };

    // Fetch articles published by a specific user
    const getArticlesPublishedBy = async (userId: string) => {
        try {
            const response = await axios.get(`https://backend-final-self.vercel.app/api/v1/articles/publishedBy/${userId}`, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.results > 0) {
                setArticlesPublished(response.data.articles);
                setErr({ ...err, isErr: false, message: '', type: '', statusCode: 200 });
            }
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
        }
    };

    // Post a new article
    const postArticle = async (article: FormData): Promise<boolean> => {
        try {
            const response = await axios.post('https://backend-final-self.vercel.app/api/v1/articles', article, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (response.status === 200) {
                setErr({ ...err, isErr: false, message: '', type: '', statusCode: 200 });
                return true;
            }
            return false;
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
            return false;
        }
    };

    // Delete an article by ID
    const deleteArticle = async (id: string): Promise<boolean> => {
        try {
            await axios.delete(`https://backend-final-self.vercel.app/api/v1/articles/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            return true;
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
            return false;
        }
    };

    // Update an article
    const updateArticle = async (id: string, data: { title?: string; body?: string; categories?: string }): Promise<boolean> => {
        try {
            const response = await axios.patch(`https://backend-final-self.vercel.app/api/v1/articles/${id}`, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                setErr({ ...err, isErr: false, message: '', type: '', statusCode: 200 });
                return true;
            }
            return false;
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
            return false;
        }
    };

    // Fetch articles by category
    const getArticlesByCategories = async (category: string) => {
        try {
            const response = await axios.get(`https://backend-final-self.vercel.app/api/v1/articles/category/${category}`, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setCategoryArticles(response.data.data.articles);
            }
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
        }
    };

    // Fetch front page news
    const getFrontPageNews = async () => {
        try {
            const response = await axios.get('https://backend-final-self.vercel.app/api/v1/articles/frontPageNews', {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setNews(response.data.articles);
            }
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
        }
    };

    return (
        <NewsContext.Provider value={{
            news,
            setNews,
            setCurrentArticle,
            currentArticle,
            getArticle,
            getArticlesPublishedBy,
            postArticle,
            deleteArticle,
            updateArticle,
            articlesPublished,
            setArticlesPublished,
            categoryArticles,
            setCategoryArticles,
            getArticlesByCategories,
            getFrontPageNews
        }}>
            {children}
        </NewsContext.Provider>
    );
}

import { ReactNode, createContext, useState } from "react";
import axios, { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";

const BASE_URL = "https://backend-final-self.vercel.app/api/v1";

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
    articlesPublished: News[] | [];
    categoryArticles: News[] | [];
    setNews: React.Dispatch<React.SetStateAction<News[]>>;
    setCurrentArticle: React.Dispatch<React.SetStateAction<News | null>>;
    setArticlesPublished: React.Dispatch<React.SetStateAction<News[] | []>>;
    setCategoryArticles: React.Dispatch<React.SetStateAction<News[] | []>>;
    getArticle: (id: string) => Promise<News | false>;
    getArticlesPublishedBy: (id: string) => void;
    postArticle: (article: FormData) => Promise<boolean>;
    updateArticle: (id: string, data: { title?: string; body?: string; categories?: string }) => Promise<boolean>;
    deleteArticle: (id: string) => Promise<boolean>;
    getArticlesByCategories: (category: string) => void;
    getFrontPageNews: () => void;
};

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

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            setErr({
                ...err,
                isErr: true,
                message: error.message || "Something went wrong!",
                type: "Error",
                statusCode: error.response?.status || 500
            });
        }
    };

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });

    const getFrontPageNews = async () => {
        try {
            const response = await axiosInstance.get(`/articles/frontPageNews`);
            setNews(response.data?.articles || []); // Safely handle missing fields
        } catch (error) {
            if (error instanceof AxiosError) handleError(error);
        }
    };
    return (
        <NewsContext.Provider
            value={{
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
            }}
        >
            {children}
        </NewsContext.Provider>
    );
}

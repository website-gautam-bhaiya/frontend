import { ReactNode, createContext, useState, useEffect } from "react";
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

    const handleError = (error: unknown, message: string) => {
        console.error("Error:", error);
        if (error instanceof AxiosError) {
            setErr({
                ...err,
                isErr: true,
                message: error.response?.data?.message || message,
                type: "Error",
                statusCode: error.response?.status || 500,
            });
        }
    };

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    const getFrontPageNews = async () => {
        try {
            const response = await axiosInstance.get(`/articles/frontPageNews`);
            const articles = response.data?.articles;
            if (Array.isArray(articles)) {
                setNews(articles);
            } else {
                console.warn("Invalid articles data:", articles);
                setNews([]); // Fallback to empty array if data is invalid
            }
        } catch (error) {
            handleError(error, "Failed to fetch front page news.");
        }
    };

    const getArticle = async (id: string): Promise<News | false> => {
        try {
            const response = await axiosInstance.get(`/articles/${id}`);
            return response.data?.data?.article || false;
        } catch (error) {
            handleError(error, "Failed to fetch article.");
            return false;
        }
    };

    const getArticlesPublishedBy = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/articles/publishedBy/${userId}`);
            setArticlesPublished(response.data?.articles || []);
        } catch (error) {
            handleError(error, "Failed to fetch articles published by user.");
        }
    };

    const postArticle = async (article: FormData): Promise<boolean> => {
        try {
            const response = await axiosInstance.post(`/articles`, article, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.status === 200;
        } catch (error) {
            handleError(error, "Failed to post article.");
            return false;
        }
    };

    const deleteArticle = async (id: string): Promise<boolean> => {
        try {
            await axiosInstance.delete(`/articles/${id}`);
            return true;
        } catch (error) {
            handleError(error, "Failed to delete article.");
            return false;
        }
    };

    const updateArticle = async (id: string, data: { title?: string; body?: string; categories?: string }): Promise<boolean> => {
        try {
            const response = await axiosInstance.patch(`/articles/${id}`, data);
            return response.status === 200;
        } catch (error) {
            handleError(error, "Failed to update article.");
            return false;
        }
    };

    const getArticlesByCategories = async (category: string) => {
        try {
            const response = await axiosInstance.get(`/articles/category/${category}`);
            setCategoryArticles(response.data?.data?.articles || []);
        } catch (error) {
            handleError(error, "Failed to fetch articles by category.");
        }
    };

    useEffect(() => {
        getFrontPageNews();
    }, []);

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
                getFrontPageNews,
            }}
        >
            {children}
        </NewsContext.Provider>
    );
}

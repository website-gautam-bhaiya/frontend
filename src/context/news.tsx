import { ReactNode, createContext, useState, useEffect } from "react";
import { User } from "./news";
import axios, { AxiosError } from "axios";

// Define the BASE_URL
const BASE_URL = "https://backend-final-self.vercel.app/api/v1";

// Types
interface ErrorResponse {
  error: {
    statusCode: number;
  };
  message: string;
}

interface News {
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

interface Error {
  isErr: boolean;
  message: string;
  statusCode?: number;
  type: string;
}

interface GlobalNews {
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
  getFrontPageNews: () => {},
});

// Type Guard to check if the error is an AxiosError
const isAxiosError = (error: any): error is AxiosError<ErrorResponse> => {
  return error.isAxiosError && error.response && error.response.data;
};

// Error handler function
const handleError = (error: unknown, setErr: React.Dispatch<React.SetStateAction<Error>>) => {
  if (isAxiosError(error)) {
    const { response } = error;

    if (response) {
      const { statusCode, message } = response.data.error;
      if (error.message === "NetworkError") {
        setErr({ isErr: true, message: "Bad Connection", type: "Bad Connection", statusCode: 500 });
      } else if (statusCode === 400) {
        setErr({ isErr: true, message, type: "DuplicateError", statusCode: 400 });
      } else {
        setErr({ isErr: true, message: "Something went wrong!", statusCode: 400, type: "Unknown" });
      }
    }
  } else {
    setErr({ isErr: true, message: "An unexpected error occurred.", type: "Unknown", statusCode: 500 });
  }
};

export default function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<News[]>([]);
  const [currentArticle, setCurrentArticle] = useState<News | null>(null);
  const [articlesPublished, setArticlesPublished] = useState<News[] | []>([]);
  const [categoryArticles, setCategoryArticles] = useState<News[] | []>([]);

  const [err, setErr] = useState<Error>({
    isErr: false,
    message: "",
    statusCode: 200,
    type: "",
  });

  // Function to get an individual article by id
  const getArticle = async (id: string): Promise<News | false> => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        return response.data.data.article;
      }

      return false;
    } catch (error) {
      handleError(error, setErr);  // Call handleError for better error handling
      return false;
    }
  };

  // Fetch articles published by a specific user
  const getArticlesPublishedBy = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/publishedBy/${userId}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.results > 0) {
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
        setArticlesPublished(response.data.articles);
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
    }
  };

  // Post a new article
  const postArticle = async (article: FormData): Promise<boolean> => {
    try {
      const response = await axios.post(`${BASE_URL}/articles`, article, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
      return false;
    }
  };

  // Delete an article by id
  const deleteArticle = async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${BASE_URL}/articles/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return true;
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
      return false;
    }
  };

  // Update an article by id
  const updateArticle = async (id: string, data: { title?: string; body?: string; categories?: string }): Promise<boolean> => {
    try {
      const response = await axios.patch(`${BASE_URL}/articles/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setErr({ ...err, isErr: false, message: "", type: "", statusCode: 200 });
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
      return false;
    }
  };

  // Fetch articles by category
  const getArticlesByCategories = async (category: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/category/${category}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setCategoryArticles(response.data.data.articles);
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
    }
  };

  // Fetch front page news articles
  const getFrontPageNews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/frontPageNews`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setNews(response.data.articles);
      }
    } catch (error) {
      if (error instanceof AxiosError) handleError(error, setErr);
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
        getFrontPageNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

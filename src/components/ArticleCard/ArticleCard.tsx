import { News } from "../../context/news";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./ArticleCard.css";
import Article from "./Article";
import useNews from "../../hooks/useNews";

const ArticleCard = ({
    article,
    isOperations,
}: {
    article: News;
    isOperations?: boolean;
}) => {
    const [isDeleteReq, setIsDeleteReq] = useState<boolean>(false);
    const { deleteArticle } = useNews();

    // Handle delete operation
    const handleDelete = async () => {
        if (!article?._id) {
            console.error("Article ID is missing. Cannot delete.");
            return;
        }

        const isSuccess = await deleteArticle(article._id);
        if (isSuccess) {
            console.log("Article deleted successfully.");
            window.location.reload(); // Ideally replace this with a state update
        } else {
            console.error("Failed to delete the article.");
        }
    };

    // Render delete confirmation UI
    const renderDeleteConfirmation = () => {
        return (
            <div className={`delete-confirm ${isDeleteReq ? "visible" : ""}`}>
                <h2>Are you sure you want to delete this article?</h2>
                <button onClick={handleDelete} className="post--btn">
                    Confirm
                </button>
                <button
                    onClick={() => {
                        setIsDeleteReq(false);
                    }}
                    className="logout--btn"
                >
                    Cancel
                </button>
            </div>
        );
    };

    // Safeguard article rendering
    if (!article || !article.title) {
        return (
            <div className="article-error">
                <h2>Invalid Article</h2>
                <p>Unable to render this article. Please try again later.</p>
            </div>
        );
    }

    // Render article with operations (if isOperations is true)
    if (isOperations) {
        return (
            <div className="my--article">
                <Article article={article} />
                <div className="article--operations">
                    <button
                        onClick={() => {
                            setIsDeleteReq(true);
                        }}
                        className="remove--btn"
                    >
                        <FaTrash />
                    </button>
                    <Link to={`/editArticle/${article._id}`}>
                        <button className="edit--article--btn">
                            <FaPencilAlt />
                        </button>
                    </Link>
                    {renderDeleteConfirmation()}
                </div>
            </div>
        );
    }

    // Default render for ArticleCard
    return <Article article={article} />;
};

export default ArticleCard;

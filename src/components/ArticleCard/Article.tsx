import { News } from "../../context/news";
import { Link } from "react-router-dom";

// Involving CSS in ArticleCard.css

const Article = ({ article }: { article: News }) => {
    // Safely format the date
    const formatDate = (date?: string): string => {
        if (!date) return "No Date Provided";

        try {
            const formattedDate = `${date.substring(4, 11)}, ${date.substring(11, 15)}${date.substring(15, 21)}`;
            return formattedDate;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };

    // Ensure all article properties are valid before rendering
    if (!article || !article._id || !article.title) {
        return (
            <div className="article--error">
                <p>Invalid article data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="article--container">
            <span className="article--category">{article.categories || "Uncategorized"}</span>

            <div className="article--main">
                <Link to={`/article/${article._id}`}>
                    <h2>{article.title || "Untitled Article"}</h2>
                </Link>
            </div>

            <div className="article--img-div">
                <img
                    src={article.imageCover || "/path-to-default-image.jpg"}
                    alt={article.title || "Article Image"}
                />
            </div>

            <div>
                <span className="article--preview">{article.preview || "No preview available."}</span>
            </div>

            <div className="article--footer">
                <span>{article.publishedBy?.name || "Unknown Author"}</span>
                <span>{formatDate(article.publishedOn)}</span>
                {article.subCategory ? <span>{article.subCategory}</span> : null}
            </div>
        </div>
    );
};

export default Article;

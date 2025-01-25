import { useEffect, useState } from "react";
import "./Carousel.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

import axios from "axios";

const Carousel = () => {
    const [current, setCurrent] = useState<number>(0);
    const [topArticles, setTopArticles] = useState([
        {
            imageCover: "",
            title: "",
            body: "",
            publishedBy: {
                name: "",
                profilePhoto: ""
            },
            publishedOn: "",
            categories: "",
            views: "",
            _id: ""
        }
    ]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `https://backend-final-self.vercel.app/api/v1/articles/nivesh-top`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        })
            .then((res) => setTopArticles(res.data.data.articles || []))
            .catch((error) => {
                console.error("Error fetching top articles:", error);
            });
    }, []);

    // Safely format the date
    const formatDate = (date?: string): string => {
        if (!date) return "No Date Provided";
        try {
            return `${date.substring(4, 11)}, ${date.substring(11, 15)}${date.substring(15, 21)}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };

    // Safely map indices
    const renderedIndices = topArticles.map((_, i) => {
        const isActive = current % topArticles.length === i;
        return (
            <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`carousel--index ${isActive ? "active" : ""}`}
            ></div>
        );
    });

    const handleDecrement = () => {
        setCurrent((prev) => (prev === 0 ? topArticles.length - 1 : prev - 1));
    };

    // Safely access current article
    const currentArticle = topArticles[current % topArticles.length] || {};

    return (
        <div
            className="carousel"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(0,0,0,0.5)),url(${currentArticle.imageCover})`
            }}
        >
            <div className="top--news">
                <Link to={"/vista-top"}>
                    <h1>
                        NiveshTop <MdKeyboardArrowRight className="fwd--icon" />
                    </h1>
                </Link>
            </div>

            <div className="flex--row carousel--body">
                <div className="carousel--arrow">
                    <MdKeyboardArrowLeft onClick={handleDecrement} className="carousel--left" />
                </div>

                <div className="carousel--content">
                    <Link to={`/article/${currentArticle._id}`}>
                        <h2>
                            {currentArticle.title
                                ? currentArticle.title.substring(0, 100)
                                : "No Title Available"}
                        </h2>
                    </Link>
                    <div className="article--footer">
                        <span>{currentArticle.publishedBy?.name || "Unknown Author"}</span>
                        <span>{formatDate(currentArticle.publishedOn)}</span>
                        <span>{currentArticle.categories || "Uncategorized"}</span>
                    </div>
                </div>

                <div className="carousel--arrow">
                    <MdKeyboardArrowRight
                        onClick={() => setCurrent((prev) => prev + 1)}
                        className="carousel--right"
                    />
                </div>
            </div>

            <div className="carousel--nav">{renderedIndices}</div>
        </div>
    );
};

export default Carousel;

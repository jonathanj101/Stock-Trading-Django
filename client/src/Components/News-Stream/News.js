import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const News = () => {
    const [news, setNews] = useState([]);
    const [isNews, setIsNews] = useState(false);

    useEffect(() => {
        let isMountedComponent = true;
        const fetchNews = async () => {
            if (isNews === false) {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/news',
                );
                if (isMountedComponent) {
                    setIsNews(true);
                    setNews(response.data);
                }
            }
        };
        fetchNews();
        return () => (isMountedComponent = false);
    }, [isNews]);

    const newsData = news.map((item, num) => {
        return (
            <Card style={{ width: '100%' }} key={num}>
                <Card.Img src={item.image} />
                <Card.Body key={num}>
                    <Card.Title>{item.headline}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                    </Card.Subtitle>
                    <Card.Text>{item.summary}</Card.Text>
                    <Card.Link target="_blank" href={item.qmUrl}>
                        Read More
                    </Card.Link>
                </Card.Body>
            </Card>
        );
    });

    return (
        <div id="news-component" style={{ margin: '0', height: '100%' }}>
            <div style={{ width: '25%', margin: 'auto' }}>
                <p style={{ fontSize: '2.75rem' }}>News</p>
            </div>
            <div
                id="news_div"
                style={{
                    width: '25%',
                    margin: 'auto',
                    overflow: 'auto',
                    height: '1000px',
                }}
            >
                {newsData}
            </div>
        </div>
    );
};

export default News;

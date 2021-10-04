import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from "react-bootstrap"


const News = () => {

    const [news, setNews] = useState([])
    const [isNews, setIsNews] = useState(false)

    useEffect(() => {
        if (isNews) {
            fetchNews()
        } else {
            setIsNews(true)
        }
    }, [isNews])

    const fetchNews = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/news")
        console.log(response)
        setNews(response.data)
    }

    const table = news.map((item, num) => {
        console.log(item, num)
        return (
            <Card style={{ width: "100%" }} key={num}>
                <Card.Img src={item.image} />
                <Card.Body key={num}>
                    <Card.Title>{item.headline}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        {item.summary}
                    </Card.Text>
                    <Card.Link target="_blank" href={item.qmUrl}>Read More</Card.Link>
                </Card.Body>
            </Card>

        )
    })

    return (
        <div id="news-component" style={{ margin: "0", height: "100%", }}>
            <div>
                <p>News</p>
            </div>
            <div id="news-div" style={{ width: "25%", margin: "auto", overflow: "auto", height: "1000px" }}>
                {table}
            </div>
        </div>
    )
}

export default News

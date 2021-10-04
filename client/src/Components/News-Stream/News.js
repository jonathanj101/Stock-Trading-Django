import React, { useState } from 'react'
import axios from 'axios'


const News = () => {

    const [test, setTest] = useState([])

    const fetchNews = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/news")
        console.log(response)
        setTest(response.data)
    }

    const table = test.map((item, num) => {
        console.log(item, num)
        return (
            <Card>
                <Card.Img src={item.image} />
                <Card.Body key={num}>
                    <Card.Title>{item.headline}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        {item.summary}
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>

        )
    })

    return (
        <div>

        </div>
    )
}

export default News

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from '../Search-Component/SearchComponent';
import News from '../../Components/News-Stream/News';

const Trade = () => {
    // const [news, setNews] = useState([])

    // useEffect(() => {
    //     const fetchNews = async() => {
    //         const response = await axios.get("http://127.0.0.1:8000/api/news")
    //         setNews(response.data)
    //     }
    //     fetchNews()
    // },[])

    return (
        <div id="trade">
            <SearchComponent />
            <div style={{ margin: '200px auto' }}>
                <News />
            </div>
        </div>
    );
};

export default Trade;

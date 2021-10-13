import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StockChart } from '../Chart/StockChart';
import News from '../News-Stream/News';
import InvestingTable from '../Investing/InvestingTable';

const Summary = () => {
    const [stocksData, setStocksData] = useState([]);

    useEffect(() => {
        const localStorageUsername = JSON.parse(
            localStorage.getItem('username'),
        );
        const fetchUserStocks = async () => {
            const response = await axios.put(
                'http://127.0.0.1:8000/api/stocks',
                {
                    username: localStorageUsername,
                },
            );
            setStocksData(response.data.data);
        };
        fetchUserStocks();
    }, []);

    return (
        <div id="summary-component">
            <StockChart />
            <InvestingTable data={stocksData} />
            <News />
        </div>
    );
};

export default Summary;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StockChart } from '../Chart/StockChart';
import News from '../News-Stream/News';
import InvestingTable from '../Investing/InvestingTable';

const Summary = () => {
    const [stocksData, setStocksData] = useState([]);
    const [isSelling, setIsSelling] = useState(false);

    useEffect(() => {
        let isMountedComponent = true;
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
            if (isMountedComponent) {
                setStocksData(response.data.data);
            }
        };
        fetchUserStocks();
        return () => (isMountedComponent = false);
    }, [isSelling]);

    return (
        <div id="summary-component">
            <StockChart isSelling={isSelling} setIsSelling={setIsSelling} />
            <InvestingTable
                data={stocksData}
                setIsSelling={setIsSelling}
                isSelling={isSelling}
            />
            <News />
        </div>
    );
};

export default Summary;

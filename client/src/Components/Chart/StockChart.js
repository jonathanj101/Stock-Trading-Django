import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export const StockChart = () => {
    const [stock, setData] = useState([]);

    const fetchHistory = async () => {
        // debugger
        // const response = await axios.get('http://127.0.0.1:8000/api/stocks');
        // console.log(response);
        const stock = 'aapl';
        const response = await axios.get(
            `http://127.0.0.1:8000/api/stocks/${stock}`,
        );
        console.log(response);
        setData(response.data);
    };

    return (
        <div>
            <button onClick={fetchHistory}>click ere</button>
            <Chart
                width={1000}
                height={'500px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Date', 'Price'],
                    ...stock.map((stock) => [stock.date, stock.close]),
                ]}
                options={{
                    title: 'Investing',
                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0 },
                    // For the legend to fit, we make the chart area smaller
                    chartArea: { width: '50%', height: '70%' },
                    // lineWidth: 25
                }}
            />
        </div>
    );
};

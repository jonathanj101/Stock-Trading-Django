import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export const StockChart = ({ isSelling, setIsSelling }) => {
    const [stock, setData] = useState([]);
    const [username, setUsername] = useState('');
    const [totalInvesting, setTotalInvesting] = useState('');

    useEffect(() => {
        let isMountedComponent = true;
        if (isSelling) {
            setIsSelling(false);
        } else {
            const localStorageUsername = JSON.parse(
                localStorage.getItem('username'),
            );
            const fetchHistory = async () => {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/stocks`,
                    {
                        username: localStorageUsername,
                    },
                );
                if (isMountedComponent) {
                    setData(response.data.data);
                    setTotalInvesting(response.data.investing);
                    setUsername(localStorageUsername);
                }
            };
            fetchHistory();
            return () => {
                isMountedComponent = false;
            };
        }
    }, [isSelling]);

    return (
        <div>
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        width: '50%',
                        margin: '0 auto 100px auto',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ fontSize: '2rem' }}>Welcome {username}</p>
                </div>
                <div>
                    <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Company Name', 'Investing'],
                            ...stock.map((stock) => [
                                stock.companyName,
                                stock.investing,
                            ]),
                        ]}
                        options={{
                            title: `Investing $${totalInvesting}`,
                            chartArea: { width: '50%', height: '70%' },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

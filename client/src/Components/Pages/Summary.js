import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../SideBar-Content/Sidebar';
import SearchComponent from '../../Components/Search-Component/SearchComponent';
import SellStockModal from '../Buy-Sell-Handlers/Sell-Stock/SellStockModal';

const Summary = () => {
    const [companyName, setCompanyName] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [stockCost, setStockCost] = useState('');
    const [estimatedShares, setEstimatedShares] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');
    const [differenceInCost, setDifferenceInCost] = useState('');
    const [userHoldings, setUserHoldings] = useState('');
    const [isSellModal, setIsSellModal] = useState(false);
    const [items, setItems] = useState([]);

    const fetchSome = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/stocks');
        console.log(response);

        setItems(response.data);
    };

    const getStockFromSearchAddToModal = (
        companyName,
        stockSymbol,
        stockCost,
    ) => {
        console.log(
            ` summary component ${companyName}, ${stockSymbol}, ${stockCost}`,
        );
        // setCompanyName(companyName)
        // setStockSymbol(stockSymbol)
        // setStockCost(stockCost)
    };

    const handleStockInfoOnClick = (stock) => {
        console.log(stock);
        setCompanyName(stock.companyName);
        setStockSymbol(stock.symbol);
        setStockCost(stock.cost);
        setUserHoldings(stock.userHoldings);
        setEstimatedShares(stock.userEstimatedShares);
        setEstimatedCost(stock.cost);
        setDifferenceInCost(stock.differenceInCost);
    };

    const handleSellModal = () => {
        setIsSellModal(!isSellModal);
    };

    const userList = items.map((item, num) => {
        return (
            <div>
                <Card style={{ width: '250px', height: '250px' }} key={num}>
                    <Card.Body>
                        <Card.Text>{item.companyName}</Card.Text>
                        <Button
                            onClick={() => {
                                handleStockInfoOnClick(item);
                                handleSellModal();
                            }}
                        >
                            Sell
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    });

    return (
        <div id="summary-component">
            <SellStockModal
                handleSellModal={handleSellModal}
                showSellStockModal={isSellModal}
                stockName={companyName}
                stockSymbol={stockSymbol}
                userHoldings={userHoldings}
                stockCost={stockCost}
                estimatedShares={estimatedShares}
                estimatedCost={estimatedCost}
                differenceInCost={differenceInCost}
            />

            <SearchComponent
                getStockFromSearchAddToModal={getStockFromSearchAddToModal}
            />
            <Sidebar />
            {items.length === 0 ? (
                <button onClick={() => fetchSome()}>click</button>
            ) : (
                userList
            )}
        </div>
    );
};

export default Summary;

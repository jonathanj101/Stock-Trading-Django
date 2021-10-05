import React, { useState, useEffect } from 'react';
import Sidebar from '../SideBar-Content/Sidebar';
import SearchComponent from '../../Components/Search-Component/SearchComponent';
import axios from 'axios';

const Summary = () => {
    const [companyName, setCompanyName] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [stockCost, setStockCost] = useState('');
    const [userHoldings, setUserHoldings] = useState('');

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

    return (
        <div id="summary-component">
            <SearchComponent
                getStockFromSearchAddToModal={getStockFromSearchAddToModal}
            />
            <Sidebar />
        </div>
    );
};

export default Summary;

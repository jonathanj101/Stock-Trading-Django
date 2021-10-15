import axios from 'axios';
import React, { useState } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import BuyStockModal from '../Buy-Sell-Handlers/Buy-Stock/BuyStockModal';

const SearchComponent = () => {
    const [textInput, setTextInput] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isStockSearched, setIsStockSearched] = useState(false);
    const [showBuyStockModal, setBuyStockModal] = useState(false);
    const [stocks, setStocks] = useState([]);

    const getTextInput = (e) => {
        const { value } = e.currentTarget;
        setTextInput(value);
        if (value !== '') {
            sendRequestOnTextInput(value);
            setIsStockSearched(true);
        } else {
            setIsStockSearched(false);
        }
    };

    const sendRequestOnTextInput = async (textInput) => {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/search/${textInput}`,
        );
        setStocks(response.data);
    };

    const requestStockData = async (stock) => {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/search/stock/${stock}`,
        );
        setStockPrice(response.data.cost);
    };

    const onSelect = (stock) => {
        setCompanyName(stock.name);
        setStockSymbol(stock.symbol);
        requestStockData(stock.symbol);
        handleShow();
    };

    const handleShow = () => {
        setBuyStockModal(true);
    };

    const stocksArray = stocks.map((stock, num) => {
        return (
            <ListGroup id="search-item-container" key={num}>
                <ListGroup.Item
                    id="search-item-div"
                    onClick={() => onSelect(stock)}
                    className=""
                    action
                    variant=""
                >
                    <div
                        id="search-item"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>{stock.symbol}</span>
                        <span>{stock.name}</span>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        );
    });

    return (
        <div id="search" style={{ marginBottom: '100px' }}>
            <BuyStockModal
                showBuyStockModal={showBuyStockModal}
                stockSymbol={stockSymbol}
                stockName={companyName}
                stockPrice={stockPrice}
                handleClose={setBuyStockModal}
            />
            <Form.Group style={{ width: '50%', margin: 'auto' }}>
                <InputGroup>
                    <Form.Control
                        id="search-component"
                        required
                        type="text"
                        name={textInput}
                        value={textInput}
                        placeholder="Search"
                        onChange={(e) => {
                            getTextInput(e);
                        }}
                    />
                    <InputGroup.Prepend id="icon-search">
                        <InputGroup.Text>
                            <i className="fas fa-search"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
                {isStockSearched ? stocksArray : <div></div>}
            </Form.Group>
        </div>
    );
};

export default SearchComponent;

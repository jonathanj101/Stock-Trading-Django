import React, { useState } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
import BuyStockModal from '../Buy-Sell-Handlers/Buy-Stock/BuyStockModal';
// import { styles } from './SearchComponentStyles';

const SearchComponent = ({ getStockFromSearchAddToModal }) => {
    const [textInput, setTextInput] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockChange, setStockChange] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isStockSearched, setIsStockSearched] = useState(false);
    const [showBuyStockModal, setBuyStockModal] = useState(false);

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

    const sendRequestOnTextInput = (textInput) => {
        console.log(textInput);
        fetch(`http://127.0.0.1:8000/api/search/${textInput}`)
            .then((resp) => resp.json())
            .then((data) => {
                setCompanyName(data.company_name);
                setStockSymbol(data.symbol);
                setStockPrice(`$${data.cost}`);
            });
    };

    const onSelect = () => {
        console.log(companyName);
        handleShow();
        getStockFromSearchAddToModal(
            companyName,
            stockSymbol,
            stockPrice,
            stockChange,
        );
    };

    const handleShow = () => {
        setBuyStockModal(true);
    };

    return (
        <div id="search">
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
                {isStockSearched ? (
                    <ListGroup id="search-item-container">
                        <ListGroup.Item
                            id="search-item-div"
                            onClick={(e) => onSelect(e)}
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
                                <span>{stockSymbol}</span>
                                <span>{companyName}</span>
                                <span>{stockPrice}</span>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                ) : (
                    <div></div>
                )}
            </Form.Group>
        </div>
    );
};

export default SearchComponent;

import React, { useState } from 'react';
import { Form, InputGroup, ListGroup } from 'react-bootstrap';
// import { styles } from './SearchComponentStyles';

const SearchComponent = ({ handleShow, getStockFromSearchAddToModal }) => {
    const [textInput, setTextInput] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [stockChange, setStockChange] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isStockSearched, setIsStockSearched] = useState(false);

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
        console.log(textInput)
        fetch(`http://127.0.0.1:8000/api/search_stock/${textInput}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setCompanyName(data.company_name);
                setStockSymbol(data.symbol);
                setStockPrice(`$${data.cost.toString()}`);
                setStockChange(data.change);
            });
    };

    const onSelect = (e) => {
        handleShow();
        getStockFromSearchAddToModal({
            stockName: companyName,
            stockSymbol: stockSymbol,
            stockPrice: stockPrice,
            stockChange: stockChange,
        });
    };

    return (
        <div id="search">
            <Form.Group >
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
                            <div id="search-item">
                                <span>
                                    {stockSymbol}
                                </span>
                                <span>
                                    {companyName}
                                </span>
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

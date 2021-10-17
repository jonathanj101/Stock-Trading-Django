import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import AlertMsgComponent from '../../../Components/AlertMesgComponent';
import transactionReceipt from '../../../Transaction-Receipt/transactionReceipt';

const BuyStockModal = ({
    showBuyStockModal,
    stockName,
    stockSymbol,
    stockPrice,
    handleClose,
}) => {
    const [dropdownTitle, setDropdownTitle] = useState('Dollars');
    const [dropdownItemTitle, setDropdownItemTitle] = useState('Shares');
    const [showAlertMessage, setShowAlertMessageComponent] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [estimatedShares, setEstimatedShares] = useState('0.00');
    const [estimatedCost, setEstimatedCost] = useState('$0.00');
    const [isStockQuantity, setIsStockQuantity] = useState(true);
    const [stockInputValue, setStockInputValue] = useState('');
    const [userHoldings, setUserHoldings] = useState('');

    useEffect(() => {
        let isMountedComponent = true;
        const localStorageUsername = JSON.parse(
            localStorage.getItem('username'),
        );
        const fetchUserHoldings = async () => {
            try {
                const response = await axios.put(
                    'http://127.0.0.1:8000/api/user',
                    {
                        username: localStorageUsername,
                    },
                );
                if (isMountedComponent) {
                    setUserHoldings(response.data.user_holdings);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserHoldings();
        return () => (isMountedComponent = false);
    }, []);

    const handleSubmit = () => {
        if (stockInputValue <= userHoldings) {
            onBuyHandler();
            setTimeout(() => {
                handleClose();
            }, 2000);
        } else {
            setShowAlertMessageComponent(true);
            setErrorMessage(
                "You don't have enough buying power! Please buy accordingly to your wallet limit.",
            );
        }
    };

    const onBuyHandler = async () => {
        const localStorageUsername = JSON.parse(
            localStorage.getItem('username'),
        );
        const parsed = stockPrice;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/buy', {
                username: localStorageUsername,
                companyName: stockName,
                stockCost: parsed,
                stockSymbol: stockSymbol,
                estimatedShares: estimatedShares,
                estimatedCost: estimatedCost,
                userHoldings: userHoldings,
            });
            setShowAlertMessageComponent(true);
            const message = response.data.message;
            setSuccessMessage(message);
            transactionReceipt(
                localStorageUsername,
                stockName,
                stockSymbol,
                estimatedCost,
                estimatedShares,
            );
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDropdownTitle = () => {
        calculateOnTitleChange();
        setDropdownTitle(dropdownItemTitle);
        setDropdownItemTitle(dropdownTitle);
        setIsStockQuantity(!isStockQuantity);
    };

    const handleUserStockInput = (e) => {
        const { value } = e.currentTarget;
        setStockInputValue(value);
    };

    const calculateOnTitleChange = () => {
        const parseStockInputValue = parseFloat(stockInputValue);
        const parseSliceStockCost = stockPrice;

        if (!isStockQuantity) {
            const totalShares = parseStockInputValue / parseSliceStockCost;
            if (!isNaN(totalShares)) {
                setEstimatedShares(totalShares);
                return setEstimatedShares(totalShares);
            } else {
                setEstimatedShares('0.00');
                return setEstimatedShares('0.00');
            }
        } else {
            const totalCost = parseSliceStockCost * parseStockInputValue;
            if (!isNaN(totalCost)) {
                setEstimatedCost(totalCost);
                return setEstimatedCost(totalCost);
            } else {
                setEstimatedCost('$0.00');
                return setEstimatedCost('$0.00');
            }
        }
    };

    const calculateCost = (stockInput) => {
        const { value } = stockInput.currentTarget;
        let parseStockInput = parseFloat(value);
        const parseSliceStockCost = stockPrice;
        if (isStockQuantity) {
            const totalShares = parseStockInput / parseSliceStockCost;
            if (!isNaN(totalShares)) {
                setEstimatedShares(totalShares);
                setEstimatedCost(parseStockInput);
            } else {
                return;
            }
        } else {
            const totalCost = parseSliceStockCost * parseStockInput;
            if (!isNaN(totalCost)) {
                setEstimatedCost(totalCost);
                setEstimatedShares(parseStockInput);
            } else {
                return;
            }
        }
    };

    const handleCloseModal = () => {
        setShowAlertMessageComponent(false);
        handleClose(false);
        setStockInputValue('$0.00');
        setEstimatedShares('0.00');
        setEstimatedCost('$0.00');
    };

    return (
        <div>
            <Modal
                show={showBuyStockModal}
                onHide={handleCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Buy {stockName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlertMsgComponent
                        show={showAlertMessage}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                    <div>
                        <div>
                            {stockSymbol} = ${stockPrice}
                        </div>
                        <div className="mx-auto w-50 mt-5 mb-5">
                            <div className="d-flex justify-content-center">
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={
                                        dropdownTitle
                                            ? dropdownTitle
                                            : dropdownItemTitle
                                    }
                                >
                                    <Dropdown.Item
                                        onClick={(e) => handleDropdownTitle()}
                                        as="button"
                                        eventKey="Shares"
                                    >
                                        {dropdownItemTitle
                                            ? dropdownItemTitle
                                            : dropdownTitle}
                                    </Dropdown.Item>
                                </DropdownButton>
                                <div className="w-100">
                                    <Form.Row>
                                        <Form.Control
                                            required
                                            type="number"
                                            onChange={(e) => {
                                                handleUserStockInput(e);
                                                calculateCost(e);
                                            }}
                                            placeholder={
                                                dropdownTitle === 'Dollars'
                                                    ? '$0.00'
                                                    : '0'
                                            }
                                        />
                                    </Form.Row>
                                </div>
                            </div>
                            <div className="w-100">
                                <div className="w-100 d-flex justify-content-between text-center mx-auto">
                                    <h5>
                                        {dropdownTitle === 'Dollars'
                                            ? 'Estimated Shares'
                                            : 'Estimated Cost'}
                                    </h5>
                                    <h5>
                                        {isStockQuantity
                                            ? estimatedShares
                                            : estimatedCost}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center mx-auto">
                        <h4>${userHoldings} - available to buy stock </h4>
                        <Button onClick={() => handleSubmit()} block>
                            Buy
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BuyStockModal;

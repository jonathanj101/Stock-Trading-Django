import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import SellStockModal from '../Buy-Sell-Handlers/Sell-Stock/SellStockModal';

const InvestingTable = ({ data, setIsSelling }) => {
    const [companyName, setCompanyName] = useState('');
    const [stockSymbol, setStockSymbol] = useState('');
    const [stockCost, setStockCost] = useState('');
    const [estimatedShares, setEstimatedShares] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');
    const [differenceInCost, setDifferenceInCost] = useState('');
    const [userHoldings, setUserHoldings] = useState('');
    const [isSellModal, setIsSellModal] = useState(false);

    const handleStockInfoOnClick = (stock) => {
        setCompanyName(stock.companyName);
        setStockSymbol(stock.symbol);
        setStockCost(stock.cost);
        setUserHoldings(stock.userHoldings);
        setEstimatedShares(stock.userEstimatedShares);
        setEstimatedCost(stock.userEstimatedHolding);
        setDifferenceInCost(stock.differenceInCost);
    };

    const handleCloseSellModal = () => {
        setIsSellModal(false);
        setCompanyName('');
        setStockSymbol('');
        setStockCost('');
        setUserHoldings('');
        setEstimatedShares('');
        setEstimatedCost('');
        setDifferenceInCost('');
    };

    const tableRows = data.map((stock, num) => {
        return (
            <tr
                key={num}
                data-toggle="tooltip"
                data-placement="top"
                title="Want to sell? Just click!"
                className="tableRow"
                onClick={() => {
                    handleStockInfoOnClick(stock);
                    setIsSellModal(true);
                }}
                style={{
                    fontWeight: 'bold',
                }}
            >
                <td>
                    <span>{stock.companyName}</span>
                </td>
            </tr>
        );
    });

    return (
        <div style={{ margin: '50px auto' }}>
            <SellStockModal
                handleCloseSellModal={handleCloseSellModal}
                showSellStockModal={isSellModal}
                stockName={companyName}
                stockSymbol={stockSymbol}
                userHoldings={userHoldings}
                stockCost={stockCost}
                estimatedShares={estimatedShares}
                estimatedCost={estimatedCost}
                differenceInCost={differenceInCost}
                setIsSelling={setIsSelling}
            />
            <Table
                style={{ width: '50%', margin: 'auto', textAlign: 'center' }}
                striped
                bordered
                hover
            >
                <thead>
                    <tr>
                        <th>
                            <h3>Company Name</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td>GO BIG OR GO HOME!</td>
                        </tr>
                    ) : (
                        tableRows
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default InvestingTable;

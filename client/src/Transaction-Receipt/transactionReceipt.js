import axios from 'axios';

const transactionReceipt = async (
    username,
    companyName,
    symbol,
    amount,
    shares,
) => {
    axios.post('http://127.0.0.1:8000/api/transaction-receipt', {
        username: username,
        companyName,
        symbol: symbol,
        investing: amount,
        shares: shares,
    });
};

export default transactionReceipt;

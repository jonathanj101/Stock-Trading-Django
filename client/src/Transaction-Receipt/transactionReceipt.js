import axios from 'axios';

const transactionReceipt = async (
    username,
    companyName,
    symbol,
    amount,
    shares,
) => {
    axios.post('api/transaction-receipt', {
        username: username,
        companyName,
        symbol: symbol,
        investing: amount,
        shares: shares,
    });
};

export default transactionReceipt;

const fetch = require('node-fetch');

const EBMS_BASE_URL = 'https://ebms.obr.gov.bi:9443/ebms_api';
const EBMS_TOKEN = 'YOUR_EBMS_TOKEN_HERE';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${EBMS_TOKEN}`
});

const postInvoice = async (invoiceData) => {
    const response = await fetch(`${EBMS_BASE_URL}/addInvoice`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(invoiceData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Error posting invoice: ${data.message}`);
    }
    return data;
};

const postStockMovement = async (stockData) => {
    const response = await fetch(`${EBMS_BASE_URL}/addStockmovement`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(stockData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Error posting stock movement: ${data.message}`);
    }
    return data;
};

module.exports = {
    postInvoice,
    postStockMovement
};

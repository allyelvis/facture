document.getElementById('createSellerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const seller = {
        name: document.getElementById('sellerName').value,
        address: document.getElementById('sellerAddress').value,
        nif: document.getElementById('companyNIF').value,
        legalForm: document.getElementById('legalForm').value,
        tradeRegister: document.getElementById('tradeRegister').value,
        contact: document.getElementById('sellerContact').value,
        vatSubjected: document.getElementById('vatSubjected').value
    };
    const response = await fetch('/sellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seller)
    });
    const result = await response.json();
    alert(result.message);
});

document.getElementById('createBuyerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const buyer = {
        name: document.getElementById('buyerName').value,
        address: document.getElementById('buyerAddress').value
    };
    const response = await fetch('/buyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buyer)
    });
    const result = await response.json();
    alert(result.message);
});

document.getElementById('createInvoiceForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const invoice = {
        sellerId: document.getElementById('sellerId').value,
        buyerId: document.getElementById('buyerId').value,
        invoiceDate: document.getElementById('invoiceDate').value,
        items: Array.from(document.querySelectorAll('.item')).map(item => ({
            name: item.querySelector('.itemName').value,
            quantity: item.querySelector('.itemQuantity').value,
            price: item.querySelector('.itemPrice').value
        }))
    };
    const response = await fetch('/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice)
    });
    const result = await response.json();
    alert(result.message);
});

function addItem() {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
        <label for="itemName">Item Name:</label>
        <input type="text" class="itemName" required><br>
        <label for="itemQuantity">Item Quantity:</label>
        <input type="number" class="itemQuantity" required><br>
        <label for="itemPrice">Item Price:</label>
        <input type="number" class="itemPrice" required><br>
    `;
    document.getElementById('items').appendChild(itemDiv);
}

async function listSellers() {
    const response = await fetch('/sellers');
    const sellers = await response.json();
    displayResults(sellers);
}

async function listBuyers() {
    const response = await fetch('/buyers');
    const buyers = await response.json();
    displayResults(buyers);
}

async function listInvoices() {
    const response = await fetch('/invoices');
    const invoices = await response.json();
    displayResults(invoices);
}

function displayResults(data) {
    const resultsDiv = document.getElementById('managementResults');
    resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from 'public' folder

app.post('/sellers', async (req, res) => {
  const { name, address, nif, legalForm, tradeRegister, contact, vatSubjected } = req.body;
  try {
    await pool.query('INSERT INTO sellers (name, address, nif, legal_form, trade_register, contact, vat_subjected) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, address, nif, legalForm, tradeRegister, contact, vatSubjected]);
    res.status(201).json({ message: 'Seller created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/buyers', async (req, res) => {
  const { name, address } = req.body;
  try {
    await pool.query('INSERT INTO buyers (name)
                     // Assuming you have the fetch API set up to call EBMS functions
const ebms = require('./ebms.js');

document.getElementById('createInvoiceForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const invoice = {
        sellerId: document.getElementById('sellerId').value,
        buyerId: document.getElementById('buyerId').value,
        invoiceDate: document.getElementById('invoiceDate').value,
        items: Array.from(document.querySelectorAll('.item')).map(item => ({
            name: item.querySelector('.itemName').value,
            quantity: item.querySelector('.itemQuantity').value,
            price: item.querySelector('.itemPrice').value
        }))
    };
    try {
        const invoiceResponse = await ebms.postInvoice(invoice);
        alert(`Invoice Posted: ${JSON.stringify(invoiceResponse)}`);
        for (let item of invoice.items) {
            const stockMovement = {
                itemCode: item.name,
                quantity: item.quantity,
                price: item.price,
                invoiceId: invoiceResponse.invoiceId
            };
            const stockResponse = await ebms.postStockMovement(stockMovement);
            alert(`Stock Movement Posted: ${JSON.stringify(stockResponse)}`);
        }
    } catch (error) {
        console.error('Error posting to EBMS:', error);
        alert(`Error: ${error.message}`);
    }
});

function addItem() {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
        <label for="itemName">Item Name:</label>
        <input type="text" class="itemName" required><br>
        <label for="itemQuantity">Item Quantity:</label>
        <input type="number" class="itemQuantity" required><br>
        <label for="itemPrice">Item Price:</label>
        <input type="number" class="itemPrice" required><br>
    `;
    document.getElementById('items').appendChild(itemDiv);
}

async function listSellers() {
    const response = await fetch('/sellers');
    const sellers = await response.json();
    displayResults(sellers);
}

async function listBuyers() {
    const response = await fetch('/buyers');
    const buyers = await response.json();
    displayResults(buyers);
}

async function listInvoices() {
    const response = await fetch('/invoices');
    const invoices = await response.json();
    displayResults(invoices);
}

function displayResults(data) {
    const resultsDiv = document.getElementById('managementResults');
    resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

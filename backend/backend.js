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

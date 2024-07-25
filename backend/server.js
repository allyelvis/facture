async function generateInvoice(event) {
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
    const buyer = {
        name: document.getElementById('buyerName').value,
        address: document.getElementById('buyerAddress').value
    };
    const invoiceDate = document.getElementById('invoiceDate').value;

    const items = Array.from(document.querySelectorAll('.item')).map(item => {
        return {
            name: item.querySelector('.itemName').value,
            quantity: item.querySelector('.itemQuantity').value,
            price: item.querySelector('.itemPrice').value
        };
    });

    const response = await fetch('/invoices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seller, buyer, invoiceDate, items }),
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Handle successful response
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
        // Handle error response
    }
}

const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// PostgreSQL pool setup
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());

// Endpoint to add a new invoice
app.post('/invoices', async (req, res) => {
  const { seller, buyer, invoiceDate, items } = req.body;

  try {
    const client = await pool.connect();

    // Insert seller and buyer
    const sellerResult = await client.query('INSERT INTO sellers(name, address, nif, legal_form, trade_register, contact, vat_subjected) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id', [seller.name, seller.address, seller.nif, seller.legalForm, seller.tradeRegister, seller.contact, seller.vatSubjected]);
    const sellerId = sellerResult.rows[0].id;

    const buyerResult = await client.query('INSERT INTO buyers(name, address) VALUES($1, $2) RETURNING id', [buyer.name, buyer.address]);
    const buyerId = buyerResult.rows[0].id;

    // Insert invoice
    const invoiceResult = await client.query('INSERT INTO invoices(seller_id, buyer_id, invoice_date) VALUES($1, $2, $3) RETURNING id', [sellerId, buyerId, invoiceDate]);
    const invoiceId = invoiceResult.rows[0].id;

    // Insert items
    for (const item of items) {
      await client.query('INSERT INTO items(invoice_id, name, quantity, price) VALUES($1, $2, $3, $4)', [invoiceId, item.name, item.quantity, item.price]);
    }

    client.release();
    res.status(201).json({ message: 'Invoice created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

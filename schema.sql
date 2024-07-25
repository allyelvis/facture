CREATE TABLE sellers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    nif VARCHAR(50) NOT NULL,
    legal_form VARCHAR(50),
    trade_register VARCHAR(50),
    contact VARCHAR(50),
    vat_subjected BOOLEAN
);

CREATE TABLE buyers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER REFERENCES sellers(id),
    buyer_id INTEGER REFERENCES buyers(id),
    invoice_date DATE NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id),
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

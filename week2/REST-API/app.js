const express = require('express');
const morgan = require('morgan');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());


// GET all products
app.get('/products', (req, res, next) => {
    db.query('SELECT * FROM Product', (err, results) => {
        if (err) return next(err);
        res.json(results);
    });
});

// GET single product
app.get('/products/:id', (req, res, next) => {
    db.query('SELECT * FROM Product WHERE product_id = ?', [req.params.id], (err, results) => {
        if (err) return next(err);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(results[0]);
    });
});


// POST product
app.post('/products', (req, res, next) => {
    const { name, description, price, stock_quantity } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    db.query(
        'INSERT INTO Product (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)',
        [name, description || '', price, stock_quantity || 0],
        (err, result) => {
            if (err) return next(err);
            res.status(201).json({
                message: 'Product created successfully',
                product_id: result.insertId
            });
        }
    );
});
// PUT product
app.put('/products/:id', (req, res, next) => {
    const { name, description, price, stock_quantity } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    db.query(
        'UPDATE Product SET name=?, description=?, price=?, stock_quantity=? WHERE product_id=?',
        [name, description || '', price, stock_quantity || 0, req.params.id],
        (err, result) => {
            if (err) return next(err);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product updated successfully' });
        }
    );
});

// DELETE product
app.delete('/products/:id', (req, res, next) => {
    db.query('DELETE FROM Product WHERE product_id=?', [req.params.id], (err, result) => {
        if (err) return next(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`REST API running on port ${PORT}`);
});
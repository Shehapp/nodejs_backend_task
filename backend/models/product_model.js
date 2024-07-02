const db = require('../config_db/database.js');
const { getCategoryById } = require('./category_model.js');

const getProducts = (callback) => {
    const sql = `
    SELECT *,
    (SELECT c.name FROM categories c WHERE c.category_id = p.category_id) AS category
    FROM products p`;
    db.query(sql, (err, res) => {
        if (err) {
            callback(err, null); 
        } else {
            callback(null, res);
        }
    });
};

const getProductById = (id, callback) => {
    const sql = `
    SELECT *,
    (SELECT c.name FROM categories c WHERE c.category_id = p.category_id) AS category
    FROM products p WHERE product_id = ?`;
    db.query(sql, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
};

const createProduct = (values, callback) => {

    const sql = 'INSERT INTO products (name, description, price, stock, category_id) VALUES (?)';
    db.query(sql, [values], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

const updateProduct = ( values, callback) => {
    
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE product_id = ?';
    db.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

const deleteProduct = (id, callback) => {
    const sql = 'DELETE FROM products WHERE product_id = ?';
    db.query(sql, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

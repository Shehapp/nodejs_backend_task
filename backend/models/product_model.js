const db = require('../config_db/database.js');
const { getCategoryById } = require('./category_model.js');

const getProducts = async () => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT *,
        (SELECT c.name FROM categories c WHERE c.category_id = p.category_id) AS category
        FROM products p`;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const getProductById =async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT *,
        (SELECT c.name FROM categories c WHERE c.category_id = p.category_id) AS category
        FROM products p WHERE product_id = ?`;
        db.query(sql, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const createProduct = async(values) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO products (name, description, price, stock, category_id) VALUES (?)';
        db.query(sql, [values], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const updateProduct =async (values) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE product_id = ?';
        db.query(sql, values, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

const deleteProduct = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM products WHERE product_id = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

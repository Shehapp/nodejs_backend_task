const db = require('../config/database.js');
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

const createProduct = (req, callback) => {

    const { name, description, price, stock, category_id } = req.body;
    const values = [name, description, price, stock, category_id];

    //check undefined values
    if (!name || !description || !price || !stock || !category_id) {
        callback({ message: 'Please fill in all fields' }, null);
        return;
    }

    // [TODO]: check if category exists
    getCategoryById(category_id, (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (res.length === 0) {
            callback({ message: 'Category does not exist' }, null);
            return;
        }
    });
    

    const sql = 'INSERT INTO products (name, description, price, stock, category_id) VALUES (?)';
    db.query(sql, [values], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

const updateProduct = (id, req, callback) => {

    const { name, description, price, stock, category_id } = req.body;
    const values = [name, description, price, stock,category_id, id];

    if (!name || !description || !price || !stock || !category_id) {
        callback({ message: 'Please fill in all fields' }, null);
        return;
    }

    getCategoryById(category_id, (err, res) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (res.length === 0) {
            callback({ message: 'Category does not exist' }, null);
            return;
        }
    });



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

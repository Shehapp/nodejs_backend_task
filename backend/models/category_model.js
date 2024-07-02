const db = require('../config_db/database.js');


const getCategories = (callback) => {
    const sql = ' SELECT * FROM categories';
    db.query(sql, (err, res) => {
        if (err) {
            callback(err, null); 
        } else {
            callback(null, res);
        }
    });
};

const getCategoryById = (id, callback) => {
    const sql = ' SELECT * FROM categories WHERE category_id = ?';
    db.query(sql, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
};

const createCategory = (values, callback) => {

    const sql = 'INSERT INTO categories (name, description) VALUES (?)';
    db.query(sql, [values], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

const updateCategory  = (values, callback) => {

    const sql = 'UPDATE categories SET name = ?, description = ? WHERE category_id = ?';
    db.query(sql, values, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

const deleteCategory  = (id, callback) => {
    const sql = 'DELETE FROM categories WHERE category_id = ?';
    db.query(sql, [id], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}


module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

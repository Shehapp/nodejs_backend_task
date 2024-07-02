const db = require('../utils/database.js');

const getCategories =async () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM categories';
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const getCategoryById = async(id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM categories WHERE category_id = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const createCategory =async (values) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO categories (name, description) VALUES (?)';
        db.query(sql, [values], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const updateCategory =async (values) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE categories SET name = ?, description = ? WHERE category_id = ?';
        db.query(sql, values, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const deleteCategory =async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM categories WHERE category_id = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

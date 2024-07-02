const db = require('../config/database.js');


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

const createCategory = (req, callback) => {

    const { name, description } = req.body;
    const values = [name, description];

    if (!name || !description) {
        callback({ message: 'Please fill in all fields' }, null);
        return;
    }

    const sql = 'INSERT INTO categories (name, description) VALUES (?)';
    db.query(sql, [values], (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

const updateCategory  = (id, req, callback) => {

    const { name, description } = req.body;
    const values = [name, description, id];
    
    if (!name || !description) {
        callback({ message: 'Please fill in all fields' }, null);
        return;
    }

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

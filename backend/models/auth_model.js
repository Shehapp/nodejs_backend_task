const db = require('../utils/database.js');

const getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const addUser = async (values) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (email, password) VALUES (?)';
        db.query(sql, [values], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}



module.exports = {
    getUserByEmail,
    addUser
};

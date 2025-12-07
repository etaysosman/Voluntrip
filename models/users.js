const db = require('../util/database');

module.exports = class User {

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        return db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [this.username, this.email, this.password]
        );
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }
};
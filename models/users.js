const db = require('../util/database');

module.exports = class User {
    constructor(fullName, id, birthdate, username, email, password, country, gender) {
        this.fullName = fullName;
        this.id = id;
        this.birthdate = birthdate;
        this.username = username;
        this.email = email;
        this.password = password;
        this.country = country;
        this.gender = gender;
    }

    save() {
        return db.execute(
            'INSERT INTO users (fullName, id, birthdate, username, email, password, country, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.fullName, this.id, this.birthdate, this.username, this.email, this.password, this.country, this.gender]
        );
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }

    static findByUsername(username) {
        return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
};
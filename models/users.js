const db = require('../util/database');

module.exports = class User {

    constructor(name, lastname, birthdate, username, email, password) {
        this.name = name;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.username = username;
        this.email = email;
        this.password = password;
    }


    save() {
        return db.execute(
            'INSERT INTO users (name, lastname, birthdate, username, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.lastname, this.birthdate, this.username, this.email, this.password]
        );
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
};
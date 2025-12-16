const db = require('../util/database');

module.exports = class User {

    constructor(name, surname, birthdate, username, email, password) {
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.username = username;
        this.email = email;
        this.password = password;
    }


    save() {
        return db.execute(
            'INSERT INTO users (name, surname, birthdate, username, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.surname, this.birthdate, this.email, this.username, this.password]
        );
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
};
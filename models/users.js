const db = require('../util/database');

module.exports = class User {
    // Initializes a new User instance with registration details
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
    // Inserts the new user record into the database
    save() {
        return db.execute(
            'INSERT INTO users (fullName, id, birthdate, username, email, password, country, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.fullName, this.id, this.birthdate, this.username, this.email, this.password, this.country, this.gender]
        );
    }
    // Finds a user in the database by their unique ID
    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }
    // Retrieves a user from the database by their username
    static findByUsername(username) {
        return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }
    // Retrieves a user from the database by their email address
    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }
};
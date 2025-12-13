const db = require('../util/database');

module.exports = class Activity {

    constructor(title, description, location, image) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.image = image;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM activities');
    }

    static findById(id) {
        return db.execute('SELECT * FROM activities WHERE id = ?', [id]);
    }
};
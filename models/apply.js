const db = require('../util/database');

module.exports = class Application {

    constructor(fullName, email, phone, experience) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.experience = experience;
    }

    save() {
        return db.execute(
            'INSERT INTO applications (fullName, email, phone, experience) VALUES (?, ?, ?, ?)',
            [
                this.fullName,
                this.email,
                this.phone,
                this.experience,
                /* this.activityId // needs to be populated when applying for specific activities */
            ]
        );
    }

    // FOR FUTURE USE
    static fetchAll() {
        return db.execute('SELECT * FROM applications');
    }

    static fetchByActivity(activityId) {
        return db.execute('SELECT * FROM applications WHERE activityId = ?', [activityId]);
    }
};
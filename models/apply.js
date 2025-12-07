const db = require('../util/database');

module.exports = class Application {

    constructor(fullName, email, phone, experience, activityId) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.experience = experience;
        this.activityId = activityId;
    }

    save() {
        return db.execute(
            'INSERT INTO applications (fullName, email, phone, experience, activityId) VALUES (?, ?, ?, ?, ?)',
            [
                this.fullName,
                this.email,
                this.phone,
                this.experience,
                this.activityId
            ]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM applications');
    }

    static fetchByActivity(activityId) {
        return db.execute('SELECT * FROM applications WHERE activityId = ?', [activityId]);
    }
};
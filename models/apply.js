const db = require('../util/database');

module.exports = class Application {
    constructor(activityId, fullName, email, phone, experience, agreeToTerms) {
        this.activityId = activityId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.experience = experience;
        this.agreeToTerms = agreeToTerms;
    }

    save() {
        return db.execute(
            `INSERT INTO applications 
            (activityId, fullName, email, phone, experience, agreeToTerms) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [this.activityId, this.fullName, this.email, this.phone, this.experience, this.agreeToTerms]
        );
    }
};
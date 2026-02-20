const db = require('../util/database');

module.exports = class Application {
    
    constructor(activityId, userId, startDate, durationWeeks, additionalLanguage, physicalWork, experience, agreeToTerms) {
        this.activityId = activityId;
        this.userId = userId; 
        this.startDate = startDate;
        this.durationWeeks = durationWeeks;
        this.additionalLanguage = additionalLanguage;
        this.physicalWork = physicalWork;
        this.experience = experience;
        this.agreeToTerms = agreeToTerms;
    }

    save() {
        return db.execute(
            `INSERT INTO applications 
            (activityId, userId, startDate, durationWeeks, additionalLanguage, physicalWork, experience, agreeToTerms) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
                this.activityId, 
                this.userId, 
                this.startDate, 
                this.durationWeeks, 
                this.additionalLanguage, 
                this.physicalWork, 
                this.experience, 
                this.agreeToTerms
            ]
        );
    }

    static fetchTotalCount() {
        return db.execute('SELECT COUNT(*) as total FROM applications');
    }
};
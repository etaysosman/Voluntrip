const db = require('../util/database');

module.exports = class Stats {

    static getStats() {
        return db.execute('SELECT * FROM stats LIMIT 1');
    }

    static updateStats(totalUsers, totalApplications, totalActivities) {
        return db.execute(
            'UPDATE stats SET totalUsers = ?, totalApplications = ?, totalActivities = ? WHERE id = 1',
            [totalUsers, totalApplications, totalActivities]
        );
    }
};

// IGNORE - probably will be deleted later
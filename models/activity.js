const db = require('../util/database');

module.exports = class Activity {
    constructor(activityId, title, category, location, organizer, daysDuration, socialLink, description, imageUrl) {
        this.activityId = activityId;
        this.title = title;
        this.category = category;
        this.location = location;
        this.organizer = organizer;
        this.daysDuration = daysDuration;
        this.socialLink = socialLink;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        return db.execute(
            `INSERT INTO activities 
            (title, category, location, organizer, daysDuration, socialLink, description, imageUrl) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [this.title, this.category, this.location, this.organizer, this.daysDuration, this.socialLink, this.description, this.imageUrl]
        );
    }


    static fetchAll() {
        return db.execute('SELECT * FROM activities ORDER BY activityId LIMIT 4');
    }

    static filter(filters) {
        let query = 'SELECT * FROM activities WHERE 1=1';
        let params = [];

        if (filters.category && filters.category !== 'all') {
            query += ' AND category = ?';
            params.push(filters.category);
        }

        if (filters.location && filters.location.trim() !== '') {
            query += ' AND location LIKE ?';
            params.push(`%${filters.location}%`);
        }

        return db.execute(query, params);
    }

    static findById(id) {
        return db.execute('SELECT * FROM activities WHERE activityId = ?', [id]);
    }
};
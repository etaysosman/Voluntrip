const db = require('../util/database');
// Initializes a new Activity instance
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
    // Saves the current activity instance as a new record in the database
    save() {
        return db.execute(
            `INSERT INTO activities 
            (title, category, location, organizer, daysDuration, socialLink, description, imageUrl) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [this.title, this.category, this.location, this.organizer, this.daysDuration, this.socialLink, this.description, this.imageUrl]
        );
    }

    // Retrieves a limited list of activities from the database
    static fetchAll() {
        return db.execute('SELECT * FROM activities ORDER BY activityId LIMIT 4');
    }
    // Dynamically builds and executes a query to filter activities by category and/or location
    static filter(filters) {
        let query = 'SELECT * FROM activities WHERE 1=1';
        let params = [];
        // Add category filter if provided
        if (filters.category && filters.category !== 'all') {
            query += ' AND category = ?';
            params.push(filters.category);
        }
        // Add location filter if provided (using LIKE for partial matches)
        if (filters.location && filters.location.trim() !== '') {
            query += ' AND location LIKE ?';
            params.push(`%${filters.location}%`);
        }

        return db.execute(query, params);
    }
    // Fetches a single activity from the database using its ID
    static findById(id) {
        return db.execute('SELECT * FROM activities WHERE activityId = ?', [id]);
    }
};
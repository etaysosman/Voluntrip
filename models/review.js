const db = require('../util/database');
// Initializes a new Review instance with user feedback details
module.exports = class Review {
  constructor(volunteerName, location, category, rating, description, daysVolunteered) {
    this.volunteerName = volunteerName;
    this.location = location;
    this.category = category;
    this.rating = rating;
    this.description = description;
    this.daysVolunteered = daysVolunteered;
  }
  // Inserts a new review record into the database
  save() {
    return db.execute(
      `INSERT INTO reviews
        (volunteerName, location, category, rating, description, daysVolunteered)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        this.volunteerName,
        this.location,
        this.category,
        this.rating,
        this.description,
        this.daysVolunteered
      ]
    );
  }
  // Retrieves the 6 most recent reviews from the database
  static fetchLatest() {
    return db.execute(
      `SELECT * FROM reviews
       ORDER BY reviewId  DESC
       LIMIT 6`,
    );
  }
  // Retrieves all reviews from the database, ordered by newest first
  static fetchAll() {
    return db.execute(
      `SELECT * FROM reviews
       ORDER BY reviewId  DESC`
    );
  }
};

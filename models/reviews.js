const db = require('../util/database');

module.exports = class Review {
  constructor(volunteerName, location, category, rating, description, daysVolunteered) {
    this.volunteerName = volunteerName;
    this.location = location;
    this.category = category;
    this.rating = rating;
    this.description = description;
    this.daysVolunteered = daysVolunteered;
  }

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

  static fetchLatest() {
    return db.execute(
      `SELECT * FROM reviews
       ORDER BY id DESC
       LIMIT 6`,
    );
  }

  static fetchAll() {
    return db.execute(
      `SELECT * FROM reviews
       ORDER BY id DESC`
    );
  }
};

const db = require('../util/database');

module.exports = class Connect {
  // Initializes a new Connect instance with organization suggestion details
  constructor(orgName, contactPhone, socialLink, category, volunteeredBefore, details) {
    this.orgName = orgName;
    this.contactPhone = contactPhone;
    this.socialLink = socialLink;
    this.category = category;
    this.volunteeredBefore = volunteeredBefore;
    this.details = details;
  }
  // Inserts the organization suggestion into the database
  save() {
    return db.execute(
      `INSERT INTO org_suggestions
       (orgName, contactPhone, socialLink, category, volunteeredBefore, details)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        this.orgName,
        this.contactPhone,
        this.socialLink,
        this.category,
        this.volunteeredBefore,
        this.details
      ]
    );
  }
  // Retrieves the 8 most recent organization suggestions from the database
  static fetchLatest() 
  {
  return db.execute(
    `SELECT orgName, category
     FROM org_suggestions
     ORDER BY suggestionId DESC
     LIMIT 8`
  );
}

};

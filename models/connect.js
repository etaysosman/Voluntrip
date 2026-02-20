const db = require('../util/database');

module.exports = class Connect {

  constructor(orgName, contactPhone, socialLink, category, volunteeredBefore, details) {
    this.orgName = orgName;
    this.contactPhone = contactPhone;
    this.socialLink = socialLink;
    this.category = category;
    this.volunteeredBefore = volunteeredBefore;
    this.details = details;
  }

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

const createTags = `
CREATE TABLE IF NOT EXISTS tags(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,

    FOREIGN KEY (note_id) REFERENCES notes (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
`;

module.exports = createTags;
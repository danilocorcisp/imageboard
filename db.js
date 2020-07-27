const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {

    const { dbUser, dbPass } = require("./secrets.json");


    db = spicedPg(
        "postgres:" + dbUser + ":" + dbPass + "@localhost:5432/blacklives"

    );
}



exports.getImages = () => {


    return db.query(
        `SELECT *
        FROM images
        ORDER BY id DESC
        LIMIT 6`
    );
};

exports.addImage = (title, description, username, url) => {
    return db.query(
        `INSERT INTO images (title, description, username, url)
        VALUES ($1, $2, $3, $4)
        RETURNING title, description, username, url`,
        [title, description, username, url]
    );
};

exports.getId = (id) => {
    return db.query(
        `SELECT *
        FROM images
        WHERE id = $1`,
        [id]
    );
};

exports.addComment = (comment, image_id, username) => {
    return db.query(
        `INSERT INTO comments (image_id, comment, username)
        VALUES ($1, $2, $3)
        RETURNING comment, image_id, username, created_at`,
        [comment, image_id, username]
    );
};

exports.getComments = (id) => {
    return db.query(
        `SELECT *
        FROM comments
        WHERE image_id = $1`,
        [id]
    );
};

exports.getMoreImages = (lastId) => {
    return db.query(
        `SELECT * FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 6`,
        [lastId]
    );
};


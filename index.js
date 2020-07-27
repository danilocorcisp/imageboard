const express = require('express');
const app = express();
const db = require('./db');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');



app.use(express.json());

app.use(express.static('./public'));


const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.get('/images', (req, res) => {
    
    db.getImages()
        .then((val) => {
            console.log('val', val);
            res.json(val.rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("wohoo subiu pra amazon");

    let title = req.body.title;
    let description = req.body.description;
    let username = req.body.username;
    let url = `https://s3.amazonaws.com/universeimage/${req.file.filename}`;
    if (req.file) {
        db.addImage(title, description, username, url)
            .then((data) => {
                
                res.json(data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({ success: false });
    }
});

app.get('/image-pop/:id', (req, res) => {

    Promise.all([
        db.getId(req.params.id),
        db.getComments(req.params.id),
    ])
        .then((data) => {
            let imgData = data[0].rows[0];
            imgData.comments = data[1].rows;

            res.json(imgData);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/comment', (req, res) => {
    // console.log(req.file, req.body);
    if ((req.body.image_id, req.body.comment, req.body.username)) {
        db.addComment(
            req.body.image_id,
            req.body.comment,
            req.body.username
        )
            .then((data) => {
                res.json(data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({ success: false });
    }
});

app.get('/more/:id', (req, res) => {
    db.getMoreImages(req.params.id)
        .then((data) => {
            res.json(data.rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(8080, () => {
    console.log('Server is calling all the planets');
});
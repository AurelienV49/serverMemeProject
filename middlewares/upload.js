const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const DB = 'mongodb+srv://' + process.env.DB_ID + ':' + process.env.DB_PW + '@cluster-memes.ps0ycgy.mongodb.net/?retryWrites=true&w=majority';

const storage = new GridFsStorage({
    url: DB,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-any-name-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({storage});
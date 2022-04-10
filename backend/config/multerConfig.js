const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

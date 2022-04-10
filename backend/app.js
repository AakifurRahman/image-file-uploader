//external imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// local imports
const cloudinary = require("./config/cloudinaryConfig");
const upload = require("./config/multerConfig");

// express config
const app = express();
const port = 8000 || process.env.PORT;

app.use(cors());

// upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  const { file } = req;

  cloudinary.uploader
    .upload(file.path, {
      public_id: file.fieldname + "." + file.mimetype.split("/")[1],
      width: 500,
      height: 500,
      crop: "fill",
    })
    .then((result) => {
      return res.json({
        msg: "File upload successfull",
      });
    })
    .catch((err) => {
      return res.json({
        msg: "File upload unsuccessfull",
      });
    });
});

// express listen
app.listen(port, () => {
  console.log(`The backend is running on ${port}`);
});

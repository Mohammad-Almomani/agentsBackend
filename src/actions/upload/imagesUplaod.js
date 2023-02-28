"use strict";

const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;
multer.diskStorage ({destination: "../../../images/items/"})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,`images/items`);
  },
  // destination: "images/item/",
  filename: async (req, file, callBack) => {
   const newData = await req.body
    callBack(
      null,
      `${file.fieldname}_${newData.username}_${uuid()}${path.extname(file.originalname)}`
      );
  },
});
const imgUpload = multer({
  storage: storage,
});

module.exports = {
  imgUpload,
};

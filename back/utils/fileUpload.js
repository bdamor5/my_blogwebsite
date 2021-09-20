import multer from "multer";

var storage = multer.diskStorage({
    destination: '../front/public/uploads/',
  filename: function (req, file, callback) {
    callback (
      null,
      Date.now() + '-' + file.originalname 
    );
  },
}); 

export default multer({ storage : storage });

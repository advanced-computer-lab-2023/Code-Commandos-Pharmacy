const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid overwriting
  },
});

const upload = multer({ storage });

const uploadController = {
  handleUpload: upload.single('document'),
  handleFileDetails: (req, res) => {
    const { originalname, filename } = req.file;
    // Save file information to the database or perform other necessary actions
    res.json({ originalname, filename });
  },
};

module.exports = uploadController;
// /api/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer storage
const uploadFolder = path.join(process.cwd(), 'public/uploads'); // Use public folder for static file serving
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true }); // Ensure the folder exists
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// This is the handler for file upload using multer
const uploadMiddleware = upload.single('file');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    return new Promise((resolve, reject) => {
      uploadMiddleware(req, res, function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error uploading file', error: err });
        }
        const fileUrl = `/uploads/${req.file.filename}`; // Access file URL in public folder
        res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
        resolve();
      });
    });
  } else {
    // Handle any other methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

// const express = require('express');
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

// // Configure AWS SDK
// AWS.config.update({
//   accessKeyId: 'AKIAWRZ2CTB7PCE5PVKQ',
//   secretAccessKey: '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',
//   region: 'ap-south-1',
// });

// // Create an instance of the S3 service
// const s3 = new AWS.S3();

// // Configure multer to use S3 for file uploads
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'accident-detection-db',
//     acl: 'public-read', // Set the appropriate ACL permissions
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString()); // Use unique filenames
//     },
//   }),
// });

// // Create an Express app
// const app = express();

// // Define a route for file uploads
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ fileUrl: req.file.location });
// });

// // Start the server
// app.listen(3002, () => {
//   console.log('Server started on port 3000');
// });

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 3001;

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp and its original extension
  }
});

// Create upload instance
const upload = multer({ storage });

// Define the upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

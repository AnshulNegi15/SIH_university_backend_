const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), uploadFile);

module.exports = router;
const pool = require('../config/db');

exports.uploadFile = async (req, res) => {
  try {
    const { university_id } = req.body;
    const filePath = req.file.path;

    await pool.query('INSERT INTO uploads (university_id, file_path) VALUES ($1, $2)', [university_id, filePath]);

    res.status(201).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

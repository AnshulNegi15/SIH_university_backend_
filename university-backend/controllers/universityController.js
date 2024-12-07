const pool = require('../config/db');

exports.getUniversities = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM universities ORDER BY rank ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUniversityById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM universities WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

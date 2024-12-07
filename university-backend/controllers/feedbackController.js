const pool = require('../config/db');

exports.submitFeedback = async (req, res) => {
  const universityId = req.params.id;
  const { feedback_text } = req.body;

  try {
    await pool.query('INSERT INTO feedback (university_id, feedback_text) VALUES ($1, $2)', [universityId, feedback_text]);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

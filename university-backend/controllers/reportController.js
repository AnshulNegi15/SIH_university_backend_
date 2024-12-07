const pool = require('../config/db');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateReport = async (req, res) => {
  const universityId = req.params.id;
  const reportPath = `uploads/report-${universityId}.pdf`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(reportPath));

  const result = await pool.query('SELECT * FROM universities WHERE id = $1', [universityId]);
  const university = result.rows[0];

  doc.text(`University Name: ${university.name}`);
  doc.text(`Location: ${university.location}`);
  doc.text(`Rank: ${university.rank}`);
  doc.end();

  await pool.query('INSERT INTO inspection_reports (university_id, report_path) VALUES ($1, $2)', [universityId, reportPath]);

  res.status(201).json({ message: 'Report generated successfully', reportPath });
};

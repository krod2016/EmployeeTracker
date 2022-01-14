const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all deparments
router.get(`SELECT * FROM ALL departments`, (err,row) => {
  if (err) {
    res.status(500).json({  error: err.message  });
    return;
  }
  res.json({
    message: 'success',
    data: rows,
  });
});

router.get(`SELECT * FROM departments WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

//create a department
router.post('/department', ({ body  }, res) => {
  const errors =inputCheck(
    body,
    'name'
  );
  
  if (errors) {
    res.status(400).json({   error: errors  });
    return;
  }
  const sql = `INSERT INTO department (name) VALUES (?)`;
  const params = [
    body.name
  ];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({  error: err.message  });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

//update a department
router.put('/department/:name', (req, res) => {
  const errors = inputCheck(req.body, 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE department SET department = ? WHERE name = ?`;
  const params = [req.body.department, req.params.department];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });

    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

//delete a department
router.delete()

//always belongs at bottom
module.export = router;
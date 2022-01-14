const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all roles
router.get(`SELECT * FROM ALL roles`, (err,row) => {
  if (err) {
    res.status(500).json({  error: err.message  });
    return;
  }
  res.json({
    message: 'success',
    data: rows,
  });
});

//get a single role
router.get(`SELECT * FROM role WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

//create a role
router.post('/role', ({ body  }, res) => {
  const errors =inputCheck(
    body,
    'title',
    'salary',
    'department_id'
  );
  if (errors) {
    res.status(400).json({   error: errors  });
    return;
  }
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
  const params = [
    body.title,
    body.salary,
    body.department_id
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

//update a role
router.put('/role:', (req, res) => {
  const errors = inputCheck(req.body, 'role');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employee SET role = ? WHERE role = ?`;
  const params = [req.body.role, req.params.role];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });

    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
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

//delete a role
router.delete()

//always belongs at bottom
module.export = router;
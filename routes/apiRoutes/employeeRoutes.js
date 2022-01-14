const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all employees
router.get(`SELECT * FROM ALL employees`, (err, row) => {
  if (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: rows,
  });
});

//get single employee
router.get(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

//create an employee
router.post('/employee', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'role_id',
    'manager_id'
  );

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

//update employee role id
router.put('/employee/:role_id', (req, res) => {
  const errors = inputCheck(req.body, 'role_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });

    } else if (!result.affectedRows) {
      res.json({
        message: 'ID not found'
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

//update employee manager id
router.put('/employee/:manager_id', (req, res) => {
  const errors = inputCheck(req.body, 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
  const params = [req.body.manager_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });

    } else if (!result.affectedRows) {
      res.json({
        message: 'ID not found'
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

//delete an employee
router.delete()

//always belongs at bottom
module.export = router;
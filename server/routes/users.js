const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
let users = require('../data/users');

// Helper: handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// POST create user
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  validate,
  (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  }
);

// PUT update user
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  validate,
  (req, res) => {
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users[userIndex] = { ...users[userIndex], name, email };
    res.json(users[userIndex]);
  }
);

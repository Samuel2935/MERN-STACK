const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("./models/User");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// GET all users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET one user
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST create user
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email } = req.body;
      const newUser = await User.create({ name, email });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// PUT update user
router.put(
  "/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.update({ name: req.body.name, email: req.body.email });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

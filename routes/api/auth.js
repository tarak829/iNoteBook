const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

// @route 1 get user data using :  GET api/auth. Login required
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route 2 create a new user using :  POST api/auth/register. No Login required
router.post(
  "/register",
  [
    check("firstname", "First name is required").not().isEmpty(),
    check("lastname", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ success, msg: "User already exists" }] });
      }

      user = new User({
        firstname,
        lastname,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        success = true;
        res.json({ success, token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 3 login a user using :  POST api/auth/login. No Login required
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success, errors: [{ msg: "Invalid email" }] });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ success, errors: [{ msg: "Invalid Password" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        success = true;
        res.json({ success, token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//export
module.exports = router;

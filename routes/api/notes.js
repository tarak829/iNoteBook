const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");
const Note = require("../../models/Note");

// @route 1 get all notes using :  POST api/fetchallnote. Login required
router.get("/fetchallnotes", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route 2 add a new Note using :  POST api/addnote. Login required
router.post(
  "/addnote",
  [
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    try {
      const newNote = new Note({
        title,
        content,
        user: req.user.id,
      });

      const note = await newNote.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 3 update an existing Note using :  PUT api/updatenote. Login required

router.put(
  "/updatenote/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("content", "Content is required").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;

    // Build note object
    const noteFields = {};
    if (title) noteFields.title = title;
    if (content) noteFields.content = content;

    try {
      let note = await Note.findById(req.params.id);

      if (!note) {
        return res.status(404).json({ msg: "Note not found" });
      }

      // Make sure user owns note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: noteFields }, { new: true });

      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route 4 delete an existing Note using :  DELETE api/deletenote. Login required

router.delete("/deletenote/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//export
module.exports = router;

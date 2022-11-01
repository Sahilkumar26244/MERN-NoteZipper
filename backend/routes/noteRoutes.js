const express = require("express");
const { getNotes, createNote, getNoteById, UpdateNote, DeleteNote } = require("../controllers/notesController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get( protect, getNotes);
router.route('/create').post(protect, createNote);
router.route('/:id').get(getNoteById).put(protect , UpdateNote ).delete(protect,DeleteNote)
//.put().delete();



module.exports = router
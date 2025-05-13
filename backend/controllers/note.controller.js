import Note from '../models/note.model.js';
import User from '../models/user.model.js';
import { validationResult } from 'express-validator';

// Create a new note
export const createNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.details = errors.array();
      throw error;
    }

    const { title, content } = req.body;
    const userId = req.user._id;

    const note = new Note({ title, content, userId });
    await note.save();

    res.status(200).json({ message: 'Note created successfully', note });
  } catch (error) {
    next(error);
  }
};

// Get all notes for the current user
export const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ notes });
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      const error = new Error("Note not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.details = errors.array();
      throw error;
    }

    const noteId = req.params.noteId;
    const { title, content } = req.body;

    const note = await Note.findById(noteId);
    if (!note) {
      const error = new Error("Note not found");
      error.statusCode = 404;
      throw error;
    }

    note.title = title;
    note.content = content;
    await note.save();

    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findByIdAndRemove(noteId);

    if(!note){
      const error = new Error("Note not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting note' });
  }
};
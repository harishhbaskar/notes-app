import {Router} from "express";
import {createNote , getNotes , getNote , updateNote , deleteNote} from "../controllers/note.controller.js";
import authorize from "../middlewares/auth.middlware.js";
const notesRouter = Router();


notesRouter.use(authorize);

notesRouter.get('/',getNotes)
notesRouter.get('/:noteId',getNote)
notesRouter.post('/create',createNote)
notesRouter.put('/:noteId',updateNote)
notesRouter.delete('/:noteId',deleteNote)

export default notesRouter;
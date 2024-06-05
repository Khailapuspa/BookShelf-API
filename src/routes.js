// src/routes.js
import express from 'express';
import {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler
} from './handlers.js';

const router = express.Router();

router.post('/books', addBookHandler);
router.get('/books', getAllBooksHandler);
router.get('/books/:bookId', getBookByIdHandler);
router.put('/books/:bookId', updateBookByIdHandler);
router.delete('/books/:bookId', deleteBookByIdHandler);

export default router;

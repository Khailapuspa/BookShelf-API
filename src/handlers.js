import { nanoid } from 'nanoid';
import books from './books.js';

export const addBookHandler = (req, res) => {
  const {
    name, year, author, summary, publisher,
    pageCount, readPage, reading
  } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary, publisher,
    pageCount, readPage, finished, reading,
    insertedAt, updatedAt
  };

  books.push(newBook);

  return res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  });
};

export const getAllBooksHandler = (req, res) => {
  const simplifiedBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
  return res.status(200).json({
    status: 'success',
    data: {
      books: simplifiedBooks
    }
  });
};

export const getBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      book
    }
  });
};

export const updateBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const {
    name, year, author, summary, publisher,
    pageCount, readPage, reading
  } = req.body;

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
  }

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
  }

  const updatedAt = new Date().toISOString();
  books[bookIndex] = {
    ...books[bookIndex],
    name, year, author, summary, publisher,
    pageCount, readPage, reading,
    finished: pageCount === readPage,
    updatedAt
  };

  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  });
};

export const deleteBookByIdHandler = (req, res) => {
  const { bookId } = req.params;
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
  }

  books.splice(bookIndex, 1);
  return res.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus'
  });
};

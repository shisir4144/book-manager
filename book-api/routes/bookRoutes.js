import express from "express";
import {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} from "../controllers/bookController.js";

const router = express.Router();

/** CREATE a new book */
router.post("/", createBook);

/** GET all books */
router.get("/", getBooks);

/** GET a single book by ID */
router.get("/:id", getBookById);

/** UPDATE a book */
router.put("/:id", updateBook);

/** DELETE a book */
router.delete("/:id", deleteBook);

export default router;


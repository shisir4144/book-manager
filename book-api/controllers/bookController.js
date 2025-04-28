import mongoose from "mongoose";
import Book from "../models/bookModel.js";


export const createBook = async (req, res) => {
    try {
        console.log("📌 Received Request Body:", req.body);  // Debugging Line
        const { title, author, genre, publicationYear } = req.body;
        
        if (!title || !author || !genre || !publicationYear) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new Book({ title, author, genre, publicationYear });
        await newBook.save();

        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        console.error("❌ Error creating book:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

/** GET all books */
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Book ID" });
        }

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


/** UPDATE a book */
export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

/** DELETE a book */
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};


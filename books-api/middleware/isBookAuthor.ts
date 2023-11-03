import { Request, Response, NextFunction } from "express";

import Book, { IBook } from "../model/book";

declare module "express" {
    interface Request {
        book: IBook;
    }
}

export async function isBookAuthor(req: Request, res: Response, next: NextFunction) {
    try {
        // Get user input
        const { bookId } = req.params;

        // Validate if user already exist in our database
        const oldBook = await Book.findById(bookId);

        if (!oldBook) {
            return res.status(404).send("Book not found");
        }

        if (oldBook.author_id !== req.user.user_id) {
            return res.status(401).send("This book is relared to another author");
        }

        req.book = oldBook;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

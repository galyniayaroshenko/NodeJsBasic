import { Schema, model } from "mongoose";

export interface IBook {
    title: string,
    text: string,
    author_id: string,
}

const BookSchema = new Schema<IBook>({
    title: { type: String, default: null },
    text: { type: String, default: null },
    author_id: { type: String, default: null }
});

const Book = model("book", BookSchema);
export default Book;

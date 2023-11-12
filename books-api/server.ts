import dotenv from 'dotenv';
import * as database from './config/database';
import * as jwt from 'jsonwebtoken';
import express, { Application, Express } from 'express';
import { verifyToken, CurrentUser } from './middleware/auth';
import Book from './model/book';
import { isAuthor } from './middleware/isAuthor';
import { isBookAuthor } from './middleware/isBookAuthor';
import { Request, Response } from 'express';
import User from './model/user';
import logger from './config/logger';
const bcrypt = require('bcrypt');

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser;
        }
    }
}

export async function bootstrap(): Promise<Express> {
    dotenv.config();
    await database.connect();

    const app: Application = express();

    app.use(express.json());

    app.use('/api', verifyToken);

    app.get('/health', (req, res) => {
      res.status(200).json({
        message: 'Application is healthy'
      });
    });

    app.get('/api/books', isAuthor, async (req: Request, res: Response) => {
        logger.debug(`[${req.method}] ${req.url}`);
        const books = await Book.find({});
        return res.status(200).json(books);
    });

    app.post('/api/books', isAuthor, async (req: Request, res: Response) => {
        try {
            const { title, text } = req.body;
            const author = req.user;

            if (!(title && text)) {
                return res.status(400).send('All input is required');
            }

            const oldBook = await Book.findOne({ title });

            if (oldBook) {
                return res.status(409).send('Book Already Exist.');
            }

            const book = await Book.create({
                title,
                text,
                author_id: author.user_id
            });

            res.status(201).json({
                book_id: book._id
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });

    app.delete('/api/books/:bookId', isAuthor, isBookAuthor, async (req: Request, res: Response) => {
        try {
            const { bookId } = req.params;

            await Book.deleteOne({
                _id: bookId
            });

            res.status(204).send('Book deleted successfully');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/register', async (req, res) => {
        try {
          const { email, password, role } = req.body;

          // Validate user input
          if (!(email && password && role)) {
            return res.status(400).send('All input is required');
          }

          // Check if the user already exists
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return res.status(409).send('User Already Exists. Please Login');
          }

          const newUser = new User({ email, password, role });

          await newUser.save();

          res.status(201).send('User successfully registered');
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
    });

    app.post('/login', async (req, res) => {
        try {
          const { email, password } = req.body;

          // Validate user input
          if (!(email && password)) {
            return res.status(400).send('All input is required');
          }

          // Check if the user exists
          const user = await User.findOne({ email });

          if (user && (await bcrypt.compare(password, user.password))) {
            // Create a JWT token
            const token = jwt.sign({ user_id: user.id, email: user.email, role: user.role }, process.env.TOKEN_KEY, {
              expiresIn: '2h',
            });

            return res.status(200).json({ token });
          }

          res.status(400).send('Invalid Credentials');
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
    });


    return app;
}

import express from 'express';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';

import cartRouter from './src/routes/cart.routes';
import productRouter from './src/routes/product.routes';
import orderRouter from './src/routes/order.routes';
import { authenticateUser } from './src/middleware/auth.middleware';

async function startApp() {
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(bodyParser.json());

  // TypeORM database connection setup
  try {
    const connection = await createConnection();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error during TypeORM connection:', error);
    return;
  }

  // Routers
  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);
  app.use('/api/profile/cart', authenticateUser);
  app.use('/api/profile/cart', cartRouter);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Start the Express application and connect to the database
startApp();

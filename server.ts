import express from 'express';
import cartRouter from './src/routes/cart.routes';
import productRouter from './src/routes/product.routes';
import orderRouter from './src/routes/order.routes';
import bodyParser from 'body-parser';
import { authenticateUser } from './src/middleware/auth.middleware';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routers
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/profile/cart', authenticateUser);
app.use('/api/profile/cart', cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

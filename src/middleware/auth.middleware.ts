import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.header('x-user-id');
    if (!userId) {
      return res.status(401).json({ error: 'Missing x-user-id header' });
    }

    const userExists = await userService.userExists(userId);
    if (!userExists) {
      return res.status(401).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

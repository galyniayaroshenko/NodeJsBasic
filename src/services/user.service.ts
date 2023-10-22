import { users } from '../models/user.model';

class UserService {
  userExists(userId: string): boolean {
    const user = users.some(({ id }) => id === userId);
    return user;
  }
}

export default new UserService();

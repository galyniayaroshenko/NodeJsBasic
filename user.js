const users = [
	{
		id: 1,
		name: 'Ann',
		email: 'ann@google.com',
		hobbies: ['books', 'sport', 'dancing'],
	},
	{
		id: 2,
		name: 'Ben',
		email: 'ben@google.com',
		hobbies: ['series', 'sport'],
	},
];

function getUsers() {
  return users;
}

function createUser(newUser) {
	if (!newUser.name || !newUser.email) {
    throw new Error('Name and email are required.');
  }
  const user = {
    id: users.length + 1, // Auto-incrementing ID
    ...newUser,
    hobbies: [], // Initialize with an empty array of hobbies
  };
  users.push(user);
  return user;
}

function deleteUser(userId) {
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    throw new Error('User not found.');
  }
  users.splice(index, 1);
}

function updateUser(userId, updatedData) {
	const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('User not found.');
  }
  Object.assign(user, updatedData);
  return user;
}

function getUserById(userId) {
	const user = users.find((user) => user.id === userId);
	if (!user) {
		throw new Error('User not found.');
	}
	return user;
}

function getUsersWithoutHobbies() {
  // Create a copy of users excluding the 'hobbies' property
  return users.map(({ hobbies, ...rest }) => rest);
}

module.exports = {
  getUsers,
  createUser,
	deleteUser,
	updateUser,
	getUserById,
	getUsersWithoutHobbies,
};

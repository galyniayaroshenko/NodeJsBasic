const users = require('./user');

function addHobbyForUser(userId, hobby) {
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('User not found.')
  }
  user.hobbies.push(hobby);
  return user.hobbies;
}

function getUserHobbies(userId) {
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('User not found.')
  }
  return user.hobbies;
}

function deleteHobbyForUser(userId, hobby) {
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('User not found.')
  }
  const index = user.hobbies.indexOf(hobby);
  if (index !== -1) {
    user.hobbies.splice(index, 1);
  }
  return user.hobbies;
}

module.exports = {
  addHobbyForUser,
  getUserHobbies,
  deleteHobbyForUser
};

const users = [];
export const addUser = (userId, socketId) => {
  users.push({
    userId,
    socketId,
  });
  console.log(users, "push users");
};

export const getUser = (userId) => {
  console.log(users, "getusers");
  return users;
};

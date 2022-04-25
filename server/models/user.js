const users = [
  {
    userId: 12345,
    userName: "cathy@gmail.com",
    password: "123456"
  },
  {
    userId: 55555,
    userName: "fredburger54",
    password: "password"
  },
  {
    userId: 34212,
    userName: "coolcathy34",
    password: "badpassword"
  }
]

let getUsers = () => users;

function login(username, password) {
  const user = userExists(username);
  if(!user[0]) throw Error('User not found');
  if(user[0].password !== password) throw Error('Password is incorrect.');

  return user[0];
}

function register(user) {
  const u = userExists(user.username);
  if(u.length>0) throw Error('Username already exists')

  const newUser = {
    userId: users[users.length-1].userId + 1,
    userName: user.username,
    password: user.password
  }
  users.push(newUser);
  return newUser;
}

function deleteUser(userId) {
  let i = users.map((user) => user.userId).indexOf(userId);
  users.splice(i, 1);
  console.log(users)
}

function userExists(username) {
  return users.filter((u) => u.userName === username);
}

function editUser(user) {
  console.log(user)
  const u = userExists(user.userName);
  if(u.length > 0) throw ('Username already in use')

  const cUser = users.filter((u) => u.userId === user.userId);
  cUser[0].userName = user.userName;
  return cUser[0];
}

module.exports = { getUsers, login, register, deleteUser, editUser };

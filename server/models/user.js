const con = require("./db_connect");
const Profile = require('../models/profile');


async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255),
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`;
  await con.query(sql);
}
createTable();

let getUsers = async () => {
  const sql = `SELECT * FROM users`;
  return await con.query(sql);
};

async function getUser(user) {
  let sql;
  if(user.userId) {
    sql = `SELECT * FROM users
      WHERE user_id = ${user.userId}
    `;
  } else {
    sql = `SELECT * FROM users
      WHERE username = "${user.username}"
    `;
  }

  return await con.query(sql);
}

async function login(username, password) {
  const user = await userExists(username);
  if(!user[0]) throw Error('User not found')
  if(user[0].user_password !== password) throw Error("Password is incorrect");

  //After login update login date for the user
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  let data = {'user_id': user[0].user_id, 'last_login':date + ' ' + time}
  await Profile.edit_last_login(data);

  return user[0];
}

async function register(user) {
  const u = userExists(user.username);
  if(u.length>0) throw Error("Username already exists");

  const sql = `INSERT INTO users (username, user_password)
    VALUES ("${user.username}", "${user.password}")
  `;

  const insert = await con.query(sql);
  const newUser = await getUser(user);

  //After register update profile entry for the user with date_created
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


  let data = {'user_id': newUser[0].user_id, 'date_created':date + ' ' + time}
  console.log(data);
  console.log(newUser);

  await Profile.createProfile(data);

  return newUser[0];
}

async function deleteUser(userId) {
  const sql = `DELETE FROM users 
    WHERE user_id = ${userId}
  `;
  await con.query(sql);
 
}

async function userExists(username) {
  const sql = `SELECT * FROM users
    WHERE username = "${username}"
  `;
  return await con.query(sql);
}

async function editUser(user) {
  const sql = `UPDATE users SET
    username = "${user.userName}"
    WHERE user_id = ${user.userId}
  `;
  const update = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}

async function editUserPassword(user) {
  const sql = `UPDATE users SET
    user_password = "${user.password}"
    WHERE user_id = ${user.userId}
  `;
  const update = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}


module.exports = { getUsers, login, register, deleteUser, editUser,editUserPassword, getUser, createTable };

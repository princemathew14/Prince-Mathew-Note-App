const con = require("./db_connect");

async function createTable() {
  let sql =
  `
  CREATE TABLE IF NOT EXISTS profile ( 
    profile_id INT NOT NULL AUTO_INCREMENT , 
    user_id INT NOT NULL , 
    caption VARCHAR(1023) NOT NULL , 
    date_created DATETIME NOT NULL , 
    last_login DATETIME NOT NULL , 
    PRIMARY KEY (profile_id)
  )`;
  await con.query(sql);
}
createTable();

async function getProfile(user) {
  let sql;
  if(user) {
    sql = `SELECT * FROM profile
      WHERE user_id = ${user}
    `;
  }
  return await con.query(sql);
}


async function createProfile(data) {

  const sql = `INSERT INTO profile 
    (user_id, caption, date_created, last_login) 
    VALUES ('${data.user_id}', 
    '', '${data.date_created}', '${data.date_created}')`
  

  const insert = await con.query(sql);
  return insert;
}


async function edit_caption(data) {
  
  const sql = `UPDATE profile SET
    caption = "${data.caption}"
    WHERE user_id = ${data.user_id}
  `;

  const insert = await con.query(sql);
  return insert;
}

async function edit_last_login(data) {
  
  const sql = `UPDATE profile SET
    last_login = "${data.last_login}"
    WHERE user_id = ${data.user_id}
  `;

  const insert = await con.query(sql);
  return insert;
}






module.exports = {getProfile, createProfile, edit_caption,edit_last_login, createTable };

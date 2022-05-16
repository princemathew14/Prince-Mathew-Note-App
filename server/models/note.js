const con = require("./db_connect");

async function createTable() {
  let sql = 
  `CREATE TABLE IF NOT EXISTS notes ( 
    note_id INT NOT NULL AUTO_INCREMENT , 
    user_id INT NOT NULL , 
    message VARCHAR(1023),
    CONSTRAINT note_id PRIMARY KEY(note_id)
  )`;
  await con.query(sql);
}
createTable();

let getNotes = async () => {
  const sql = `SELECT * FROM notes`;
  return await con.query(sql);
};

async function getNote(user) {
  let sql;
  if(user) {
    sql = `SELECT * FROM notes
      WHERE user_id = ${user}
    `;
  }
  return await con.query(sql);
}


async function add_note(data) {
  
  const sql = `INSERT INTO notes (user_id, message)
    VALUES ("${data.user.user_id}", "${data.message}")
  `;

  const insert = await con.query(sql);
  return insert;
}

async function deleteNote(noteId) {
  const sql = `DELETE FROM notes 
    WHERE note_id = ${noteId}
  `;
  console.log(sql);
  await con.query(sql);
 
}





module.exports = {add_note, deleteNote, getNote, getNotes, createTable };

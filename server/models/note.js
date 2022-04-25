const notes = [
  {
    noteId: 12345,
    body: "this is a test note A"
  },
  {
    noteId: 55555,
    body: "this is a test note B"
  }
]

let getNotes = () => notes;


function addnote(note) {


  const newNote = {
    noteId: notes[notes.length-1].noteId + 1,
    body: note.body
  }
  notes.push(newNote);
  return newNote;
}



module.exports = { getNotes, addnote };

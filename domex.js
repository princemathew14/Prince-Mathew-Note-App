//Constructor will be on the backend but okay to have here for now
let amount = 10; //we'll deal with ids on backend
class Note {
  constructor(note) {
    this.noteId = amount;
    this.noteText = note;
    amount++;
  }
}

//1. Grab your form by the id and any other sections needed
let form = document.getElementById("noteForm");
let notes = document.getElementById("notes");



//2. Add an event listener for when submitted
form.addEventListener('submit', addNote);

//3. Create your function for addNote from above
function addNote(e) {
  e.preventDefault(); //need to stop normal submission of form
  //4. Get the note using your id
  let note = document.getElementById("note").value;
  
  const newNote = new Note(note);
  console.log(newNote);
  //5. Create new li to add note text to
  let li = document.createElement('li');
  //6. Add any styling/classes 
  li.className = 'note';
  //7. Add note text inside li
  li.appendChild(document.createTextNode(note));
  //8. Append finished li to notes list
  notes.appendChild(li);
  
  //10. adding delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.addEventListener('click', deleteNote);
  deleteBtn.className = "button delete";
  let x = document.createTextNode("X");
  deleteBtn.appendChild(x);
  li.appendChild(deleteBtn);

  //9. Get rid of text after submitting
  document.getElementById("note").value = "";
}

function deleteNote(e) {
  let li = e.target.parentElement;
  notes.removeChild(li);
}





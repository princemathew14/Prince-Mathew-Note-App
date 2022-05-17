import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'

const noteForm = document.getElementById("note-form");
if(noteForm) noteForm.addEventListener('submit', add_note);

function add_note(e) {
  e.preventDefault();

  const message = document.getElementById("note").value;
  fetchData('/notes/add_note',{message:message, user:getCurrentUser()}, "POST")
  .then((data) => { //cathy123, 12345
    if(!data.message) {
      //setCurrentUser(data);
      window.location.href = "whatnote.html";
    }
  })
  .catch((error) => {
    console.log(error);
    const errText = error.message;
    
    console.log(`Error! ${errText}`);
  });
}


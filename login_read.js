import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './scripts/main.js'

let logForm = document.getElementById("login_form");

if(logForm) logForm.addEventListener('submit', read_info);



function read_info(e) {
    e.preventDefault(); //need to stop normal submission of form

    console.log('Login Submit clicked');
    console.log(logForm)

    const user_email = document.getElementById("email").value;
    const user_pass = document.getElementById("pswd").value;

    // user_email = (logForm.elements['email'].value)
    // user_pass = (logForm.elements['pswd'].value)


    console.log(user_email)
    console.log(user_pass)


    fetchData('/users/login', {username: user_email, password: user_pass}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "whatnote.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#login_form p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}

const regForm = document.getElementById("registrationForm");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();

  const name = document.getElementById("email").value;
  const pswd = document.getElementById("pswd").value;

  fetchData('/users/register', {username: name, password: pswd}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "whatnote.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#registrationForm p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}



 
import 
{ getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData ,getData} 
from './main.js'


let user = getCurrentUser();

if(!user) window.location.href = "login.html";

let profile = document.getElementById("profile");

profile.innerHTML = `
  <h2>Welcome back, ${user.username}!</h2>
  <div>
    <p class="error"></p>
    <button class="btn" id="edit">Edit Info</button>
    <button class="btn" id="delete">Delete Account</button>
  </div>
`;

await getProfile();

document.getElementById("edit").addEventListener('click', editProfile);
document.getElementById("delete").addEventListener('click', deleteAccount);

function editProfile() {
  profile.classList.toggle("hide");
  let editForm = document.getElementById("editForm");
  let passForm = document.getElementById("passForm");
  let captionForm = document.getElementById("captionForm");
  editForm.innerHTML = `
    <form id="form" class="basic-form">
      <p class="error"></p>
      <h2>Edit Profile</h2>
      <label for="username">Change Username</label>
      <input type="text" name="username" id="username" placeholder="${user.username}">
      <br>
      <input type="submit" value="Submit">
    </form>`;

  passForm.innerHTML = `

    <form id="pForm" class="basic-form">
      <p class="error"></p>
      <h2>Change Password</h2>
      <label for="pswd">Change Password</label>
      <input type="password" name="pswd" id="pswd">
      <br>
      <input type="submit" value="Submit">
    </form>
  `;

  captionForm.innerHTML = `

    <form id="cForm" class="basic-form">
      <p class="error"></p>
      <h2>Change Caption</h2>
      <label for="cap">Change Caption</label>
      <input type="text" name="cap" id="cap">
      <br>
      <input type="submit" value="Submit">
    </form>
    <button class="btn" id="cancel" >Cancel</button>
  `;

  editForm.addEventListener('submit', editAccount)
  passForm.addEventListener('submit', editAccountPass)
  captionForm.addEventListener('submit', editCaption)

  document.getElementById("cancel").addEventListener('click', (e) => {
    window.location.href = "profile.html";
  })
}

function editAccount(e) {


  e.preventDefault();

  let userName = document.getElementById("username").value;
  let password = document.getElementById("pswd").value;

  if(userName === user.username) {
    let err = "No changes made";
    document.querySelector("#editForm p.error").innerHTML = err;
  }
  else {
    fetchData('/users/edit', {userId: user.user_id, userName: userName}, "PUT")
    .then((data) => {
      if(!data.message) {
        removeCurrentUser();
        setCurrentUser(data);
        const Text = "Success :)";
        document.querySelector("#editForm p.error").innerHTML = Text;
       
        //window.location.href = "profile.html"
      }
    })
 
    .catch((error) => {
       const errText = error.message;
       document.querySelector("#editForm p.error").innerHTML = errText;
       console.log(`Error! ${errText}`)
     });
  
  }
}

function getProfile() {
 
  let url = '/profile/get_profile/' + getCurrentUser().user_id;
  console.log(url);
  getData(url, "GET")
  .then((data) => { //cathy123, 12345
    console.log(data);

    profile.innerHTML = `
    <h2>Welcome back, ${user.username}!</h2>
    <h2>My Caption : ${data[0].caption}</h2>
    <h4>Date Created :  ${data[0].date_created}</h2>
    <h4>Last Login   : ${data[0].last_login}</h2>
    <div>
      <p class="error"></p>
      <button class="btn" id="edit">Edit Info</button>
      <button class="btn" id="delete">Delete Account</button>
    </div>
  `;

  document.getElementById("edit").addEventListener('click', editProfile);
document.getElementById("delete").addEventListener('click', deleteAccount);
    return data


  });

}

function editAccountPass(e) {


  e.preventDefault();
  let password = document.getElementById("pswd").value;
  console.log(password)
    fetchData('/users/editPassword', {userId: user.user_id, password: password}, "PUT")
    .then((data) => {
      if(!data.message) {
        removeCurrentUser();
        setCurrentUser(data);
        console.log(getCurrentUser())
        const Text = "Success";
        document.querySelector("#passForm p.error").innerHTML = Text;
       
        //window.location.href = "profile.html"
      }
    })
 
    .catch((error) => {
       const errText = error.message;
       document.querySelector("#passForm p.error").innerHTML = errText;
       console.log(`Error! ${errText}`)
     });
}

function editCaption(e) {

  e.preventDefault();
  console.log('change caption');

  let caption = document.getElementById("cap").value;
  console.log(caption)
    fetchData('/profile/caption', {user_id: user.user_id, caption: caption}, "PUT")
    .then((data) => {
      if(!data.message) {
        
        const Text = "Success";
        document.querySelector("#captionForm p.error").innerHTML = Text;
       
        //window.location.href = "profile.html"
      }
    })
 
    .catch((error) => {
       const errText = error.message;
       document.querySelector("#captionForm p.error").innerHTML = errText;
       console.log(`Error! ${errText}`)
     });


}



function deleteAccount() {
  if(confirm('Are you sure you want to delete your account???')) {
    fetchData('/users/delete', {userId: user.user_id}, "DELETE")
    .then((data) => {
      if(!data.message) {
        console.log(data.success)
        logout();
        window.location.href = "register.html"
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#profile div p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    })
  }
}
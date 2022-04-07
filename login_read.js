let logForm = document.getElementById("login_form");

logForm.addEventListener('submit', read_info);

function read_info(e) {
    e.preventDefault(); //need to stop normal submission of form

    console.log('Login Submit clicked');
    user_email = (logForm.elements['email'].value)
    user_pass = (logForm.elements['pswd'].value)


    console.log(user_email)
    console.log(user_pass)



}
 
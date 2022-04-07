class User {
    constructor(id, email, pswd, birthday) {
      this.userId = id;
      this.email = email;
      
      this.password= pswd;
      this.birthday = birthday;
    }
    //get methods
    getUserId() {
      return this.userId;
    }
    getEmail() {
      return this.email;
    }
    getUserPassword() {
      return this.pswd;
    }
    getBirthday() {
      return this.birthday;}
    //set methods
    setUserId(id) {
      this.userId = id;
    }
    setEmail(email) {
      this.email = email;
    }
    setUserPassword(pswd) {
      this.password= pswd;
    }
    setBirthday(birthday) {
      this.birthday = birthday;
    //valid password method
    }
  }


let regForm = document.getElementById("registrationForm");

regForm.addEventListener('submit', addUser);

function addUser(e) {
    e.preventDefault(); //need to stop normal submission of form

    console.log('Registration Submit clicked');
    user_email = (regForm.elements['email'].value)
    user_pass = (regForm.elements['pswd'].value)
    user_birth = (regForm.elements['birthday'].value)

    let user1 = new User(1,user_email, user_pass, user_birth);
    console.log(user1)




}
 
  
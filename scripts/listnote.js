import 
{ fetchData, getData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'

function test() {

  console.log(getCurrentUser());
  let url = '/notes/get_note/' + getCurrentUser().user_id;
  console.log(url);
  getData(url, "GET")
  .then((data) => { //cathy123, 12345
    if(!data.message) {
      console.log('in if');
      console.log(data)

      var ul = document.getElementById('notes');
      data.forEach((dd) => {

        let div = document.createElement('div');


        let li = document.createElement('li');
        let text = document.createTextNode(dd.message);
        
        let d = document.createElement('button')
        d.onclick = fre

        d.innerHTML = 'DELETE'
        d.id = dd.note_id
      
        

        li.append(text);
        div.append(li)
        div.append(d)
        ul.append(div);

      })                     
    
      //setCurrentUser(data);
      //window.location.href = "whatnote.html";
    } else{
      console.log('in else');
    }
  })
  .catch((error) => {
    console.log(error);
    const errText = error.message;
    
    console.log(`Error! ${errText}`);
  });
}

test()


function fre() {
  let id_val = this.id;

  fetchData('/notes/delete',{noteId:id_val}, "DELETE")
  .then((data) => { //cathy123, 12345
    if(!data.message) {
      //setCurrentUser(data);
      window.location.href = "listnote.html";
    }
  })
  .catch((error) => {
    console.log(error);
    const errText = error.message;
    
    console.log(`Error! ${errText}`);
  });
}
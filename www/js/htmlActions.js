/* Create users Functions */

function createUser(){
  var userName = document.getElementById("username").value;
  var img = document.getElementById("imagen").value;
  revisarUsuario(userName,img);
};

function revisarUsuario(userName,img){
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var usuarios = snapshot.val();
    for (currentUser in usuarios){
      if (currentUser == userName){
        console.log(currentUser);
        alert('User exists');
        return;
      }
    }

    firebase.database().ref().child('users/' + userName).set({
      photourl : img});
    alert('User created');
  });

}
/* Login Functions*/

function login(){
    var userName = document.getElementById("usernameLogin").value;
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
      var usuarios = snapshot.val();
    console.log(usuarios);
    for (currentUser in usuarios){
      if (currentUser == userName){
        redireccionar();
        localStorage.setItem('user1',JSON.stringify(usernameLogin.value));
        return;
      }
    }
    alert('User does not exists');
  });

}

/* General Functions*/

function redireccionar(){
  window.location.href = "index.html";
};

function makeList(){
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
  var array = snapshot.val();

  var myDiv = document.getElementById('userList');
  var selectList = document.createElement('select');
  selectList.setAttribute('id', 'mySelect');
  myDiv.appendChild(selectList);
    for(currentUser in array) {

        var item = document.createElement('option');
        item.setAttribute("value", currentUser.toString());
        item.text = currentUser.toString();
        selectList.appendChild(item);
      }
  localStorage.setItem('user2',JSON.stringify(document.getElementById('mySelect').options[mySelect.selectedIndex].value));
  });
}

function whatChat() {
  var user = document.getElementById('mySelect').options[mySelect.selectedIndex].value;
  localStorage.setItem('user2',JSON.stringify(user));


}

function onLoadIndex(){
  document.getElementById("home").innerHTML = "Welcome: " + localStorage.getItem('user1');
  makeList();
  var nombre = localStorage.getItem('user1');
  var imagen = document.getElementById("img1");
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
      var usuarios = snapshot.val();
      for (currentUser in usuarios){
        if ('"'+currentUser+'"'== nombre){    
          imagen.setAttribute('src',usuarios.Dario.photourl);
        return;
      }
    }
  })



};


function createChat(){
  var message = document.getElementById('message').value;
  var user1 = JSON.parse(localStorage.getItem("user1"))
  var user2 = JSON.parse(localStorage.getItem('user2'));
  console.log(user1);
  console.log(user2);
  console.log(message);
  var newChat = firebase.database().ref().child('/posts').push({
    user: user1,
    message : message});
    console.log('posted message to server');
  firebase.database().ref('/users/'+ user1 + '/chats/'+ user2).set({
    id : newChat.key});
  firebase.database().ref('/users/'+ user2 + '/chats/'+ user1).set({
    id : newChat.key});


}

function readWriteChat(){
  var user1 = JSON.parse(localStorage.getItem("user1"))
  var user2 = JSON.parse(localStorage.getItem('user2'));
  if (user1 == user2) {
    alert('No puede hacer chat con la misma persona');
    return;
  }
  firebase.database().ref('/users/'+ user1 + '/chats/'+user2).once('value').then(function(snapshot) {
  var array = snapshot.val();
  localStorage.setItem('key',JSON.stringify(array.id));
  });
  var message = document.getElementById("message").value;
   firebase.database().ref().child('posts/'+ JSON.parse(localStorage.getItem('key'))).push({
     message: message,
     user : user1});
     console.log('posted message to server');


}
var commentsRef = firebase.database().ref('posts/'+ JSON.parse(localStorage.getItem('key')));

commentsRef.on('child_added', function(data) {
  displayChatMessage(data.val());
});



function displayChatMessage(data){

  var messages = document.getElementById('messages');
  var newMessage = data.user + ":" + data.message;
  newMessage = "<div>" + newMessage + "</div>";
  messages.innerHTML = messages.innerHTML + newMessage;
  
}


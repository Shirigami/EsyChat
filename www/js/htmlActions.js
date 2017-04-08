/* Function of create users */
var actualUser;
function createUser(){
  var userName = document.getElementById("username").value;
    revisarUsuario(userName);
};

function revisarUsuario(userName){
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var usuarios = snapshot.val();
    console.log(usuarios);
    for (currentUser in usuarios){
      if (currentUser == userName){
        console.log(currentUser);
        alert('User exists');
        return;
      }
    }
    console.log("entre");
    firebase.database().ref().child('users/' + userName).set({
      photourl : "www.example.com"});
    localStorage.setItem("user",userName);
    alert('User created');

  });
}

function redireccionar(){
  window.location.href = "index.html";
};

function login(){
  var userName = document.getElementById("usernameLogin").value;
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var usuarios = snapshot.val();
    console.log(usuarios);
    for (currentUser in usuarios){
      if (currentUser == userName){
        redireccionar();
        localStorage.setItem('user',userName);
        return;
      }
    }
    alert('User does not exists');
  });
}


function onLoadIndex(){
  console.log(actualUser);
  document.getElementById("home").innerHTML = localStorage.getItem('user');

};

/*
function push(){
  var message = document.getElementById("message").value;
  firebase.database().ref().child('posts').push({
    id: id,
    message : message});
    console.log('posted message to server');
}


var commentsRef = firebase.database().ref('posts');
commentsRef.on('child_added', function(data) {
  displayChatMessage(data.val());
});

function displayChatMessage(data){
  var messages = document.getElementById('messages');
  var newMessage = "User" + data.id + " :" + data.message;
  newMessage = "<div>" + newMessage + "</div>";
  messages.innerHTML = messages.innerHTML + newMessage;
}
*/

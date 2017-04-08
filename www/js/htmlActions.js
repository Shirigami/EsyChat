/* Create users Functions */

function createUser(){
  var userName = document.getElementById("username").value;
  revisarUsuario(userName);
};

function revisarUsuario(userName){
  firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var usuarios = snapshot.val();
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
/* Login Functions*/

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

/* General Functions*/
function onLoadIndex(){
  document.getElementById("home").innerHTML = "Welcome: " + localStorage.getItem('user');

};
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
      console.log(currentUser);
        var item = document.createElement('option');
        item.setAttribute("value", currentUser.toString());
        item.text = currentUser.toString();
        selectList.appendChild(item);
      }
  });
}

function whatChat() {
  var user = document.getElementById('mySelect').options[mySelect.selectedIndex].value;
  console.log(user);

}

function onLoadIndex(){
  document.getElementById("home").innerHTML = "Welcome: " + localStorage.getItem('user');
  makeList();

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

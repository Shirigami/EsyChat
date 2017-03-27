var id = 64;
window.onload = function OnLoad(){
  document.getElementById("username").innerHTML = 'User ' + id;

};

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

function register() {
  var email=document.getElementById('text1').value;
  var password=document.getElementById('text2').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    window.alert("registered successfully");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error :" + errorMessage);
    // ..
  });
}

function login(){
  var useremail=document.getElementById('text1').value;
  var password=document.getElementById('text2').value;

  firebase.auth().signInWithEmailAndPassword(useremail, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.alert("login successful");
    window.location.href="index4.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error :" + errorMessage);
  });
  
}


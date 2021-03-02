

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDoqPlYgLEUUyirulXKMUULhAlj4ih3up0",
    authDomain: "notesapp-efdd4.firebaseapp.com",
    projectId: "notesapp-efdd4",
    storageBucket: "notesapp-efdd4.appspot.com",
    messagingSenderId: "678668896822",
    appId: "1:678668896822:web:b149d646c41fc918ce2697",
    measurementId: "G-J89YDXHP2Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 
  
function register()
{
  var email=document.getElementById('button1').value;
  var password=document.getElementById('button2').value;
  firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
    alert('signup done successfully');
  }).catch(function(error)
  {
    var errorcode=error.code;
    var errormsg=error.message;
  });
}


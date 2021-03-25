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

const notelist=document.querySelector('#seepreviousnotes');
const form=document.querySelector('#createnotes');

function rendernote(doc){
  let li=document.createElement('li');
  let title=document.createElement('span');
  let notes=document.createElement('span');

  li.setAttribute('data-id',doc.id);
  title.textContent=doc.data().TITLE;
  notes.textContent=doc.data().NOTES;

  li.appendChild(title);
  li.appendChild(notes);

  notelist.appendChild(li);
}

//getting data
db.collection('user').get().then(snapshot =>{
snapshot.docs.forEach(doc => {
  rendernote(doc);
});
});

//saving data
form.addEventListener('submit',(e) =>{
  e.preventDefault();
  db.collection('user').add({
    TITLE:form.title.value,
    NOTES:form.notes.value
  });
  form.title.value='';
  form.notes.value='';
})

const loggedoutlinks=document.querySelectorAll('.loggedout');
const loggedinlinks=document.querySelectorAll('.loggedin');

const setupUI = (user) => {
    if (user){
        loggedinlinks.forEach(item =>item.style.display = 'block');
        loggedoutlinks.forEach(item.style.display = 'none');
    } else {
        loggedinlinks.forEach(item =>item.style.display = 'none');
        loggedoutlinks.forEach(item.style.display = 'block');
    }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    // window.location.href="index4.html";
    db.collection('user').get().then(snapshot =>{
      snapshot.docs.forEach(doc => {
        rendernote(doc);
        setupUI(user);
      });
      });

  } else {
    // No user is signed in.
    // window.location.href="index4.html";
    console.log('user logged out');
    setupUI();
    rendernote([]);
 }
});

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

function signout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.alert("Sign-out successful");
   
  }).catch((error) => {
    window.alert("Error");
    // An error happened.
  });
}


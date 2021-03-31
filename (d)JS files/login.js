function register() {
  var email=document.getElementById('text1').value;
  var password=document.getElementById('text2').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // db.collection('users').doc(user.uid).set({
     // username=document.getElementById('text3').value;
    //});
    
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

lb = function () { return document.createTextNode('<br/>'); }

const notelist=document.querySelector('#seepreviousnotes');
const form=document.querySelector('.createnotes');

function rendernote(doc){
  let li=document.createElement('li');
  let title=document.createElement('span');
  let lb=document.createElement('span');
  let notes=document.createElement('span');
  let cross=document.createElement('div');
  let email=document.createElement('email');
  let timestamp=document.createElement('span');
  
  //let update=document.createElement('update');
  li.setAttribute('data-id',doc.id);
  title.textContent=doc.data().TITLE;
  lb.textContent='\n';
  notes.textContent=doc.data().NOTES;
  cross.textContent='DELETE';
  email.textContent=doc.data().EMAIL;
  timestamp.textContent=doc.data().TIMESTAMP;
  //update.textContent='UPDATE';

  li.appendChild(title);
  li.appendChild(lb);
  li.appendChild(notes);
  li.appendChild(lb);
  li.appendChild(email);
  li.appendChild(lb);
  li.appendChild(timestamp);
  //li.appendChild(lb);
  
  li.appendChild(cross);
  //li.appendChild(lb);

  //li.appendChild(update);

 
  notelist.appendChild(li);

  //deleting data
  cross.addEventListener('click',(e) =>{
    e.stopPropagation();
    let id=e.target.parentElement.getAttribute('data-id'); //used to get the specific element
    db.collection('user').doc(id).delete();
  })

  // update.addEventListener('click',(e) =>{
    //e.preventDefault();
    // let id=e.target.parentElement.childElement(title);
    // db.collection('user').doc(id).update({
      
    //  NOTES:form.notes.value,
     
    // });
   
    // form.notes.value='';
   
  // })
}



//getting data
//db.collection('user').get().then(snapshot =>{
//snapshot.docs.forEach(doc => {
  //rendernote(doc);
//});
//});

//saving data
let now=new Date();
form.addEventListener('submit',(e) =>{
  e.preventDefault();
  db.collection('user').add({
    TITLE:form.title.value,
    NOTES:form.notes.value,
    EMAIL:form.email.value,
    TIMESTAMP:now.getTime() 
  });
  form.title.value='';
  form.notes.value='';
  form.email.value='';
})

form.addEventListener('submit',(e1) =>{
  e1.preventDefault();
  db.collection('user').doc(title).update(
    {
    
    NOTES:form.notes.value,
    EMAIL:form.email.value,
    TIMESTAMP:now.getTime() 
  });
  //form.title.value='';
  form.notes.value='';
  form.email.value='';
})




const loggedoutlink=document.querySelectorAll('.loggedout');
const loggedinlink=document.querySelectorAll('.loggedin');

const setup= (user) => {
    if (user){
        loggedinlink.forEach(item =>item.style.display = 'block');
        loggedoutlink.forEach(item=>item.style.display = 'none');
    } else {
        loggedinlink.forEach(item =>item.style.display = 'none');
        loggedoutlink.forEach(item=>item.style.display = 'block');
    }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    // window.location.href="index4.html";
    console.log('user logged in');

    
        db.collection('user').where('EMAIL','==',user.email).get().then(snapshot =>{
          snapshot.docs.forEach(doc => {
            rendernote(doc);
            
          
          });
          
          });
        setup(user);  
         
      }
    

   else {
    // No user is signed in.
    // window.location.href="index4.html";
    console.log('user logged out');
    setup();
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


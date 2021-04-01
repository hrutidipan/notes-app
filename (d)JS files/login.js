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
const tbody=document.getElementById('tbody1');
function rendernote(doc){
 
  //let update=document.createElement('update');
  var li=document.createElement('span');
  li.setAttribute('data-id',doc.id);
  let cross=document.createElement('div');
  var title=doc.data().TITLE;
  //lb.textContent='\n';
  var notes=doc.data().NOTES;
  //var cross="DELETE";
  var email=doc.data().EMAIL;
  var timestamp=doc.data().TIMESTAMP;


  //update.textContent='UPDATE';
  
  AddItemsToTable(title,notes,email,timestamp);
  
  cross.textContent='DELETE';
  li.appendChild(cross);
tbody.appendChild(li);
  cross.addEventListener('click',(e) =>{
    e.stopPropagation();
     var id=e.target.parentElement.getAttribute('data-id'); //used to get the specific element
     db.collection('user').doc(id).delete();
   })
  

}


function AddItemsToTable(title,notes,email,timestamp){
  var tbody=document.getElementById('tbody1');
  var li=document.createElement('li');
  var td1=document.createElement('td');
  //var lb=document.createElement('td');
  var td2=document.createElement('td');
  var td3=document.createElement('td');
  var td4=document.createElement('td');
  //var td5=document.createElement('div');
td1.innerHTML=title;
td2.innerHTML=notes;
td3.innerHTML=email;
td4.innerHTML=timestamp;
//td5.innerHTML=cross;
  li.appendChild(td1);
 // li.appendChild(lb);
  li.appendChild(td2);
  //li.appendChild(lb);
  li.appendChild(td3);
 // li.appendChild(lb);
  li.appendChild(td4);
  //li.appendChild(lb);
  
  //li.appendChild(td5);
  //li.appendChild(lb);

  //li.appendChild(update);
 
  tbody.appendChild(li);
 
}
  //deleting data
  
 


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

form.addEventListener('submit',(e) =>{
  e.preventDefault();
  db.collection('title').where('TITLE','==',title).update({
    //TITLE:form.title.value,
    NOTES:form.notes.value,
    EMAIL:form.email.value,
    TIMESTAMP:now.getTime() 
  });
  form.title.value='';
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



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

//const notelist=document.querySelector('#seepreviousnotes');
const form=document.querySelector('.createnotes');
const tbody=document.getElementById('tbody1');
//const form12=document.querySelector('.createnotes12');

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

let titleT=document.getElementsByTagName('title');
let notesT=document.getElementsByTagName('notes');
let emailT=document.getElementsByTagName('email');

 let titleV=titleT.value;
 let notesV=notesT.value;
 let emailV=emailT.value; 

function Update(val,type){
  if(type=='title') titleV=val;
  else if(type=='notes') notesV=val;
  else if(type=='email') emailV=val;
}  
 


//saving data
let now=new Date();
//form.addEventListener('submit',(e) =>{
  //e.preventDefault();

function add_doc(){
  
  db.collection('user').doc(titleV).set({
    TITLE:titleV,
    NOTES:notesV,
    EMAIL:emailV,
    TIMESTAMP:now.getTime() 
  });
  //titleV='';
  //notesV='';
  //emailV='';
  
}

function update_doc(){
  db.collection('user').doc(titleV).update(
    {
    
    NOTES:notesV,
    EMAIL:emailV,
    TIMESTAMP:now.getTime() 
  });
  //titleV='';
  //notesV='';
  //emailV='';
  
}

function retrieve_notes(){
  var docRef = db.collection("user").doc(titleV);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          notesT.value=doc.data().NOTES;
          emailT.value=doc.data().EMAIL;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}


const loggedoutlink=document.querySelectorAll('.loggedout');
const loggedinlink=document.querySelectorAll('.loggedin');
const user_details=document.querySelector('.userdetails');

const setup= (user) => {
    if (user){
     
      
        loggedinlink.forEach(item =>item.style.display = 'block');
        loggedoutlink.forEach(item=>item.style.display = 'none');
        var user = firebase.auth().currentUser;
        if(user != null){
          var email_id=user.email;
          user_details.innerHTML="Welcome user " + email_id;
        }
    } else {
      user_details.innerHTML='';
        loggedinlink.forEach(item =>item.style.display = 'none');
        loggedoutlink.forEach(item=>item.style.display = 'block');
    }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    // window.location.href="index4.html";
    console.log('user logged in');

    
        db.collection('user').where('EMAIL','==',user.email).onSnapshot(snapshot =>{
         let changes=snapshot.docChanges();
         console.log(changes);
        changes.forEach(change =>{
           if(change.type == 'added'){
             rendernote(change.doc);
           } else if (change.type=='removed'){
             let li=tbody.querySelector('[data-id=' + change.doc.id +']');
             tbody.removeChild(li);
           }
         })
          
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

function resetpassword(){

  var auth=firebase.auth();
  var email=document.getElementById('text1').value;

  if(email !="")
  {
   auth.sendPasswordResetEmail(email).then(function(){

window.alert("An email has been sent to you,please proceed as given in that email");
   })
   .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    window.alert("Error :" + errorMessage);
   });

  }
  else{
    window.alert("please enter email first.");
  }
}



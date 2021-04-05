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
//cross.addEventListener('click', function(){
 //location.reload();
//})
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



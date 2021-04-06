// const loggedoutlinks=document.querySelectorAll('.loggedout');
// const loggedinlinks=document.querySelectorAll('.loggedin');

// const setupUI = (user) => {
//     if (user){
//         loggedinlinks.forEach(item =>item.style.display = 'block');
//         loggedoutlinks.forEach(item.style.display = 'none');
//     } else {
//         loggedinlinks.forEach(item =>item.style.display = 'none');
//         loggedoutlinks.forEach(item.style.display = 'block');
//     }
// }

let titleT=document.getElementsByTagName('title');
let notesT=document.getElementsByTagName('notes');
//let emailT=document.getElementsByTagName('email');

 let titleV=titleT.value;
 let notesV=notesT.value;
 //let emailV=emailT.value; 

function Update(val,type){
  if(type=='title') titleV=val;
  else if(type=='notes') notesV=val;
  //else if(type=='email') emailV=val;
}  
 


//saving data
let now=new Date();
//form.addEventListener('submit',(e) =>{
  //e.preventDefault();


function add_doc(){
  var user = firebase.auth().currentUser;
  var emaild=user.email;
  
  db.collection('user').doc(titleV).set({
    TITLE:titleV,
    NOTES:notesV,
    EMAIL:emaild,
    TIMESTAMP:now.getTime() 
  });
  window.alert("note added successfully");
  //titleV='';
  //notesV='';
  //emailV='';
  
}

function update_doc(){
  var user = firebase.auth().currentUser;
  var emaild=user.email;
  db.collection('user').doc(titleV).update(
    {
    
    NOTES:notesV,
    EMAIL:emaild,
    TIMESTAMP:now.getTime() 
  });
  //titleV='';
  //notesV='';
  //emailV='';
  window.alert(" note updated successfully");
}

//const banner=document.querySelector('#tbody1');
//console.log('node type:' + banner.nodeType);

function retrieve_notes(){
  var docRef = db.collection("user").doc(titleV);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          //notesT.value=doc.data().NOTES;
          //emailT.value=doc.data().EMAIL;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}

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
    console.log('user logged in as' + ' ' +user.email);

    
        db.collection('user').where('EMAIL','==',user.email).onSnapshot(snapshot =>{
         let changes=snapshot.docChanges();
         console.log(changes);
        changes.forEach(change =>{
           if(change.type == 'added'){
            rendernote(change.doc);
           } else if (change.type=='removed'){
           // var tbody3=document.getElementById('tbody1')
            let li=tbody.getElementById('[dataid=' + change.doc.id +']');
            
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
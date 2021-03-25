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
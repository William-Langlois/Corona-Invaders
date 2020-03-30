// Get the modal
var modal = document.getElementById('id01');
const linkHome = document.getElementById('nav-link-home');
const closeLoginFormIcon = document.getElementById('close-login-form-icon');

//When the user click on the icon to close the modal
closeLoginFormIcon.addEventListener('click',function () {
    closeLoginForm();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeLoginForm();
    }
};

function closeLoginForm() {
    modal.style.display = "none";
    let lastActive = document.getElementsByClassName('nav-link-active');
    if (lastActive[0] != ""){
        lastActive[0].classList.remove('nav-link-active')
    }
    linkHome.classList.add('nav-link-active')
}

function validation() {
    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;

};
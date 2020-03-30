var modal = document.getElementById('id02');
const linkHome = document.getElementById('nav-link-home');
const closeRegisterFormIcon = document.getElementById('close-register-form-icon');

closeRegisterFormIcon.addEventListener('click', function () {
    closeRegisterForm();

});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        closeRegisterForm = "none";
    }
};

function closeRegisterForm() {
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
    var password2 = document.getElementById("psw2").value;

};
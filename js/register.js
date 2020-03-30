const modal2 = document.getElementById('id02');
const closeRegisterFormIcon = document.getElementById('close-register-form-icon');

closeRegisterFormIcon.addEventListener('click', function () {
    modal2.style.display = "none";

    closeRegisterForm();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";

        closeRegisterForm();
    }
};

function closeRegisterForm() {
    modal2.style.display = "none";
    let lastActive = document.getElementsByClassName('nav-link-active');
    if (lastActive[0] != ""){
        lastActive[0].classList.remove('nav-link-active')
    }
    linkHome.classList.add('nav-link-active')
}

function validation() {
    var username = document.getElementById("rname").value;
    var password = document.getElementById("rpsw").value;
    var password2 = document.getElementById("rpsw2").value;

};
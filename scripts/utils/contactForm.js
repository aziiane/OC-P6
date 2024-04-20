
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const firstName = document.getElementById("first");
	modal.style.display = "block";
    firstName.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const closeBtn = document.getElementById("contactClose");
closeBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.code === "Space") {
        event.preventDefault();
        document.querySelector("body").focus();
        closeModal();
    }
});

//REGEX for Validation
const nameRegex = /^([a-zA-Z\é\è\ê\ë\-]{2,})$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{1,})$/;
const messageRegex = /^.{3,}$/;

//FORM ELEMENTS
const form = document.getElementById("form");
//first name
const firstName = document.getElementById("first");
//last name
const lastName = document.getElementById("last");
//email
const email = document.getElementById("email");
//message
const message = document.getElementById("message");

const inputList = [firstName, lastName, email, message];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const Errors = []

    //first name Test
    if (nameRegex.test(firstName.value) == false) {
        firstName.classList.add("error");
        Errors.push("firstName")
    } else {
        firstName.classList.remove("error");
    }

    //last name Test
    if (nameRegex.test(lastName.value) == false) {
        lastName.classList.add("error");
        Errors.push("lastName")
    } else {
        lastName.classList.remove("error");
    }

    //email Test
    if (emailRegex.test(email.value) == false) {
        email.classList.add("error");
        Errors.push("email")
    } else {
        email.classList.remove("error");
    }

    //message test
    if(messageRegex.test(message.value) === false){
        message.classList.add("error")
        Errors.push("message")
    }else{
        message.classList.remove("error");
    }

    if(Errors.length === 0){
        console.log({firstName: firstName.value, lastName: lastName.value, email: email.value, message: message.value})
        closeModal();
    }else{
        console.log({Errors: Errors})
    }
})
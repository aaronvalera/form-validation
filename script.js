// Regex validation
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
const PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-+]).{8,}$";
const EMAIL_REGEX = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const NUMBER_REGEX = /^\d{10}$/;

// Selectors
const countriesList = document.querySelector("#countries-list");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector("#confirm-password");
const formInputInformation = document.querySelectorAll(".information");

// Variables
let usernameValidation = false;
let emailValidation = false;

// Validation
[...countriesList].forEach(country => {
    country.innerHTML = country.innerHTML.split("(")[0];
})
formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});

console.log(formInputInformation)

usernameInput.addEventListener("input", event => {
    console.log(event);
    usernameValidation = USERNAME_REGEX.test(event.target.value);
    console.log(usernameValidation)
    if(usernameValidation) {
        formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});
        usernameInput.classList.remove("input-unvalid");
        usernameInput.classList.add("input-valid");
    } else {
        formInputInformation.forEach(paragraph => {paragraph.classList.remove("hide-information")});
        usernameInput.classList.remove("input-valid")
        usernameInput.classList.add("input-unvalid");
    }

    if(event.target.value == "") {
        usernameInput.classList.remove("input-unvalid");
    }
});

emailInput.addEventListener("input", event => {
    emailValidation = EMAIL_REGEX.test(event.target.value);
        if(emailValidation) {
        formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});
        emailInput.classList.remove("input-unvalid");
        emailInput.classList.add("input-valid");
    } else {
        formInputInformation.forEach(paragraph => {paragraph.classList.remove("hide-information")});
        emailInput.classList.remove("input-valid")
        emailInput.classList.add("input-unvalid");
    }

    if(event.target.value == "") {
        emailInput.classList.remove("input-unvalid");
    }
})


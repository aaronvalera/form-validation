// Regex validation
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-+]).{8, 16}$/;
const EMAIL_REGEX = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const NUMBER_REGEX = /^\d{10}$/;

// Selectors
const countriesList = document.querySelector("#countries-list");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector("#confirm-password");
const phoneCode = document.querySelector("#phone-code");
const formInputInformation = document.querySelectorAll(".information");


// Variables
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let passwordConfirmationValidation = false;

// Validation
[...countriesList].forEach(country => {
    country.innerHTML = country.innerHTML.split("(")[0];
})
formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});

console.log(formInputInformation)

// Function 
const inputsValidation = (validator, event, inputSelector) => {
    console.log(validator);
    if(validator) {
        formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});
        inputSelector.classList.remove("input-unvalid");
        inputSelector.classList.add("input-valid");
    } else {
        formInputInformation.forEach(paragraph => {paragraph.classList.remove("hide-information")});
        inputSelector.classList.remove("input-valid");
        inputSelector.classList.add("input-unvalid");
    }

    if(event.target.value == "") {
        inputSelector.classList.remove("input-unvalid");
    }
}

// Event Listeners
usernameInput.addEventListener("input", event => {
usernameValidation = USERNAME_REGEX.test(event.target.value);
inputsValidation(usernameValidation, event, usernameInput);
});

emailInput.addEventListener("input", event => {
    emailValidation = EMAIL_REGEX.test(event.target.value);
    inputsValidation(emailValidation, event, emailInput);
})

phoneInput.addEventListener("input", event => {
    phoneValidation = NUMBER_REGEX.test(event.target.value);
    inputsValidation(phoneValidation, event, phoneInput);
});

passwordInput.addEventListener("input", event => {
    passwordValidation = PASSWORD_REGEX.test(event.target.value);
    inputsValidation(passwordValidation, event, passwordInput);
});

passwordConfirmationInput.addEventListener("input", event => {
    passwordConfirmationValidation = passwordInput.value === event.target.value;
    inputsValidation(passwordConfirmationValidation, event, passwordConfirmationInput);
});

countriesList.addEventListener("input", event => {
    const countrySelected = [...countriesList].find(country => country.selected);
    phoneCode.textContent = `+${countrySelected.value}`;
});

console.log(formInputInformation)
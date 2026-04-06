// // Regex validation // //
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+]).{8,19}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NUMBER_REGEX = /^\d{15}$/;

// // Selectors // //
const countriesList = document.querySelector("#countries-list");
const phoneCode = document.querySelector("#phone-code");
const formInputInformation = document.querySelectorAll(".information");
const submitFormBtn = document.querySelector("#form-btn");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector("#confirm-password");


// // Variables // //
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let passwordConfirmationValidation = false;

// // Validation // //
formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});

[...countriesList].forEach(country => {
    country.innerHTML = country.innerHTML.split("(")[0];
})

// // Functions // //

// Fuction to submit the form
const checkFormStatus = () => {
    const isFormValid = usernameValidation &&
                        emailValidation &&
                        phoneValidation &&
                        passwordValidation &&
                        passwordConfirmationValidation;
    submitFormBtn.disabled = !isFormValid;
    if(isFormValid) {
    submitFormBtn.classList.add("enable-submit-btn");
    }
}

// Fuction to validate that the inputs meet the conditions
const inputsValidation = (validator, event, inputSelector, helpParagraphIndex) => {
    console.log(validator);
    const helpText = formInputInformation[helpParagraphIndex];
    if(validator) {
        helpText.classList.add("hide-information");
        inputSelector.classList.remove("input-unvalid");
        inputSelector.classList.add("input-valid");
    } else {
        helpText.classList.remove("hide-information");
        inputSelector.classList.remove("input-valid");
        inputSelector.classList.add("input-unvalid");
    }
    
    if(event.target.value === "") {
        helpText.classList.add("hide-information");
        inputSelector.classList.remove("input-unvalid");
    }
    checkFormStatus();
}

// // Event Listeners // //
usernameInput.addEventListener("input", event => {
    usernameValidation = USERNAME_REGEX.test(event.target.value);
    inputsValidation(usernameValidation, event, usernameInput, 0);
});

emailInput.addEventListener("input", event => {
    emailValidation = EMAIL_REGEX.test(event.target.value);
    inputsValidation(emailValidation, event, emailInput, 1);
})

phoneInput.addEventListener("input", event => {
    phoneValidation = NUMBER_REGEX.test(event.target.value);
    inputsValidation(phoneValidation, event, phoneInput, 2);
});

passwordInput.addEventListener("input", event => {
    passwordValidation = PASSWORD_REGEX.test(event.target.value);
    inputsValidation(passwordValidation, event, passwordInput, 3);
});

passwordConfirmationInput.addEventListener("input", event => {
    passwordConfirmationValidation = passwordInput.value === event.target.value;
    inputsValidation(passwordConfirmationValidation, event, passwordConfirmationInput, 4);
});

countriesList.addEventListener("input", event => {
    const countrySelected = [...countriesList].find(country => country.selected);
    phoneCode.textContent = `+${countrySelected.value}`;
});

submitFormBtn.addEventListener("click", event => {
    alert(`You have signed up successfully.
         Welcome ${usernameInput.value}!`);
});

// // Regex validation // //
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+]).{8,19}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NUMBER_REGEX = /^\d{10,15}$/;

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
const togglePasswordsBtns = document.querySelectorAll(".toggle-password");

// // Variables // //
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let passwordConfirmationValidation = false;
let passwordChecker = false;

// // Validation // //
formInputInformation.forEach(paragraph => {paragraph.classList.add("hide-information")});

[...countriesList].forEach(country => {
    country.innerHTML = country.innerHTML.split("(")[0];
});

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
    } else {
        submitFormBtn.classList.remove("enable-submit-btn"); 
    }
};

// Fuction to validate that the inputs meet the conditions
const inputsValidation = (validator, inputSelector, helpParagraphIndex) => {
    const helpText = formInputInformation[helpParagraphIndex];
    if(inputSelector.value === "") {
        helpText.classList.add("hide-information");
        inputSelector.classList.remove("input-unvalid");
        inputSelector.classList.remove("input-valid");
        checkFormStatus();
        return;
    }
    if(validator) {
        helpText.classList.add("hide-information");
        inputSelector.classList.remove("input-unvalid");
        inputSelector.classList.add("input-valid");
    } else {
        helpText.classList.remove("hide-information");
        inputSelector.classList.remove("input-valid");
        inputSelector.classList.add("input-unvalid");
    }
    
    checkFormStatus();
};

// Function to validate if passwords match
const validatePasswords = () => {
    passwordConfirmationValidation = passwordConfirmationInput.value !== "" && passwordInput.value === passwordConfirmationInput.value;
    inputsValidation(passwordConfirmationValidation, passwordConfirmationInput, 4);
};

// Function to toggle passwords' buttons to display the typed password
togglePasswordsBtns.forEach(button => {
    button.addEventListener("click", () => {
        const targetID = button.getAttribute("data-target");
        const targetInput = document.getElementById(targetID);
        const wrapper = button.closest(".password-wrapper");

        if (targetInput.type === "password") {
            targetInput.type = "text";
            wrapper.classList.add("is-visible"); 
            button.title = "Hide password";
        } else {
            targetInput.type = "password";
            wrapper.classList.remove("is-visible"); 
            button.title = "Show password";
        }
    });
});

// // Event Listeners // //
usernameInput.addEventListener("input", event => {
    usernameValidation = USERNAME_REGEX.test(event.target.value);
    inputsValidation(usernameValidation, usernameInput, 0);
});

emailInput.addEventListener("input", event => {
    emailValidation = EMAIL_REGEX.test(event.target.value);
    inputsValidation(emailValidation, emailInput, 1);
})

phoneInput.addEventListener("input", event => {
    phoneValidation = NUMBER_REGEX.test(event.target.value);
    inputsValidation(phoneValidation, phoneInput, 2);
});

passwordInput.addEventListener("input", event => {
    passwordValidation = PASSWORD_REGEX.test(event.target.value);
    inputsValidation(passwordValidation, passwordInput, 3);
    validatePasswords();
});

passwordConfirmationInput.addEventListener("input", event => {
    validatePasswords();
});

countriesList.addEventListener("input", event => {
    const countrySelected = [...countriesList].find(country => country.selected);
    phoneCode.textContent = `+${countrySelected.value}`;
});

submitFormBtn.addEventListener("click", event => {
    alert(`You have signed up successfully.
         Welcome ${usernameInput.value}!`);
});
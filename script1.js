// Get form elements

const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const countryInput =
    document.getElementById("country");

const termsInput =
    document.getElementById("terms");

const submitBtn =
    document.getElementById("submitBtn");

const successMessage =
    document.getElementById("successMessage");


// Error elements

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const countryError =
    document.getElementById("countryError");

const termsError =
    document.getElementById("termsError");


// Validation function

function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {

        showError(
            nameInput,
            nameError,
            "Name is required."
        );

        return false;
    }

    if (name.length < 3) {

        showError(
            nameInput,
            nameError,
            "Name must contain at least 3 characters."
        );

        return false;
    }

    showSuccess(nameInput, nameError);

    return true;
}


// Email validation

function validateEmail() {

    const email = emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        showError(
            emailInput,
            emailError,
            "Email is required."
        );

        return false;
    }

    if (!emailPattern.test(email)) {

        showError(
            emailInput,
            emailError,
            "Enter a valid email address."
        );

        return false;
    }

    showSuccess(emailInput, emailError);

    return true;
}


// Password validation

function validatePassword() {

    const password = passwordInput.value;

    if (password === "") {

        showError(
            passwordInput,
            passwordError,
            "Password is required."
        );

        return false;
    }

    if (password.length < 6) {

        showError(
            passwordInput,
            passwordError,
            "Password must contain at least 6 characters."
        );

        return false;
    }

    showSuccess(passwordInput, passwordError);

    return true;
}


// Confirm password validation

function validateConfirmPassword() {

    const password = passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;

    if (confirmPassword === "") {

        showError(
            confirmPasswordInput,
            confirmPasswordError,
            "Please confirm your password."
        );

        return false;
    }

    if (password !== confirmPassword) {

        showError(
            confirmPasswordInput,
            confirmPasswordError,
            "Passwords do not match."
        );

        return false;
    }

    showSuccess(
        confirmPasswordInput,
        confirmPasswordError
    );

    return true;
}


// Country validation

function validateCountry() {

    if (countryInput.value === "") {

        showError(
            countryInput,
            countryError,
            "Please select a country."
        );

        return false;
    }

    showSuccess(
        countryInput,
        countryError
    );

    return true;
}


// Terms validation

function validateTerms() {

    if (!termsInput.checked) {

        termsError.textContent =
            "You must accept the terms.";

        termsError.style.display = "block";

        return false;
    }

    termsError.textContent = "";

    termsError.style.display = "none";

    return true;
}


// Show error

function showError(input, errorElement, message) {

    input.classList.add("input-error");

    input.classList.remove("input-valid");

    errorElement.textContent = message;

    errorElement.style.display = "block";
}


// Show success

function showSuccess(input, errorElement) {

    input.classList.remove("input-error");

    input.classList.add("input-valid");

    errorElement.textContent = "";

    errorElement.style.display = "none";
}


// Enable country after name/email/password are valid

function updateCountry() {

    const nameValid = validateName();

    const emailValid = validateEmail();

    const passwordValid = validatePassword();

    countryInput.disabled =
        !(nameValid && emailValid && passwordValid);

}


// Enable submit button

function updateSubmitButton() {

    const nameValid = validateName();

    const emailValid = validateEmail();

    const passwordValid = validatePassword();

    const confirmValid =
        validateConfirmPassword();

    const countryValid =
        validateCountry();

    const termsValid =
        validateTerms();


    submitBtn.disabled = !(
        nameValid &&
        emailValid &&
        passwordValid &&
        confirmValid &&
        countryValid &&
        termsValid
    );
}


// Real-time validation

nameInput.addEventListener("input", function() {

    validateName();

    updateCountry();

    updateSubmitButton();

});


emailInput.addEventListener("input", function() {

    validateEmail();

    updateCountry();

    updateSubmitButton();

});


passwordInput.addEventListener("input", function() {

    validatePassword();

    updateCountry();

    updateSubmitButton();

});


confirmPasswordInput.addEventListener(
    "input",
    function() {

        validateConfirmPassword();

        updateSubmitButton();

    }
);


countryInput.addEventListener("change", function() {

    validateCountry();

    updateSubmitButton();

});


termsInput.addEventListener("change", function() {

    validateTerms();

    updateSubmitButton();

});


// Form submission

form.addEventListener("submit", function(event) {

    event.preventDefault();


    updateSubmitButton();


    if (submitBtn.disabled) {

        return;

    }


    successMessage.textContent =
        "Registration successful!";


    // Store submitted name
    localStorage.setItem(
        "registeredName",
        nameInput.value
    );


    // Reset form
    form.reset();


    // Disable fields again
    countryInput.disabled = true;

    submitBtn.disabled = true;


    // Remove validation styles
    nameInput.classList.remove("input-valid");

    emailInput.classList.remove("input-valid");

    passwordInput.classList.remove("input-valid");

    confirmPasswordInput.classList.remove("input-valid");

    countryInput.classList.remove("input-valid");

});
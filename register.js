// Show or hide password fields
document.getElementById("togglePassword").onclick = function() {
    let password = document.getElementById("password");

    if (password.type == "password") {
        password.type = "text";
        this.innerHTML = "Hide";
    } else {
        password.type = "password";
        this.innerHTML = "Show";
    }
};

document.getElementById("showBoth").onchange = function() {
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    if (this.checked) {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
};

// Registration form validation
document.getElementById("registerForm").onsubmit = function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let department = document.getElementById("department").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let message = document.getElementById("message");

    if (name == "" || email == "" || password == "" ||
        confirmPassword == "" || department == "" || gender == null) {
        message.style.color = "red";
        message.innerHTML = "Please complete all fields.";
        return;
    }

    if (password.length < 6) {
        message.style.color = "red";
        message.innerHTML = "Password must be at least 6 characters.";
        return;
    }

    if (password != confirmPassword) {
        message.style.color = "red";
        message.innerHTML = "Passwords do not match.";
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password,
        gender: gender.value,
        department: department
    };

    localStorage.setItem("studentUser", JSON.stringify(user));

    message.style.color = "green";
    message.innerHTML = "Account created successfully!";

    setTimeout(function() {
        window.location.href = "login.html";
    }, 800);
};

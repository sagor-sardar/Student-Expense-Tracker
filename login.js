// Show or hide password
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

// Login form validation
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let remember = document.getElementById("remember").checked;
    let message = document.getElementById("message");

    if (email == "" || password == "") {
        message.style.color = "red";
        message.innerHTML = "Please enter your email and password.";
        return;
    }

    let savedUser = JSON.parse(localStorage.getItem("studentUser"));

    if (savedUser == null) {
        message.style.color = "red";
        message.innerHTML = "Account not found. Please register first.";
        return;
    }

    if (email == savedUser.email && password == savedUser.password) {
        localStorage.setItem("loggedInUser", savedUser.name);

        if (remember == true) {
            localStorage.setItem("rememberUser", email);
        } else {
            localStorage.removeItem("rememberUser");
        }

        message.style.color = "green";
        message.innerHTML = "Login successful! Opening dashboard...";

        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 700);
    } else {
        message.style.color = "red";
        message.innerHTML = "Incorrect email or password.";
    }
};

// Demo forgot-password message
document.getElementById("forgotLink").onclick = function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message");

    if (email == "") {
        message.style.color = "red";
        message.innerHTML = "Enter your email first to check your account.";
    } else {
        let savedUser = JSON.parse(localStorage.getItem("studentUser"));

        if (savedUser != null && email == savedUser.email) {
            message.style.color = "#6255c7";
            message.innerHTML = "Demo: Your account is registered. Password reset needs a backend.";
        } else {
            message.style.color = "red";
            message.innerHTML = "No account found with this email.";
        }
    }
};

// Fill remembered email, if available
let rememberedEmail = localStorage.getItem("rememberUser");
if (rememberedEmail != null) {
    document.getElementById("email").value = rememberedEmail;
    document.getElementById("remember").checked = true;
}

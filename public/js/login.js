/**
 * ============================================================
 * 1. USERNAME PERSISTENCE
 * Save the username locally when the login form is submitted
 * ============================================================
 */
const loginForm = document.querySelector('form[action="/login"]');

if (loginForm) {
    loginForm.addEventListener('submit', function() {
        const usernameInput = document.getElementById('username');
        if (usernameInput && usernameInput.value) {
            // Save the username to LocalStorage for use in the navigation menu
            localStorage.setItem('vt_username', usernameInput.value);
        }
    });
}

/**
 * ============================================================
 * 2. REGISTRATION SUCCESS ALERT
 * Runs on the Login Page to show a success message after redirection
 * ============================================================
 */
const successAlert = document.getElementById('successAlert');

if (successAlert) {
    // Check if the registration success flag exists in the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registrationSuccess') === 'true') {
        
        // Display the success alert (green message box)
        successAlert.style.display = 'block';
        
        // Clean the URL to remove the parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }


/**
 * ============================================================
 * 3. LOGIN VALIDATION
 * Runs on the Login Page to validate username and password before submission
 * ============================================================
 */

const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const username = document.getElementById('username');
            const password = document.getElementById('password');

            // --- Username Validation ---
            if (username.value.trim().length < 4 || username.value.indexOf(' ') !== -1) {
                alert("Username Error: Min 4 chars, no spaces.");
                username.focus();
                return;
            }

            // --- Password Validation ---
            if (password.value.length < 8 || !/\d/.test(password.value) || !/[a-zA-Z]/.test(password.value)) {
                alert("Password Error: 8+ chars, 1 letter, 1 number.");
                password.focus();
                return;
            }

            loginForm.submit();
        });
    }

}
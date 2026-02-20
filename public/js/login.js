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
    // Check if the registration success flag exists in local storage
    if (localStorage.getItem('registrationSuccess') === 'true') {
        
        // Display the success alert (green message box)
        successAlert.style.display = 'block';
        
        // Clear the flag to prevent the message from showing again on page refresh
        localStorage.removeItem('registrationSuccess');
    }
}
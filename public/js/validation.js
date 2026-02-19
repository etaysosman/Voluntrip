document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. REGISTER FORM VALIDATION
    // ============================================================
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            // Prevent automatic submission to perform validation checks
            event.preventDefault();

            // Get Form Input Elements
            const fullName = document.getElementById('fullName');
            const id = document.getElementById('id');
            const birthdate = document.getElementById('birthdate');
            const email = document.getElementById('email');
            const username = document.getElementById('username');
            const password = document.getElementById('password');

            // --- Full Name Validation ---
            let spaceIndex = fullName.value.trim().indexOf(' ');
            if (spaceIndex === -1 || fullName.value.substring(spaceIndex + 1).length < 2) {
                alert("Full Name Error: Must contain First & Last name (min 2 chars each).");
                fullName.focus();
                return;
            }

            // --- ID Validation ---
            if (id.value.length !== 9 || !/^\d+$/.test(id.value)) {
                alert("ID Error: Must be exactly 9 digits, numbers only.");
                id.focus();
                return;
            }

            // --- Birthdate Validation ---
            let selectedDate = new Date(birthdate.value);
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate > today) {
                alert("Date Error: Birthdate cannot be in the future.");
                birthdate.focus();
                return;
            }

            // --- Email Validation ---
            if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
                alert("Email Error: Invalid format.");
                email.focus();
                return;
            }

            // --- Username Validation ---
            if (username.value.length < 4 || username.value.indexOf(' ') !== -1) {
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

            // === SUCCESS HANDLING ===
            // 1. Store a flag in LocalStorage indicating registration was successful
            localStorage.setItem('registrationSuccess', 'true');

            // 2. Submit form to server
            registerForm.submit();
        });
    }

    // ============================================================
    // 2. HOST AN ACTIVITY FORM VALIDATION
    // ============================================================
    const createActivityForm = document.getElementById('createActivityForm');

    if (createActivityForm) {
        createActivityForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('actTitle');
            const duration = document.getElementById('actDuration');
            const imageUrl = document.getElementById('actImage');
            const socialLink = document.getElementById('actSocial');
            const description = document.getElementById('actDesc');

            if (title.value.length < 3) {
                alert("Title Error: Min 3 chars.");
                title.focus();
                return;
            }

            let days = parseInt(duration.value);
            if (isNaN(days) || days < 1 || days > 365) {
                alert("Duration Error: 1-365 days.");
                duration.focus();
                return;
            }

            if (!isValidUrl(imageUrl.value)) {
                alert("Image URL Error: Must start with http:// or https://");
                imageUrl.focus();
                return;
            }

            if (socialLink.value.trim() !== "" && !isValidUrl(socialLink.value)) {
                alert("Social Link Error: Must start with http:// or https://");
                socialLink.focus();
                return;
            }

            if (description.value.length < 15) {
                alert("Description Error: Min 15 chars.");
                description.focus();
                return;
            }

            createActivityForm.submit();
        });
    }

    // ============================================================
    // 3. APPLY FORM HANDLING
    // ============================================================
    const applyForm = document.getElementById('applyForm');

    if (applyForm) {
        applyForm.addEventListener('submit', function(event) {
            // Prevent default to display custom alert first
            event.preventDefault();

            const fullNameInput = document.getElementById('fullName');
            // Safety check in case the field is not found
            const userName = fullNameInput ? fullNameInput.value : 'Volunteer';

            alert("Thank you " + userName + ", your application has been sent!");
            this.submit();
        });
    }

    // ============================================================
    // 4. SUBMIT FORM HANDLING (REVIEWS & CONNECT & EXPLORE)
    // ============================================================
    const genericForm = document.getElementById('form');

    if (genericForm) {
        genericForm.addEventListener('submit', function(event) {
            // Prevent default to display success alert first
            event.preventDefault();

            alert("Everything was sent Successfully! Thank you.");
            this.submit();
        });
    }

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================
    /**
     * Checks if a string starts with valid web protocols
     */
    function isValidUrl(string) {
        return string.startsWith('http://') || string.startsWith('https://');
    }

});
document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================
    /**
     * Checks if a string starts with valid web protocols
     */
    function isValidUrl(string) {
        return string.startsWith('http://') || string.startsWith('https://');
    }

    /**
     * Displays a success message and submits the form
     */
    function submitWithSuccess(formElement, message = "Everything was sent Successfully! Thank you.") {
        alert(message);
        formElement.submit();
    }

    // ============================================================
    // 1. REGISTER FORM VALIDATION
    // ============================================================
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName');
            const id = document.getElementById('id');
            const birthdate = document.getElementById('birthdate');
            const email = document.getElementById('email');
            const username = document.getElementById('username');
            const password = document.getElementById('password');

            let spaceIndex = fullName.value.trim().indexOf(' ');
            if (spaceIndex === -1 || fullName.value.substring(spaceIndex + 1).length < 2) {
                alert("Full Name Error: Must contain First & Last name (min 2 chars each).");
                fullName.focus();
                return;
            }

            if (id.value.trim().length !== 9 || !/^\d+$/.test(id.value.trim())) {
                alert("ID Error: Must be exactly 9 digits, numbers only.");
                id.focus();
                return;
            }

            let selectedDate = new Date(birthdate.value);
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate > today) {
                alert("Date Error: Birthdate cannot be in the future.");
                birthdate.focus();
                return;
            }

            if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1) {
                alert("Email Error: Invalid format.");
                email.focus();
                return;
            }

            if (username.value.trim().length < 4 || username.value.indexOf(' ') !== -1) {
                alert("Username Error: Min 4 chars, no spaces.");
                username.focus();
                return;
            }

            if (password.value.length < 8 || !/\d/.test(password.value) || !/[a-zA-Z]/.test(password.value)) {
                alert("Password Error: 8+ chars, 1 letter, 1 number.");
                password.focus();
                return;
            }

            // Store a flag in LocalStorage indicating registration was successful
            localStorage.setItem('registrationSuccess', 'true');
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

            if (title.value.trim().length < 3) {
                alert("Title Error: Must be at least 3 characters.");
                title.focus();
                return;
            }

            let days = parseInt(duration.value);
            if (isNaN(days) || days < 1 || days > 365) {
                alert("Duration Error: Please enter a valid number of days (1-365).");
                duration.focus();
                return;
            }

            if (!isValidUrl(imageUrl.value.trim())) {
                alert("Image URL Error: Must start with http:// or https://");
                imageUrl.focus();
                return;
            }

            if (socialLink.value.trim() !== "" && !isValidUrl(socialLink.value.trim())) {
                alert("Social Link Error: Must start with http:// or https://");
                socialLink.focus();
                return;
            }

            if (description.value.trim().length < 15) {
                alert("Description Error: Must be at least 15 characters.");
                description.focus();
                return;
            }

            submitWithSuccess(this, "Activity created successfully! Thank you.");
        });
    }

    // ============================================================
    // 3. APPLY FORM HANDLING
    // ============================================================
    const applyForm = document.getElementById('applyForm');

    if (applyForm) {
        applyForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const startDate = document.getElementById('startDate');
            const durationWeeks = document.getElementById('durationWeeks');
            const additionalLanguage = document.getElementById('additionalLanguage');
            const experience = document.getElementById('experience');
            const agreeToTerms = document.getElementById('agreeToTerms');

            // --- Start Date Validation ---
            let selectedDate = new Date(startDate.value);
            let today = new Date();
            today.setHours(0, 0, 0, 0); // מתעלם משעות כדי להשוות רק תאריכים
            
            if (!startDate.value || selectedDate < today) {
                alert("Date Error: Please select a start date that is today or in the future.");
                startDate.focus();
                return;
            }

            // --- Duration Validation ---
            if (durationWeeks.value === "") {
                alert("Duration Error: Please select your planned duration.");
                durationWeeks.focus();
                return;
            }

            // --- Language Validation ---
            if (additionalLanguage.value === "") {
                alert("Language Error: Please select an additional spoken language.");
                additionalLanguage.focus();
                return;
            }

            // --- Physical Work Validation (Radio Buttons) ---
            const physicalWorkRadios = document.getElementsByName('physicalWork');
            let physicalWorkSelected = false;
            for (let i = 0; i < physicalWorkRadios.length; i++) {
                if (physicalWorkRadios[i].checked) {
                    physicalWorkSelected = true;
                    break;
                }
            }
            if (!physicalWorkSelected) {
                alert("Physical Work Error: Please answer whether you are willing to do physical work.");
                return;
            }

            // --- Experience Validation ---
            if (experience.value.trim().length < 15) {
                alert("Experience Error: Please write at least 15 characters about your experience and motivation.");
                experience.focus();
                return;
            }

            // --- Terms Validation ---
            if (!agreeToTerms.checked) {
                alert("Terms Error: You must agree to the Terms & Conditions.");
                agreeToTerms.focus();
                return;
            }

            // Validation passed! Call the shared helper function
            submitWithSuccess(this, "Thank you! Your application has been successfully submitted.");
        });
    }

    // ============================================================
    // 4. REVIEWS FORM VALIDATION
    // ============================================================
    const reviewsForm = document.getElementById('reviewsForm');

    if (reviewsForm) {
        reviewsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const volunteerName = document.getElementById('volunteerName');
            const location = document.getElementById('location');
            const category = document.getElementById('category');
            const daysVolunteered = document.getElementById('daysVolunteered');
            const description = document.getElementById('description');

            if (volunteerName.value.trim().length < 2) {
                alert("Name Error: Must be at least 2 characters.");
                volunteerName.focus();
                return;
            }

            if (location.value.trim().length < 2) {
                alert("Location Error: Please enter a valid location (e.g., Thailand).");
                location.focus();
                return;
            }

            if (category.value === "") {
                alert("Category Error: Please select a volunteering category.");
                category.focus();
                return;
            }

            let days = parseInt(daysVolunteered.value);
            if (isNaN(days) || days < 1 || days > 365) {
                alert("Days Error: Please enter a valid number of days (1-365).");
                daysVolunteered.focus();
                return;
            }

            const ratings = document.getElementsByName('rating');
            let ratingSelected = false;
            for (let i = 0; i < ratings.length; i++) {
                if (ratings[i].checked) {
                    ratingSelected = true;
                    break;
                }
            }
            if (!ratingSelected) {
                alert("Rating Error: Please select a rating from 1 to 5 stars.");
                return;
            }

            if (description.value.trim().length < 15) {
                alert("Description Error: Please write at least 15 characters about your experience.");
                description.focus();
                return;
            }

            submitWithSuccess(this);
        });
    }

    // ============================================================
    // 5. CONNECT FORM VALIDATION (Suggest Organization)
    // ============================================================
    const connectForm = document.getElementById('connectForm');

    if (connectForm) {
        connectForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const orgName = document.getElementById('orgName');
            const contactPhone = document.getElementById('contactPhone');
            const socialLink = document.getElementById('socialLink');
            const category = document.getElementById('category');

            if (orgName.value.trim().length < 2) {
                alert("Organization Name Error: Must be at least 2 characters.");
                orgName.focus();
                return;
            }

            const phoneRegex = /^[\d\+\-\s]+$/;
            if (contactPhone.value.trim().length < 9 || !phoneRegex.test(contactPhone.value.trim())) {
                alert("Phone Error: Please enter a valid phone number.");
                contactPhone.focus();
                return;
            }

            if (socialLink.value.trim() !== "" && !isValidUrl(socialLink.value.trim())) {
                alert("Social Link Error: Must start with http:// or https://");
                socialLink.focus();
                return;
            }

            if (category.value === "") {
                alert("Category Error: Please select a main volunteering category.");
                category.focus();
                return;
            }

            submitWithSuccess(this);
        });
    }

    // ============================================================
    // 6. GENERIC FORM FALLBACK 
    // ============================================================
    const genericForm = document.getElementById('form');

    if (genericForm) {
        genericForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitWithSuccess(this);
        });
    }

});
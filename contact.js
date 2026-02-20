document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            
            // 1. Prevent default submission
            event.preventDefault();

            // 2. Retrieve values
            let fullName = document.getElementById("fullName");
            let phone = document.getElementById("phone");
            let message = document.getElementById("message");
            let email = document.getElementById("email");
            
            // --- Validation 1: Full Name ---
            // Must contain a space AND at least 2 characters after the space
            let spaceIndex = fullName.value.indexOf(' ');
            if (spaceIndex === -1 || fullName.value.substring(spaceIndex + 1).length < 2) {
                alert("Full Name must contain a first and last name (at least 2 characters after the space).");
                fullName.focus();
                return; 
            }

            // --- Validation 2: Email Address ---
            // Must contain '@' AND end with '.com' OR '.co'
            if (email.value.indexOf("@") === -1) {
                alert("Please enter a valid e-mail address (must contain '@').");
                email.focus();
                return;
            }
            if (!email.value.endsWith(".com") && !email.value.endsWith(".co")) {
                alert("Email address must end with '.com' or '.co'.");
                email.focus();
                return;
            }

            // --- Validation 3: Phone Number ---
            if (phone.value !== "") {
                if (!phone.value.startsWith("05")) {
                    alert("Phone number must start with '05'.");
                    phone.focus();
                    return;
                }
                
                if (!/^\d+$/.test(phone.value)) {
                    alert("Phone number must contain digits only.");
                    phone.focus();
                    return;
                }

                if (phone.value.length !== 10) {
                    alert("Phone number must be exactly 10 digits.");
                    phone.focus();
                    return;
                }
            }

            // --- Validation 4: Message Length ---
            // Must be between 20 and 100 characters
            if (message.value.length < 20 || message.value.length > 100) {
                alert("Please provide details between 20 and 100 characters.");
                message.focus();
                return;
            }

            // 3. Success
            alert("Your support case has been submitted successfully!");
            form.submit();
        });
    }

});
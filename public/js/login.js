// --- שמירת שם המשתמש בעת התחברות ---
const loginForm = document.querySelector('form[action="/login"]'); 

if (loginForm) {
    loginForm.addEventListener('submit', function() {
        const usernameInput = document.getElementById('username');
        if (usernameInput && usernameInput.value) {
            // שומרים את השם ב-LocalStorage
            localStorage.setItem('vt_username', usernameInput.value);
        }
    });
}

    // ============================================================
    // 5. LOGIN PAGE CHECK (Runs only on Login Page)
    // ============================================================
    const successAlert = document.getElementById('successAlert');

    if (successAlert) {
        // בודק אם יש סימון בזיכרון המקומי
        if (localStorage.getItem('registrationSuccess') === 'true') {
            
            // מציג את ההודעה הירוקה
            successAlert.style.display = 'block';
            
            // מוחק את הסימון כדי שלא יופיע שוב אם מרעננים את הדף
            localStorage.removeItem('registrationSuccess');
        }
    }


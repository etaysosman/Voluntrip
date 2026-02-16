const form = document.getElementById('applyForm'); 

if (form) {
    form.addEventListener('submit', function(e) {
        
        const userName = document.getElementById('fullName').value; 
        alert("Thank you " + userName + ", your application has been sent!");
        this.submit();
    });
}